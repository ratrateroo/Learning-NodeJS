const fs = require('fs');

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    if (url ==='/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form<</body');
        res.write('<html>');
        return res.end();
    }
    
    if(url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[0];
            console.log(parsedBody);
            fs.writeFile('message.txt', message , err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
            
        });
    
    }
    
    
    
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Welcome Page</title></head>');
    res.write('<body><h1>Hello from my NodeJS Server</h1></body');
    res.write('<html>');
    res.end();

};

module.exports = requestHandler;

//OR
// module.exports = {
//     handler: requestHandler
// };
//OR
// module.exports.handler = requestHandler;
//OR
//exports.handler = requestHandler;


//**********************************************************

//from app.js

//const http = require('http'); //replaced with express features
//nodejs use require for imports

const express = require('express');
const bodyParser = require('body-parser');

//const routes = require('./routes');

const app = express();
//app is a function that will handle the requests
//use() allow using middleware
//use() receives a function with req, res, next arguments
/* app.use((req, res, next) => {
    console.log("In the middleware!");
    next(); 
    //next() allows the request to continue 
    //to the next middleware in line
}); */

//parse first before routes
app.use(bodyParser.urlencoded({extended: false}));// added a middleware to parse the request body

//routing
app.use('/add-product', (req, res, next) => {
    
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Send</button></form>');
    
});
//.post() for post request only, can only access it through /add-product POST
app.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
})
//default route
app.use('/', (req, res, next) => {
    
    res.send('<h1>Hello from express</h1>');
});


//const server = http.createServer(app);
//OR
//const server = http.createServer(routes.handler);

//server.listen(3000);


//express created the server
app.listen(3000);

