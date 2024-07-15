import {useState} from 'react'
import './WelcomeScreen.css'

const WelcomeScreen = ({setUserName}) => {
  const [name, setName] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    localStorage.setItem('userName', name)
    setUserName(name)
  }

  return (
    <div className="welcome-container">
      <h1>Welcome to the Tile Matching Game!</h1>
      <form className="welcome-form" onSubmit={handleSubmit}>
        <input
          className="welcome-input"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button className="welcome-button" type="submit">
          Start Game
        </button>
      </form>
    </div>
  )
}

export default WelcomeScreen
