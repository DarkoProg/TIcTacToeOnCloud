import './styles/TicTacToe.css';
import { useState } from 'react';

import Board from './Board'

const TikTacToe = () => {

  return (
    <div className="TikTakToe">
        <Board/>
    </div>
    
  );
}
 
export default TikTacToe;