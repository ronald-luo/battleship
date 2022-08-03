var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// socket setup
const httpServer = require("http").createServer(app);
const options = { /* ... */ };
const io = require("socket.io")(httpServer, options);
const { handleJoin, handleAttack, updateMain, handleGameOver } = require('./sockets')(io);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

io.on('connection', (socket) => {
  socket.on('join_room', handleJoin);
  socket.on('attack', handleAttack);
  socket.on('game_over', handleGameOver);
  socket.on('update_main', updateMain);
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

httpServer.listen(3080, () => {
  console.log('listening on port 3080')
});

module.exports = app;
