var fs = require('fs');

exports.router = function(req, res) {
  if(req.url === "/") {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end();
  }
}