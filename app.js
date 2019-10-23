const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

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
const authRoutes = require('./routes/auth');



//parse first before routes
app.use(bodyParser.urlencoded({extended: false}));// added a middleware to parse the request body
//serve static files to the file system as read-only
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5db0727b9fc4e910b893696e')
        .then(
            user => {
                req.user = user;
                next();
            }
        )
        .catch(err => console.log(err));
});
//routes
app.use('/admin', adminRoutes);

//default route
app.use(shopRoutes);

app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect(
    'mongodb+srv://mark:ultrapassword@cluster0-oehn6.mongodb.net/shop?retryWrites=true&w=majority'
    )
.then(result => {
    User.findOne().then(user => {
        if (!user) {
            const user = new User({
                name: 'Mark',
                email: 'mark@email.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    });
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});