define(['ash', 'nodes/animationnode'], function(Ash, AnimationNode){

	var SpriteAnimationSystem = Ash.System.extend({
		touchPoll:null,
		nodeList:null,
		time:null,
		frame:null,
		creator:null,

		constructor:function(creator){
			this.creator = creator;
		},

		addToEngine: function(engine){
			nodeList = engine.getNodeList(AnimationNode);
			this.time = 0;
			this.frame = 0;
		},

		update:function(time){
							
			for( var node = nodeList.head; node; node = node.next)
			{						
				node.display.graphic.sourceRect = node.frames.frames[node.frames.currentFrame];				
				node.frames.timeSinceUpdate += time;

				if(node.frames.timeSinceUpdate >= node.frames.frameRate)
				{
					node.frames.timeSinceUpdate = 0;
					node.frames.currentFrame = (++node.frames.currentFrame) % node.frames.frames.length;	

					if(node.frames.currentFrame == 0)
					{
						if(node.frames.loopCount > 0){
							node.frames.loopCount--;
						}			
						
						if(node.frames.loopCount == 0)
						{
							this.creator.killEntity(node.entity);
						}
					}
				}
			}
		},

		removeFromEngine:function(engine){
			nodeList = null;
		}

	});

	return SpriteAnimationSystem;
})