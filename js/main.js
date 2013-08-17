require(['jquery', 'game', 'game/assetloader'], function($, Game, AssetLoader){	

	function Main()
	{
		var CANVAS_WIDTH = 600,
			CANVAS_HEIGHT = 800;

		this.init = function(assets)
		{									
			var game = new Game(assets);			
			game.start();			
		}	
	}	

	// Load the assets before starting the game
	var assets = new AssetLoader().load(['assets/1945.png'], new Main().init);	

	//If you want to start the game without loading assets use this instead:
	// new Main().init();
});