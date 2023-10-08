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
    players.push({ socket: socket, player: players.length, myTurn: false });

    if (players.length === 2) {
        console.log(socket)
        gameStart = true;
        current = Math.floor(Math.random() * 2);
        players[current].myTurn = true
        console.log(players);

        io.sockets.emit('start', true);

        setTimeout(() => {
        io.to(players[current].socket.id).emit('changePlayer');
        }, 1000);
        setTimeout(() => {
            io.sockets.emit('currentPlayer', players[current].player);
        }, 1000);
        //io.sockets.emit('currentPlayer', current)
        //console.log(players[current].socket.id);

    }

    socket.on('move', (data) => {
        for (var i = 0; i < players.length; i++) {
            if (socket === players[i].socket && players[i].myTurn) {
                board[data.move] = data.player;
                players[i].myTurn = false;
                io.sockets.emit('boardUpdate', board);
                io.sockets.emit('currentPlayer', i % 2);
            }
            else if (players[i].socket !== socket && !players[i].myTurn) {
                players[i].myTurn = true;
            }
        }

        //io.emit('updateTurn')
    })
});

server.listen(5000, () => {
    console.log('server running at http://localhost:5000');
});