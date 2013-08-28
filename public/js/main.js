require(['jquery', 'game', 'game/assetloader', 'brejep/fillsnfixes'], function($, Game, AssetLoader, Fixes){	

	function Main()
	{

		this.init = function(assets)
		{															
			Fixes.initialise();
			
			$.getJSON("/assets/map.json",function(result){
				var game = new Game(assets, result);
				//game.start();			
			});			        
		}	
	}	

	// Load the assets before starting the game
	var assets = new AssetLoader().load(['assets/tiles.png', 'assets/player.png', 'assets/reaper.png', 'assets/lock_yellow.png', 'assets/key_yellow.png'], new Main().init);			
});