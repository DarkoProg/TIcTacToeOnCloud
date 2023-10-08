/* import express from 'express';
import cors from 'cors'
import { Server } from 'socket.io';


const app=express();
//app.use(cors({ credentials: true}));

const PORT=process.env.PORT || 5000;

let players = [];
let gameStart = false;


const server = app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}` )
})

const socketIo = new Server(server, {
    cors: {
        origin: "http://localhost:5000"
    }});

socketIo.on('connection', (socket) => {
    console.log("use connected")

    players.push({socket: socket, player: players.length});

    if( players. length == 2) {
        gameStart = true;
        var changePlayer = Math.random() * 2;
        socket.to(players[players.length - 1].socket.id).emit('changePlayer', 1)
        socket.emit('start', true);
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
}) */
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');


let players = [];
let board = Array(9).fill(null);
let current;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })
})

io.on('connection', (socket) => {
    console.log('a user connected');

    //if (socket !== players[players.length - 1].socket) {
        players.push({ socket: socket, player: players.length });

        if (players.length === 2) {
            console.log(players)
            gameStart = true;
            current = Math.floor(Math.random() * 2);
            io.sockets.emit('start', true);
            socket.emit('changePlayer', 1);
            
            //players[current].socket.emit('changePlayer', 1);
        }

        socket.on('move', (data) => {
            for (let i = 0; i < players.length; i++) {
                if (players[i].player !== data.player) {
                    players[i].socket.emit('rivalMove', data)
                }
            }
        })
   // }
});

server.listen(5000, () => {
    console.log('server running at http://localhost:5000');
});