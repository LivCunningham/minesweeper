import React, { Component } from 'react'
import Header from './components/Header'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      game: {
        board: []
      }
    }
  }

  componentDidMount() {
    const info = {
      number: 0
    }

    const requestPost = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(info)
    }

    fetch('https://minesweeper-api.herokuapp.com/games', requestPost)
      .then(resp => resp.json())
      .then(newGame => {
        console.log(newGame)
        this.setState({
          game: newGame
        })
      })
  }

  cellClick = (row, column) => {
    console.log('clicked', row, column)
    fetch(
      `https://minesweeper-api.herokuapp.com/games/${this.state.game.id}/check`,
      {
        method: 'POST',
        body: JSON.stringify({ row: row, column: column }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(resp => resp.json())
      .then(newState => {
        console.log(newState)
        this.setState({
          game: newState
        })
      })
  }

  render() {
    return (
      <>
        <Header />
        <table className="main-board">
          <tbody>
            {this.state.game.board.map((row, i) => {
              return (
                <tr key={i}>
                  {row.map((col, j) => {
                    return (
                      <td
                        key={j}
                        className="cell"
                        onClick={() => this.cellClick(i, j)}
                      >
                        {this.state.game.board[i][j]}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
  }
}

export default App
