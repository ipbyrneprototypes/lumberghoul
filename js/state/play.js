// WITH SOUND // 

"use strict";
window.rocky.state.play = { 
	preload: function() {
            },
	
    create: function() {
        this.bg = mt.create('bg');
        this.trunk = mt.create('trunk');
        this.character = mt.create('character');
        this.ui = mt.create('ui');

        this.character.animations.add('idle', [0, 1, 2, 3, 4, 5], 10, true);
        this.character.animations.add('chop', [6], 10, false);
        this.character.animations.play('idle');


        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.cursors.left.onDown.add(function() {
            this.chop(-1);
        }, this);
        this.cursors.right.onDown.add(function() {
            this.chop(1);
        }, this);
        this.game.input.onDown.add(function() {
            var direction = this.game.input.activePointer.x <= this.game.width / 2 ? -1 : 1;
            this.chop(direction);
        }, this);

        this.timeStarted = false;
        this.gameOver = false;
        this.timeBar = this.ui.children[0];
        this.score = this.ui.children[2];
        this.timeLeft = 10000;
    },

    update: function() {
        if (this.timeStarted) {
            var newTime = new Date().getTime();
            this.timeLeft -= newTime - this.lastTime;
            if (this.timeLeft > 0) {
                this.lastTime = newTime;
                var cropRect = new Phaser.Rectangle(0, 0, this.timeLeft / 100, 15);
                this.timeBar.crop(cropRect);
                this.timeBar.updateCrop();
            } else {
                this.win();
            }
        }
    },

    chop: function(direction) {
		window.rocky.state.load.soundArray[0].play();
		
        if (this.gameOver) return;

        if (!this.timeStarted) {
            this.lastTime = new Date().getTime();
            this.timeStarted = true;
        }

        this.character.scale.x = direction;
        if (this.doCollide(direction)) return;

        var anim = this.character.animations.play('chop');
        anim.onComplete.add(function() {
            this.character.animations.play('idle');
        }, this);
        this.addTrunk();
        this.removeTrunk();
        if (this.doCollide(direction)) {
            return;
        } else {
            var score = parseInt(this.score._text);
            score++;
            this.score.setText(score);
            this.timeLeft += 200 - score;
            if (this.timeLeft > 10000) {
                this.timeLeft = 10000;
            }
        }
    },

    addTrunk: function() {
        var topTrunk = this.trunk.getTop();
        var frame = 0;

        var trunk = this.trunk.create(this.game.width / 2, -120, '/trunk.png');
        // if trunk below has branch then next is without branches
        if (topTrunk.frame <= 1) {
            frame = this.game.rnd.integerInRange(2, 4);
        }
        // if trunk below doesn't have branch then 75% it will have in next
        else {
            if (this.game.rnd.integerInRange(1, 4) > 1) {
                frame = this.game.rnd.integerInRange(0, 1);
            } else {
                frame = this.game.rnd.integerInRange(2, 4);
            }
        }
        trunk.frame = frame;
        trunk.anchor.setTo(0.5, 0);
    },

    removeTrunk: function() {
        this.trunk.getBottom().destroy();
        this.trunk.forEach(function(trunk) {
            var tween = this.game.add.tween(trunk).to({
                y: trunk.y + trunk.height
            }, 50);
            tween.start();
        }, this);
    },

    doCollide: function(direction) {
        var bottomTrunk = this.trunk.getBottom();
        var trunkDirection = bottomTrunk.frame === 0 ? -1 : bottomTrunk.frame;
        if (direction == trunkDirection) {
            this.die();
            return true;
        }
        return false;
    },

    die: function() {
		window.rocky.state.load.soundArray[2].play();
		
        this.timeStarted = false;
        this.gameOver = true;
		
		// if best is greater than score
		if (parseInt(this.score._text) > localStorage.best || best) {
			this.popup1 = mt.create('popup1');
			var restartButton = this.popup1.children[1];
			restartButton.inputEnabled = true;
			restartButton.events.onInputDown.add(function() {
				console.log('restart');
				this.game.state.start("play");
			}, this);

			var exitButton = this.popup1.children[4];
			exitButton.inputEnabled = true;
			exitButton.events.onInputDown.add(function() {
				console.log('exit to menu');
				this.game.state.start("menu");
			}, this);

			var score = parseInt(this.score._text);
			var best = parseInt(localStorage.best);

				localStorage.best = score;
				best = score;
	
			this.popup1.children[2].setText(best);
		} else {
			
			this.popup = mt.create('popup');
		    var restartButton = this.popup.children[1];
			restartButton.inputEnabled = true;
			restartButton.events.onInputDown.add(function() {
				console.log('restart');
				this.game.state.start("play");
			}, this);

			var exitButton = this.popup.children[6];
			exitButton.inputEnabled = true;
			exitButton.events.onInputDown.add(function() {
				console.log('exit to menu');
				this.game.state.start("menu");
			}, this);

			var score = parseInt(this.score._text);
			var best = parseInt(localStorage.best);
			if (!localStorage.best || best < score) {
				localStorage.best = score;
				best = score;
			}
			this.popup.children[2].setText(score);
			this.popup.children[4].setText(best);
			}
	},
	
	win: function() {
		window.rocky.state.load.soundArray[3].play();
		
        this.timeStarted = false;
        this.gameOver = true;
		
		// if best is greater than score
		if (parseInt(this.score._text) > localStorage.best || best) {
			this.popup1 = mt.create('popup1');
			var restartButton = this.popup1.children[1];
			restartButton.inputEnabled = true;
			restartButton.events.onInputDown.add(function() {
				console.log('restart');
				this.game.state.start("play");
			}, this);

			var exitButton = this.popup1.children[4];
			exitButton.inputEnabled = true;
			exitButton.events.onInputDown.add(function() {
				console.log('exit to menu');
				this.game.state.start("menu");
			}, this);

			var score = parseInt(this.score._text);
			var best = parseInt(localStorage.best);

				localStorage.best = score;
				best = score;
	
			this.popup1.children[2].setText(best);
		} else {
			
			this.popup = mt.create('popup');
		    var restartButton = this.popup.children[1];
			restartButton.inputEnabled = true;
			restartButton.events.onInputDown.add(function() {
				console.log('restart');
				this.game.state.start("play");
			}, this);

			var exitButton = this.popup.children[6];
			exitButton.inputEnabled = true;
			exitButton.events.onInputDown.add(function() {
				console.log('exit to menu');
				this.game.state.start("menu");
			}, this);

			var score = parseInt(this.score._text);
			var best = parseInt(localStorage.best);
			if (!localStorage.best || best < score) {
				localStorage.best = score;
				best = score;
			}
			this.popup.children[2].setText(score);
			this.popup.children[4].setText(best);
			}
	}

};

