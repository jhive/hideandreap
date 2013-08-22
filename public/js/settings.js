define(['jquery'], 
function($){

	var Settings = {
		stage: {
			width: $("#demoCanvas").width(),
			height: $("#demoCanvas").height()
		},

		wizardSpeed: 10,
		reaperSpeed: 10,
		reaperVisionRadius: 85

	};

	return Settings;
});
