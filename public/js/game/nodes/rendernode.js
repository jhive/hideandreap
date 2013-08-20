define(
['ash', 'components/display', 'components/position'],
function(Ash, Display, Position){

	var RenderNode = Ash.Node.extend({
		display:null,
		position:null,

		types:{
			display: Display,
			position:Position
		},

		constructor: function(display, position)
		{
			this.display = display;
			this.position = position;
		}
	});

	return RenderNode;

});