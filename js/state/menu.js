"use strict";
window.rocky.state.menu = {
	preload: function(){
		
	},
	
	create: function(){
		// you can create menu group in map editor and load it like this:
		// mt.create("menu");
		this.bg = mt.create('bg');
        this.trunk = mt.create('trunk');
		this.character = mt.create('character');
		this.menu = mt.create('menu');
		
		// character animation
		this.character.animations.add('idle', [0, 1, 2, 3, 4, 5], 10, true);
        this.character.animations.add('chop', [6], 10, false);
        this.character.animations.play('idle');
		
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