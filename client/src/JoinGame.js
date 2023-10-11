import { useState, useEffect } from "react";
import Board from "./Board";
import { socket } from "./Socket";
import BoardLocal from './BoardLocal'

const JoinGame = () => {
    //const [rival, setRival] = useState("");
    //const [channel, setChannel] = useState(null);
    const [game, setGame] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [local, setLocal] = useState(false);

    const createChannel = async () => {
        setConnecting(true)
        socket.connect();
    }

    const localStart = () => {
        setLocal(true);
    }



    useEffect(() => {
        socket.on('start', (data) => {
            setGame(data);
        })
    }, [])

    return ( 
        <div className="joinGame">
            {
                !local ?
                (!game ? 
                ( !connecting ? (<div>
                <button className="join" onClick={createChannel}>Connect</button> 
                <button className="join" onClick={localStart}>Local</button>
                </div>
                ) : (<h1>CONNECTING</h1>)
                
                ) : (
                 <Board/>
                 )) : (
                    <BoardLocal/>
                 )
            }     
        </div>    
     );
}
 
export default JoinGame;