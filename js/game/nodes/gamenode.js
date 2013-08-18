define(['ash', 'components/game'], function(Ash, Game){

	var GameNode = Ash.Node.extend({
		
		game:null,		

		types:{
			game:Game
		},

		constructor:function(game){
			this.game = game;
		}
	});

	return GameNode;

});