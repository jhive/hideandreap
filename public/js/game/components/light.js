define(['ash'], function(Ash){

	var Light = Ash.Class.extend({		
		constructor: function(radius, imageData){
			this.radius = radius;
			this.imageData = imageData;			
		}
	});

	return Light;
});