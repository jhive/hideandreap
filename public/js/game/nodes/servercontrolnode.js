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

	var ServerControlNode = Ash.Node.create({
						
		player: Player,
		control:ServerControl,			
		motion:Motion,
		position:Position,
		gridposition:GridPosition		
	});

	return ServerControlNode;
});