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

		darkness:null, 
		mask: null,		
		nodes: null,

		constructor: function(creator, stage){						
			this.mask = new createjs.Shape();			
			stage.addChild(this.mask);			
			return this;			
		},

		addToEngine: function(engine){			
			this.nodes = engine.getNodeList(LightingNode);
		},	

		addToMask: function(node){
			//this.mask.addChild(node.light.graphic);
		},
		
		update: function(time){
			this.mask.graphics.clear();
			this.mask.graphics.beginFill("rgba(0,0,0, 0.99)");
			this.mask.graphics.rect(0, 0, Settings.stage.width, Settings.stage.height); 			


			for( var node = this.nodes.head; node; node = node.next ){												
				this.mask.graphics.arc(node.position.position.x, node.position.position.y,node.light.radius,Math.PI*2,0,true);
			}

			for( var node = this.nodes.head; node; node = node.next ){												
				var position = node.position.position;
				this.mask.graphics.
				beginRadialGradientFill(["rgba(0,0,0, 0)","rgba(0,0,0, 1)"], [0, 1], position.x, position.y, 0, position.x, position.y, node.light.radius + 2)
				.drawCircle(position.x, position.y, node.light.radius + 2);
			}
		},

		removeFromMask: function(node){
			//this.mask.removeChild(node.light.graphic);
		},

		removeFromEngine: function(engine)
		{			
			this.stage = null;
		}
	});

	return LightingSystem;
});