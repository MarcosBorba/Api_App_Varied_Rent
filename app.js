require('dotenv').config()
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
app.use(express.urlencoded({ extended: true }));

//IMPORT ROUTES
var usersRouter = require('./routes/userRoute');
var adsRouter = require('./routes/adsRoute');
var evaluationRouter = require('./routes/evaluationRoute');
var questionAndAnswerRouter = require('./routes/questionAndAnswerRoute');

//ROUTES
app.use('/userRoute', usersRouter);
app.use('/adRoute', adsRouter);
app.use('/evaluationRoute', evaluationRouter);
app.use('/questionAndAnswerRoute', questionAndAnswerRouter);

app.use(function(err, req, res, next) {
    handleError(err, res);
});

module.exports = app;