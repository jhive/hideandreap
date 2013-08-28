define(['ash', 'nodes/lanternnode', 'bitmapcreator'],
function(Ash, LanternNode, BitmapCreator){

	var LanternSystem = Ash.System.extend({

		nodes:null,
		socket:null,

		constructor: function(socket){			
			this.socket = socket;
			return this;
		},

		addToEngine: function(engine){			
			this.nodes = engine.getNodeList(LanternNode);
			this.nodes.nodeAdded.add(this.updateLanternImageData);
			for(var node = this.nodes.head; node; node = node.next){
				this.updateLanternImageData(node);
			}
		},		

		updateLanternImageData: function(node){
			if(node.lantern.radius == 0){
				node.light.imageData = null;
				node.display.graphic.sourceRect = {x:32*2, y:32*1, width:32, height:32};
				return;
			}

			if(node.lantern.imageData != null) return;

			var imageData = BitmapCreator.createLightImageData(node.lantern.radius);		
			node.display.graphic.sourceRect = {x:32*3, y:32*1, width:32, height:32};
			node.light.radius = node.lantern.radius;
			node.light.imageData = imageData;	
		},

		update: function(time){			
			var lanterns = this.socket.state.lanterns;
			for( var node = this.nodes.head; node; node = node.next ){		
			//console.log(lanterns[node.lantern.id]);						
				node.lantern.radius = lanterns[node.lantern.id].radius;
				this.updateLanternImageData(node);
			}			
		},

		removeFromEngine: function(engine)
		{

		}

	});

	return LanternSystem;
})