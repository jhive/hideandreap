define(['ash', 'components/player' ], function(Ash, Player){
	
	var PlayerNode = Ash.Node.extend({

		player: null,

		types:{
			player:Player			
		},

		constructor: function(player){
			this.player = player;			
		}		
	});

	return PlayerNode;
});