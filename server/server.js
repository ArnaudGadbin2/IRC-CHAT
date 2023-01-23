var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var router = require('./router');

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router)


io.on('connection', (socket) => {
    var currentUser = '';

    socket.on('connect', (user) => {
        users.push(user.username);
        currentUser = user.username;

        io.emit('getUsers', {
            user: users
        })

        io.emit('getRooms', {
            rooms: rooms
        })

        socket.broadcast.emit('userJoined', {
            username: user.username
        })

    });

    socket.on('disconnect', (user) => {
        if (currentUser != '') {

            socket.broadcast.emit('userLeft', {
                username: currentUser
            })

            users = users.filter(user => user !== currentUser);

            io.emit('getUsers', {
                user: users
            })
        }
    })

    socket.on('new-message', function (message) {
        io.emit('new-message-sent', {
            messages: message
        })
    })

    socket.on('createRoom', function (room) {
        rooms.push(room.room);

        io.emit('getRooms', {
            rooms: rooms
        })
    })
});

http.listen(5000, function () {
    console.log('server listening on port 5000:');
});
