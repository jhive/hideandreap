define(['ash'], function(Ash){
	
	var AnimationFrames = Ash.Class.extend({

		currentFrame:null,
		frames:null,
		totalFrames:null,
		frameRate:null,
		timeSinceUpdate:null,
		loopCount:null, 
		/** 
			frames: an array of rectable frames
			frameRate: how quickly frames should cycle
			loopCount: how many times to cycle animation, pass -1 to loop continuously
		**/
		constructor:function(frames, frameRate, loopCount){
			this.currentFrame = 0;
			this.loopCount = loopCount;
			this.frames = frames;
			this.totalFrames = frames.length;
			this.frameRate = 1/frameRate;
			this.timeSinceUpdate = 0;			
		}

	});

	return AnimationFrames;
});