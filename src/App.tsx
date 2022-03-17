import React, { useState } from 'react';
import './App.css';
import TicTacToe from './components/tictactoe';

type game = { name: string, Component: any | undefined }

const games : game[] = [
  {
    name: "Tic-Tac-Toe",
    Component: TicTacToe
  }
]

function App() {
  const [game, setGame] = useState(-1)
  const Game = game !== -1 ? games[game].Component : () => <span>Ningún juego seleccionado</span>

  return (
    <div>
      <h2>Elije un juego</h2>
      <ul>
        { games.map( (item, idx) => <li className='item' onClick={ ()=> { setGame( game === idx ? -1 : idx) } }>{item.name}</li>) }
      </ul>
      <Game />
    </div>
  );
}

export default App;
