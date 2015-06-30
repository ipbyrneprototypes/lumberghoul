// SOUND MENU // 

window.rocky.state.soundmenu = {
	soundArray: [],
	preload: function(){
		window.rocky.game.load.audio("chop", ["chop.mp3"]);
		window.rocky.game.load.audio("music", ["music.mp3"]);
	},
	
	create: function(){
		// you can create menu group in map editor and load it like this:
		// mt.create("soundoption");
		this.bg = mt.create('bg');
        this.trunk = mt.create('trunk');
		this.sound = mt.create('sound');
		
		
		// Sounds
		this.soundArray[0] = window.rocky.game.add.audio("chop", 1);
		this.soundArray[1] = window.rocky.game.add.audio("music", 1);

		
		var playButton = this.sound.children[3];
		playButton.inputEnabled = true;
		playButton.events.onInputDown.add(function() {
			this.soundArray[0].play();
			this.soundArray[1].play("", "", 0.3,"", "");
			this.game.state.start("menu");
		}, this);
		
		var xButton = this.sound.children[4];
		xButton.inputEnabled = true;
		xButton.events.onInputDown.add(function() {
			this.game.state.start("menuns");
		}, this);
		
		
	},
	
	update: function(){
		
	}
};


// WITH SOUND //

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
		
		var soundButton = this.menu.children[5];
		soundButton.inputEnabled = true;
		soundButton.events.onInputDown.add(function() {
			this.soundArray[0].play();
			window.rocky.state.soundmenu.soundArray[1].stop();
			this.game.state.start("soundmenu");
		}, this);
		
	},
	
	update: function(){
		
	}
};


// NO SOUND //
"use strict";
window.rocky.state.menuns = {
	preload: function(){
	},
	
	create: function(){
		// you can create menu group in map editor and load it like this:
		// mt.create("menu");
		this.bg = mt.create('bg');
        this.trunk = mt.create('trunk');
		this.menuns = mt.create('menu');
		
		
		
		
		var playButton = this.menuns.children[1];
		playButton.inputEnabled = true;
		playButton.events.onInputDown.add(function() {
			this.game.state.start("playns");
		}, this);
		

        var best = parseInt(localStorage.best);

		if(best) {
        	this.menuns.children[4].setText(best);
		};
		
		var soundButton = this.menuns.children[5];
		soundButton.inputEnabled = true;
		soundButton.events.onInputDown.add(function() {
			
			this.game.state.start("soundmenu");
		}, this);
		
	},
	
	update: function(){
		
	}
};