const express            = require('express');
const path               = require('path');
const favicon            = require('serve-favicon');
const logger             = require('morgan');
const cookieParser       = require('cookie-parser');
const bodyParser         = require('body-parser');
const expressLayouts     = require('express-ejs-layouts');
const mongoose           = require('mongoose');
const passport           = require('passport');
const session            = require('express-session');
const MongoStore         = require('connect-mongo')(session);
const LocalStrategy      = require('passport-local').Strategy;
const bcrypt             = require('bcrypt');

const User               = require('./models/user');

const index = require('./routes/index');
const authRoutes = require('./routes/authentication.js');

mongoose.connect('mongodb://localhost/ironlulu');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');
app.use(expressLayouts);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




//Passport Strategy for signup
app.use(session({
  secret: 'ironluludev',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}));

// NEW
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// Signing Up
passport.use('local-signup', new LocalStrategy(
  { passReqToCallback: true },
  (req, username, password, next) => {
    console.log("DEBUG local-signup ")
    console.log("DEBUG req", req)
    console.log("DEBUG username", username)
    console.log("DEBUG password", password)
    // To avoid race conditions
    process.nextTick(() => {
      User.findOne({
        'username': username
      }, (err, user) => {
        if (err) { return next(err); }

        if (user) {
          return next(null, false);
        } else {
          // Destructure the body
          const { username, email, description, password, firstname, lastname } = req.body;
          const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
          const newUser = new User({
            username,
            email,
            description,
            firstname,
            lastname,
            password: hashPass
          });

          newUser.save((err) => {
            if (err) { next(err); }
            else 
              return next(null, newUser);
          });
        }
      });
    });
  })
);
  // NEW

app.use(passport.initialize());
app.use(passport.session());




//Passport Strategy for log in
passport.use('local-login', new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));





//Initializing a Session, and Passport
app.use(session({
  secret: 'ironluludev',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))

app.use(passport.initialize());
app.use(passport.session());


app.use( (req, res, next) => {
  if (typeof(req.user) !== "undefined"){
    res.locals.userSignedIn = true;
  } else {
    res.locals.userSignedIn = false;
  }
  next();
});


app.use('/', index);
app.use('/', authRoutes);





// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
