define(['ash','brejep/point'], function(Ash, Point){

	var GridPosition = Ash.Class.extend({					
		constructor: function(x, y, speed){
			this.position = new Point(x, y);	
			this.speed = speed;								
		}		
	});

	return GridPosition;
});