define(['ash','brejep/point'], function(Ash, Point){

	var Position = Ash.Class.extend({	
		
		alpha:1, 
		scale: 1,
		layer: 0,		

		constructor: function(x, y, rotation, collisionRadius, layer){
			this.position = new Point(x, y);
			this.rotation = rotation;
			this.collisionRadius = collisionRadius;			
			if(layer) this.layer = layer;
		}		
	});

	return Position;
});