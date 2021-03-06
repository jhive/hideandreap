define(['ash', 'nodes/motioncontrolnode','brejep/point'], function(Ash, MotionControlNode, Point){

	var MotionControlSystem = Ash.System.extend({

		keyPoll: null,
		tiles:null,
		nodes: null,
		socket: null,

		constructor: function( keyPoll, tiles, socket ){
			this.keyPoll = keyPoll;
			this.tiles = tiles;
			this.socket = socket;
		},

		addToEngine: function(engine){			
			this.nodes = engine.getNodeList(MotionControlNode);	
			console.log(this.nodes);
			this.nodes.nodeAdded.add(function(){
				console.log("MotionNode added");
			})
			this.nodes.nodeRemoved.add(function(){
				console.log("MotionNode removed");
			})		
		},

		update: function(time)
		{			
			for( var node = this.nodes.head; node; node = node.next)
			{
				var control = node.control,
					position = node.position,
					gridposition = node.gridposition,
					motion = node.motion;					

				if(Math.abs(motion.velocityX) > 0 || Math.abs(motion.velocityY) > 0){					
					return;
				}				

				var targetposition = new Point(gridposition.position.x, gridposition.position.y);
				if(this.keyPoll.isDown(control.left)){			
					targetposition.x = targetposition.x - 1;
					position.rotation = -90;
				}
				else if(this.keyPoll.isDown(control.right)){			
					targetposition.x = targetposition.x + 1;
					position.rotation = 90;
				}				
				else if(this.keyPoll.isDown(control.down)){					
					targetposition.y = targetposition.y + 1;
					position.rotation = 180;
				}
				else if(this.keyPoll.isDown(control.up)){				
					targetposition.y = targetposition.y - 1;
					position.rotation = 0;
				}				

				if(this.isValidPosition(targetposition)){										
					if( gridposition.position.x != targetposition.x
						|| gridposition.position.y != targetposition.y){						
						this.socket.setPosition(targetposition.x, targetposition.y, position.rotation);	
					}

					gridposition.position.x = targetposition.x;
					gridposition.position.y = targetposition.y;			

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

	return MotionControlSystem;
});