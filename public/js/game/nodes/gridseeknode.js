define(
['ash','components/position','components/motion', 'components/gridposition'],
function(Ash, Position, Motion, GridPosition){

	var GridSeekNode = Ash.Node.extend({

		position:null,
		gridposition:null,
		motion:null,


		types:{
			position: Position,
			motion: Motion,
			gridposition: GridPosition
		},

		constructor:function(motion, position, gridposition){
			this.motion = motion;
			this.position = position;
			this.tileposition = gridposition;
		}

	});

	return GridSeekNode;
})