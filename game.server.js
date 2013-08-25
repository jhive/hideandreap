var UUID = require('node-uuid'),
	Game = require('./game.state.js').Game,
	GameState = require('./game.state.js').GameState,
	PlayerState = require('./game.state.js').PlayerState;
var Server = function(){

	var _games = {};
		_game_count = 0;
		self = this;


	var _createGame = function(player){
		var game = new Game(player);					
		_games[game.id] = game;
		_game_count++;						
	};

	var _findGame = function(player){
		player.send('Searching for room');
		
		if(_game_count == 0){
			player.send("Creating new room");
			_createGame(player);	
		}
		else{

			player.send('Connecting to a room')
			
			var joined_game = false;

			for(var id in _games){				
				if(!_games.hasOwnProperty(id)) continue;

				var game = _games[id];
				if(game.player_count < 2){
					
					
					game.client = player;
					game.addPlayer(player)

					joined_game = true;

					_startGame(game);
				}
			}
			
			if(!joined_game){
				player.send("Creating new room");
				_createGame(player);
			}
		}		
	};

	var _startGame = function(game){
		game.host.send("Connected!");
		game.client.send("Connected!");			
		
		game.setPlayerPosition( {id: game.host.uuid, x: 1, y: 1, rotation: 0} );
		game.setPlayerPosition({id: game.client.uuid, x: 23, y: 17, rotation: 180});

		game.host.emit('startGame', { state: game.state(game.host)} );
		game.client.emit('startGame', { state: game.state(game.client)} );	

		_listen(game.host);
		_listen(game.client);
	}

	var _endGame = function(gameid, userid){

		var game = _games[gameid];
		if(game){

			if(game.player_count > 1){
				if(userid == game.host.uuid){
					if(game.client){
						game.client.send("Player has left");
					}
				}
				else{
					if(game.host){
						game.host.send("Player has left");
					}
				}
			}

			delete _games[gameid];
			_game_count--;
		}
	}

	var _listen = function(socket){		
		var game = socket.game;
		socket.on('updatePosition', function(data){			
			game.setPlayerPosition(data);

			game.host.emit('update', game.state(game.host));
			game.client.emit('update', game.state(game.client));

			if(game.testPlayerCollision()){
				game.send("Death wins!");
			}
		})
	}

	return {		
		games: _games,
		game_count: _game_count,
		findGame: _findGame,
		endGame: _endGame
	}
}

module.exports = new Server();
