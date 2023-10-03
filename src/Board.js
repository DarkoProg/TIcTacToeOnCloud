import React from "react";
import { useState, useEffect } from 'react';
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

export default function Board(board) {
    const sign = [X, O];
    const [player, setPlayer] = useState(0);
    const [test, setTest] = useState(Array(9).fill(null));
    const [text, setText] = useState("current player:");
    


    const handleClick = (fieldNum) => {
        var changeField = test.slice();
        if (test[fieldNum] || checkWin()) {
            return;
        }
        changeField[fieldNum] = sign[player];
        setTest(changeField);

        setPlayer((player + 1) % 2);
    }

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
            if (test[winCondition[i][0]] === test[winCondition[i][1]] && test[winCondition[i][0]] === test[winCondition[i][2]]) {
                return test[winCondition[i][0]];
            }
        }

        return null;
    }

    const reset = () => {
        setTest(Array(9).fill(null))
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
    },[test])

    return (
        
        <div className="board">
            <div className="playerBox">
            <p>{text}</p> <img class="player" src={sign[player]}/>  <button onClick={reset}>reset</button><br/><br/>
            </div>
            <div className="column">
                <Field value={test[0]} onFieldClick={() => handleClick(0)} />
                <Field value={test[1]} onFieldClick={() => handleClick(1)} />
                <Field value={test[2]} onFieldClick={() => handleClick(2)} />
            </div>
            <div className="column">
                <Field value={test[3]} onFieldClick={() => handleClick(3)} />
                <Field value={test[4]} onFieldClick={() => handleClick(4)} />
                <Field value={test[5]} onFieldClick={() => handleClick(5)} />
            </div>
            <div className="column">
                <Field value={test[6]} onFieldClick={() => handleClick(6)} />
                <Field value={test[7]} onFieldClick={() => handleClick(7)} />
                <Field value={test[8]} onFieldClick={() => handleClick(8)} />
            </div>
        </div>
    )
}

