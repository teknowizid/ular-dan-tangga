import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native'
import { Audio } from 'expo-av'
import { useGameStore } from '../store/gameStore'
import { AVATAR_COLORS } from '../types/game'
import { playClickSound, startBackgroundMusic, stopBackgroundMusic, pauseBackgroundMusic, resumeBackgroundMusic, isBackgroundMusicPlaying } from '../utils/soundUtils'
import AvatarPicker from '../components/AvatarPicker'

interface HomeScreenProps {
  navigation: any
}

/**
 * HomeScreen - Entry point for creating or joining game rooms
 */
export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [playerName, setPlayerName] = useState('')
  const [roomName, setRoomName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState(1)
  const [isMusicOn, setIsMusicOn] = useState(true)

  const { createGameRoom } = useGameStore()

  // Get color based on avatar
  const getAvatarColor = (avatar: number) => {
    return AVATAR_COLORS[avatar] || AVATAR_COLORS[1]
  }

  // Configure audio mode and play welcome intro music on mount
  useEffect(() => {
    const setupAudio = async () => {
      try {
        // Set audio mode for background playback
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        })

        // Start background music
        await startBackgroundMusic()
        setIsMusicOn(true)
      } catch (error) {
        console.log('Error setting up audio:', error)
      }
    }

    setupAudio()

    // Cleanup on unmount - don't stop music here, let navigation handle it
    return () => {}
  }, [])

  // Toggle music on/off
  const toggleMusic = async () => {
    playClickSound()
    const isPlaying = await isBackgroundMusicPlaying()
    if (isPlaying) {
      await pauseBackgroundMusic()
      setIsMusicOn(false)
    } else {
      await resumeBackgroundMusic()
      setIsMusicOn(true)
    }
  }

  const handleCreateGame = async () => {
    playClickSound()
    if (!playerName.trim()) {
      Alert.alert('Error', 'Masukkan nama kamu')
      return
    }
    if (!roomName.trim()) {
      Alert.alert('Error', 'Masukkan nama room')
      return
    }

    // Stop background music before entering game
    await stopBackgroundMusic()
    
    createGameRoom(roomName.trim(), playerName.trim(), getAvatarColor(selectedAvatar), selectedAvatar)
    navigation.navigate('Game')
  }

  const handleQuickPlay = async () => {
    playClickSound()
    if (!playerName.trim()) {
      Alert.alert('Error', 'Masukkan nama kamu')
      return
    }

    // Stop background music before entering game
    await stopBackgroundMusic()

    // Create a quick game with default room name
    createGameRoom(`Game-${Date.now().toString(36)}`, playerName.trim(), getAvatarColor(selectedAvatar), selectedAvatar)
    navigation.navigate('Game')
  }

  const handleNavigate = async (screen: string) => {
    playClickSound()
    
    // Stop music if going to Lobby (will enter game from there)
    if (screen === 'Lobby') {
      await stopBackgroundMusic()
    }
    
    navigation.navigate(screen)
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerSpacer} />
          <Pressable
            style={styles.musicToggle}
            onPress={toggleMusic}
          >
            <Text style={styles.musicToggleText}>
              {isMusicOn ? '🔊' : '🔇'}
            </Text>
          </Pressable>
        </View>
        <Text style={styles.title}>🐍 Ular & Tangga 🪜</Text>
        <Text style={styles.subtitle}>Permainan Papan Multiplayer</Text>
      </View>

      {/* Player Setup */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pengaturan Pemain</Text>
        
        <Text style={styles.label}>Nama Kamu</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan nama kamu"
          value={playerName}
          onChangeText={setPlayerName}
          maxLength={20}
        />

        <AvatarPicker
          selectedAvatar={selectedAvatar}
          onSelect={setSelectedAvatar}
          size="medium"
        />
      </View>

      {/* Create Game */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Buat Game Baru</Text>
        
        <Text style={styles.label}>Nama Room</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan nama room"
          value={roomName}
          onChangeText={setRoomName}
          maxLength={30}
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleCreateGame}
        >
          <Text style={styles.buttonText}>Buat Room Game</Text>
        </Pressable>
      </View>

      {/* Quick Play */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Main Cepat</Text>
        <Text style={styles.cardDescription}>
          Main cepat melawan Bot
        </Text>
        
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.secondaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleQuickPlay}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            🤖 Main vs Bot
          </Text>
        </Pressable>
      </View>

      {/* Multiplayer Online */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🌐 Multiplayer Online</Text>
        <Text style={styles.cardDescription}>
          Main bareng teman secara online!
        </Text>
        
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.onlineButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => handleNavigate('Lobby')}
        >
          <Text style={styles.buttonText}>
            🎮 Masuk Lobby
          </Text>
        </Pressable>
      </View>

      {/* Game Rules */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cara Bermain</Text>
        <View style={styles.rulesList}>
          <Text style={styles.rule}>🎲 Lempar dadu untuk maju</Text>
          <Text style={styles.rule}>🪜 Mendarat di bawah tangga untuk naik</Text>
          <Text style={styles.rule}>🐍 Mendarat di kepala ular untuk turun</Text>
          <Text style={styles.rule}>🏆 Yang pertama sampai 100 menang!</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable
          style={styles.leaderboardButton}
          onPress={() => handleNavigate('Leaderboard')}
        >
          <Text style={styles.leaderboardText}>🏆 Lihat Papan Peringkat</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginVertical: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  headerSpacer: {
    width: 44,
  },
  musicToggle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  musicToggleText: {
    fontSize: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 16,
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#4CAF50',
  },
  onlineButton: {
    backgroundColor: '#2196F3',
  },
  rulesList: {
    gap: 8,
  },
  rule: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  footer: {
    alignItems: 'center',
    marginTop: 8,
  },
  leaderboardButton: {
    padding: 12,
  },
  leaderboardText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
})
