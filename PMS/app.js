var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var crypto = require('crypto');
var mongoose = require('mongoose');

var login = require('./routes/login');
var main = require('./routes/main');
var map = require('./routes/map');
var register = require('./routes/register');
var mainAdmin = require('./routes/mainAdmin');
var bookings = require('./routes/bookings');

var app = express();

mongoose.connect('mongodb://127.0.0.1/userdb')
  .then(()=> console.log('Connected to database'))
  .catch((err) => console.log('Error: ${err}'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const secretSession = crypto.randomBytes(32).toString('hex');

app.use(
  session({
    secret: secretSession,
    resave: false,
    saveUninitialized: false


}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(routes);

app.use('/', login);
app.use('/main', main);
app.use('/map', map);
app.use('/register', register);
app.use('/mainAdmin', mainAdmin)
app.use('/bookings', bookings);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
