// SOUND MENU // 

window.rocky.state.soundmenu = {
	preload: function(){

	},
	
	create: function(){
		// you can create menu group in map editor and load it like this:
		// mt.create("soundoption");
		this.bg = mt.create('bg');
        this.trunk = mt.create('trunk');
		this.sound = mt.create('sound');

		
		var playButton = this.sound.children[3];
		playButton.inputEnabled = true;
		playButton.events.onInputDown.add(function() {
			window.rocky.state.load.soundArray[0].play();
			window.rocky.state.load.create.playSound = true;
			this.game.state.start("menu");
		}, this);
		
		var xButton = this.sound.children[4];
		xButton.inputEnabled = true;
		xButton.events.onInputDown.add(function() {
			window.rocky.state.load.create.playSound = false
			this.game.state.start("menu");
		}, this);
		
		
	},
	
	update: function(){
		
	}
};


// WITH SOUND //

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
		window.rocky.state.load.soundArray[1].play('','', 0.5, true, false);
		
		
		var playButton = this.menu.children[1];
		playButton.inputEnabled = true;
		playButton.events.onInputDown.add(function() {
			if(window.rocky.state.load.create.playSound) {
				window.rocky.state.load.soundArray[0].play();
			}
			this.game.state.start("play");
		}, this);
		

        var best = parseInt(localStorage.best);

		if(best) {
        	this.menu.children[4].setText(best);
		};
		
		var soundButton = this.menu.children[5];
		soundButton.inputEnabled = true;
		soundButton.events.onInputDown.add(function() {
			if(window.rocky.state.load.create.playSound) {
				window.rocky.state.load.soundArray[0].play();
				window.rocky.state.load.soundArray[1].stop();
			}
			this.game.state.start("soundmenu");
		}, this);
		
	},
	
	update: function(){
		
	}
};

