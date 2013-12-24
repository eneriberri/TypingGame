var http = require('http');
var router = require('./router.js').router;

var httpServer = http.createServer(function (request, response) {
  router(request, response);
}).listen(8080);

console.log('Server running on port 8080');

var socketIOListen = require('./lib/chat_server.js').socketIOListen;

socketIOListen(httpServer);