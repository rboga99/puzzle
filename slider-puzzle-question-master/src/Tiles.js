class Tiles extends Component {
    constructor (props) {
      super(props)
      
      const {rows, cols} = props
      this.state = {numbers: _.range(0, rows * cols)}
      
      this.handleTileClick = this.handleTileClick.bind(this)
      this.handleButtonClick = this.handleButtonClick.bind(this)
    }
    
    handleTileClick (index) {
      this.swap(index)
    }
    
    handleButtonClick () {
      this.shuffle()
    }
    
    shuffle () {
      const {hole, rows, cols} = this.props
      const {numbers} = this.state
      const shuffledNumbers = shuffle(numbers, hole, rows, cols)
      this.setState({numbers: shuffledNumbers})
    }
    
    swap (tileIndex) {
      const {hole, rows, cols} = this.props
      const {numbers} = this.state
      const holeIndex = numbers.indexOf(hole)
      if (canSwap(tileIndex, holeIndex, rows, cols)) {
        const newNumbers = swap(numbers, tileIndex, holeIndex)
        this.setState({numbers: newNumbers})
      }
    }
    
    render () {
      const {rows, cols, width, height} = this.props
      const {numbers} = this.state
      const solved = isSolved(numbers)
      const pieceWidth = Math.round(width / cols)
      const pieceHeight = Math.round(height / rows)
      const style = {
        ...tilesStyle,
        width,
        height
      }
      
      return (
        <div>
          <ul style={style}>
            {numbers.map((number, index) => (
              <Tile {...this.props} index={index} number={number} key={number}
                width={pieceWidth} height={pieceHeight}
                onClick={this.handleTileClick}
              />
            ))}
          </ul>
          <button style={buttonStyle}
            onClick={this.handleButtonClick}
          >
            {solved ? 'Start' : 'Restart'}
          </button>
        </div>
      )
    }
  }