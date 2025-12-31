/**
 * Represents a player in the game
 */
export interface Player {
  id: string
  name: string
  color: string
  avatar?: number // Avatar index (1-6)
  position: number
  isCurrentTurn: boolean
  diceResult?: number
  joinedAt: Date
}

/**
 * Represents the game board configuration
 */
export interface GameBoard {
  size: number
  snakes: Record<number, number>  // {head: tail}
  ladders: Record<number, number> // {bottom: top}
  maxPosition: number
}

/**
 * Represents a game room where players gather to play
 */
export interface GameRoom {
  id: string
  name: string
  players: Player[]
  currentTurnPlayerId: string
  status: 'waiting' | 'playing' | 'finished'
  winner?: Player
  createdAt: Date
  updatedAt: Date
}

/**
 * Represents a single move event in the game
 */
export interface MoveEvent {
  playerId: string
  playerName: string
  previousPosition: number
  newPosition: number
  diceRoll: number
  timestamp: Date
  moveType: 'normal' | 'snake' | 'ladder' | 'bounce' | 'collision'
}

/**
 * Represents a collision event when a player lands on another player's position
 */
export interface CollisionEvent {
  bumpedPlayerId: string
  bumpedPlayerName: string
  bumpedFromPosition: number
  bumpedToPosition: number
}

/**
 * Represents the current game state
 */
export interface GameState {
  currentRoom: GameRoom | null
  currentPlayer: Player | null
  moveHistory: MoveEvent[]
  isMyTurn: boolean
}

/**
 * Payload structure for real-time game updates
 */
export interface GameUpdatePayload {
  event: 'player_moved' | 'turn_changed' | 'player_joined' | 'game_ended'
  playerId: string
  playerName: string
  data: any
  timestamp: number
}

/**
 * Result of position calculation after a move
 */
export interface MoveResult {
  position: number
  moveType: 'normal' | 'snake' | 'ladder' | 'bounce' | 'collision'
}

/**
 * Result of move validation
 */
export interface ValidationResult {
  isValid: boolean
  reason?: string
}

/**
 * Leaderboard entry for player statistics
 */
export interface LeaderboardEntry {
  id: string
  username: string
  avatarUrl?: string
  totalGamesPlayed: number
  totalGamesWon: number
  totalGamesLost: number
  winPercentage: number
  rank: number
}

/**
 * Standard board configuration with predefined snake and ladder positions
 * Snakes: 17→7, 54→34, 62→19, 87→36, 93→73, 99→79
 * Ladders: 3→22, 5→14, 20→39, 27→84, 51→67, 72→91, 88→99
 */
export const STANDARD_BOARD: GameBoard = {
  size: 10,
  snakes: {
    17: 7,
    54: 34,
    62: 19,
    87: 36,
    93: 73,
    99: 79,
  },
  ladders: {
    3: 22,
    5: 14,
    20: 39,
    27: 84,
    51: 67,
    72: 91,
    88: 99,
  },
  maxPosition: 100,
}

/**
 * Available player colors for selection (legacy, kept for compatibility)
 */
export const PLAYER_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4', // Green
  '#FFEAA7', // Yellow
  '#DDA0DD', // Plum
  '#FF8C00', // Orange
  '#9370DB', // Purple
]

/**
 * Avatar colors - each avatar has a unique color
 */
export const AVATAR_COLORS: Record<number, string> = {
  1: '#4ECDC4', // Teal - Bus
  2: '#FF6B6B', // Red - Fire truck
  3: '#45B7D1', // Blue - Police car
  4: '#FF8C00', // Orange - Taxi
  5: '#96CEB4', // Green - Ambulance
  6: '#9370DB', // Purple - Truck
}

/**
 * Available player avatars
 * Maps avatar index to require() for the image
 */
export const PLAYER_AVATARS: Record<number, any> = {
  1: require('../../assets/avatars/1.png'),
  2: require('../../assets/avatars/2.png'),
  3: require('../../assets/avatars/3.png'),
  4: require('../../assets/avatars/4.png'),
  5: require('../../assets/avatars/5.png'),
  6: require('../../assets/avatars/2025-12-31_191901.png'),
}

/**
 * Get avatar source by index
 */
export const getAvatarSource = (avatarIndex: number | undefined): any => {
  if (!avatarIndex || !PLAYER_AVATARS[avatarIndex]) {
    return PLAYER_AVATARS[1] // Default avatar
  }
  return PLAYER_AVATARS[avatarIndex]
}
