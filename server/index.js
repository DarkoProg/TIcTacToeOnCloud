import { express } from 'express';
import { Server } from 'socket.io';


const express=require('express');
const app=express();

const PORT=process.env.PORT || 5000;

let players = [];
let gameStart = false;


const server = app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}` )
})

const socketIo = new Server(server);

socketIo.on('connection', (socket) => {

    players.push({socket: socket, player: players.length});

    if( players. length == 2) {
        gameStart = true;
        var changePlayer = Math.random() * 2;
        socket.to(players[players.length - 1].socket.id).emit('changePlayer', 1)
    }

    socket.on('disconnect', () => {

    })

    socket.compress('move', (data) => {
        for(let i = 0; i < players.length; i++) {
            if(players[i].player != data.player) {
                socket.to(players[i].socket.id).emit('rivalMove', data);
            }
        }
    })

    socket.on('connect_user', (data) => {
        if( players.length < 2 ) {
            players.push(data);
        }
    })

})