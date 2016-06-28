const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug')('server:app');

const indexRoutes = require('./routes/index');
const scrapRoutes = require('./routes/scrap');
const dataRoutes = require('./routes/data');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);
app.use('/scrap', scrapRoutes);
app.use('/data', dataRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    debug('Client error', err);
    res.status(err.status || 500).send(err.message || 'Something failed!');
  } else {
    next(err);
  }
});


if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    debug('Error', err);

    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res) {
  debug('Error', err);

  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
