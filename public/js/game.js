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
	'systems/lanternsystem',

	'components/position',
	'components/motioncontrol',
	'components/servercontrol',


	'brejep/keypoll',
	'brejep/tickprovider'
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
	LanternSystem,

	Position,
	MotionControl,
	ServerControl,

	KeyPoll,
	TickProvider
){	
	
	var Game = Ash.Class.extend({		
		stage:null,		
		engine:null,
		tickProvider:null,
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

			this.tickProvider = new TickProvider();
				
		},


		start: function(state)
		{					
		console.log("Start")				
			/** Setup your game here **/
			this.reset();
			this.initEngines();
			this.setupNewRound(state);							
			
			console.log(state);
			for(var i = 0; i < state.lanterns.length; i++){
				var lantern = state.lanterns[i];
				this.creator.createLantern(i, lantern.x, lantern.y)
			}

			/** End game setup       **/			
            this.tickProvider.add(this.engine.update, this.engine);
            this.tickProvider.start();
		},

		pause: function(){
			createjs.Ticker.setFPS(0);
		},

		resume: function(){
			createjs.Ticker.setFPS(60);
		},	

		setupNewRound: function(state){
			$('#flashbanner').css({display:'none'});
			if(this.player || this.enemy){
				this.creator.killEntity(this.player);
				this.creator.killEntity(this.enemy);			
			}

			if(this.door){
				this.creator.killEntity(this.door);
			}

			if(state.players.me.role == 'wizard'){
				this.door = this.creator.createDoor(state.door.x, state.door.y)
			}

			this.player = this.creator.createPlayer( state.players.me );
			this.enemy = this.creator.createPlayer( state.players.enemy, this.socket);										

			if(state.players.me.role == 'wizard'){				
				$("#hud>.portrait").removeClass('wizard repear').addClass('wizard');
				$('#flashbanner').css({display:'block'});
				$("#flashbanner>.portrait").removeClass('wizard reaper').addClass('wizard');
				$("#flashbanner>.portrait>h2").text("You are the wizard");				
				$("#flashbanner>.portrait>h1").text("Escape!")				
			}
			else{				
				$("#hud>.portrait").removeClass('wizard repear').addClass('reaper');
				$('#flashbanner').css({display:'block'});				
				$("#flashbanner>.portrait").removeClass('wizard reaper').addClass('reaper');
				$("#flashbanner>.portrait>h2").text("You are the reaper");
				$("#flashbanner>.portrait>h1").text("Find the Wizard!")	
			}

			$('#flashbanner').delay(1500).fadeOut(400);
		},

		endRound: function(data){			
			this.player.remove(MotionControl);			
			this.enemy.remove(ServerControl);		
			console.log(data);	

			if(this.player || this.enemy){
				this.creator.killEntity(this.player);
				this.creator.killEntity(this.enemy);			

				this.player = null;
				this.enemy = null;
			}
			
			if(data.winner == 'wizard'){
				if(this.door) this.creator.killEntity(this.door);				
				$('#flashbanner').css({display:'block'});
				$("#flashbanner>.portrait").removeClass('wizard reaper').addClass('wizard');
				$("#flashbanner>.portrait>h2").text("The Wizard Escaped!");				
			}
			else{
				if(this.door) this.creator.killEntity(this.door);				
				$('#flashbanner').css({display:'block'});
				$("#flashbanner>.portrait").removeClass('wizard reaper').addClass('reaper');
				$("#flashbanner>.portrait>h2").text("Soul Reaped!");
				
			}

			if(data.state.players.me.role == data.winner){
				$('#flashbanner>.portrait>h1').text("You win!");
			}
			else{
				$('#flashbanner>.portrait>h1').text("You lose...");
			}

			$('#flashbanner').delay(2000).fadeOut(400);
		},

		initEngines: function(){

			tiles = this.mapParser.parse();
			
			this.engine.addSystem( new MotionControlSystem( this.keyPoll, tiles, this.socket ), 0);
			this.engine.addSystem( new ServerControlSystem(), 0);
			this.engine.addSystem( new LanternSystem(this.socket), 0);
			this.engine.addSystem( new GridSeekSystem(), 1);
			this.engine.addSystem( new MovementSystem(), 2);			
			this.engine.addSystem( new SpriteAnimationSystem(this.creator), 3 );						
			this.engine.addSystem( new RenderSystem(this.stage), 3 );
			this.engine.addSystem( new LightingSystem(this.creator, this.stage), 3);			
		},

		reset:function(){
			this.engine.removeAllEntities();
			this.engine.removeAllSystems();
		}
	});	
	return Game;
})
