import React from "react";
import { useState, useEffect } from 'react';
import './styles/TicTacToe.css';
import O from './assets/O.png'
import X from './assets/X.png'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";
let socket = socket = socketIOClient(ENDPOINT);


function Field({ value, onFieldClick }) {
    return (
        <button className="field" onClick={onFieldClick}>

            <img src={value} />
        </button>
    );
}

export default function Board() {
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
        socket.emit("move", {move: fieldNum, player: 0})
    }

    socket.on('changePlayer', (data) => {
        setPlayer(data);
    })

    socket.on('rivalMove', (data) => {
        var changeField = board.slice();
        if (board[data.move] || checkWin()) {
            return;
        }
        changeField[data.move] = sign[data.player];
        setBoard(changeField);
    })

    function checkWin() {
        const winCondition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (var i = 0; i < winCondition.length; i++) {
            if (board[winCondition[i][0]] === board[winCondition[i][1]] && board[winCondition[i][0]] === board[winCondition[i][2]]) {
                return board[winCondition[i][0]];
            }
        }

        return null;
    }

    const reset = () => {
        setBoard(Array(9).fill(null))
        setPlayer(0);
    }

    useEffect(() => {
        if(checkWin()) {
            setText("winner: ");
            setPlayer((player + 1) % 2);
        }
        else {
            setText("current player: ");
        }
    },[board])

    return (
        
        <div className="board">
            <div className="playerBox">
            <p>{text}</p> <img className="player" src={sign[player]}/>  <button onClick={reset}>reset</button><br/><br/>
            </div>
            <div className="column">
                <Field value={board[0]} onFieldClick={() => handleClick(0)} />
                <Field value={board[1]} onFieldClick={() => handleClick(1)} />
                <Field value={board[2]} onFieldClick={() => handleClick(2)} />
            </div>
            <div className="column">
                <Field value={board[3]} onFieldClick={() => handleClick(3)} />
                <Field value={board[4]} onFieldClick={() => handleClick(4)} />
                <Field value={board[5]} onFieldClick={() => handleClick(5)} />
            </div>
            <div className="column">
                <Field value={board[6]} onFieldClick={() => handleClick(6)} />
                <Field value={board[7]} onFieldClick={() => handleClick(7)} />
                <Field value={board[8]} onFieldClick={() => handleClick(8)} />
            </div>
        </div>
    )
}
