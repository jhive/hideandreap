define(
	['ash',
	 'easeljs',
	 'nodes/rendernode'
	],
function(Ash, EaselJS, RenderNode)
{
	var RenderSystem = Ash.System.extend({

		stage: null,
		layers: null,
		nodes: null,

		constructor: function(stage){			
			this.stage = stage;			
			this.layers = [new createjs.Container(), new createjs.Container()];
			
			for(var i = 0; i < this.layers.length; i++){
				this.stage.addChild(this.layers[i]);			
			}
					
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
			this.layers[node.position.layer].addChild(node.display.graphic);		
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
			this.layers[node.position.layer].removeChild(node.display.graphic);
		},

		removeFromEngine: function(engine)
		{
			console.log("RenderSystem removed from Engine");
			this.stage = null;
		}
	});

	return RenderSystem;
});