define(['ash', 'components/display', 'components/animationframes'],
function(Ash, Display, AnimationFrames){

	var AnimationNode = Ash.Node.extend({
		display:null,
		frames:null,

		types:{
			display:Display,
			frames:AnimationFrames,
		},

		constructor: function(display, frames)
		{
			this.display = display;
			this.frames = frames;
		}

	});

	return AnimationNode;
});