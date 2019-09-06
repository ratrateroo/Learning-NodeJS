const http = require('http');
//nodejs use require for imports

function rqListener(req, res){
    //console.log(req.url, req.method, req.headers);

    const url = req.url;
    if (url ==='/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form<</body');
        res.write('<html>');
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Welcome Page</title></head>');
    res.write('<body><h1>Hello from my NodeJS Server</h1></body');
    res.write('<html>');
    res.end();

}

const server = http.createServer(rqListener);

server.listen(3000);