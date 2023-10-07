import { useState, useEffect } from "react";
import { auth } from "./Firebase";
import socketIOClient from "socket.io-client";
import Board from "./Board";
import { socket } from "./Socket";

const JoinGame = () => {
    //const [rival, setRival] = useState("");
    //const [channel, setChannel] = useState(null);
    const [game, setGame] = useState(false);

    const createChannel = async () => {
        socket.connect();
    }



    useEffect(() => {
        socket.on('start', (data) => {
            setGame(data);
        })
    }, [])

    return ( 
        <div className="JoinGame">
            {
                !game ? (
                <button className="join" onClick={createChannel}>Connect</button>
                ) : (
                 <Board/>
                 )
            }     
        </div>    
     );
}
 
export default JoinGame;