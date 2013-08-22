define(['ash'], function(Ash){

	var Light = Ash.Class.extend({
		constructor: function(radius){
			this.radius = radius;
		}
	});

	return Light;
});