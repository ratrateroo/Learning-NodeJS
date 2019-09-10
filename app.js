const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
//parse first before routes
app.use(bodyParser.urlencoded({extended: false}));// added a middleware to parse the request body
//serve static files to the file system as read-only
app.use(express.static(path.join(__dirname, 'public')));
//routes
app.use('/admin', adminData.routes);

//default route
app.use(shopRoutes);

app.use((req, res, next) => {
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

//express created the server
app.listen(3000);