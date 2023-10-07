import './styles/TicTacToe.css';
import { useState } from 'react';

import Board from './Board'

const TikTacToe = () => {

  return (
    <div className="TicTacToe">
        <Board/>
    </div>
    
  );
}
 
export default TikTacToe;