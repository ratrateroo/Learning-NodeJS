
//const http = require('http'); //replaced with express features
//nodejs use require for imports

const express = require('express');

//const routes = require('./routes');

const app = express();
//app is a function that will handle the requests
//use() allow using middleware
//use() receives a function with req, res, next arguments
app.use((req, res, next) => {
    console.log("In the middleware!");
    next(); 
    //next() allows the request to continue 
    //to the next middleware in line
});

app.use((req, res, next) => {
    console.log("In another middleware!");
    res.send('<h1>Hello from express</h1>');
});


//const server = http.createServer(app);
//OR
//const server = http.createServer(routes.handler);

//server.listen(3000);


//express created the server
app.listen(3000);