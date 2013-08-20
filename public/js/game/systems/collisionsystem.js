define([
	'ash',
	'nodes/collisionnode'
	], 
function( 
	Ash,
	CollisionNode
	){

	var CollisionSystem = Ash.System.extend({

		nodes:null,
		collidables:null,	

		constructor: function(){			
			this.collidables = {};
		},

		addToEngine: function(engine){
			this.nodes = engine.getNodeList(CollisionNode);

			for(var node = this.nodes.head; node; node = node.next){
				this.sortNodeIntoCollidablesDictionary(node);
			}

			this.nodes.nodeAdded.add(this.sortNodeIntoCollidablesDictionary, this);
			this.nodes.nodeRemoved.add(this.removeNodeFromCollidablesDictionary, this);
		},

		sortNodeIntoCollidablesDictionary: function(node){

			var array = this.collidables[node.collision.type] || [];			
			if(array.length == 0) this.collidables[node.collision.type] = array;
			array.push(node);
		},

		removeNodeFromCollidablesDictionary: function(node){

		},

		update: function(time){
			var reapers = this.collidables['reaper'];
			var tiles = this.collidables['tile'];

			for(var i = 0; i < reapers.length; i++){
				var reaper = reapers[i];
				for(var j = 0; j < tiles.length; j++){
					var tile = tiles[j];
					var radius = reaper.position.collisionRadius + tile.position.collisionRadius;
					if(reaper.position.position.distanceTo(tile.position.position) < radius){
						
					}
				}
			}			
		},		

		getCollisionID: function(nodeA, nodeB){
			
		},

		removeFromEngine: function(engine){
			
		}

	});

	return CollisionSystem;

})