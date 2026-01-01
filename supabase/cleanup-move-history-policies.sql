-- Clean up all existing policies on move_history table
-- Run this if you have policy conflicts

-- 1. List all current policies (for reference)
SELECT 
    policyname,
    cmd,
    permissive,
    roles
FROM pg_policies 
WHERE tablename = 'move_history';

-- 2. Drop ALL existing policies on move_history
DO $$ 
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'move_history'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON move_history', policy_record.policyname);
    END LOOP;
END $$;

-- 3. Create single clean policy for anonymous multiplayer
CREATE POLICY "anonymous_multiplayer_access" ON move_history 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- 4. Verify the cleanup
SELECT 
    policyname,
    cmd,
    permissive,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'move_history';