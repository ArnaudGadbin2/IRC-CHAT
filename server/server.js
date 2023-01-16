var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var users = [];

var rooms = ['general'];

io.on('connection', (socket, messages) => {
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

    socket.on('new-message', function(message) {
        io.emit('new-message', {
            messages: message
        })
    })

    socket.on('createRoom', function(room) {
        rooms.push(room.room);

        io.emit('getRooms', {
            rooms: rooms
        })
    })
});

http.listen(5000, function(){
    console.log('server listening on port 5000:');
});
