const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
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

app.use((req, res, next) => {
    User.findByPk(1)
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

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize
//.sync({force: true}) // for overwriting table
.sync()
.then(result =>{
    return User.findByPk(1);
    //console.log(result);
})
.then(user => {
    if (!user) {
        return User.create({ name: 'Mark', email: 'test@test.com'});
    }
    return Promise.resolve(user); //promise must return promise for correct chaining
})
.then(user => {
    //console.log(user);
    app.listen(3000);
})
.catch(err => 
    {
        console.log(err);
    });

//express created the server
