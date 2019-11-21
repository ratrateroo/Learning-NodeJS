const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session =  require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://mark:ultrapassword@cluster0-oehn6.mongodb.net/shop?retryWrites=true&w=majority';

//const MONGODB_URI = 'mongodb://localhost/offlinedatabase';
 
const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    let dateobj = new Date();
    //cb(null, dateobj.toISOString() + '-' + file.originalname);
    //cb(null, new Date().toISOString() + '-' + file.originalname);
    //cb(null, file.filename + '-' + file.originalname);
    cb(null, Date.now().toString() + '-' + file.originalname);
  }
});
  
const fileFilter = (req, file, cb) => {
  if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      console.log('error here');
    }
};

// const fileFilter = function (req, file, cb) {
//   // accept image only
//   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//       return cb(new Error('Only image files are allowed!'), false);
//   }
//   cb(null, true);
// };
  


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');



//parse first before routes
app.use(bodyParser.urlencoded({extended: false}));// added a middleware to parse the request body
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

//serve static files to the file system as read-only
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    // throw new Error('Sync Dummy');
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        if (!user) {
            return next();
        }
        req.user = user;
        next();
      })
      .catch(err => {
        next(new Error(err));
      });
  });
  


//routes
app.use('/admin', adminRoutes);

//default route
app.use(shopRoutes);

app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
    // res.status(error.httpStatusCode).render(...);
    // res.redirect('/500');
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
    
});

mongoose
.connect(
    MONGODB_URI
    )
.then(result => {
    
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});