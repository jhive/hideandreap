define([
	'ash', 	
	'jquery',
	'easeljs',
	'bitmapcreator',
	'settings',

	'components/player',
	'components/display', 
	'components/position',	
	'components/gridposition',
	'components/collision',
	'components/animationframes',	
	'components/motion',
	'components/motioncontrol',
	'components/servercontrol',
	'components/light',
	'components/lantern',

	'graphics/spriteview',
	'graphics/shapeview'
], 
function(
	Ash,	
	$,	
	EaselJS,
	BitmapCreator,
	Settings,

	Player,
	Display,
	Position,	
	GridPosition,
	Collision,
	AnimationFrames,
	Motion,
	MotionControl,
	ServerControl,
	Light,
	Lantern,

	SpriteView,
	ShapeView
	)
{
	var EntityCreator = function(engine, assets)
	{		
		this.engine = engine;
		this.assets = assets;		

		//The following is a sample creation function
		this.spriteImage = assets.getImage('assets/spritesheet.png');

		this.createSample = function(){
			var assets = this.assets;
			
			var entity = new Ash.Entity()				
				.add( new Display(
					new SpriteView( this.spriteImage, null, {regX:65/2, regY:65/2})
				))

				.add( new AnimationFrames([ {x:301, y: 103, width:65, height:65},
											{x:301, y: 169, width:65, height:65},
											{x:301, y: 235, width:65, height:65}], 24, -1))
				.add( new Position(100, 350, 0, 32));

			this.engine.addEntity(entity);
			return entity;
		}
		this.createDoor = function(x, y){
			var door = new Ash.Entity()				
				.add( new Display(
					new SpriteView(
							assets.getImage('assets/lock_yellow.png', { x:0 , y:0 , width: 32, height: 32 }, {regX:16, regY:16})
						)
					) )
				.add( new Position(x * 32, y * 32) );

			this.engine.addEntity(door);
			return door;
		};


		this.createPlayer = function(data, socket){			
			var imageData = BitmapCreator.createLightImageData(data.visionRadius);			
			var player = new Ash.Entity()				
				.add( new Player(data.id))
				.add( new AnimationFrames([ {x:0, y: 0, width:40, height:40},
											{x:40, y: 0, width:40, height:40},
											{x:80, y: 0, width:40, height:40},
											{x:120, y: 0, width:40, height:40},
											{x:160, y: 0, width:40, height:40},
											{x:200, y: 0, width:40, height:40},
											{x:240, y: 0, width:40, height:40},											
											{x:280, y: 0, width:40, height:40}], 24, -1))
				.add( new Position(data.position.x * 32, data.position.y * 32, data.position.rotation, 12, 0))
				.add( new GridPosition( data.position.x, data.position.y, data.speed ) )				
				.add( new Motion(0, 0, 0));

			if(!socket){
				//Give the player control of this sprite
				console.log("Create player");
				player.add( new MotionControl(Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN, 300));
				player.add( new Light(data.visionRadius, imageData) );
			}	
			else{
				// Enemy character updated by server
				console.log("Create enemy");
				player.add( new ServerControl(socket));
			}

			if(data.role == 'wizard'){
				player.add( new Display(
					new SpriteView(assets.getImage('assets/player.png'), {x:0, y:0, width:64, height:64}, {regX: 20, regY:20})
				))
			}else{
				player.add( new Display(
					new SpriteView(assets.getImage('assets/reaper.png'), {x:0, y:0, width:64, height:64}, {regX: 20, regY:20})
				))		
			}

			this.engine.addEntity(player);

			return player;
		}

		this.createVisionField = function(position, radius){			

			var imageData = BitmapCreator.createLightImageData(radius);

			var entity = new Ash.Entity()				
				.add( new Light(radius, imageData) )
				.add( position );

			this.engine.addEntity(entity);
			return entity;
		}

		this.createTile = function(file, frame, x, y){				
			var sprites = this.assets.getImage("assets/" + file);			
			var entity = new Ash.Entity()
				.add( new Display(
					new SpriteView( sprites, frame, {regX:frame.width/2, regY:frame.height/2} )
				))
				.add( new Position(16 + x * 32, 16 + y * 32, 0, 0))	
				.add( new GridPosition(x, y));				

			this.engine.addEntity(entity);
			return entity;			
		}		

		this.createLantern = function(id, x, y){
			var sprites = this.assets.getImage("assets/tiles.png");			
			var frame = {x:2*32, y:1*32, width: 32, height: 32};
			var entity = new Ash.Entity()
				.add( new Display(
					new SpriteView( sprites, frame, {regX:16, regY:16} )
				))
				.add( new Position(16 + x * 32, 16 + y * 32, 0))
				.add( new Light(0))
				.add( new Lantern(id, 0));

			this.engine.addEntity(entity);
			return entity;			
		}

		this.createDarkness = function(){

			var darkness = new ShapeView();			
 			darkness.graphics.beginFill("rgba(0,0,0, 0.6)").drawRect(0, 0, Settings.stage.width, Settings.stage.height); 			

 			var position = new Position(0,0);
 			position.layer = 1;

			var entity = new Ash.Entity()
				.add( new Display( darkness ))
				.add( position );

			this.engine.addEntity(entity);
			return entity;
		}

		this.createFloorTile = function(x, y){
			var entity = new Ash.Entity()
				.add( new Display(
						new SpriteView(
							this.spriteImage, { x: 480, y: Math.floor(Math.random(3)) * 32, width: 32, height: 32 }, {regX:16, regY:16}
						)
					))
				.add( new Position(x, y));

			this.engine.addEntity(entity);
			return entity;
		}

		this.killEntity = function(entity){
			this.engine.removeEntity(entity);
		}
	}
	
	return EntityCreator;
});