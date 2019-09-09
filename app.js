const http = require('http');
//nodejs use require for imports

const express = require('express');

//const routes = require('./routes');

const app = express();
//app is a function that will handle the requests
const server = http.createServer(app);
//OR
//const server = http.createServer(routes.handler);

server.listen(3000);