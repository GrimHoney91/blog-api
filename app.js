const dotenv = require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bcryptjs = require('bcryptjs'); //implement
const passport = require('passport'); //implement 
const localStrategy = require('passport-local').Strategy; //implement
const session = require('express-session'); //implement
const helmet = require('helmet');
const compression = require('compression');

const portalRouter = require('./routes/portal-router')
const userRouter =  require('./routes/user-router');
const postRouter = require('./routes/post-router');

const app = express();

const mongoose = require('mongoose');
const MongoDB = process.env.MONGODB_URI;
mongoose.connect(MongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(compression());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/portal', portalRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);

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
