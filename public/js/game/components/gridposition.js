define(['ash','brejep/point'], function(Ash, Point){

	var GridPosition = Ash.Class.extend({					
		constructor: function(x, y){
			this.position = new Point(x, y);									
		}		
	});

	return GridPosition;
});