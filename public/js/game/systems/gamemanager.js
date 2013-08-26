define(['ash', 'nodes/gamenode','nodes/playernode', 'jquery'],
function(Ash, GameNode, PlayerNode, $){

	var GameManager = Ash.System.extend({		

		constructor: function(creator){			
			this.creator = creator;
		},

		addToEngine: function(engine){			

		},		

		update: function(time){			

		},

		removeFromEngine: function(engine)
		{

		}

	});

	return GameManager;
})