-- Check current status of move_history table and policies

-- 1. Check table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'move_history' 
ORDER BY ordinal_position;

-- 2. Check existing policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'move_history';

-- 3. Check indexes
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'move_history';

-- 4. Check sample data
SELECT 
    id,
    room_id,
    user_id,
    player_name,
    previous_position,
    new_position,
    dice_roll,
    move_type,
    created_at
FROM move_history 
ORDER BY created_at DESC 
LIMIT 5;