-- Migration v3: Add player session tracking for better cleanup
-- Run this in Supabase SQL Editor

-- 1. Add last_active column to game_players for tracking active sessions
ALTER TABLE game_players ADD COLUMN IF NOT EXISTS last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 2. Add last_activity column to game_rooms
ALTER TABLE game_rooms ADD COLUMN IF NOT EXISTS last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 3. Create index for faster cleanup queries
CREATE INDEX IF NOT EXISTS idx_game_players_last_active ON game_players(last_active);
CREATE INDEX IF NOT EXISTS idx_game_rooms_last_activity ON game_rooms(last_activity);
CREATE INDEX IF NOT EXISTS idx_game_rooms_status ON game_rooms(status);

-- 4. Function to update player heartbeat
CREATE OR REPLACE FUNCTION update_player_heartbeat(p_player_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE game_players 
  SET last_active = NOW() 
  WHERE id = p_player_id;
  
  -- Also update room last_activity
  UPDATE game_rooms 
  SET last_activity = NOW() 
  WHERE id = (SELECT room_id FROM game_players WHERE id = p_player_id);
END;
$$ LANGUAGE plpgsql;

-- 5. Function to cleanup stale players (inactive for more than 2 minutes)
CREATE OR REPLACE FUNCTION cleanup_stale_players()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER := 0;
  stale_player RECORD;
BEGIN
  -- Find and delete stale players
  FOR stale_player IN 
    SELECT gp.id, gp.room_id 
    FROM game_players gp
    WHERE gp.last_active < NOW() - INTERVAL '2 minutes'
  LOOP
    -- Delete the stale player
    DELETE FROM game_players WHERE id = stale_player.id;
    deleted_count := deleted_count + 1;
    
    -- Update room player count
    UPDATE game_rooms 
    SET current_players = (
      SELECT COUNT(*) FROM game_players WHERE room_id = stale_player.room_id
    )
    WHERE id = stale_player.room_id;
  END LOOP;
  
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- 6. Function to cleanup empty and stale rooms
CREATE OR REPLACE FUNCTION cleanup_stale_rooms()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER := 0;
BEGIN
  -- First cleanup stale players
  PERFORM cleanup_stale_players();
  
  -- Delete rooms with no players
  DELETE FROM move_history 
  WHERE room_id IN (
    SELECT id FROM game_rooms WHERE current_players = 0
  );
  
  DELETE FROM game_rooms WHERE current_players = 0;
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  -- Delete finished rooms older than 5 minutes
  DELETE FROM move_history 
  WHERE room_id IN (
    SELECT id FROM game_rooms 
    WHERE status = 'finished' 
    AND ended_at < NOW() - INTERVAL '5 minutes'
  );
  
  DELETE FROM game_rooms 
  WHERE status = 'finished' 
  AND ended_at < NOW() - INTERVAL '5 minutes';
  
  -- Delete waiting rooms with no activity for 10 minutes
  DELETE FROM move_history 
  WHERE room_id IN (
    SELECT id FROM game_rooms 
    WHERE status = 'waiting' 
    AND last_activity < NOW() - INTERVAL '10 minutes'
  );
  
  DELETE FROM game_players 
  WHERE room_id IN (
    SELECT id FROM game_rooms 
    WHERE status = 'waiting' 
    AND last_activity < NOW() - INTERVAL '10 minutes'
  );
  
  DELETE FROM game_rooms 
  WHERE status = 'waiting' 
  AND last_activity < NOW() - INTERVAL '10 minutes';
  
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- 7. Function to get actual player count (only active players)
CREATE OR REPLACE FUNCTION get_active_player_count(p_room_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*) 
    FROM game_players 
    WHERE room_id = p_room_id 
    AND last_active > NOW() - INTERVAL '2 minutes'
  );
END;
$$ LANGUAGE plpgsql;

-- Done!
SELECT 'Migration v3 complete! Player session tracking is ready.' as status;