// WITH OUT SOUND // 

"use strict";
window.rocky.state.playns = {
	preload: function() {
            },
	
    create: function() {
        this.bg = mt.create('bg');
        this.trunk = mt.create('trunk');
        this.character = mt.create('character');
        this.ui = mt.create('ui');

        this.character.animations.add('idle', [0, 1, 2, 3, 4, 5], 10, true);
        this.character.animations.add('chop', [6], 10, false);
        this.character.animations.play('idle');
		

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.cursors.left.onDown.add(function() {
            this.chop(-1);
        }, this);
        this.cursors.right.onDown.add(function() {
            this.chop(1);
        }, this);
        this.game.input.onDown.add(function() {
            var direction = this.game.input.activePointer.x <= this.game.width / 2 ? -1 : 1;
            this.chop(direction);
        }, this);

        this.timeStarted = false;
        this.gameOver = false;
        this.timeBar = this.ui.children[0];
        this.score = this.ui.children[2];
        this.timeLeft = 10000;
    },

    update: function() {
        if (this.timeStarted) {
            var newTime = new Date().getTime();
            this.timeLeft -= newTime - this.lastTime;
            if (this.timeLeft > 0) {
                this.lastTime = newTime;
                var cropRect = new Phaser.Rectangle(0, 0, this.timeLeft / 100, 15);
                this.timeBar.crop(cropRect);
                this.timeBar.updateCrop();
            } else {
                this.win();
            }
        }
    },

    chop: function(direction) {

		
        if (this.gameOver) return;

        if (!this.timeStarted) {
            this.lastTime = new Date().getTime();
            this.timeStarted = true;
        }

        this.character.scale.x = direction;
        if (this.doCollide(direction)) return;

        var anim = this.character.animations.play('chop');
        anim.onComplete.add(function() {
            this.character.animations.play('idle');
        }, this);
        this.addTrunk();
        this.removeTrunk();
        if (this.doCollide(direction)) {
            return;
        } else {
            var score = parseInt(this.score._text);
            score++;
            this.score.setText(score);
            this.timeLeft += 200 - score;
            if (this.timeLeft > 10000) {
                this.timeLeft = 10000;
            }
        }
    },

    addTrunk: function() {
        var topTrunk = this.trunk.getTop();
        var frame = 0;

        var trunk = this.trunk.create(this.game.width / 2, -120, '/trunk.png');
        // if trunk below has branch then next is without branches
        if (topTrunk.frame <= 1) {
            frame = this.game.rnd.integerInRange(2, 4);
        }
        // if trunk below doesn't have branch then 75% it will have in next
        else {
            if (this.game.rnd.integerInRange(1, 4) > 1) {
                frame = this.game.rnd.integerInRange(0, 1);
            } else {
                frame = this.game.rnd.integerInRange(2, 4);
            }
        }
        trunk.frame = frame;
        trunk.anchor.setTo(0.5, 0);
    },

    removeTrunk: function() {
        this.trunk.getBottom().destroy();
        this.trunk.forEach(function(trunk) {
            var tween = this.game.add.tween(trunk).to({
                y: trunk.y + trunk.height
            }, 50);
            tween.start();
        }, this);
    },

    doCollide: function(direction) {
        var bottomTrunk = this.trunk.getBottom();
        var trunkDirection = bottomTrunk.frame === 0 ? -1 : bottomTrunk.frame;
        if (direction == trunkDirection) {
            this.die();
            return true;
        }
        return false;
    },

    die: function() {
		
        this.timeStarted = false;
        this.gameOver = true;
		
		// if best is greater than score
		if (parseInt(this.score._text) > localStorage.best || best) {
			this.popup1 = mt.create('popup1');
			var restartButton = this.popup1.children[1];
			restartButton.inputEnabled = true;
			restartButton.events.onInputDown.add(function() {
				console.log('restart');
				this.game.state.start("playns");
			}, this);

			var exitButton = this.popup1.children[4];
			exitButton.inputEnabled = true;
			exitButton.events.onInputDown.add(function() {
				console.log('exit to menu');
				this.game.state.start("menuns");
			}, this);

			var score = parseInt(this.score._text);
			var best = parseInt(localStorage.best);

				localStorage.best = score;
				best = score;
	
			this.popup1.children[2].setText(best);
		} else {
			
			this.popup = mt.create('popup');
		    var restartButton = this.popup.children[1];
			restartButton.inputEnabled = true;
			restartButton.events.onInputDown.add(function() {
				console.log('restart');
				this.game.state.start("playns");
			}, this);

			var exitButton = this.popup.children[6];
			exitButton.inputEnabled = true;
			exitButton.events.onInputDown.add(function() {
				console.log('exit to menu');
				this.game.state.start("menuns");
			}, this);

			var score = parseInt(this.score._text);
			var best = parseInt(localStorage.best);
			if (!localStorage.best || best < score) {
				localStorage.best = score;
				best = score;
			}
			this.popup.children[2].setText(score);
			this.popup.children[4].setText(best);
			}
	},
	
	win: function() {
		
        this.timeStarted = false;
        this.gameOver = true;
		
		// if best is greater than score
		if (parseInt(this.score._text) > localStorage.best || best) {
			this.popup1 = mt.create('popup1');
			var restartButton = this.popup1.children[1];
			restartButton.inputEnabled = true;
			restartButton.events.onInputDown.add(function() {
				console.log('restart');
				this.game.state.start("playns");
			}, this);

			var exitButton = this.popup1.children[4];
			exitButton.inputEnabled = true;
			exitButton.events.onInputDown.add(function() {
				console.log('exit to menu');
				this.game.state.start("menuns");
			}, this);

			var score = parseInt(this.score._text);
			var best = parseInt(localStorage.best);

				localStorage.best = score;
				best = score;
	
			this.popup1.children[2].setText(best);
		} else {
			
			this.popup = mt.create('popup');
		    var restartButton = this.popup.children[1];
			restartButton.inputEnabled = true;
			restartButton.events.onInputDown.add(function() {
				console.log('restart');
				this.game.state.start("playns");
			}, this);

			var exitButton = this.popup.children[6];
			exitButton.inputEnabled = true;
			exitButton.events.onInputDown.add(function() {
				console.log('exit to menu');
				this.game.state.start("menuns");
			}, this);

			var score = parseInt(this.score._text);
			var best = parseInt(localStorage.best);
			if (!localStorage.best || best < score) {
				localStorage.best = score;
				best = score;
			}
			this.popup.children[2].setText(score);
			this.popup.children[4].setText(best);
			}
	}

};