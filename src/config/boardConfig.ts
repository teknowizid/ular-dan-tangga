/**
 * Board Configuration - Snake and Ladder positions
 * Update these positions to match your board.png image
 */

export interface BoardConfig {
  snakes: Record<number, number>  // {head: tail}
  ladders: Record<number, number> // {bottom: top}
}

/**
 * Current board configuration
 * Updated to match the actual board.png image positions
 */
export const CUSTOM_BOARD_CONFIG: BoardConfig = {
  // Snakes (head → tail)
  snakes: {
    99: 83,  // Snake head at 99, tail at 83
    95: 36,  // Snake head at 95, tail at 36
    62: 19,  // Snake head at 62, tail at 19
    54: 14,  // Snake head at 54, tail at 14
    17: 6,   // Snake head at 17, tail at 6
  },
  
  // Ladders (bottom → top)
  ladders: {
    3: 22,   // Ladder bottom at 3, top at 22
    5: 14,   // Ladder bottom at 5, top at 14
    9: 31,   // Ladder bottom at 9, top at 31
    20: 39,  // Ladder bottom at 20, top at 39
    27: 84,  // Ladder bottom at 27, top at 84
    51: 67,  // Ladder bottom at 51, top at 67
    72: 91,  // Ladder bottom at 72, top at 91
    73: 93,  // Ladder bottom at 73, top at 93
    88: 99,  // Ladder bottom at 88, top at 99
  },
}

/**
 * Helper function to check if a position has a snake
 */
export const hasSnake = (position: number): boolean => {
  return position in CUSTOM_BOARD_CONFIG.snakes
}

/**
 * Helper function to check if a position has a ladder
 */
export const hasLadder = (position: number): boolean => {
  return position in CUSTOM_BOARD_CONFIG.ladders
}

/**
 * Get snake tail position
 */
export const getSnakeTail = (head: number): number | null => {
  return CUSTOM_BOARD_CONFIG.snakes[head] || null
}

/**
 * Get ladder top position
 */
export const getLadderTop = (bottom: number): number | null => {
  return CUSTOM_BOARD_CONFIG.ladders[bottom] || null
}

/**
 * Debug: Get all snake and ladder positions for verification
 */
export const getAllPositions = () => {
  const snakePositions = Object.entries(CUSTOM_BOARD_CONFIG.snakes).map(([head, tail]) => ({
    type: 'snake',
    head: parseInt(head),
    tail,
  }))
  
  const ladderPositions = Object.entries(CUSTOM_BOARD_CONFIG.ladders).map(([bottom, top]) => ({
    type: 'ladder',
    bottom: parseInt(bottom),
    top,
  }))
  
  return { snakes: snakePositions, ladders: ladderPositions }
}