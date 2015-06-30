"use strict";
window.rocky.state.menu = {
	soundArray: [],
	preload: function(){
		window.rocky.game.load.audio("chop", ["chop.mp3"]);
	},
	
	create: function(){
		// you can create menu group in map editor and load it like this:
		// mt.create("menu");
		this.bg = mt.create('bg');
        this.trunk = mt.create('trunk');
		this.menu = mt.create('menu');
		
		
		// Sounds
		this.soundArray[0] = window.rocky.game.add.audio("chop", 1);
		
		
		var playButton = this.menu.children[1];
		playButton.inputEnabled = true;
		playButton.events.onInputDown.add(function() {
			this.soundArray[0].play();
			this.game.state.start("play");
		}, this);
		

        var best = parseInt(localStorage.best);

		if(best) {
        	this.menu.children[4].setText(best);
		};
		
	},
	
	update: function(){
		
	}
};