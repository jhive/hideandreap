define([
	'ash', 
	'components/servercontrol', 
	'components/motion',
	'components/position',
	'components/gridposition'
	], 
function(
	Ash,
	ServerControl,
	Motion,
	Position,
	GridPosition){	

	var ServerControlNode = Ash.Node.extend({
				
		control: null,
		motion: null,
		position: null, 
		gridposition: null,	

		types: {			
			control:ServerControl,			
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

	return ServerControlNode;
});