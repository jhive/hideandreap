define([
	'ash', 
	'components/motioncontrol', 
	'components/motion',
	'components/position',
	'components/gridposition'
	], 
function(
	Ash,
	MotionControl,
	Motion,
	Position,
	GridPosition){	

	var MotionControlNode = Ash.Node.extend({
				
		control: null,
		motion: null,
		position: null, 
		gridposition: null,	

		types: {			
			control:MotionControl,			
			motion:Motion,
			position:Position,
			gridposition:GridPosition
		},

		constructor: function( control, motion, position, gridposition ){			
			this.motion = control;
			this.motion = motion;
			this.position = position;
			this.gridposition = gridposition;
		},
	});

	return MotionControlNode;
});