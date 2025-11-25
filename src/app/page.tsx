'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

// Type declarations for Farcaster SDK
declare global {
  interface Window {
    sdk?: {
      actions: {
        ready: () => Promise<void>
      }
    }
  }
}

type Grid = number[][]
type Direction = 'up' | 'down' | 'left' | 'right'

interface GameState {
  grid: Grid
  score: number
  bestScore: number
  gameOver: boolean
  won: boolean
  newTiles: Set<string>
  mergedTiles: Set<string>
}

// Initialize empty 4x4 grid
const createEmptyGrid = (): Grid => {
  return Array(4).fill(null).map(() => Array(4).fill(0))
}

// Add random tile (2 or 4)
const addRandomTile = (grid: Grid): { grid: Grid; position: string | null } => {
  const newGrid = grid.map(row => [...row])
  const emptyCells: [number, number][] = []
  
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (newGrid[i][j] === 0) {
        emptyCells.push([i, j])
      }
    }
  }
  
  if (emptyCells.length === 0) return { grid: newGrid, position: null }
  
  const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
  newGrid[row][col] = Math.random() < 0.9 ? 2 : 4
  
  return { grid: newGrid, position: `${row}-${col}` }
}

// Check if game is over
const isGameOver = (grid: Grid): boolean => {
  // Check for empty cells
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) return false
    }
  }
  
  // Check for possible merges
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const current = grid[i][j]
      if (j < 3 && current === grid[i][j + 1]) return false
      if (i < 3 && current === grid[i + 1][j]) return false
    }
  }
  
  return true
}

// Check if won (has 2048 tile)
const hasWon = (grid: Grid): boolean => {
  return grid.some(row => row.some(cell => cell >= 2048))
}

// Move and merge logic
const move = (grid: Grid, direction: Direction): { grid: Grid; score: number; moved: boolean; mergedPositions: Set<string> } => {
  const newGrid = grid.map(row => [...row])
  let score = 0
  let moved = false
  const mergedPositions = new Set<string>()
  
  const moveRow = (row: number[]): { row: number[]; score: number; mergedIndices: number[] } => {
    let newRow = row.filter(cell => cell !== 0)
    let rowScore = 0
    const mergedIndices: number[] = []
    
    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2
        rowScore += newRow[i]
        mergedIndices.push(i)
        newRow.splice(i + 1, 1)
      }
    }
    
    while (newRow.length < 4) {
      newRow.push(0)
    }
    
    return { row: newRow, score: rowScore, mergedIndices }
  }
  
  if (direction === 'left') {
    for (let i = 0; i < 4; i++) {
      const result = moveRow(newGrid[i])
      if (JSON.stringify(newGrid[i]) !== JSON.stringify(result.row)) moved = true
      newGrid[i] = result.row
      score += result.score
      result.mergedIndices.forEach(j => mergedPositions.add(`${i}-${j}`))
    }
  } else if (direction === 'right') {
    for (let i = 0; i < 4; i++) {
      const result = moveRow([...newGrid[i]].reverse())
      result.row.reverse()
      if (JSON.stringify(newGrid[i]) !== JSON.stringify(result.row)) moved = true
      newGrid[i] = result.row
      score += result.score
      result.mergedIndices.forEach(j => mergedPositions.add(`${i}-${3 - j}`))
    }
  } else if (direction === 'up') {
    for (let j = 0; j < 4; j++) {
      const column = [newGrid[0][j], newGrid[1][j], newGrid[2][j], newGrid[3][j]]
      const result = moveRow(column)
      if (JSON.stringify(column) !== JSON.stringify(result.row)) moved = true
      for (let i = 0; i < 4; i++) {
        newGrid[i][j] = result.row[i]
      }
      score += result.score
      result.mergedIndices.forEach(i => mergedPositions.add(`${i}-${j}`))
    }
  } else if (direction === 'down') {
    for (let j = 0; j < 4; j++) {
      const column = [newGrid[3][j], newGrid[2][j], newGrid[1][j], newGrid[0][j]]
      const result = moveRow(column)
      result.row.reverse()
      if (JSON.stringify([newGrid[0][j], newGrid[1][j], newGrid[2][j], newGrid[3][j]]) !== JSON.stringify(result.row)) moved = true
      for (let i = 0; i < 4; i++) {
        newGrid[i][j] = result.row[i]
      }
      score += result.score
      result.mergedIndices.forEach(i => mergedPositions.add(`${3 - i}-${j}`))
    }
  }
  
  return { grid: newGrid, score, moved, mergedPositions }
}

