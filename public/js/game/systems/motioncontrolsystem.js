define(['ash', 'nodes/motioncontrolnode'], function(Ash, MotionControlNode){

	var MotionControlSystem = Ash.System.extend({

		keyPoll: null,
		nodes: null,

		constructor: function( keyPoll ){
			this.keyPoll = keyPoll;
		},

		addToEngine: function(engine){			
			this.nodes = engine.getNodeList(MotionControlNode);			
		},

		update: function(time)
		{			
			for( var node = this.nodes.head; node; node = node.next)
			{
				var control = node.control,
					position = node.position,
					motion = node.motion;					

				motion.velocityX = 0;
				motion.velocityY = 0;
				

				if(this.keyPoll.isDown(control.left)){					
					motion.velocityX = -control.speed;					
					position.rotation = -90;
				}
				else if(this.keyPoll.isDown(control.right)){
					motion.velocityX = control.speed;					
					position.rotation = 90;
				}				
				else if(this.keyPoll.isDown(control.down)){
					motion.velocityY = control.speed;
					position.rotation = 180;
				}
				else if(this.keyPoll.isDown(control.up)){
					motion.velocityY = -control.speed;
					position.rotation = 0;
				}

			}

		},

		removeFromEngine: function(engine)
		{
			this.nodes = null;
		}
	});

	return MotionControlSystem;
});