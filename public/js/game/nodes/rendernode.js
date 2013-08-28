define(
['ash', 'components/display', 'components/position'],
function(Ash, Display, Position){

	var RenderNode = Ash.Node.create({		
		display: Display,
		position:Position
	});

	return RenderNode;

});