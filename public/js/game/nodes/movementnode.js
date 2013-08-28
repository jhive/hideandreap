define(
['ash','components/position','components/motion'],
function(Ash, Position, Motion){

	var MotionNode = Ash.Node.create({
		position: Position,
		motion: Motion		
	});

	return MotionNode;
})