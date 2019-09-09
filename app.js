const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
//parse first before routes
app.use(bodyParser.urlencoded({extended: false}));// added a middleware to parse the request body

//routes
app.use(adminRoutes);

//default route
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found!</h1>');
});

//express created the server
app.listen(3000);