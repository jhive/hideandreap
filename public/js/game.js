define([
	'ash',
	'easeljs', 
	'game/entitycreator', 	
	'game/mapparser',
	'systems/rendersystem',		
	'systems/spriteanimationsystem',	
	'systems/movementsystem',
	'systems/motioncontrolsystem',
	'brejep/keypoll'
	], 
function
(
	Ash, 
	EaselJS, 
	EntityCreator,	
	MapParser,	
	RenderSystem,		
	SpriteAnimationSystem,		
	MovementSystem,
	MotionControlSystem,
	KeyPoll
){	
	
	var Game = Ash.Class.extend({
		
		stage:null,		
		engine:null,
		creator:null,		
		keyPoll:null,
		mapParser:null,

		constructor: function(assetLoader, mapData){			
			stage = new createjs.Stage("demoCanvas");			

			this.width = stage.width;
			this.height =  stage.height;

			this.engine = new Ash.Engine();			
			this.creator = new EntityCreator( this.engine, assetLoader );	
			this.keyPoll = new KeyPoll();		
			this.mapParser = new MapParser(this.creator, mapData);

			this.engine.addSystem( new MotionControlSystem( this.keyPoll ), 0)
			this.engine.addSystem( new MovementSystem(1))
			this.engine.addSystem( new SpriteAnimationSystem(this.creator), 3 );
			this.engine.addSystem( new RenderSystem(stage), 3 );
		},

		start: function()
		{									
			/** Setup your game here **/
			
			this.mapParser.parse();
			this.creator.createReaper();

			/** End game setup       **/

            createjs.Ticker.addEventListener("tick", this.handleTick.bind(this));
			createjs.Ticker.setFPS(60);	
		},

		handleTick: function(event)
		{						
			this.engine.update(event.delta / 1000);			
		}
	});	
	return Game;
})
