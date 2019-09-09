const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
//parse first before routes
app.use(bodyParser.urlencoded({extended: false}));// added a middleware to parse the request body

//routes
app.use('/admin', adminRoutes);

//default route
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

//express created the server
app.listen(3000);