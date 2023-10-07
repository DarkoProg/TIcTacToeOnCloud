import { useState } from "react";
import { auth } from "./Firebase";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

const JoinGame = () => {
    const [rival, setRival] = useState("");
    const [channel, setChannel] = useState(null)
    let socket;

    const createChannel = async () => {
        socket = socketIOClient(ENDPOINT);

        socket.emit('connect_user', {})
    }

    return ( 
        <div className="JoinGame">
            <button className="join" onClick={createChannel}></button>
        </div>    
     );
}
 
export default JoinGame;