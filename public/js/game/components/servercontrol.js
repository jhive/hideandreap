define(['ash'], function(Ash){

	var ServerControl = Ash.Class.extend({		
		constructor: function(enemyState){
			this.enemyState = enemyState;
		}
	});

	return ServerControl;
});