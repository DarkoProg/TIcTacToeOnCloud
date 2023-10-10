import React from "react";
import { useState, useEffect, useCallback } from 'react';
import './styles/TicTacToe.css';
import O from './assets/O.png'
import X from './assets/X.png'
import { socket } from "./Socket";

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
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [board, setBoard] = useState(Array(9).fill(null));
    const [text, setText] = useState("current player:");
    const [myTurn, setMyTurn] = useState(false);

    const handleClick = (fieldNum) => {
        var changeField = board.slice();
        if (board[fieldNum] || checkWin()) {
            return;
        }
        socket.emit('move', { move: fieldNum, player: sign[player] });


    }

    useEffect(() => {
        socket.on('changePlayer', (data) => {
            setPlayer(1);
            setMyTurn(1);

            console.log(player);

        });

        socket.on('boardUpdate', (data) => {
            //console.log(data);
            setBoard(data);
            //console.log("bruh: ", myTurn);
            if (myTurn === "true") { setMyTurn("false") }
            else { setMyTurn("true") }
            setCurrentPlayer(currentPlayer);
            setMyTurn(1);
            //myTurn ? setMyTurn(true) : setMyTurn(false);
            //console.log(myTurn);
        });

        socket.on('currentPlayer', (data) => {
            setCurrentPlayer(data);
            setMyTurn(1);
        })

    }, [player, currentPlayer, board, myTurn, socket])


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
        if (checkWin()) {
            setText("winner: ");
            setCurrentPlayer((player + 1) % 2);
        }
        else {
            setText("current player: ");
        }
    }, [board])

    return (

        <div className="game">
            <div className="am">
                <p>you are: <img className="player" src={sign[player]} /></p>
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
                <div className="playerBox">
                    <p>{text}</p> <img className="player" src={sign[currentPlayer]} />
                </div>
            </div>

            <button className="leave" onClick={reset}>leave lobby</button>
        </div>
    )
}

