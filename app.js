'use strict';
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// error handlers
const error404Handler = require('./middlewares/errorhandler/error404');
const devErrorHandler = require('./middlewares/errorhandler/developmentErrorHandler');
const prodErrorHandler = require('./middlewares/errorhandler/productionErrorHandler');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

const restApi = require('./routes/api');
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
