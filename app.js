const http = require('http');
//nodejs use require for imports

const routes = require('./routes');

const server = http.createServer(routes);
//OR
//const server = http.createServer(routes.handler);

server.listen(3000);