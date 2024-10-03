import Square from "./Square/Square";

const boardSize = 3;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return [null, null];
}

function isDraw(squares) {
  return Array.isArray(squares) && squares.every(e => e !== null) && !calculateWinner(squares)[0];
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares)[0] || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares, { row: Math.floor(i / boardSize) + 1, col: i % boardSize + 1 });
  }

  const winner = calculateWinner(squares)[0];
  const winSquare = calculateWinner(squares)[1];
  const draw = isDraw(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (draw) {
    status = 'The game ended in a draw.';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const rederSquare = (squareIndex) => {
    const isWinningSquare = Array.isArray(winSquare) && winSquare.includes(squareIndex);
    return <Square
      key={squareIndex}
      value={squares[squareIndex]}
      onSquareClick={() => handleClick(squareIndex)}
      isWinningSquare={isWinningSquare}
    />
  }

  const board = [];

  for (let row = 0; row < boardSize; row++) {
    const rowSquares = []
    for (let col = 0; col < boardSize; col++) {
      const squareIndex = row * boardSize + col;
      rowSquares.push(rederSquare(squareIndex));
    }
    board.push(
      <div key={row} className="board-row">{rowSquares}</div>
    )
  }

  return (
    <>
      <div className="status">{status}</div>
      {board}
    </>
  );
}

export default Board;
