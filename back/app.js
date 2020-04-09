const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
// acces data send in body
const bodyParser = require('body-parser');

// Used to handle users
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./user');

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Welcome to the socket server'));

// app.listen in express but socket io
// instance of http
const server = http.Server(app);
server.listen(3000, () => {
    console.log("socket.io is listening on port 3000");
});


// capture instance of socketIo
const io = socketIo(server);

botName = 'Socket Bot'

// when client connects to the server
io.on('connection', socket => {
    console.log('new  connection');

    // Room joining 
    socket.on('joinRoom', ({ username, room }) => {
        // push new user in users array in user.js file socket.id = user id
        const user = userJoin(socket.id, username, room);
        console.log('bäkkäri logataan user:', user)
        // Direct user to the room he chose
        socket.join(user.room);

        // Welcome current user
        socket.emit('message', { message: 'Welcome the chat', user: botName });

        // braodcast when a user connects. broadcast/emit to everybody in the room except to the user who is connected
        // to(user.room) Broadcasts to specific room
        socket.broadcast.to(user.room).emit('message', { message: `${user.username} has joined the chosen room`, user: botName });

    });




    // Listen for user sent chat message
    socket.on('chatMessageSend', msg => {
        // get current user by id
        const currentUser = getCurrentUser(socket.id);

        console.log('täs on käyttäjä:', currentUser);
        console.log('täs sen nimi:', currentUser.username);

        message = { message: msg, user: currentUser.username };
        // sends message to chosen room
        io.to(currentUser.room).emit('message', message);
        console.log(message);
    });





    // When client disconnects
    socket.on('disconnect', () => {
        console.log('joku disconnectas');
        const disconnectedUser = userLeave(socket.id);
        console.log('täs lähteny user:', disconnectedUser);
        console.log('disc username: ', disconnectedUser[0].username);
        if (disconnectedUser) {
            io.to(disconnectedUser[0].room).emit('message', { message: `${disconnectedUser[0].username} has left the chat`, user: botName });
        }
    });


});



// single client
// socket.emit();
// everybody except you
// socket.broadcast.emit();
// for everybody
// io.emit();




