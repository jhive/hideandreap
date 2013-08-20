define(['ash', 'nodes/gamenode','nodes/playernode', 'jquery'],
function(Ash, GameNode, PlayerNode, $){

	var GameManager = Ash.System.extend({

		creator:null,
		players:null,
		games:null,
		playerDeathCooldown:null,


		constructor: function(creator){			
			this.creator = creator;
		},

		addToEngine: function(engine){			
			this.games = engine.getNodeList(GameNode);
			this.players = engine.getNodeList(PlayerNode);
			var self = this;
			this.players.nodeRemoved.add(function(node){				
				self.playerDeathCooldown = node.player.deathcooldown;				
			})
		},		

		update: function(time){			
			var player = this.players.head;			
			if(!player){								
				this.playerDeathCooldown -= time;
				if(this.playerDeathCooldown <= 0){
					this.creator.createPlayer();	
				}				
			}

			$('#score').html("Score: " + this.games.head.game.score);
		},

		removeFromEngine: function(engine)
		{

		}

	});

	return GameManager;
})