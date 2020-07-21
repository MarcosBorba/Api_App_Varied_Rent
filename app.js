var express = require('express');
var logger = require('morgan');
require('./config/connection_database.js');
require('path');
const { handleError, ErrorHandler } = require('./controllers/errorHandler')

require('jsonwebtoken');
//FIXME: tratar todos erros para retornar statusCode 500 e error Internal Server, caso der crash em alguma parte da aplicacao e nao parar o back e front end
var app = express();

app.use(logger('combined')); //or 'dev'
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//IMPORT ROUTES
var usersRouter = require('./routes/userRoute');
var evaRouter = require('./routes/evaluationRoute');

//ROUTES
app.use('/userRoute', usersRouter);
app.use('/evaluationRoute', evaRouter);

app.use(function(err, req, res, next) {
    handleError(err, res);
});

module.exports = app;