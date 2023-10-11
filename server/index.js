const express = require('express');
const { createServer } = require('node:http');
const { disconnect } = require('node:process');
const { Server } = require('socket.io');


let players = [];
let board = Array(9).fill(null);
let current;

const app = express();
const server = createServer(app);
const PORT=process.env.PORT || 8080;

const io = new Server(server, {
    cors: {
        origin: ["https://tictactoeoncloud-o5ucqy4g4q-ew.a.run.app/"],
        methods: ["GET", "POST"], 
    }
    
});

app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })
})

//io.set('transports', [ 'websocket' ]);

io.on('connection', (socket) => {
    players.push({ socket: socket, player: players.length, myTurn: false });

    if (players.length === 2) {
        //console.log(socket)
        gameStart = true;
        current = Math.floor(Math.random() * 2);
        players[current].myTurn = true
        //console.log(players);

        io.sockets.emit('start', true);

        setTimeout(() => {
        io.to(players[current].socket.id).emit('changePlayer');
        }, 1000);
        setTimeout(() => {
            io.sockets.emit('currentPlayer', players[current].player);
        }, 1000);
    }

    socket.on('move', (data) => {
        for (var i = 0; i < players.length; i++) {
            if (socket === players[i].socket && players[i].myTurn) {
                board[data.move] = data.player;
                players[i].myTurn = false;
                io.sockets.emit('boardUpdate', board);
                io.sockets.emit('currentPlayer', i);
            }
            else if (players[i].socket !== socket && !players[i].myTurn) {
                players[i].myTurn = true;
            }
        }
    })

    socket.on('disconnect', (socket) => {
        var playerLength = players.length
        for(var i = playerLength -1 ; i >= 0; i--) {
            var deletedPlayer = players.pop();
            if(deletedPlayer.socket !== socket)
            {
                deletedPlayer.socket.disconnect();
            }
        }
        board = Array(9).fill(null);
    })
});

server.listen(PORT, () => {
    console.log('server running at http://localhost:', PORT);
});