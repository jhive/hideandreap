define(['ash'], function(Ash){

	var MotionControl = Ash.Class.extend({

		constructor: function(left, right, up, down, speed){
			this.left = left;
			this.right = right;
			this.up = up;
			this.down = down;
			this.speed = speed;
		}
	});

	return MotionControl;
});