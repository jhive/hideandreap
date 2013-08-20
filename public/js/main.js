require(['jquery', 'game', 'game/assetloader'], function($, Game, AssetLoader){	

	function Main()
	{

		this.init = function(assets)
		{												
			var game = new Game(assets);			
			game.start();			
			
			$.getJSON("http://localhost:3000/map.json",function(result){
				console.log(result.layers.name);
			}			
        });
		}	
	}	

	// Load the assets before starting the game
	var assets = new AssetLoader().load(['assets/mage_city.png', 'assets/player.png'], new Main().init);	
	console.log("Hi there");
	//If you want to start the game without loading assets use this instead:
	// new Main().init();
});