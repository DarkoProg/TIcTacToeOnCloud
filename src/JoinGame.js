import { useState } from "react";
import { auth } from "./Firebase";
import { useChatContext } from "stream-chat-react";

const JoinGame = () => {
    const [rival, setRival] = useState("");
    const { client } = useChatContext();
    const [channel, setChannel] = useState(null)

    const createChannel = async () => {
        const response = await client.queryUsers({ name: {$eq: rival}});

        if (response.users.length === 0) {
            alert("User not found");
            return 
        }

        const newChannel = await client.channel("messaging", {
            members: [client.userID, response.users[0].id],
        });

        await newChannel.watch();
        setChannel(newChannel);
    }

    return ( 
        <div className="JoinGame">

        </div>    
     );
}
 
export default JoinGame;