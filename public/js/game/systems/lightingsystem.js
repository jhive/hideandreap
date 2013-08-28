define(
	['ash',
	 'easeljs',
	 'nodes/lightingnode',
	 'components/display',
	 'settings'
	],
function(Ash, EaselJS, LightingNode, Display, Settings)
{
	var LightingSystem = Ash.System.extend({

		stage:null,
		darkness:null, 
		mask: null,		
		nodes: null,

		constructor: function(creator, stage){						
			this.mask = new createjs.Shape();						
			this.stage = stage;

			this.stage.addChild(this.mask);			

			return this;			
		},

		addToEngine: function(engine){			
			this.nodes = engine.getNodeList(LightingNode);
		},	

		addToMask: function(node){
			
		},
		
		update: function(time){
			this.mask.graphics.clear();
			this.mask.graphics.beginFill("rgba(0,0,0, 1)");
			this.mask.graphics.rect(0, 0, Settings.stage.width, Settings.stage.height + 5); 			
			this.mask.cache(0, 0, Settings.stage.width, Settings.stage.height);

			for( var node = this.nodes.head; node; node = node.next ){												
				var position = node.position.position;
				var radius = node.light.radius;
				var diameter = (node.light.radius) * 2;
				
				var destX = Math.floor(position.x - radius);
				var destY = Math.floor(position.y - radius);
				
				var lightImageData = node.light.imageData;		
				if(!lightImageData) continue;									
				var source = lightImageData.getContext("2d").getImageData(0, 0, diameter, diameter).data;				
				var destinationImageData = this.mask.cacheCanvas.getContext("2d").getImageData(destX, destY, diameter, diameter);
				var destination = destinationImageData.data;
				
				for(var i = 0; i < destination.length; i += 4){														
					destination[i + 3] = destination[i+3] - ((source[i] + source[i+1] + source[i+2]) / 3);					
				}

				this.mask.cacheCanvas.getContext("2d").putImageData(destinationImageData, position.x - radius, position.y - radius);				

			}				
		},

		removeFromMask: function(node){
			
		},

		removeFromEngine: function(engine)
		{			
			this.stage = null;
		}
	});

	return LightingSystem;
});