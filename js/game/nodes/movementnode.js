define(
['ash','components/position','components/motion'],
function(Ash, Position, Motion){

	var MotionNode = Ash.Node.extend({

		position:null,
		motion:null,

		types:{
			position: Position,
			motion: Motion
		},

		constructor:function(motion, position){
			this.motion = motion;
			this.position = position;
		}

	});

	return MotionNode;
})