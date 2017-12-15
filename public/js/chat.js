var socket = io();

function scrollToBottom () {
    //selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}


socket.on('connect', function () {
    console.log('Connected to the server');
});
socket.on('disconnect', function () {
    console.log('Disconnected from the server');
});

socket.on('newMessage', function(msg) {
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var template = $("#message-template").html();
    var html = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        createdAt: formattedTime
    });
    $("#messages").append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $("#location-message-template").html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    $("#messages").append(html);
    scrollToBottom();
});

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