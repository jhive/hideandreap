define(['ash', 'nodes/servercontrolnode','brejep/point'], function(Ash, ServerControlNode, Point){

	var ServerControlSystem = Ash.System.extend({
		
		nodes: null,		

		constructor: function( ){
			
		},

		addToEngine: function(engine){			
			this.nodes = engine.getNodeList(ServerControlNode);			
		},

		update: function(time)
		{			
			for( var node = this.nodes.head; node; node = node.next)
			{				
				var player = node.player,
					control = node.control,
					position = node.position,
					gridposition = node.gridposition,
					motion = node.motion;					

				var data = control.socket.state.players.enemy;							
								
				if( data ){					
					position.rotation = data.position.rotation;
					gridposition.position.x = data.position.x;
					gridposition.position.y = data.position.y;						
				}
			}
		},

		isValidPosition: function(position){
			//Check the tilemap array to see if the players move would collide with
			// an obstacle.
			var index = (position.y * 25) + position.x;
			return this.tiles[index] == null; 
		},

		removeFromEngine: function(engine)
		{
			this.nodes = null;
		}
	});

	return ServerControlSystem;
});