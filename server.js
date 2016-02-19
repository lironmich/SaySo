var express      = require('express');        
var app          = express();                
var bodyParser   = require('body-parser');
var path 	     = require('path');
//var favicon      = require('serve-favicon');
//var logger 	     = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var session      = require('express-session');
var passport = require('passport');
var flash    = require('connect-flash');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cookieParser()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// required for passport
app.use(session({ secret: 'betterflashcardshasnosecrets' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// var router = express.Router();  
var port = process.env.PORT || 8888;
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

require('./routes/index')(app, passport); 
//require('./routes/users')(app, passport); 
//require('./routes/api')(app, passport);
require('./routes/subapi')(app, passport);

require('./config/passport')(passport);

// Start the server
app.listen(port);
console.log('Server started on port ' + port);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

