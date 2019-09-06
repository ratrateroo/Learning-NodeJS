const http = require('http');
//nodejs use require for imports

function rqListener(req, res){
    console.log(req);
}

const server = http.createServer(rqListener);

server.listen(3000);