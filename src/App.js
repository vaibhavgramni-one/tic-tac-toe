import { useState } from 'react';
import './App.css';

let gameFlag = false;

function App() {

  return (
    <div className="App">
      <div className='container'>
      <h1>Tic - Tac - Toe</h1>
        <div className='tic-tac-toe'>
          <div className='board'>
            <Board />        
          </div>
        </div>
      </div>
    </div>
  );
}

const calculateWinner = (squares) => {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for(let i = 0 ; i < lines.length ; i++){
    const [a,b,c] = lines[i];

    if(squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }

  let count = 0;
  for(let i = 0 ; i < squares.length ; i++){
    if(squares[i]){
      count++;
    }
  }

  if(count === 9){
    return 'D'
  }

  return null;
}

const Board = (index) => {
  
  const [squares , setSquares] = useState(Array(9).fill(null));
  const [xisNext , setXIsNext] = useState(true);
                                 
  let status;
  status = `${xisNext ? 'X' : 'O'} : Player Turn`
  

  const winner = calculateWinner(squares);
  if(winner === 'D'){
    status = 'Draw Match'
    gameFlag = true
  }else if(winner){
    status = `${winner}, Player Wins`
    gameFlag = true
  }

  const handleClick = (index) => {
    if(squares[index]){
      return;
    }

    const newSquares = squares.slice();
    newSquares[index] = 'X'
    newSquares[index] = xisNext ? 'X' : 'O'

    setSquares(newSquares);
    setXIsNext(!xisNext)
  }

  return (
    <>
    <h4>{status}</h4>
    <div className='row'>
      <Square value={squares[0]} handleClick={() => handleClick(0)}/>
      <Square value={squares[1]} handleClick={() => handleClick(1)}/>
      <Square value={squares[2]} handleClick={() => handleClick(2)}/>

    </div>
    <div className='row'>
      <Square value={squares[3]} handleClick={() => handleClick(3)}/>
      <Square value={squares[4]} handleClick={() => handleClick(4)}/>
      <Square value={squares[5]} handleClick={() => handleClick(5)}/>

    </div>
    <div className='row'>
      <Square value={squares[6]} handleClick={() => handleClick(6)}/>
      <Square value={squares[7]} handleClick={() => handleClick(7)}/>
      <Square value={squares[8]} handleClick={() => handleClick(8)}/>
    </div>
    {gameFlag && <button id='try-again' onClick={() => window.location.reload(false)}>Try Again</button>}
    </>
  )
}

const Square = (props) => {
  return <button style={{ fontSize : "40px" , color : props.value === 'X' ? 'green' : 'red'}} className='square' onClick={props.handleClick}>{props.value}</button>
}

export default App;
