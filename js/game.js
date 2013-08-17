define([
	'ash',
	'easeljs', 
	'game/entitycreator', 	
	'systems/rendersystem',		
	'systems/spriteanimationsystem',	
	'brejep/keypoll'
	], 
function
(
	Ash, 
	EaselJS, 
	EntityCreator,	
	RenderSystem,		
	SpriteAnimationSystem,		
	KeyPoll
){	
	
	var Game = Ash.Class.extend({
		
		stage:null,		
		engine:null,
		creator:null,		
		keyPoll:null,

		constructor: function(assetLoader){			
			stage = new createjs.Stage("demoCanvas");			

			this.width = stage.width;
			this.height =  stage.height;

			this.engine = new Ash.Engine();			
			this.creator = new EntityCreator( this.engine, assetLoader );	
			this.keyPoll = new KeyPoll();			
		},

		start: function()
		{									
			/** Setup your game here **/

			console.log("Start your engines!")
			/** End game setup       **/

            createjs.Ticker.addEventListener("tick", this.handleTick.bind(this));
			createjs.Ticker.setFPS(60);	
		},

		handleTick: function(event)
		{						
			this.engine.update(event.delta / 1000);
			console.log("Hello world");
		}
	});	
	return Game;
})
