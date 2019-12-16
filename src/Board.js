import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


class Board extends Component {
  static defaultProps = {
    nrows: 5, ncols: 5, chanceLightStartsOn: 0.25
  }

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
    this.reset = this.reset.bind(this)
  }

  createBoard() {
    let board = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row)
    }
    return board
  }

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y,x); //flip selected
    flipCell(y, x-1); //flip left
    flipCell(y, x+1);//flip right
    flipCell(y-1, x); //flip above
    flipCell(y+1, x); //flip below

    // win when every cell is turned off
    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({board, hasWon});
  }

  reset() {
    this.setState({
      hasWon: false,
      board: this.createBoard()
    })
  }


  render() {

    // if the game is won, just show a winning msg & render nothing else
    let tblBoard = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = []
      for (let x = 0; x < this.props.ncols; x++) {
        let coord = `${y}-${x}`
        row.push(<Cell flipCellsAroundMe={() => this.flipCellsAround(coord)}
                       key={coord}
                       isLit={this.state.board[y][x]}/>)
      }
      tblBoard.push(<tr key={y}>{row}</tr>)
    }

    return (
      <div>
        {this.state.hasWon ? (
            <div>
              <h1><span className="neon">You</span> <span className="flux">Won!!</span></h1>
              <button onClick={this.reset}>Try Again</button>
            </div>
          )
          :
          (
            <div>
              <h1><span className="neon">Light's</span> <span className="flux">Out</span></h1>
              <h3>with React!</h3>
              <table className="Board">
                <tbody>
                {tblBoard}
                </tbody>
              </table>
              <button style={{marginTop: '45px'}} onClick={this.reset}>reset</button>
            </div>
          )
        }
      </div>

    )
  }
}


export default Board;
