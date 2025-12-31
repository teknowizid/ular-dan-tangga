/**
 * Force cleanup all rooms and players from Supabase
 * Run: node force-cleanup.js
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function forceCleanup() {
  console.log('🧹 Starting force cleanup...\n')

  try {
    // 1. Delete all move history
    console.log('Deleting move history...')
    const { error: moveError } = await supabase
      .from('move_history')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all
    
    if (moveError) {
      console.log('Move history error:', moveError.message)
    } else {
      console.log('✅ Move history cleared')
    }

    // 2. Delete all players
    console.log('Deleting all players...')
    const { error: playerError } = await supabase
      .from('game_players')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all
    
    if (playerError) {
      console.log('Players error:', playerError.message)
    } else {
      console.log('✅ All players cleared')
    }

    // 3. Delete all rooms
    console.log('Deleting all rooms...')
    const { error: roomError } = await supabase
      .from('game_rooms')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all
    
    if (roomError) {
      console.log('Rooms error:', roomError.message)
    } else {
      console.log('✅ All rooms cleared')
    }

    // 4. Verify cleanup
    console.log('\n📊 Verifying cleanup...')
    
    const { count: roomCount } = await supabase
      .from('game_rooms')
      .select('*', { count: 'exact', head: true })
    
    const { count: playerCount } = await supabase
      .from('game_players')
      .select('*', { count: 'exact', head: true })

    console.log(`Rooms remaining: ${roomCount || 0}`)
    console.log(`Players remaining: ${playerCount || 0}`)

    console.log('\n✅ Force cleanup completed!')

  } catch (error) {
    console.error('Error during cleanup:', error)
  }
}

forceCleanup()
