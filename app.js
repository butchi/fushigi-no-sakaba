var express = require('express');
var http = require('http');
var sockets = require('socket.io');
var path = require('path');
var url = require('url');

var app = express();
var server = http.createServer(app);
// var io = sockets.listen(server);

var _ = require('lodash');
var shortid = require('shortid');
var Puid = require('puid');
var cookie = require('cookie');
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth-connect');

var mongo_builder = require('./lib/mongo_builder');

var cookiePuid = new Puid();
var hiddenKeyPuid = new Puid();

const host = '127.0.0.1';
const dbName = 'nodedb';
const dbPath = `mongodb://${host}/${dbName}`;

const cookieUserKeyName = 'sakabauser';
const cookiePassKeyName = 'sakabapass';

var hiddenKeyLi = {};

const dummyProfile = {
  "screen-name": 'ぶっち',
  "facebook-url": 'https://www.facebook.com/yuuki.iwabuchi.9',
  "twitter-id": 'butchi_y',
  "message": 'はじめまして！',
};

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

// ユーザーID確認
mongo_builder.ready(dbName, function(db){
  console.log('db: ', db);
  db.collection('users', (err, collection) => {
    collection.find().toArray((err, items) => {
      console.log('items: ', items);
    });
  });
});

app.all('/admin/*', basicAuth(function(user, password) {
  return user === 'username' && password === 'password';
}));

app.all('/debug/*', basicAuth(function(user, password) {
  return user === 'username' && password === 'password';
}));

app.get('/admin/panel', (req, res) => {
  res.render('admin/panel');
});

app.get('/admin/list', (req, res) => {
  mongo_builder.ready(dbName, function(db){
    db.collection('users', (err, collection) => {
      collection.find().toArray(findUserCallback);
    });
  });

  let findUserCallback = (err, items) => {
    res.end(JSON.stringify(items));
  };
});

app.post('/admin/adduser', (req, res) => {
  var users = req.body['users'];

  if(users) {
    userIdArr = JSON.parse(users);

    // ユーザーIDを発行
    mongo_builder.ready(dbName, function(db){
      var userArr = [];
      userIdArr.forEach((id) => {
        var user = {
          id: id,
          generatedAt: Date.now(),
          cookiePass: cookiePuid.generate(),
        };

        userArr.push(user);
      });

      if(!userArr) {
        res.end('追加なし');
      }

      db.collection('users', (err, collection) => {
        collection.insert(userArr, (err, result) => {
          // console.dir(result);
          res.end(`追加しました: ${JSON.stringify(result)}`);
        });
      });
    });
  }
});

app.post('/admin/updateuser', (req, res) => {
  var userId = req.body['userid'];
  var content = req.body['content'];

  try {
    var contentJson = JSON.parse(content);

    if(contentJson) {
      mongo_builder.ready(dbName, function(db){
        db.collection('users', (err, collection) => {
          collection.update({id: userId}, { $set: contentJson }, (err, result) => {
            res.end(`ユーザーを変更しました: ${JSON.stringify(result)}`);
          });
        });
      });
    }
  } catch(e) {
  }
});

app.get('/debug/index', (req, res) => {
  res.render('index', {
    userId: 'aBCd',
    profile: dummyProfile,
  });
});

app.get('/debug/profile', (req, res) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  res.render('profile', {
    kanpai: query.kanpai,
    profile: dummyProfile,
  });
});

app.get('/debug/register', (req, res) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  if(query.virgin) {
    res.render('register', {
      hiddenKey: '123',
    });
  } else {
    res.render('register', {
      hiddenKey: '123',
      profile: dummyProfile,
    });
  }
});

