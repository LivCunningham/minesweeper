import React, { Component } from 'react'

class Header extends Component {
  state = {
    game: {
      board: []
    }
  }

  resetGame = () => {
    fetch('https://minesweeper-api.herokuapp.com/games', {
      method: 'POST',
      body: JSON.stringify({ difficulty: 0 }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(newGame => {
        console.log(newGame)
        this.setState({
          game: newGame
        })
      })
  }

  render() {
    return (
      <>
        <h1 id="Title">
          Minesweeper
          <button className="reset-button" onClick={() => this.resetGame()}>
            Let's play again!
          </button>
        </h1>
      </>
    )
  }
}

export default Header
