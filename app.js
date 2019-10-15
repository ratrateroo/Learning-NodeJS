const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

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
const shopRoutes = require('./routes/shop');

// db.execute('SELECT * FROM products')
//     .then((result) => {
//         console.log(result[0]);
//     })
//     .catch(err => {
//         console.log(err);
//     });

//parse first before routes
app.use(bodyParser.urlencoded({extended: false}));// added a middleware to parse the request body
//serve static files to the file system as read-only
app.use(express.static(path.join(__dirname, 'public')));
//routes
app.use('/admin', adminRoutes);

//default route
app.use(shopRoutes);

app.use(errorController.get404);

sequelize.sync().then(result =>{
    //console.log(result);
    app.listen(3000);
})
.catch(err => 
    {
        console.log(err);
    });

//express created the server
