var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http)

app.get('/', function(req, res) {
    /* So far in index.js we’re calling res.send and pass it a HTML string. Our code would look very confusing if we just placed our entire application’s HTML there. Instead, we’re going to create a index.html file and serve it. */
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    io.emit('chat message', 'a user connected')
    
    // Then if you refresh a tab several times you can see it in action:
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
})

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log('message:' + msg)
        
    })
})
// In order to send an event to everyone, Socket.IO gives us the io.emit:
// 向用户发送广播 socket.io 给我们提供了 io.emit 方法

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', 'hehe');
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000')
})