define(['ash', 'jquery'], function(Ash,  $){
	
	var Socket = Ash.Class.extend({
		self:null,
		socket:null,		
		uuid:null,
		state: {},
		settings: null,		

		constructor:function(game){
			
			this.game = game;

			var self = this;
			
			this.socket = io.connect(window.location.hostname);
			//this.socket = io.connect('http://localhost');
			this.socket.on('onconnect', function(data){				
				self.uuid = data.id;							
				self.settings = self.socket.gamesettings;
			});

			this.socket.on('message', function(message){
				console.log(message);
			})

			this.socket.on('startGame', function(data){								
				self.state = data.state;
				self.game.start(data.state);				
			});

			this.socket.on('update', function(state){					
				self.state.players.me.position.x = state.players.me.position.x;
				self.state.players.me.position.y = state.players.me.position.y;
				self.state.players.me.position.rotation = state.players.me.position.rotation;				

				self.state.players.enemy.position.x = state.players.enemy.position.x;
				self.state.players.enemy.position.y = state.players.enemy.position.y;
				self.state.players.enemy.position.rotation = state.players.enemy.position.rotation;														
			});		
		},

		handleNews:function(data){
			console.log(data);			
		},		

		emit:function(){
			this.socket.emit('my other event', {my: 'data'});
		},

		setPosition:function( x, y, rotation ){
			this.socket.emit('updatePosition', {id: this.uuid, x:x, y:y, rotation:rotation});
		},		

	});

	return Socket;
});
