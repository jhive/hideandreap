require(['jquery', 'game', 'game/assetloader'], function($, Game, AssetLoader){	

	function Main()
	{
		var CANVAS_WIDTH = 640,
			CANVAS_HEIGHT = 640;

		this.init = function(assets)
		{									
			var game = new Game(assets);			
			game.start();			
		}	
	}	

	// Load the assets before starting the game
	var assets = new AssetLoader().load(['assets/spritesheet.png', 'assets/player.png'], new Main().init);	

	//If you want to start the game without loading assets use this instead:
	// new Main().init();
});