define(['ash', 'jquery'], function(Ash,  $){
	
	var Socket = Ash.Class.extend({
		self:null,
		socket:null,		
		uuid:null,
		state: {},
		settings: null,		
		game:null,

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
				$('#banner>p').html(message)
			});

			this.socket.on('startGame', function(data){								
				self.state = data.state;
				self.game.start(data.state);				

				self.updateHUD(data);
			});

			this.socket.on('update', function(state){		
				console.log(state.players.me.position.x, state.players.me.position.y);						
				self.state.players.me.position.x = state.players.me.position.x;
				self.state.players.me.position.y = state.players.me.position.y;
				self.state.players.me.position.rotation = state.players.me.position.rotation;				

				self.state.players.enemy.position.x = state.players.enemy.position.x;
				self.state.players.enemy.position.y = state.players.enemy.position.y;
				self.state.players.enemy.position.rotation = state.players.enemy.position.rotation;														
			});

			this.socket.on('roundOver', function(data){
				self.updateHUD(data);
				/*
				if(data.winner == 'reaper'){
					$('#flashbanner>h1').text("The Reaper wins!");				
				}
				else{
					$('#flashbanner>h1').text("The Wizard wins!");					
				}
				$('#flashbanner').fadeIn();
				$('#flashbanner').fadeOut();
				*/
			})	

			this.socket.on('nextRound', function(data){				
				console.log(data);
				self.updateHUD(data);
				self.game.setupNewRound(data.state);
			})	
		},
		updateHUD: function(data){
			console.log(data);
			if(data.state.players.me.role == 'reaper'){
				$('#info>h2').text("You are the Reaper")
				$('#info>p').text("Find the Wizard before he escapes!")
			}
			else{
				$('#info>h2').text("You are the Wizard")
				$('#info>p').text("Find the exit before the Reaper finds you!")
			}

			$('#score>#me>h2').text(data.state.players.me.score);
			$('#score>#enemy>h2').text(data.state.players.enemy.score);
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
