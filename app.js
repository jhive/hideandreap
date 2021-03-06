
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , UUID = require('node-uuid')
  , gameserver = require('./game.server.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app)
	io = require('socket.io').listen(server);

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {
  socket.uuid = UUID();
  
  socket.emit('onconnect', {id:socket.uuid});
  
  gameserver.findGame(socket);

  socket.on('my other event', function (data) {
    console.log(data)
  });

  socket.on('disconnect', function (){ 
    if(socket.game && socket.game.id) {      
      gameserver.endGame(socket.game.id, socket.userid);
    }
});
  
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));  
});