app.get('/', (req, res) => {
  var cookieUser;
  var cookiePass;

  try {
    cookieUser = cookie.parse(req.headers.cookie)[cookieUserKeyName];
    cookiePass = cookie.parse(req.headers.cookie)[cookiePassKeyName];
  } catch(e) {
  }

  mongo_builder.ready(dbName, function(db){
    db.collection('users', (err, collection) => {
      collection.find({id: cookieUser}).toArray(findUserCallback);
    });
  });

  let findUserCallback = (err, items) => {
    let user = items[0];

    if(user && cookiePass && cookiePass === user.cookiePass) {
      if(user.profile) {
        console.log('render: top');
        res.render('index', {
          userId: cookieUser,
          profile: user.profile,
        });
      } else {
        res.redirect(302, `/user/${cookieUser}`);
      }
    } else {
      res.render('error', {
        message: '自分のジョッキのQRコードを読み取ってプロフィールを完成させてください',
      });
    }
  };
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/user/:id', (req, res) => {
  var cookieUser;
  var cookiePass;

  let userId = req.params.id;

  try {
    cookieUser = cookie.parse(req.headers.cookie)[cookieUserKeyName];
    cookiePass = cookie.parse(req.headers.cookie)[cookiePassKeyName];
  } catch(e) {
  }

  mongo_builder.ready(dbName, function(db){
    db.collection('users', (err, collection) => {
      collection.find({id: userId}).toArray(findUserCallback);
    });
  });

  let findUserCallback = (err, items) => {
    let user = items[0];

    if(cookieUser) {
      if(user) {
        if(cookiePass === user.cookiePass) {
          // 更新画面に飛ばしているが、トップページに飛ばして更新フォームを置いた方がいいかも
          console.log('render: register / update');
          res.render('register', {
            hiddenKey: addHiddenKey(userId),
            profile: user.profile,
          });
        } else {
          if(user.profile) {
            let url_parts = url.parse(req.url, true);
            let query = url_parts.query;

            console.log('render: profile');
            res.render('profile', {
              kanpai: query.kanpai,
              profile: user.profile,
            });
          } else {
            // 複数アカウントで新規登録画面を開くとここに飛んできてしまう
            res.render('error', {
              message: 'まだ乾杯できません。プロフィールを完成してもらってください',
            });
          }
        }
      }
    } else {
      if(user) {
        if(cookiePass === user.cookiePass) {
          res.render('error', {
            message: 'まだ乾杯できません。自分のQRコードを読み取り、プロフィールを完成させてください',
          });
        } else {
          if(user.joinedAt) {
            res.render('error', {
              message: 'まだ乾杯できません。自分のQRコードを読み取り、ユーザー登録を完了させてください',
            });
          } else {
            let serializedCookieUser = cookie.serialize(cookieUserKeyName, userId, {
              maxAge : 60 * 60 * 24 * 7, //有効期間を1週間に設定
              path: '/',
            });
            let serializedCookiePass = cookie.serialize(cookiePassKeyName, user.cookiePass, {
              maxAge : 60 * 60 * 24 * 7, //有効期間を1週間に設定
              path: '/',
            });

            console.log(serializedCookieUser, serializedCookiePass);

            user.joinedAt = Date.now();

            res.setHeader("Set-Cookie", [
              serializedCookieUser,
              serializedCookiePass
            ]);

            console.log('render: register / new');
            res.render('register', {
              hiddenKey: addHiddenKey(userId),
            });
          }
        }
      } else {
        res.render('error');
      }
    }
  }

});

app.get('/delete/:id', (req, res) => {
  var cookiePass;

  let userId = req.params.id;

  mongo_builder.ready(dbName, function(db){
    db.collection('users', (err, collection) => {
      collection.find({id: userId}).toArray(findUserCallback);
    });
  });

  let findUserCallback = (err, items) => {
    let user = items[0];

    if(user) {
      try {
        cookiePass = cookie.parse(req.headers.cookie)[cookiePassKeyName];
      } catch(e) {
      }

      if(cookiePass && cookiePass === user.cookiePass) {
        console.log('delete user');

        mongo_builder.ready(dbName, function(db){
          db.collection('users', (err, collection) => {
            collection.update({id: userId}, { $set: {profile: null} }, (err, result) => {
              res.clearCookie(cookiePassKeyName);
              res.end('ユーザーを削除しました');
            });
          });
        });
      } else {
        res.render('error');
      }
    } else {
      res.render('error');
    }
  };
});

app.get('/check', (req, res) => {
  try {
    var cookieUser = cookie.parse(req.headers.cookie)[cookieUser];
    var cookiePass = cookie.parse(req.headers.cookie)[cookiePass];
    res.end(`ユーザー名: ${cookieUser}, 現在のキー: ${cookiePass}`);
  } catch(e) {
    res.end('キーがありません');
  }
});

app.get('/clear', (req, res) => {
  console.log('clear key');

  res.clearCookie(cookieUserKeyName);
  res.clearCookie(cookiePassKeyName);
  res.end('キーを削除しました');
});

app.post('/api/update', (req, res) => {
  var userId = hiddenKeyLi[req.body['hidden-key']];
  var error = {};
  var validFlag = true;

  function isValidTwitterId(str) {
    return !!str.match(/^[0-9a-z_]{1,15}$/i);
  }

  function isValidFacebookUrl(str) {
    return !!str.match(/https:\/\/.+\.facebook\.com\/+/i);
  }

  var screenName = req.body['screen-name'];
  var facebookUrl = req.body['facebook-url'];
  var twitterId = req.body['twitter-id'];
  var message = req.body['message'];

  if(screenName === '') {
    error['screen-name'] = 'この項目は必須です';
    validFlag = false;
  }
  if(facebookUrl !== '' && !isValidFacebookUrl(facebookUrl)) {
    error['facebook-url'] = '不正な値です';
    validFlag = false;
  }
  if(twitterId !== '' && !isValidTwitterId(twitterId)) {
    error['twitter-id'] = '不正な値です';
    validFlag = false;
  }
  if(message === '') {
    error['message'] = 'この項目は必須です';
    validFlag = false;
  }

  if(validFlag) {
    var profile = {
      "screen-name": screenName,
      "facebook-url": facebookUrl,
      "twitter-id": twitterId,
      "message": message,
    };

    mongo_builder.ready(dbName, function(db){
      db.collection('users', (err, collection) => {
        collection.update({id: userId}, { $set: {profile: profile} }, (err, result) => {
          // console.dir(result);
        });
      });
    });

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end('{"result": "success"}');
  } else {
    res.status(200).send({
      error: error,
    });
  }
});

// app.configure('development', function(){
//   app.use(express.errorHandler());
// });

// io.configure(function () { 
//   io.set("transports", ["xhr-polling"]); 
//   io.set("polling duration", 10); 
// });

// io.sockets.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

server.listen(app.get('port'), process.env.HOST, function(){
  console.log("Express server listening on port " + app.get('port'));
});
