define(['ash'], function(Ash){

	var Collision = Ash.Class.extend({
		constructor: function(type, collidesWith){
			this.type = type;
			this.collidesWith = collidesWith;
		}
	});

	return Collision;
});