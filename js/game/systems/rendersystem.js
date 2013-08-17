define(
	['ash',
	 'nodes/rendernode'
	],
function(Ash, RenderNode)
{
	var RenderSystem = Ash.System.extend({

		stage: null,
		nodes: null,

		constructor: function(stage){			
			this.stage = stage;			
			return this;
		},

		addToEngine: function(engine){			
			this.nodes = engine.getNodeList(RenderNode);

			for(var node = this.nodes.head; node; node = node.next){
				this.addToDisplay(node);
			}

			this.nodes.nodeAdded.add(this.addToDisplay, this);
			this.nodes.nodeRemoved.add(this.removeFromDisplay, this);
		},		

		addToDisplay: function(node)
		{						
			this.stage.addChild(node.display.graphic);			
		},

		update: function(time){
			for( var node = this.nodes.head; node; node = node.next ){
				node.display.graphic.x = node.position.position.x;
				node.display.graphic.y = node.position.position.y;
				node.display.graphic.rotation = node.position.rotation;
				node.display.graphic.alpha = node.position.alpha;
			}
			this.stage.update();
		},

		removeFromDisplay: function(node){
			this.stage.removeChild(node.display.graphic);
		},

		removeFromEngine: function(engine)
		{
			console.log("RenderSystem removed from Engine");
			this.stage = null;
		}
	});

	return RenderSystem;
});