var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// error handlers
var error404Handler = require('./middlewares/errorhandler/error404');
var devErrorHandler = require('./middlewares/errorhandler/developmentErrorHandler');
var prodErrorHandler = require('./middlewares/errorhandler/productionErrorHandler');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

var restApi = require('./routes/api');
app.use('/', restApi);

// catch 404 and forward to error handler
app.use(error404Handler);

// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development')
{
    app.use(devErrorHandler);
}

// production error handler
// no stacktraces leaked to user
app.use(prodErrorHandler);

module.exports = app;
