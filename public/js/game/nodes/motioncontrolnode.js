define([
	'ash', 
	'components/motioncontrol', 
	'components/motion',
	'components/position'
	], 
function(
	Ash,
	MotionControl,
	Motion,
	Position){	

	var MotionControlNode = Ash.Node.extend({
				
		control: null,
		motion: null,
		position: null,	

		types: {			
			control:MotionControl,
			motion:Motion,
			position:Position
		},

		constructor: function( control, motion, position ){			
			this.motion = control;
			this.motion = motion;
			this.position = position;
		},
	});

	return MotionControlNode;
});