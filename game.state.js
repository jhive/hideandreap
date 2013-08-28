var UUID = require('node-uuid');

var PlayerState = function(id, x, y, rotation){
	this.id = id;	
	this.score = 0;
	this.role = "";
	this.position = {
		x: x,
		y: y,
		rotation: rotation
	}		
	this.speed = 4;
	this.visionRadius = 120;
}

var GameState = function(id){	
	this.id = id;
	this.players = {};	
	
}

var Game = function(host){
	this.lantern
	this.active = true;
	this.id = UUID();
	this.host = host;
	this.client = null;
	this.player_count = 0;	

	this.wizardSpeed = 7;
	this.reaperSpeed = 10;

	this.door = {x:6, y:5};
	this.lanterns = [
		{x:19, y:4,  radius: 0},
		{x:18, y:9, radius: 0},
		{x:18, y:14, radius: 0},
		{x:14, y:13, radius: 0},
		{x:10, y:16, radius: 0},
		{x:7, y:14, radius: 0},
		{x:6, y:8, radius: 0},
		{x:7, y:4, radius: 0},
		{x:10, y:3, radius: 0},
		{x:2, y:11, radius: 0},
		{x:12, y:6, radius: 0},
		];
	
	
	this.player_roles = ['wizard', 'reaper'];

	var _state = new GameState(this.id);
	
	host.hosting = true;

	this.addPlayer = function(player){					
		var state = new PlayerState(player.uuid);		
		_state.players[player.uuid] = state;		
		player.state = _state;
		player.game = this;

		this.player_count++;		
	}

	this.addPlayer(host);

	this.getPlayer = function(player){
		return _state.players[player.uuid];
	}

	this.startNewGame = function(){		

		var randomRole = Math.random() > 0.5 ? 0 : 1;
		this.setPlayerRole(this.host.uuid, randomRole);
		this.setPlayerRole(this.client.uuid, (randomRole + 1) % 2 )

		this.randomizeDoor();
		this.startLanterns();

		this.host.emit('startGame', { state: this.state(this.host)} );
		this.client.emit('startGame', { state: this.state(this.client)} );
	}


	this.shutAllLanterns = function(){

		for(var i = 0; i < this.lanterns.length; i++){
			this.lanterns[i].radius = 0;	
		}
	}
	var lanternInterval = null;
	this.startLanterns = function(){
		var self = this;
		lanternInterval = setInterval(function(){			
			self.randomizeLanterns();						
		}, 2000)
	}

	this.stopLanterns = function(){
		//this.shutAllLanterns();
		clearInterval(lanternInterval);
	}

	this.randomizeLanterns = function(){				
		this.shutAllLanterns();

		for(var i = 0; i < 2; i++){
			var lanternIndex = Math.floor(Math.random() * this.lanterns.length);			
			this.lanterns[lanternIndex].radius = 80;			
		}

		this.host.emit('updateLanterns', { state: this.state(this.host)} );
		this.client.emit('updateLanterns', { state: this.state(this.client)} );
	}


	this.setPlayerPosition = function(data){		
		var player = _state.players[data.id];
		if(player){			
			player.position.x = data.x;
			player.position.y = data.y;
			player.position.rotation = data.rotation;
		}
	}

	this.setPlayerSpeed = function(id, speed){		
		var player = _state.players[id];
		if(player){			
			player.speed = speed;
		}
	}		

	this.setPlayerRole = function(id, role){
		var player = _state.players[id];
		player.role = this.player_roles[role];		
		if(player.role == 'wizard'){							
			this.setPlayerPosition(this.getRandomWizardStartPosition(id));
			this.setPlayerSpeed(id, this.wizardSpeed);
		}
		else
		{
			this.setPlayerPosition( {id: id, x: 11, y: 9, rotation: 0} );
			this.setPlayerSpeed(id, this.reaperSpeed);
		}
	}

	this.testPlayerCollision = function(){
		var keys = [];
		for(var key in _state.players) keys.push(key);
		
		var playerA = _state.players[keys[0]];
		var playerB = _state.players[keys[1]];
		if( playerA.position.x == playerB.position.x &&
			playerA.position.y == playerB.position.y){
			if(playerA.role == 'reaper'){
				playerA.score++;
			}
			else{
				playerB.score++;
			}
			return true;
		}
		else{
			return false;
		}
	}

	this.testDoorCollision = function(){
		var wizard = null;
		for(var id in _state.players){
			if(_state.players[id].role == 'wizard'){
				wizard = _state.players[id];
				break;
			}
		}

		if(wizard.position.x == this.door.x && wizard.position.y == this.door.y){			
			wizard.score++;
			return true;
		}
		else{
			return false;
		}	

	}

	this.prepareNextRound = function(){
		this.stopLanterns();
		var timer = 3;
		var self = this;
		this.send("Next round in " + timer);
		var intervalID = setInterval(function(){
			if(timer > 0){
				timer--;
				self.send("Next round in " + timer);		
			}
			else{
				clearInterval(intervalID);
				self.nextRound();
			}			
		}, 1000)
	}

	this.nextRound = function(){		
		

		this.active = true;

		this.swapPlayerRoles();
		this.randomizeDoor();	
		this.startLanterns();

		this.host.emit('nextRound', { state: this.state(this.host)} );
		this.client.emit('nextRound', { state: this.state(this.client)} );		
	}

	this.swapPlayerRoles = function(){
		for(var id in _state.players){
			_state.players[id].role = _state.players[id].role == 'wizard' ? 'reaper' : 'wizard';						
			if(_state.players[id].role == 'wizard'){				
				this.setPlayerPosition(this.getRandomWizardStartPosition(id));
				this.setPlayerSpeed(id, this.wizardSpeed);
			}
			else
			{
				this.setPlayerPosition( {id: id, x: 11, y: 9, rotation: 0} );
				this.setPlayerSpeed(id, this.reaperSpeed);
			}
		}
	}

	this.getRandomWizardStartPosition = function(id){

		var positions = [
			{id: id, x: 1, y: 1, rotation: 180},
			{id: id, x: 1, y: 17, rotation: 0},
			{id: id, x: 23, y: 1, rotation: 180},
			{id: id, x: 23, y: 17, rotation: 0}
		];

		return positions[Math.floor(Math.random()*4)];

	}

	this.randomizeDoor = function(){
		var doorPositions = [
			{x:6, y:5},
			{x:19, y:5},
			{x:9, y:11},
			{x:2, y:13},
			{x:2, y:7},
			{x:13, y:1}
		];

		var randomDoorIndex = Math.floor(Math.random() * doorPositions.length);
		this.door = doorPositions[randomDoorIndex];
	}

	this.state = function(socket){
		var socketstate = {};

		socketstate.id = _state.id;
		socketstate.players = {	};
		socketstate.door = this.door;
		socketstate.lanterns = this.lanterns;

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

	this.send = function(message){
		this.host.send(message);
		this.client.send(message);
	}
}

module.exports.Game = Game;
module.exports.GameState = GameState;
module.exports.PlayerState = PlayerState;