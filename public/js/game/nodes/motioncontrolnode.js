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

	var MotionControlNode = Ash.Node.create({						
		player: Player,		
		control:MotionControl,			
		motion:Motion,
		position:Position,
		gridposition:GridPosition		
	});

	return MotionControlNode;
});