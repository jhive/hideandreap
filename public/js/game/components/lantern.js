define(['ash'],
function(Ash){

	var Player = Ash.Class.extend({		
		id:null,				

		constructor:function(id, radius){
			this.id = id;			
			this.radius = radius;
		}
	});

	return Player;
})