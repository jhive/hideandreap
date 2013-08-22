define(
['ash', 'components/light', 'components/position'],
function(Ash, Light, Position){

	var LightingNode = Ash.Node.extend({
		light:null,
		position:null,

		types:{
			light: Light,
			position:Position
		},

		constructor: function(light, position)
		{
			this.light = light;
			this.position = position;
		}
	});

	return LightingNode;
});