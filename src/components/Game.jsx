import { useState } from 'react';
import Board from './Board/Board';

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares, location) {
    const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, location: location }];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function toggleSort(order) {
    setIsAscending(!order);
  }

  const moves = history.map((element, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move + `, location (${element.location.row}, ${element.location.col})`;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        {move === currentMove ?
          <div>You are at move #{move} {move === 0 ? '' : `, location (${element.location.row}, ${element.location.col})`}</div> :
          <button onClick={() => jumpTo(move)}>{description}</button>}
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ul>{isAscending ? moves : moves.reverse()}</ul>
      </div>
      <div className="toggle-button">
        <button onClick={() => toggleSort(isAscending)}>{isAscending ? 'Sort Descending' : 'Sort Ascending'}</button>
      </div>
    </div>
  );
}

export default Game;
