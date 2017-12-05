const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

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

    socket.on('createMessage', (newMessage) => {
        console.log('New message to display: ', newMessage);
    });

    socket.emit('newMessage', {
        from: 'abc',
        text: 'hi',
        createdAt: 123
    });
});



server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
