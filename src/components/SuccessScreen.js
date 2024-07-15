import './SuccessScreen.css'

const SuccessScreen = ({score, timeElapsed}) => (
  <div className="success-container">
    <h1 className="success-message">Congratulations!</h1>
    <div className="success-details">
      <p>Your Score: {score}</p>
      <p>Time Taken: {timeElapsed} seconds</p>
    </div>
    <button
      type="button"
      className="success-button"
      onClick={() => window.location.reload()}
    >
      Play Again
    </button>
  </div>
)

export default SuccessScreen
