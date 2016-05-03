var express = require('express');
var http = require('http');
var sockets = require('socket.io');
var path = require('path');

var app = express();
var server = http.createServer(app);
var io = sockets.listen(server);

var testObj = {
  name: '栗八 太郎',
  url: 'http://cr6ad7.net',
};

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// app.locals.basedir = app.get('views');　// Jade内で絶対パスで呼べない？
app.locals.pretty = true;
// app.use(express.favicon(path.join(__dirname, 'public/favicon.ico')));
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', (req, res) => {
  res.render('test', {
    profile: testObj,
  });
});

// app.configure('development', function(){
//   app.use(express.errorHandler());
// });

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});