define(
['ash','components/position','components/motion', 'components/gridposition'],
function(Ash, Position, Motion, GridPosition){

	var GridSeekNode = Ash.Node.create({
		position: Position,
		motion: Motion,
		gridposition: GridPosition
	
	});

	return GridSeekNode;
})