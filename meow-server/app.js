const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const messageRouter = require('./routes/messages');
const authRouter = require('./routes/auth').router;
const usersRouter = require('./routes/users').router;
const messages2Router = require('./routes/messages-v2');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/messages', messageRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/messages-v2', messages2Router);

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
  res.send('error');
});



module.exports = app;
