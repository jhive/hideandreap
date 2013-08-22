define(['ash', 'easeljs', 'jquery'], function(Ash, EaselJS, $)
{	
	var ShapeView = Ash.Class.extend({				
		self: null,
		
		/**
			texture: reference to a bitmap image
			sourceRect: a rectangle {x, y, width, height} specifying sprite location on sprite sheet
			regPoint: the registration point used for rotation and scaling
		**/
		constructor: function(){			
			self = this;			
		}

	});
	
	ShapeView.prototype = new createjs.Shape();	
	return ShapeView;	
});
