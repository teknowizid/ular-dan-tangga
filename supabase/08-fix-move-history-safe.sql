-- Safe fix for move_history table - handles existing policies gracefully
-- This script can be run multiple times safely

-- 1. Make user_id nullable in move_history (for backward compatibility)
DO $$ 
BEGIN
    -- Check if column is already nullable
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'move_history' 
        AND column_name = 'user_id' 
        AND is_nullable = 'NO'
    ) THEN
        ALTER TABLE move_history ALTER COLUMN user_id DROP NOT NULL;
    END IF;
END $$;

-- 2. Add default value for user_id (can be null for anonymous)
ALTER TABLE move_history ALTER COLUMN user_id SET DEFAULT NULL;

-- 3. Update existing records to have null user_id if needed
UPDATE move_history SET user_id = NULL WHERE user_id IS NOT NULL AND user_id NOT IN (SELECT id FROM auth.users);

-- 4. Ensure player_name is not null (we need this for anonymous multiplayer)
UPDATE move_history SET player_name = 'Unknown Player' WHERE player_name IS NULL;

DO $$ 
BEGIN
    -- Check if column is already NOT NULL
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'move_history' 
        AND column_name = 'player_name' 
        AND is_nullable = 'YES'
    ) THEN
        ALTER TABLE move_history ALTER COLUMN player_name SET NOT NULL;
    END IF;
END $$;

-- 5. Create index for player_name for better performance (if not exists)
CREATE INDEX IF NOT EXISTS idx_move_history_player_name ON move_history(player_name);

-- 6. Update RLS policies to work with anonymous users
-- Drop all existing policies first
DROP POLICY IF EXISTS "Users can view moves in their games" ON move_history;
DROP POLICY IF EXISTS "System can insert moves" ON move_history;
DROP POLICY IF EXISTS "Allow all on move_history" ON move_history;
DROP POLICY IF EXISTS "move_history_policy" ON move_history;

-- Create new policy for anonymous multiplayer
CREATE POLICY "anonymous_move_history_access" ON move_history FOR ALL USING (true) WITH CHECK (true);

-- Verify the policy was created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'move_history';