export default function Game2048() {
  const [isLoading, setIsLoading] = useState(true)
  const [gameState, setGameState] = useState<GameState>({
    grid: createEmptyGrid(),
    score: 0,
    bestScore: 0,
    gameOver: false,
    won: false,
    newTiles: new Set(),
    mergedTiles: new Set(),
  })
  
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const gameContainerRef = useRef<HTMLDivElement>(null)
  
  // Initialize game
  const initGame = useCallback(() => {
    let grid = createEmptyGrid()
    const first = addRandomTile(grid)
    grid = first.grid
    const second = addRandomTile(grid)
    grid = second.grid
    
    const newTiles = new Set<string>()
    if (first.position) newTiles.add(first.position)
    if (second.position) newTiles.add(second.position)
    
    setGameState(prev => ({
      grid,
      score: 0,
      bestScore: prev.bestScore,
      gameOver: false,
      won: false,
      newTiles,
      mergedTiles: new Set(),
    }))
  }, [])
  
  // Handle move
  const handleMove = useCallback((direction: Direction) => {
    setGameState(prev => {
      if (prev.gameOver) return prev
      
      const { grid, score, moved, mergedPositions } = move(prev.grid, direction)
      
      if (!moved) return prev
      
      const { grid: newGrid, position } = addRandomTile(grid)
      const newTiles = new Set<string>()
      if (position) newTiles.add(position)
      
      const newScore = prev.score + score
      const newBestScore = Math.max(newScore, prev.bestScore)
      const won = hasWon(newGrid)
      const gameOver = isGameOver(newGrid)
      
      // Save best score to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('2048-best', newBestScore.toString())
      }
      
      return {
        grid: newGrid,
        score: newScore,
        bestScore: newBestScore,
        gameOver,
        won,
        newTiles,
        mergedTiles: mergedPositions,
      }
    })
  }, [])
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.gameOver) return
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault()
          handleMove('up')
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault()
          handleMove('down')
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault()
          handleMove('left')
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault()
          handleMove('right')
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleMove, gameState.gameOver])
  
  // Touch controls for mobile
  useEffect(() => {
    const container = gameContainerRef.current
    if (!container) return
    
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    }
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current || gameState.gameOver) return
      
      const touch = e.changedTouches[0]
      const deltaX = touch.clientX - touchStartRef.current.x
      const deltaY = touch.clientY - touchStartRef.current.y
      const minSwipeDistance = 30
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > minSwipeDistance) {
          handleMove(deltaX > 0 ? 'right' : 'left')
        }
      } else {
        if (Math.abs(deltaY) > minSwipeDistance) {
          handleMove(deltaY > 0 ? 'down' : 'up')
        }
      }
      
      touchStartRef.current = null
    }
    
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleMove, gameState.gameOver])
  
  // Initialize Farcaster SDK and game
  useEffect(() => {
    const init = async () => {
      // Load best score from localStorage
      if (typeof window !== 'undefined') {
        const savedBest = localStorage.getItem('2048-best')
        if (savedBest) {
          setGameState(prev => ({ ...prev, bestScore: parseInt(savedBest, 10) }))
        }
      }
      
      // Initialize game
      initGame()
      
      // Load Farcaster SDK dynamically
      try {
  const { sdk } = await import('@farcaster/frame-sdk')
  await sdk.actions.ready()
} catch (error) {
  console.log('Running outside Farcaster or SDK not available')
}
      
      setIsLoading(false)
    }
    
    init()
  }, [initGame])
  
  // Clear animation classes after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        newTiles: new Set(),
        mergedTiles: new Set(),
      }))
    }, 200)
    
    return () => clearTimeout(timer)
  }, [gameState.grid])
  
  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner" />
        <div className="loading-text">Loading 2048...</div>
      </div>
    )
  }
  
  return (
    <div className="game-container" ref={gameContainerRef}>
      <div className="header">
        <h1 className="title">2048</h1>
        <div className="scores">
          <div className="score-box">
            <div className="score-label">Score</div>
            <div className="score-value">{gameState.score}</div>
          </div>
          <div className="score-box">
            <div className="score-label">Best</div>
            <div className="score-value">{gameState.bestScore}</div>
          </div>
        </div>
      </div>
      
      <div className="grid-container">
        <div className="grid">
          {gameState.grid.map((row, i) =>
            row.map((cell, j) => {
              const key = `${i}-${j}`
              const isNew = gameState.newTiles.has(key)
              const isMerged = gameState.mergedTiles.has(key)
              
              return (
                <div
                  key={key}
                  className={`cell ${isNew ? 'new' : ''} ${isMerged ? 'merged' : ''}`}
                  data-value={cell || undefined}
                >
                  {cell > 0 ? cell : ''}
                </div>
              )
            })
          )}
        </div>
        
        {(gameState.gameOver || gameState.won) && (
          <div className="game-over-overlay">
            <div className={`game-over-text ${gameState.won ? 'win' : 'lose'}`}>
              {gameState.won ? '🎉 You Win!' : 'Game Over'}
            </div>
            <div className="final-score">Final Score: {gameState.score}</div>
            <button className="btn btn-primary" onClick={initGame}>
              Play Again
            </button>
          </div>
        )}
      </div>
      
      <div className="controls">
        <button className="btn btn-primary" onClick={initGame}>
          New Game
        </button>
      </div>
      
      <p className="instructions">
        Use arrow keys or WASD to move tiles. 
        <span className="swipe-hint"> Swipe to move on mobile.</span>
        <br />
        Combine matching numbers to reach 2048!
      </p>
    </div>
  )
}
