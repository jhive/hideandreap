define([
	'ash',
	'easeljs', 
	'settings',
	'socket/socket',

	'game/entitycreator', 	
	'game/mapparser',
	'systems/rendersystem',		
	'systems/spriteanimationsystem',	
	'systems/movementsystem',
	'systems/motioncontrolsystem',
	'systems/servercontrolsystem',
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
	Socket,

	EntityCreator,	
	MapParser,	
	RenderSystem,		
	SpriteAnimationSystem,		
	MovementSystem,
	MotionControlSystem,
	ServerControlSystem,
	GridSeekSystem,	
	LightingSystem,
	Position,
	KeyPoll
){	
	
	var Game = Ash.Class.extend({
		
		stage:null,		
		engine:null,
		creator:null,		
		socket:null,
		keyPoll:null,
		mapParser:null,
		tiles:null,

		player:null,
		enemy:null,
		door:null,

		constructor: function(assetLoader, mapData){			
			console.log("Build");
			this.stage = new createjs.Stage("demoCanvas");			

			this.width = this.stage.width;
			this.height =  this.stage.height;

			this.engine = new Ash.Engine();			
			this.creator = new EntityCreator( this.engine, assetLoader );	
			this.socket = new Socket(this);			

			this.keyPoll = new KeyPoll();		
			this.mapParser = new MapParser(this.creator, mapData);
				
		},


		start: function(state)
		{					
		console.log("Start")				
			/** Setup your game here **/
			this.reset();
			this.initEngines();
			this.setupNewRound(state);			
			
			/** End game setup       **/			
            createjs.Ticker.addEventListener("tick", this.handleTick.bind(this));
			createjs.Ticker.setFPS(60);	
		},

		pause: function(){
			createjs.Ticker.setFPS(0);
		},

		resume: function(){
			createjs.Ticker.setFPS(60);
		},	

		setupNewRound: function(state){
			if(this.player || this.enemy){
				this.creator.killEntity(this.player);
				this.creator.killEntity(this.enemy);
				this.creator.killEntity(this.door);
			}

			this.door = this.creator.createDoor(state.door.x, state.door.y)
			this.player = this.creator.createPlayer( state.players.me );
			this.enemy = this.creator.createPlayer( state.players.enemy, this.socket);						
		},

		initEngines: function(){

			tiles = this.mapParser.parse();
			
			this.engine.addSystem( new MotionControlSystem( this.keyPoll, tiles, this.socket ), 0);
			this.engine.addSystem( new ServerControlSystem(), 0);
			this.engine.addSystem( new GridSeekSystem(), 1);
			this.engine.addSystem( new MovementSystem(), 2);			
			this.engine.addSystem( new SpriteAnimationSystem(this.creator), 3 );						
			this.engine.addSystem( new RenderSystem(this.stage), 3 );
			this.engine.addSystem( new LightingSystem(this.creator, this.stage), 3);

			
		},

		reset:function(){
			this.engine.removeAllEntities();
			this.engine.removeAllSystems();
		},

		handleTick: function(event)
		{						
			this.engine.update(event.delta / 1000);			
		}
	});	
	return Game;
})
