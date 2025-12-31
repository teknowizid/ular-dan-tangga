import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import GameNavigator from './src/navigation/GameNavigator'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

/**
 * App - Main entry point for Snake & Ladder game
 */
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // Simulate loading time (minimum 2 seconds for splash screen)
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <GameNavigator />
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  )
}
