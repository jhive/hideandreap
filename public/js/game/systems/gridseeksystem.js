define(['ash', 'nodes/gridseeknode', 'brejep/point'],
function(Ash, GridSeekNode, Point){

	var GridSeekSystem = Ash.System.extend({

		nodes:null,

		constructor: function(){			
			return this;
		},

		addToEngine: function(engine){			
			this.nodes = engine.getNodeList(GridSeekNode);
		},		

		update: function(time){								
			for( var node = this.nodes.head; node; node = node.next ){				
				var targetposition = new Point(16 + node.gridposition.position.x * 32, 16 + node.gridposition.position.y * 32);
					
				node.motion.velocityX = (targetposition.x - node.position.position.x) * 10;					
				node.motion.velocityY = (targetposition.y - node.position.position.y) * 10;
							

				if(Math.abs(targetposition.x - node.position.position.x) < 4){
					node.position.position.x = targetposition.x;
					node.motion.velocityX = 0;
				}

				if(Math.abs(targetposition.y - node.position.position.y) < 4){
					node.position.position.y = targetposition.y;
					node.motion.velocityY = 0;
				}
			}			
		},

		removeFromEngine: function(engine)
		{

		}

	});

	return GridSeekSystem;
})