const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const Moniker = require('moniker');

// acces data send in body
const bodyParser = require('body-parser');

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



// when client connects to the server
io.on('connection', socket => {
    console.log('new  connection');


    // Welcome current user
    socket.emit('ServerMessage', 'welcome to chat');


    // Listen for user sent chat message
    socket.on('chatMessageSend', msg => {
        message= {message: msg, user: 'backend'};
        // sends message to everybody
        io.emit('message', message);
    })



    // braodcast when a user connects. broadcast/emit to everybody except to the user who is connected
    socket.broadcast.emit('ServerMessage', ' A user has joined the chat');


    // When client disconnects
    socket.on('disconnect', () => {
        io.emit('ServerMessage', 'A user has left the chat');
    })


});



// single client
// socket.emit();
// everybody except you
// socket.broadcast.emit();
// for everybody
// io.emit();
















// const initialWidth = 20;
// const currentWidth = initialWidth;
// const winWidth = 150;
// const users = [];


// const addUser = function () {
//     const user = {
//         name: Moniker.choose(),
//         clicks: 0
//     }
//     console.log(user);
//     users.push(user);
//     return user;
// }

// const removeUser = function(user) {

//     io.sockets.emit("users", {users: user});
// }

// const updateWidth = function() {
//     io.sockets.emit("update", { currentWidth: currentWidth });
// }


// // connection event which fires every time when a new user visits the game
// io.sockets.on('connection', function (socket) {
//     // console.log('tääl ollaa');
//     const user = addUser();
//     updateWidth();
//     socket.emit("welcome", user);
//     // when the user close the browser/tab
//     socket.on('disconnect', function () {
//         removeUser(user);
//     });
//     socket.on("click", function () {
//         currentWidth += 1;
//         user.clicks += 1;
//         if (currentWidth == winWidth) {
//             currentWidth = initialWidth;
//             io.sockets.emit("win", { message: "" + user.name + " rocks!" });
//         }
//         updateWidth();
//     });
// });
