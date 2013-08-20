define(['ash', 'nodes/movementnode'],
function(Ash, MovementNode){

	var MotionSystem = Ash.System.extend({

		nodes:null,

		constructor: function(){			
			return this;
		},

		addToEngine: function(engine){			
			this.nodes = engine.getNodeList(MovementNode);
		},		

		update: function(time){			
			for( var node = this.nodes.head; node; node = node.next ){
				node.position.position.x += node.motion.velocityX * time;
				node.position.position.y += node.motion.velocityY * time;
				node.position.rotation += node.motion.angularVelocity * time;				
			}			
		},

		removeFromEngine: function(engine)
		{

		}

	});

	return MotionSystem;
})