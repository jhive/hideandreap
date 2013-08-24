define([
	'ash', 
	'components/player',
	'components/motioncontrol', 
	'components/motion',
	'components/position',
	'components/gridposition'
	], 
function(
	Ash,
	Player,
	MotionControl,
	Motion,
	Position,
	GridPosition){	

	var MotionControlNode = Ash.Node.extend({
				
		player: null,
		control: null,
		motion: null,
		position: null, 
		gridposition: null,	

		types: {	
			player: Player,		
			control:MotionControl,			
			motion:Motion,
			position:Position,
			gridposition:GridPosition
		},

		constructor: function( player, control, motion, position, gridposition ){			
			this.player = player;
			this.motion = control;
			this.motion = motion;
			this.position = position;
			this.gridposition = gridposition;
		},
	});

	return MotionControlNode;
});