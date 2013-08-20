define(['ash', 'components/collision', 'components/position'], 
function(Ash, Collision, Position){

	var CollisionNode = Ash.Node.extend({
		
		collision:null,
		position:null,		

		types:{
			collision:Collision,
			position:Position
		},

		constructor:function(collision, position){
			this.collision = collision;
			this.position = position;
		}
	});

	return CollisionNode;

});