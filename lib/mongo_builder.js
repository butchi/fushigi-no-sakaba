var mongo = require('mongodb');

module.exports.ready = function(db_name, callback){
  const host = '127.0.0.1';
  const dbPath = `mongodb://${host}/${db_name}`;

  mongo.connect('mongodb://heroku_jg5zskcs:phq13rovkug3cnbrgt5g76hlf4@ds023042.mlab.com:23042/heroku_jg5zskcs', {}, function(error, db){
    callback(db);
  });

  // if ( process.env.MONGOLAB_URI ){
  //   // herokuの場合の処理
  //   mongo.connect(process.env.MONGOLAB_URI, {}, function(error, db){
  //     callback(db);
  //   });
  // }else{
  //   // localの場合の処理
  //   mongo.MongoClient.connect(dbPath, function(err,db){
  //     if(err) {
  //       return console.dir(err);
  //     }
  //     console.log('local db: ', db);
  //     callback(db);
  //   });
  // }
};
