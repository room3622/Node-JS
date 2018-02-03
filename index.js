var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var logger  = require('winston');

var port = 4000;



logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, { colorize: true, timestamp: true });
logger.info('SocketIO > listening on port ' + port);



var com = io.of('/com');

com.on('connection', function (socket) {
    socket.on('broadcast', function (msg) {

        // Send message to sender
        //socket.emit("Chat.message",msg);

        // Send message to everyone on customNS INCLUDING sender
        com.emit("Chat.message",msg);
});
});






http.listen(port);


