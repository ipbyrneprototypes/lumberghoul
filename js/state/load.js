"use strict";
window.rocky.state.load = {
	soundArray: [],
	preload: function(){
		// we have preloaded assets required for Loading group objects in the Boot state
		var loading = mt.create("Loading");
		var loadingGroup = loading;
		
		// get preload sprite
		var preload = loading.mt.children.preload;
		
		// check if we have preload object at all
		if(preload){
			// set it as preload sprite
			this.load.setPreloadSprite(preload);
			
			// update group transform - so we can get correct bounds
			loadingGroup.updateTransform();
			
			// get bounds
			var bounds = loadingGroup.getBounds();
			
			// move it to the center of the screen
			loadingGroup.x = this.game.camera.screenView.centerX - (bounds.width) * 0.5  - bounds.x;
			loadingGroup.y = this.game.camera.screenView.centerY - (bounds.height) * 0.5 - bounds.y;
		}
		
		
		// load all assets
		window.rocky.game.load.audio("chop", ["chop.mp3"]);
		window.rocky.game.load.audio("music", ["music.mp3"]);
		window.rocky.game.load.audio("smash", ["smash.mp3"]);
		window.rocky.game.load.audio("win", ["win.mp3"]);
		mt.preload();
		
	},
	
	create: function(){
		
		// Sounds
		this.soundArray[0] = window.rocky.game.add.audio("chop", 1);
		this.soundArray[1] = window.rocky.game.add.audio("music", 1);
		this.soundArray[2] = window.rocky.game.add.audio("smash", 1);
		this.soundArray[3] = window.rocky.game.add.audio("win", 1);
		
		
		// loading has finished - proceed to demo state
		this.game.state.start("soundmenu");
	}
};