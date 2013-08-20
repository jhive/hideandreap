define(['ash'],
function(Ash){

	var Player = Ash.Class.extend({
		
		id:null,
		deathcooldown:null,

		constructor:function(deathcooldown){
			this.id = "Player";
			this.deathcooldown = deathcooldown;
		}
	});

	return Player;
})