import {useState} from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import GameBoard from './components/GameBoard'
import SuccessScreen from './components/SuccessScreen'
import './App.css'

const App = () => {
  const [userName, setUserName] = useState(
    localStorage.getItem('userName') || '',
  )
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)

  if (!userName) {
    return <WelcomeScreen setUserName={setUserName} />
  }

  if (gameOver) {
    return <SuccessScreen score={score} timeElapsed={timeElapsed} />
  }

  return (
    <GameBoard
      setGameOver={setGameOver}
      setScore={setScore}
      setTimeElapsed={setTimeElapsed}
    />
  )
}

export default App
