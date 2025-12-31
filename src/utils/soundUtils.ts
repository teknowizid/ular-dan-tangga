import { Audio } from 'expo-av'

/**
 * Play click sound effect
 */
export const playClickSound = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sound/click.mp3')
    )
    await sound.playAsync()
    // Unload after playing
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync()
      }
    })
  } catch (error) {
    console.log('Error playing click sound:', error)
  }
}
