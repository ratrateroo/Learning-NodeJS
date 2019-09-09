
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

app.use('/product', (req, res, next) => {
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