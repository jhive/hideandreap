define([
	'ash', 
	'components/player',
	'components/servercontrol', 
	'components/motion',
	'components/position',
	'components/gridposition'
	], 
function(
	Ash,
	Player,
	ServerControl,
	Motion,
	Position,
	GridPosition){	

	var ServerControlNode = Ash.Node.extend({
				
		player: null,
		control: null,
		motion: null,
		position: null, 
		gridposition: null,	

		types: {			
			player: Player,
			control:ServerControl,			
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

	return ServerControlNode;
});