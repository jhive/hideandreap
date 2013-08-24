define(['ash'],
function(Ash){

	var Player = Ash.Class.extend({
		
		id:null,		

		constructor:function(id){
			this.id = id;			
		}
	});

	return Player;
})