require(['jquery', 'game', 'game/assetloader'], function($, Game, AssetLoader){	

	function Main()
	{

		this.init = function(assets)
		{															
			
			$.getJSON("http://localhost:3000/assets/map.json",function(result){
				var game = new Game(assets, result);			
				game.start();			
			});			        
		}	
	}	

	// Load the assets before starting the game
	var assets = new AssetLoader().load(['assets/mage_city.png', 'assets/player.png', 'assets/playervision.png'], new Main().init);		
	//If you want to start the game without loading assets use this instead:
	// new Main().init();
});