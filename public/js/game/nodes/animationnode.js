define(['ash', 'components/display', 'components/animationframes'],
function(Ash, Display, AnimationFrames){

	var AnimationNode = Ash.Node.create({
		display:Display,
		frames:AnimationFrames,
		
	});

	return AnimationNode;
});