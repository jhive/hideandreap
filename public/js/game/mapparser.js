define(['ash'],
function(Ash){

	var MapParser = Ash.Class.extend({
		
		creator: null,		
		map:null,

		constructor:function(creator, map){
			this.creator = creator;
			this.map = map;
		},

		parse: function(){		
			var map = this.map;
			var tiles = [];
			for(var i = 0; i < map.layers.length; i++){				
				var layer = map.layers[i];				
				for(var j = 0; j < layer.data.length; j++){
					var tilepoint = layer.data[j].toString().split('.');
					
					if(tilepoint.length > 1){						
						var frame = {x: parseInt(tilepoint[0]) * 32, 
									y: parseInt(tilepoint[1]) * 32, 
									width:32, 
									height:32};									
						tiles.push( this.creator.createTile(layer.tileset, frame, (j % 25),Math.floor(j/25)) );						
					}
					else
					{
						tiles.push(null);
					}
				}
			}
			return tiles;
		}
	});

	return MapParser;
})