import React from "react";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './styles/TicTacToe.css';
import O from './assets/O.png'
import X from './assets/X.png'

function Field({ value, onFieldClick }) {
    return (
        <button className="field" onClick={onFieldClick}>

            <img src={value} />
        </button>
    );
}

export default function BoardLocal() {
    const history = useHistory();
    const sign = [X, O];
    const [player, setPlayer] = useState(0);
    const [board, setBoard] = useState(Array(9).fill(null));
    const [text, setText] = useState("current player:");
    


    const handleClick = (fieldNum) => {
        var changeField = board.slice();
        if (board[fieldNum] || checkWin()) {
            return;
        }
        changeField[fieldNum] = sign[player];
        setBoard(changeField);

        setPlayer((player + 1) % 2);
    }

    function checkWin() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
          ];
          for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
              return board[a];
            }
          }
          return null;
    }

    const reset = () => {
        setBoard(Array(9).fill(null))
        setPlayer(0);
        history.go("/join");
    }

    useEffect(() => {
        if(checkWin()) {
            console.log("test")
            setText("winner: ");
            setPlayer((player + 1) % 2);
        }
        else {
            setText("current player: ");
        }
    },[board])

    return (
        
        <div className="game">
            <div className="am">
                <p>{text}<img className="player" src={sign[player]} /></p>
            </div>
            <br />
            <div className="playArea">
                <div className="board">
                    <Field value={board[0]} onFieldClick={() => handleClick(0)} />
                    <Field value={board[1]} onFieldClick={() => handleClick(1)} />
                    <Field value={board[2]} onFieldClick={() => handleClick(2)} />
                    <Field value={board[3]} onFieldClick={() => handleClick(3)} />
                    <Field value={board[4]} onFieldClick={() => handleClick(4)} />
                    <Field value={board[5]} onFieldClick={() => handleClick(5)} />
                    <Field value={board[6]} onFieldClick={() => handleClick(6)} />
                    <Field value={board[7]} onFieldClick={() => handleClick(7)} />
                    <Field value={board[8]} onFieldClick={() => handleClick(8)} />
                </div>
            </div>

            <button className="leave" onClick={reset}>leave</button>
        </div>
    )
}

