var http = require('http');
var router = require('./router.js').router;

var httpServer = http.createServer(function (request, response) {
        router(request, response);
});

var port = process.env.PORT || 8000;

httpServer.listen(port);

console.log('Server running at http://localhost:' + port + '/');

var socketIOListen = require('./lib/chat_server.js').socketIOListen;

socketIOListen(httpServer);