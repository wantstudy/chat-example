var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//客户端访问路径
app.get('/chat', function(req, res){
    // res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname+"/index.html");
});

var clientNum = 0;

//监听连接事件
io.on("connection",function (socket) {

    clientNum++;

    //获取请求ip
    var clientIp = socket.request.connection.remoteAddress.split(":")[3];
    var gitname = socket.handshake.query.gitname;

    //广播conn事件
    socket.broadcast.emit('conn',{msg:'欢迎 '+gitname+' 进入 ip:'+clientIp+' 当前人数: '+clientNum});



    //监听连接断开事件
    socket.on('disconnect', function(){
        //广播disconnect事件
        clientNum--;
        socket.broadcast.emit('disconn',{msg:gitname+' 退出聊天 ip:'+clientIp+' 当前人数: '+clientNum});
    });

    //监听自定义事件 chat message
    socket.on('chat message', function(data){
        //  socket.emit('chat message',{msg:msg});
        // 广播自定义事件
        var sendMsg = {};
        sendMsg.username = gitname;
        sendMsg.clientIp = clientIp;
        sendMsg.msg=data.msg;
        socket.broadcast.emit('chat message',sendMsg);
    });

});


//监听端口
http.listen(3001, function(){
    console.log('listening on *:3001');
});