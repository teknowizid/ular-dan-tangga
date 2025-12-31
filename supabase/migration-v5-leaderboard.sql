-- Migration v5: Add leaderboard and player_stats tables
-- Run this SQL in Supabase SQL Editor

-- 1. Create player_stats table to track individual player statistics
CREATE TABLE IF NOT EXISTS player_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name VARCHAR(100) NOT NULL,
  device_id VARCHAR(255), -- Optional: to track same device
  total_games_played INT DEFAULT 0,
  total_games_won INT DEFAULT 0,
  total_games_lost INT DEFAULT 0,
  total_moves INT DEFAULT 0,
  average_moves DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Create leaderboard view (computed from player_stats)
CREATE OR REPLACE VIEW leaderboard AS
SELECT 
  id,
  player_name as username,
  NULL as avatar_url,
  total_games_played,
  total_games_won,
  total_games_lost,
  CASE 
    WHEN total_games_played > 0 
    THEN ROUND((total_games_won::DECIMAL / total_games_played) * 100, 0)
    ELSE 0 
  END as win_percentage,
  ROW_NUMBER() OVER (ORDER BY total_games_won DESC, win_percentage DESC) as rank
FROM player_stats
WHERE total_games_played > 0
ORDER BY total_games_won DESC, win_percentage DESC;

-- 3. Create indexes
CREATE INDEX IF NOT EXISTS idx_player_stats_name ON player_stats(player_name);
CREATE INDEX IF NOT EXISTS idx_player_stats_wins ON player_stats(total_games_won DESC);

-- 4. Enable RLS
ALTER TABLE player_stats ENABLE ROW LEVEL SECURITY;

-- 5. Create policy for anonymous access
CREATE POLICY "Allow all on player_stats" ON player_stats FOR ALL USING (true) WITH CHECK (true);

-- 6. Function to update player stats after game
CREATE OR REPLACE FUNCTION update_player_stats(
  p_player_name VARCHAR,
  p_won BOOLEAN,
  p_moves INT
)
RETURNS VOID AS $$
DECLARE
  existing_id UUID;
BEGIN
  -- Check if player exists
  SELECT id INTO existing_id FROM player_stats WHERE player_name = p_player_name LIMIT 1;
  
  IF existing_id IS NOT NULL THEN
    -- Update existing stats
    UPDATE player_stats SET
      total_games_played = total_games_played + 1,
      total_games_won = total_games_won + CASE WHEN p_won THEN 1 ELSE 0 END,
      total_games_lost = total_games_lost + CASE WHEN p_won THEN 0 ELSE 1 END,
      total_moves = total_moves + p_moves,
      average_moves = (total_moves + p_moves)::DECIMAL / (total_games_played + 1),
      updated_at = NOW()
    WHERE id = existing_id;
  ELSE
    -- Create new stats record
    INSERT INTO player_stats (player_name, total_games_played, total_games_won, total_games_lost, total_moves, average_moves)
    VALUES (p_player_name, 1, CASE WHEN p_won THEN 1 ELSE 0 END, CASE WHEN p_won THEN 0 ELSE 1 END, p_moves, p_moves);
  END IF;
END;
$$ LANGUAGE plpgsql;
