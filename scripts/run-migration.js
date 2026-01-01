// Run Migration Script
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })
const fs = require('fs')

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function runMigration() {
  console.log('🚀 Running migration...\n')

  try {
    // Test 1: Add room_code column
    console.log('1. Adding room_code column...')
    const { error: e1 } = await supabase.rpc('exec_sql', {
      sql: `ALTER TABLE game_rooms ADD COLUMN IF NOT EXISTS room_code VARCHAR(6) UNIQUE`
    })
    if (e1) console.log('   Note:', e1.message)
    else console.log('   ✅ Done')

    // Test 2: Add host_name column
    console.log('2. Adding host_name column...')
    const { error: e2 } = await supabase.rpc('exec_sql', {
      sql: `ALTER TABLE game_rooms ADD COLUMN IF NOT EXISTS host_name VARCHAR(100)`
    })
    if (e2) console.log('   Note:', e2.message)
    else console.log('   ✅ Done')

    // Test 3: Add winner_name column
    console.log('3. Adding winner_name column...')
    const { error: e3 } = await supabase.rpc('exec_sql', {
      sql: `ALTER TABLE game_rooms ADD COLUMN IF NOT EXISTS winner_name VARCHAR(100)`
    })
    if (e3) console.log('   Note:', e3.message)
    else console.log('   ✅ Done')

    // Test 4: Add is_host to game_players
    console.log('4. Adding is_host column...')
    const { error: e4 } = await supabase.rpc('exec_sql', {
      sql: `ALTER TABLE game_players ADD COLUMN IF NOT EXISTS is_host BOOLEAN DEFAULT FALSE`
    })
    if (e4) console.log('   Note:', e4.message)
    else console.log('   ✅ Done')

    // Test 5: Add player_order to game_players
    console.log('5. Adding player_order column...')
    const { error: e5 } = await supabase.rpc('exec_sql', {
      sql: `ALTER TABLE game_players ADD COLUMN IF NOT EXISTS player_order INT DEFAULT 0`
    })
    if (e5) console.log('   Note:', e5.message)
    else console.log('   ✅ Done')

    console.log('\n✅ Migration attempted!')
    console.log('\n⚠️  Note: Some operations may require running SQL directly in Supabase Dashboard')
    console.log('   if you see "function exec_sql does not exist" errors.')
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

// Alternative: Test if tables have the new columns
async function checkSchema() {
  console.log('\n📋 Checking current schema...\n')
  
  // Check game_rooms columns
  const { data: rooms, error: roomsErr } = await supabase
    .from('game_rooms')
    .select('*')
    .limit(1)
  
  if (roomsErr) {
    console.log('game_rooms:', roomsErr.message)
  } else {
    console.log('game_rooms columns:', rooms.length > 0 ? Object.keys(rooms[0]).join(', ') : 'Table exists but empty')
  }

  // Check game_players columns
  const { data: players, error: playersErr } = await supabase
    .from('game_players')
    .select('*')
    .limit(1)
  
  if (playersErr) {
    console.log('game_players:', playersErr.message)
  } else {
    console.log('game_players columns:', players.length > 0 ? Object.keys(players[0]).join(', ') : 'Table exists but empty')
  }

  // Test create_game_room function
  console.log('\n🔧 Testing create_game_room function...')
  const { data: funcTest, error: funcErr } = await supabase
    .rpc('create_game_room', { p_name: 'Test Room', p_host_name: 'TestHost' })
  
  if (funcErr) {
    console.log('❌ Function not found:', funcErr.message)
    console.log('\n⚠️  You need to run migration-v2.sql in Supabase SQL Editor!')
  } else {
    console.log('✅ Function works! Room created:', funcTest)
    // Clean up test room
    if (funcTest && funcTest[0]) {
      await supabase.from('game_rooms').delete().eq('id', funcTest[0].room_id)
      console.log('   (Test room cleaned up)')
    }
  }
}

checkSchema()
