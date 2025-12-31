// Test Create Room
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function testCreateRoom() {
  console.log('🧪 Testing create room flow...\n')

  // Step 1: Create room
  console.log('1. Creating room...')
  const { data: roomData, error: roomError } = await supabase
    .rpc('create_game_room', { p_name: 'Test Room', p_host_name: 'TestHost' })

  if (roomError) {
    console.log('❌ Error creating room:', roomError)
    return
  }

  console.log('✅ Room created:', roomData)
  const { room_id, room_code } = roomData[0]

  // Step 2: Add player
  console.log('\n2. Adding host player...')
  const { data: playerData, error: playerError } = await supabase
    .from('game_players')
    .insert({
      room_id: room_id,
      player_name: 'TestHost',
      player_color: '#FF5722',
      is_host: true,
      is_current_turn: true,
      player_order: 0,
    })
    .select()
    .single()

  if (playerError) {
    console.log('❌ Error adding player:', playerError)
    // Cleanup room
    await supabase.from('game_rooms').delete().eq('id', room_id)
    return
  }

  console.log('✅ Player added:', playerData)

  // Step 3: Verify room
  console.log('\n3. Verifying room...')
  const { data: verifyRoom } = await supabase
    .from('game_rooms')
    .select('*')
    .eq('id', room_id)
    .single()

  console.log('Room data:', verifyRoom)

  // Step 4: Verify player
  console.log('\n4. Verifying player...')
  const { data: verifyPlayer } = await supabase
    .from('game_players')
    .select('*')
    .eq('room_id', room_id)

  console.log('Players in room:', verifyPlayer)

  // Cleanup
  console.log('\n5. Cleaning up...')
  await supabase.from('game_players').delete().eq('room_id', room_id)
  await supabase.from('game_rooms').delete().eq('id', room_id)
  console.log('✅ Cleanup done')

  console.log('\n🎉 All tests passed! Create room flow works.')
}

testCreateRoom()
