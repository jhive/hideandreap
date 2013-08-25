var UUID = require('node-uuid');

var PlayerState = function(id, x, y, rotation){
	this.id = id;	
	this.position = {
		x: x,
		y: y,
		rotation: rotation
	}	

	this.speed = 10;
	this.visionRadius = 100;
}

var GameState = function(id){	
	this.id = id;
	this.players = {};
}

var Game = function(host){
	this.id = UUID();
	this.host = host;
	this.client = null;
	this.player_count = 0;
	
	var _state = new GameState(this.id);
	
	host.hosting = true;

	this.addPlayer = function(player){					
		var state = new PlayerState(player.uuid);		
		_state.players[player.uuid] = state;		
		player.state = _state;
		player.game = this;

		this.player_count++;
		player.send(this.player_count);		
	}

	this.addPlayer(host);

	this.getPlayer = function(player){
		return _state.players[player.uuid];
	}

	this.setPlayerPosition = function(data){		
		var player = _state.players[data.id];
		if(player){			
			player.position.x = data.x;
			player.position.y = data.y;
			player.position.rotation = data.rotation;
		}
	}	

	this.testPlayerCollision = function(){
		var keys = [];
		for(var key in _state.players) keys.push(key);
		
		var playerA = _state.players[keys[0]];
		var playerB = _state.players[keys[1]];
		if( playerA.position.x == playerB.position.x &&
			playerA.position.y == playerB.position.y){

			return true;
		}
		else{
			return false;
		}
	}

	this.state = function(socket){
		var socketstate = {};

		socketstate.id = _state.id;
		socketstate.players = {	};

		for(var id in _state.players){
			if(id == socket.uuid){
				socketstate.players.me = _state.players[id];
			}
			else{
				socketstate.players.enemy = _state.players[id];
			}
		}

		return socketstate;
	}

	this.emit = function(id, callback){
		this.host.emit(id, callback);
		this.client.emit(id, callback);
	}

	this.send = function(id, callback){
		this.host.send(id, callback);
		this.client.send(id, callback);
	}
}

module.exports.Game = Game;
module.exports.GameState = GameState;
module.exports.PlayerState = PlayerState;