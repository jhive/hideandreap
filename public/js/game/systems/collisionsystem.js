define([
	'ash', 
	'nodes/gamenode',
	'nodes/playercollisionnode', 
	'nodes/enemycollisionnode', 
	'nodes/bulletcollisionnode'], 
function( 
	Ash, 
	GameNode,
	PlayerCollisionNode, 
	EnemyCollisionNode, 
	BulletCollisionNode ){

	var CollisionSystem = Ash.System.extend({

		creator:null,
		games:null,
		players:null,
		enemies:null,
		bullets:null,		

		constructor: function(creator){
			this.creator = creator;
		},

		addToEngine: function(engine){
			this.games = engine.getNodeList(GameNode);
			this.enemies = engine.getNodeList(EnemyCollisionNode);
			this.bullets = engine.getNodeList(BulletCollisionNode);
			this.players = engine.getNodeList(PlayerCollisionNode);
		},

		update: function(time){
			for( var bullet = this.bullets.head; bullet; bullet = bullet.next){
				for(var enemy = this.enemies.head; enemy; enemy = enemy.next){
					var radius = bullet.position.collisionRadius + enemy.position.collisionRadius;										
					if(bullet.position.position.distanceTo(enemy.position.position) < radius){
						enemy.enemy.health--;
						this.creator.killEntity(bullet.entity);
						enemy.position.alpha = 0;
						if(enemy.enemy.health <= 0){					
							this.creator.killEntity(enemy.entity);
							this.creator.createExplosion( enemy.position );							
							this.games.head.game.score += 50;							
						}
					}	
				}
			}

			for( var player = this.players.head; player; player = player.next){
				for(var enemy = this.enemies.head; enemy; enemy = enemy.next){
					var radius = player.position.collisionRadius + enemy.position.collisionRadius;
					if(player.position.position.distanceTo(enemy.position.position) < radius){
						this.creator.killEntity(player.entity);
						this.creator.killEntity(enemy.entity);

						this.creator.createExplosion(enemy.position);
						this.creator.createPlayerExplosion(player.position);
					}
				}
			}

		},		

		removeFromEngine: function(engine){
			enemies = null;
			bullets = null;
		}

	});

	return CollisionSystem;

})