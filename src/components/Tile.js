import './Tile.css'

const Tile = ({index, tile, isFlipped, isMatched, onClick}) => (
  <div
    className={`tile ${isFlipped || isMatched ? 'flipped' : ''}`}
    onClick={() => onClick(index)}
    role="button"
    tabIndex={0}
    onKeyPress={e => e.key === 'Enter' && onClick(index)}
  >
    {isFlipped || isMatched ? tile.symbol : 'X'}
  </div>
)

export default Tile
