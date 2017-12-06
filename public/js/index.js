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

socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $("#messages").append(li);
})

// socket.emit('createMessage', {
//     from: 'frank',
//     text: 'hi'
// }, function (cb) {
//     console.log('got it: ', cb);
// });

var messageTextbox = $('[name=message]');

$("#message-form").on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });      
});


var locationButton = $("#send-location");
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', true);
    locationButton.text('Please wait');
    navigator.geolocation.getCurrentPosition(function (position) {
        
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function () {
            locationButton.attr('disabled', false);
            locationButton.text('Share location');
        });
    }, function () {
        locationButton.attr('disabled', false);
        alert('Unable to fetch location');
        locationButton.text('Share location');
    });
});