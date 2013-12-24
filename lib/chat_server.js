var socketio = require('socket.io');


var socketIOListen = function(server){
	var io = socketio.listen(server);
	
	io.sockets.on('connection', function(socket){
		console.log("received connection from: ", socket.id);
	});
}


exports.socketIOListen = socketIOListen;