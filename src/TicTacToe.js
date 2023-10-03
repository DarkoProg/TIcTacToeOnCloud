import './styles/TicTacToe.css';
import { useState } from 'react';

import Board from './Board'

const TikTacToe = () => {

  const [board, setBoard] = useState([Array(9).fill(null)]);

  return (
    <div className="TikTakToe">
        <Board board = {board} setBoard ={setBoard}/>
    </div>
    
  );
}
 
export default TikTacToe;