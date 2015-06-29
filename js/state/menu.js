"use strict";
window.rocky.state.menu = {
	preload: function(){
		
	},
	
	create: function(){
		// you can create menu group in map editor and load it like this:
		// mt.create("menu");
		this.bg = mt.create('bg');
        this.trunk = mt.create('trunk');

		this.menu = mt.create('menu');
		
		var playButton = this.menu.children[1];
		playButton.inputEnabled = true;
		playButton.events.onInputDown.add(function() {
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