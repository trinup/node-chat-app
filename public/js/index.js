var socket = io();
socket.on('connect', function () {
    console.log('Connected to the server');
});
socket.on('disconnect', function () {
    console.log('Disconnected from the server');
});

socket.on('newMessage', function(msg) {
    console.log("New message posted: ", msg);
    var li = $("<li></li>");
    li.text(`${msg.from}: ${msg.text}`);
    $("#messages").append(li);
});

// socket.emit('createMessage', {
//     from: 'frank',
//     text: 'hi'
// }, function (cb) {
//     console.log('got it: ', cb);
// });

$("#message-form").on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function () {
    });      
});