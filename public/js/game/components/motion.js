define(['ash'], function(Ash){

	var Motion = Ash.Class.extend({
		constructor:function(velocityX, velocityY, angularVelocity){
			this.velocityX = velocityX;
			this.velocityY = velocityY;
			this.angularVelocity = angularVelocity;
		}
	});

	return Motion;
});