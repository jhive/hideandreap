define([
	'ash', 	
	'components/display', 
	'components/position',	
	'components/animationframes',	
	'components/motion',
	'components/motioncontrol',

	'graphics/spriteview',
], 
function(
	Ash,	
	Display,
	Position,	
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
					new SpriteView(assets.getImage('assets/player.png'), {x:0, y:0, width:64, height:64}, {regX: 12, regY:12})
				))
				.add( new AnimationFrames([ {x:0, y: 0, width:24, height:24},
											{x:24, y: 0, width:24, height:24},
											{x:48, y: 0, width:24, height:24},
											{x:72, y: 0, width:24, height:24},
											{x:96, y: 0, width:24, height:24},
											{x:120, y: 0, width:24, height:24},
											{x:144, y: 0, width:24, height:24},											
											{x:168, y: 0, width:24, height:24}], 24, -1))
				.add( new Position(40, 40, 0, 0))
				.add( new Motion(0, 0, 0))
				.add( new MotionControl(Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN, 300))

			this.engine.addEntity(entity);
			return entity;
		}

		this.createWallTile = function(x, y){
			
			var entity = new Ash.Entity()
				.add( new Display(
					new SpriteView( this.spriteImage, { x:384, y: 104, width: 16, height: 24 })
				))
				.add( new Position(x, y));

			this.engine.addEntity(entity);
			return entity;			
		}

		this.createFloorTile = function(x, y){
			var entity = new Ash.Entity()
				.add( new Display(
						new SpriteView(
							this.spriteImage, { x: 480, y: Math.floor(Math.random(3)) * 32, width: 32, height: 32 }
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