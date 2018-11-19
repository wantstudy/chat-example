var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//
app.get('/', function(req, res){

    // res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname+"/index.html");
});

io.on("connection",function (socket) {
    console.log('new connect');

    socket.on('disconnect', function(){
        console.log('a user disconnect');
    });

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
      //  socket.emit('chat message',{msg:msg});
        socket.broadcast.emit('chat message',{msg:msg});
    });



    socket.on("test",function (msg) {
        console.log(msg);
    })

});





http.listen(3001, function(){
    console.log('listening on *:3001');
});