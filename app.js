const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;


// using EJS not handlebars const expressHbs = require('express-handlebars');

const app = express();

/*  app.engine('hbs', expressHbs({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layouts',
    extname: 'hbs'
})); */

//app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');



//parse first before routes
app.use(bodyParser.urlencoded({extended: false}));// added a middleware to parse the request body
//serve static files to the file system as read-only
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    // User.findByPk(1)
    // .then(
    //     user => {
    //         req.user = user;
    //         next();
    //     }
    // )
    // .catch(err => console.log(err));
    next();
});
//routes
app.use('/admin', adminRoutes);

// //default route
// app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {    
    app.listen(3000);
});