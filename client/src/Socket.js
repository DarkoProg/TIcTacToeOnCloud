import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'https://tictactoeoncloud-o5ucqy4g4q-ew.a.run.app'; //change to https://tictactoeoncloud-o5ucqy4g4q-ew.a.run.app/:5000

export const socket = io(URL, {
    autoConnect: false,
    transports: ["websocket"] 
});