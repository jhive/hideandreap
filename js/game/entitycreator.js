define([
	'ash', 	
	'components/display', 
	'components/position',	
	'components/animationframes',	

	'graphics/spriteview',
], 
function(
	Ash,	
	Display,
	Position,	
	AnimationFrames,

	SpriteView
	)
{
	var EntityCreator = function(engine, assets)
	{
		this.engine = engine;
		this.assets = assets;		

		//The following is a sample creation function
		this.spriteImage = assets.getImage('assets/1945.png');

		this.createSample = function()
		{
			var assets = this.assets;
			
			var entity = new Ash.Entity()				
				.add( new Display(
					new SpriteView(
						this.spriteImage, null, {regX:65/2, regY:65/2})
					))

				.add( new AnimationFrames([ {x:301, y: 103, width:65, height:65},
											{x:301, y: 169, width:65, height:65},
											{x:301, y: 235, width:65, height:65}], 24, -1))
				.add( new Position(100, 350, 0, 32));

			this.engine.addEntity(entity);
			return entity;
		}

		this.killEntity = function(entity){
			this.engine.removeEntity(entity);
		}
	}
	
	return EntityCreator;
});