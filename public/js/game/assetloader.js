define(['jquery'], function($)
{	
	var AssetLoader = function()
	{

		this.files = null;

		var api = this;

		var onCompleteHandler = null;		
		var filesDownloaded = 0;		
		var totalFiles = 0;

		var assets = null;

		this.load = function(files, _onCompleteHandler)
		{
			this.files = files;
			onCompleteHandler = _onCompleteHandler;


			totalFiles = this.files.length;
			filesDownloaded = 0;

			assets = {};

			$(function(){
				img = new Image();								
			})		

			for(var i in this.files)
			{
				var img = new Image();
				assets[files[i]] = img;

				$(img).load(this.onFileComplete
				).attr('src', files[i]);
			}
		};

		this.onFileComplete = function(event)
		{						
			filesDownloaded++;								
			if(filesDownloaded === totalFiles)
			{							
				onCompleteHandler(api);
			}
		};

		this.getImage = function(name)
		{			
			return assets[name];
		}
	};

	return AssetLoader;
});