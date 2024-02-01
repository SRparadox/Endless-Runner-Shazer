//Shazer Rizzo
//Rocket Patrol Project

class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        this.RANDOMSOUND = 0

        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30, 'Normal').setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship2', 0, 40, 'Fast').setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, 'Normal').setOrigin(0,0)

        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        //this.cursors = this.input.keyboard.createCursorKeys(); //Mod5
        // initialize score
        this.p1Score = 0
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
        this.FireElement = this.add.text(borderUISize + 300, borderUISize + borderPadding*2, 'FIRE ', scoreConfig) //Mod 4 Fire Element

        // GAME OVER flag
        this.gameOver = false
        
        //Displaying the clock  REFERENCE: https://phaser.discourse.group/t/countdown-timer/2471/4
        //Initialization
        this.initialTime = game.settings.gameTimer / 1000;
        //Initial Time
        this.Text = this.add.text(440, borderUISize + borderPadding + 10, 'Time:' + this.formatTime(this.initialTime));
        //EVERY Second Update
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });


        // 60-second play clock  THIS SET THE GAME OVER EVENT//// HAVE TO CHANGE THIS FOR MOD 6 because it has to be initialized as initial time
        scoreConfig.fixedWidth = 0
        //this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        //    this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
        //    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
        //    this.gameOver = true
        //}, null, this)



    }

    update() {
        
        // Have to move the end game screen here so that the condition changes with the new time changes from mod 6
        // WHY IS THE END SCREEN NOT THE SAME COLOR AS BEFORE
        if (this.initialTime <= 0) {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', this.scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }
        this.starfield.tilePositionX -= 4
        if(!this.gameOver) {               
            this.p1Rocket.update()         // update rocket sprite
            this.ship01.update()           // update spaceships (x3)
            this.ship02.update()
            this.ship03.update()
        } 
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }
        
        //Subtract time if Misses Mod 6
        if(this.p1Rocket.y <= borderUISize * 3 + borderPadding + 2){
            this.initialTime -= 5;
        }
        
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true
        } else {
          return false
        }
    }
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0)
        boom.anims.play('explode')           // play explode animation
        boom.on('animationcomplete', () => { // callback after ani completes
          ship.reset()                       // reset ship position
          ship.alpha = 1                     // make ship visible again
          boom.destroy()                     // remove explosion sprite
        })
        // score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score 
        //Mod 6
        this.initialTime += 5;

        this.RANDOMSOUND = Math.floor(Math.random() * 5);      //MOD1 Random Sound
        if (this.RANDOMSOUND == 0){
            this.sound.play('sfx-explosion')
        }
        if (this.RANDOMSOUND == 1){
            this.sound.play('sfx-explosion1')
        }  
        if (this.RANDOMSOUND == 2){
            this.sound.play('sfx-explosion2')
        }  
        if (this.RANDOMSOUND == 3){
            this.sound.play('sfx-explosion3')
        }  
        if (this.RANDOMSOUND == 4){
            this.sound.play('sfx-explosion4')
        }        
    }

    //Mod 5
    formatTime(Seconds){
        // Minutes
        var minutes = Math.floor(Seconds/60);
        // Seconds
        var partInSeconds = Seconds%60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2, '0');
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
    }

    onEvent() {
        this.update();
        if (!this.gameOver) {   //EDGE CASE DONT Subtract from 0
            this.initialTime -= 1;
            this.Text.setText('Time:' + this.formatTime(this.initialTime));
        }
    }
}