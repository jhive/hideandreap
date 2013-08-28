define(['ash','easeljs'],
function(Ash, EaselJS){

	var BitmapCreator = Ash.Class.extend({
			
		constructor:function(){
			
		},

		createLightImageData: function(radius){
			var diameter = radius * 2;
			var light = new createjs.Shape();
			light.graphics.beginFill("#000000").rect(0, 0, diameter, diameter );
			light.graphics.beginRadialGradientFill(["#FFFFFF","#000000"], [0, 1], radius, radius, 0, radius, radius, radius)
			.drawCircle(radius, radius, radius);
			light.cache(0, 0, diameter, diameter);					
			
			return light.cacheCanvas;
		}
	});

	return new BitmapCreator();
})