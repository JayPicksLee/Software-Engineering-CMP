var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var crypto = require('crypto');

var index= require('./routes/index');
var main = require('./routes/main');
var map = require('./routes/map');
var register = require('./routes/register');
var mainAdmin = require('./routes/mainAdmin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const secretSession = crypto.randomBytes(32).toString('hex');

app.use(session({
  secret: secretSession,
  resave: false,
  saveUninitialized: false


}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login', index);
app.use('/main', main);
app.use('/map', map);
app.use('/register', register);
app.use('/submit', main);
app.use('/mainAdmin', mainAdmin)
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
