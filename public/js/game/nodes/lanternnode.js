define(
['ash', 'components/light', 'components/lantern', 'components/display'],
function(Ash, Light, Lantern, Display){

	var LanternNode = Ash.Node.create({

		light: Light,
		lantern:Lantern,
		display: Display	

	});

	return LanternNode;
});