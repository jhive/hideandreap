define(['ash'],
function(Ash){

	var MapParser = Ash.Class.extend({
		
		creator: null,		
		constructor:function(creator){
			this.creator = creator;
		},

		parse: function(map){

		}

	});

	return MapParser;
})