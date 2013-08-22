define([
	'ash',
	'easeljs', 
	'settings',
	'game/entitycreator', 	
	'game/mapparser',
	'systems/rendersystem',		
	'systems/spriteanimationsystem',	
	'systems/movementsystem',
	'systems/motioncontrolsystem',
	'systems/gridseeksystem',	
	'systems/lightingsystem',
	'components/position',
	'brejep/keypoll'
	], 
function
(
	Ash, 
	EaselJS, 
	Settings,
	EntityCreator,	
	MapParser,	
	RenderSystem,		
	SpriteAnimationSystem,		
	MovementSystem,
	MotionControlSystem,
	GridSeekSystem,	
	LightingSystem,
	Position,
	KeyPoll
){	
	
	var Game = Ash.Class.extend({
		
		stage:null,		
		engine:null,
		creator:null,		
		keyPoll:null,
		mapParser:null,
		tiles:null,

		constructor: function(assetLoader, mapData){			
			this.stage = new createjs.Stage("demoCanvas");			

			this.width = this.stage.width;
			this.height =  this.stage.height;

			this.engine = new Ash.Engine();			
			this.creator = new EntityCreator( this.engine, assetLoader );	
			this.keyPoll = new KeyPoll();		
			this.mapParser = new MapParser(this.creator, mapData);
			tiles = this.mapParser.parse();

			this.engine.addSystem( new MotionControlSystem( this.keyPoll, tiles ), 0);
			this.engine.addSystem( new GridSeekSystem(), 0);
			this.engine.addSystem( new MovementSystem(), 1);			
			this.engine.addSystem( new SpriteAnimationSystem(this.creator), 3 );			
			this.engine.addSystem( new RenderSystem(this.stage), 3 );
			//this.engine.addSystem( new LightingSystem(this.creator, this.stage), 3);
		},

		start: function()
		{									
			/** Setup your game here **/
			
			
			var reaper = this.creator.createReaper();
			this.creator.createVisionField(reaper.get(Position), Settings.reaperVisionRadius)
			this.creator.createVisionField(new Position(300, 300), 50);
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
