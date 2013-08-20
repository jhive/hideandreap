define([
	'ash', 	
	'components/display', 
	'components/position',	
	'components/gridposition',
	'components/collision',
	'components/animationframes',	
	'components/motion',
	'components/motioncontrol',

	'graphics/spriteview',
], 
function(
	Ash,	
	Display,
	Position,	
	GridPosition,
	Collision,
	AnimationFrames,
	Motion,
	MotionControl,

	SpriteView
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

		this.createReaper = function(){			
			var entity = new Ash.Entity()
				.add( new Display(
					new SpriteView(assets.getImage('assets/player.png'), {x:0, y:0, width:64, height:64}, {regX: 20, regY:20})
				))
				.add( new AnimationFrames([ {x:0, y: 0, width:40, height:40},
											{x:40, y: 0, width:40, height:40},
											{x:80, y: 0, width:40, height:40},
											{x:120, y: 0, width:40, height:40},
											{x:160, y: 0, width:40, height:40},
											{x:200, y: 0, width:40, height:40},
											{x:240, y: 0, width:40, height:40},											
											{x:280, y: 0, width:40, height:40}], 24, -1))
				.add( new Position(0, 0, 0, 12))
				.add( new GridPosition(1, 1))
				.add( new Collision('reaper', ['tile']))
				.add( new Motion(0, 0, 0))
				.add( new MotionControl(Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN, 300))

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
				.add( new GridPosition(x, y))		
				.add( new Collision('tile', []) );

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