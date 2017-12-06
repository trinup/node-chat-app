const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');

// console.log(__dirname + '/../public');
const publicPath = path.join(__dirname, '..', '/public');
// console.log(publicPath);

const port = process.env.PORT || 3000;

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the chat room'));

    socket.on('createMessage', (newMessage, callback) => {
        console.log('New message to display: ', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
       callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
});



server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
