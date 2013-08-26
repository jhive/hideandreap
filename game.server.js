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
			player.send("Waiting for a player");
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

		game.startNewGame();			

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
			if(!game.active) return;

			game.setPlayerPosition(data);			

			if(game.testPlayerCollision()){
				game.active = false;
				game.host.emit('roundOver', {winner:'reaper', state:game.state(game.host)});
				game.client.emit('roundOver', {winner:'reaper', state:game.state(game.client)});
				game.prepareNextRound();				
			} else if(game.testDoorCollision()){
				game.active = false
				game.host.emit('roundOver', {winner:'wizard', state:game.state(game.host)});
				game.client.emit('roundOver', {winner:'wizard', state:game.state(game.client)});
				game.prepareNextRound();
			}
			else{			
				game.host.emit('update', game.state(game.host));
				game.client.emit('update', game.state(game.client));
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
