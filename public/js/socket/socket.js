define(['ash', 'jquery'], function(Ash,  $){
	
	var Socket = Ash.Class.extend({
		self:null,
		socket:null,		
		enemyState: null,
		constructor:function(){
			var self = this;
			
			this.socket = io.connect('http://localhost');
			this.socket.on('news', this.handleNews);
			
			this.socket.on('enemyPosition', function(data){
				console.log(self.enemyState);
				$("#info").html("Information: " + data.position.x + ":" + data.position.y);
				console.log(self.enemyState);
				self.enemyState.position.x = data.position.x;
				self.enemyState.position.y = data.position.y;
				self.enemyState.position.rotation = data.position.rotation;
			});

			this.enemyState = {
				position: {x:0, y:0, rotation:0}
			}			
		},

		handleNews:function(data){
			console.log(data);			
		},		

		emit:function(){
			this.socket.emit('my other event', {my: 'data'});
		},

		setPosition:function( x, y, rotation ){
			this.socket.emit('updatePosition', {x:x, y:y, rotation:rotation});
		}

	});

	return Socket;
});
