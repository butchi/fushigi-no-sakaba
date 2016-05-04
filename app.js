var express = require('express');
var http = require('http');
var sockets = require('socket.io');
var path = require('path');

var app = express();
var server = http.createServer(app);
var io = sockets.listen(server);

var _ = require('lodash');
var shortid = require('shortid');
var Puid = require('puid');
var cookie = require('cookie');
var bodyParser = require('body-parser');

var cookiePuid = new Puid();
var hiddenKeyPuid = new Puid();

const cookieKeyName = 'sakabacookieid';

var userLi = {};

var hiddenKeyLi = {};

function addHiddenKey(id) {
  let hiddenKey = hiddenKeyPuid.generate();

  hiddenKeyLi[hiddenKey] = id;

  return hiddenKey;
}

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
app.use(bodyParser());

// ユーザーIDを10名分発行
_(10).times(() => {
  userLi[shortid.generate()] = {
    generated_at: (new Date()).getTime(),
    cookie_id: cookiePuid.generate(),
  };
});

// ユーザーID確認
console.log(userLi);

app.get('/user/:id', (req, res) => {
  var cookieId;

  let userId = req.params.id;
  let user = userLi[userId];
  if(user) {
    try {
      cookieId = cookie.parse(req.headers.cookie)[cookieKeyName];
    } catch(e) {
    }

    if(cookieId) {
      if(cookieId === user.cookie_id) {
        console.log('render: register / update');
        res.render('register', {
          hidden_key: addHiddenKey(userId),
          profile: user.profile,
        });
      } else {
        if(user.profile) {
          console.log('render: profile');
          res.render('profile', {
            profile: user.profile,
          });
        } else {
          res.render('404');
        }
      }
    } else {
      if(user.profile) {
        console.log('render: profile');
        res.render('profile', {
          profile: user.profile,
        });
      } else {
        let serialized_cookie = cookie.serialize(cookieKeyName, user.cookie_id, {
          maxAge : 60 * 60 * 24 * 7, //有効期間を1週間に設定
          path: '/',
        });

        res.setHeader("Set-Cookie", [
          serialized_cookie
        ]);

        console.log('current cookie: ', req.headers.cookie);

        console.log('render: register / new');
        res.render('register', {
          hidden_key: addHiddenKey(userId),
        });
      }
    }
  } else {
    res.render('404');
  }
});

app.get('/delete/:id', (req, res) => {
  var cookieId;

  let userId = req.params.id;
  let user = userLi[userId];
  if(user) {
    try {
      cookieId = cookie.parse(req.headers.cookie)[cookieKeyName];
    } catch(e) {
    }

    if(cookieId && cookieId === user.cookie_id) {
      console.log('delete user');

      delete user.profile;

      res.clearCookie(cookieKeyName);

      console.log('current users: ', userLi);
    } else {
      res.render('404');
    }
  } else {
    res.render('404');
  }
});

app.get('/check', (req, res) => {
  try {
    var cookieId = cookie.parse(req.headers.cookie)[cookieKeyName];
    res.end('現在のキー: ' + cookieId);
  } catch(e) {
    res.end('キーがありません');
  }
});

app.get('/clear', (req, res) => {
  console.log('clear key');

  res.clearCookie(cookieKeyName);
  res.end('キーを削除しました');
});

app.post('/api/update', (req, res) => {
  var userId = hiddenKeyLi[req.body['hidden-key']];

  console.log('user id: ', userId);

  userLi[userId].profile = {
    "screen-name": req.body['screen-name'],
    "facebook-url": req.body['facebook-url'],
    "screen-name": req.body['screen-name'],
    "message": req.body['message'],
  }

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('success');
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
