"use strict";
window.rocky = {
	
	// reference to the Phaser.Game instance
	game: null,
	
	// main function
	main: function(){
		var playSound;
		this.game = new Phaser.Game(mt.data.map.viewportWidth, mt.data.map.viewportHeight, Phaser.AUTO, document.body, window.rocky.state.boot);
	},
	
	// here we will store all states
	state: {}
};

window.addEventListener('DOMContentLoaded', function(){
	window.rocky.main();
}, false);