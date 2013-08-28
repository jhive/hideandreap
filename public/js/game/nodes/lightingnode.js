define(
['ash', 'components/light', 'components/position'],
function(Ash, Light, Position){

	var LightingNode = Ash.Node.create({

		light: Light,
		position:Position

	});

	return LightingNode;
});