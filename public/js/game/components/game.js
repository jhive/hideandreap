define(['ash'], 
function(Ash){

	var Game = Ash.Class.extend({
		
		enemySpawnTime: null,
		timeSinceLastEnemySpawn:0,
		score:0,

		constructor:function(enemySpawnTime){
			this.enemySpawnTime = enemySpawnTime;			
			this.timeSinceLastEnemySpawn = 0;
			this.score = 0;
		}
	});

	return Game;
});
