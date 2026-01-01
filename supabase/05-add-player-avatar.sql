-- Migration V4: Add avatar column to game_players
-- Run this in Supabase SQL Editor

-- Add avatar column to game_players table
ALTER TABLE game_players 
ADD COLUMN IF NOT EXISTS avatar INTEGER DEFAULT 1;

-- Add comment for documentation
COMMENT ON COLUMN game_players.avatar IS 'Player avatar index (1-6)';
