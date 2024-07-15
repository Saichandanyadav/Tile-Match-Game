import {useState, useEffect} from 'react'
import Tile from './Tile'
import './GameBoard.css'

const GameBoard = ({setGameOver, setScore, setTimeElapsed}) => {
  const [tiles, setTiles] = useState([])
  const [flippedTiles, setFlippedTiles] = useState([])
  const [matchedTiles, setMatchedTiles] = useState([])
  const [score, updateScore] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [timeElapsed, setElapsedTime] = useState(0)

  const generateTiles = () => {
    const tilePairs = []
    const symbols = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍑', '🍍']
    for (let i = 0; i < symbols.length; i += 1) {
      tilePairs.push({id: i * 2, symbol: symbols[i]})
      tilePairs.push({id: i * 2 + 1, symbol: symbols[i]})
    }
    return tilePairs
  }

  const shuffleTiles = tilesArray => {
    const shuffledTiles = [...tilesArray]
    for (let i = shuffledTiles.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledTiles[i], shuffledTiles[j]] = [
        shuffledTiles[j],
        shuffledTiles[i],
      ]
    }
    return shuffledTiles
  }

  useEffect(() => {
    const newTiles = shuffleTiles(generateTiles())
    setTiles(newTiles)
    setStartTime(Date.now())
  }, [])

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
      return () => clearInterval(interval)
    }
    return undefined
  }, [startTime])

  useEffect(() => {
    if (matchedTiles.length === tiles.length && tiles.length > 0) {
      setGameOver(true)
      setScore(score)
      setTimeElapsed(timeElapsed)
    }
    return undefined
  }, [
    matchedTiles,
    tiles.length,
    score,
    setGameOver,
    setScore,
    setTimeElapsed,
    timeElapsed,
  ])

  const handleTileClick = index => {
    if (
      flippedTiles.length === 2 ||
      flippedTiles.includes(index) ||
      matchedTiles.includes(index)
    ) {
      return
    }

    const newFlippedTiles = [...flippedTiles, index]
    setFlippedTiles(newFlippedTiles)

    if (newFlippedTiles.length === 2) {
      const [firstIndex, secondIndex] = newFlippedTiles
      if (tiles[firstIndex].symbol === tiles[secondIndex].symbol) {
        setMatchedTiles(prevMatchedTiles => [
          ...prevMatchedTiles,
          firstIndex,
          secondIndex,
        ])
        setFlippedTiles([])
        updateScore(prevScore => prevScore + 1)
      } else {
        setTimeout(() => {
          setFlippedTiles([])
          updateScore(prevScore => prevScore - 1)
        }, 1000)
      }
    }
  }

  return (
    <div className="game-container">
      <div className="scoreboard">
        <h2>Score: {score}</h2>
        <h2>Time: {timeElapsed} seconds</h2>
      </div>
      <div className="game-board">
        {tiles.map((tile, index) => (
          <Tile
            key={tile.id}
            index={index}
            tile={tile}
            isFlipped={flippedTiles.includes(index)}
            isMatched={matchedTiles.includes(index)}
            onClick={() => handleTileClick(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default GameBoard
