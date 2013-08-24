define(['ash'], function(Ash){

	var ServerControl = Ash.Class.extend({		
		constructor: function(socket){
			this.socket = socket;
		}
	});

	return ServerControl;
});