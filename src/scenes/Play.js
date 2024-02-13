//Shazer Rizzo
//Endless Runner Project

class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        this.Music = this.sound.add('Music');
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'City').setOrigin(0, 0)

        // add Car (p1)
        this.p1car = new Car(this, game.config.width/5, game.config.height - borderUISize - borderPadding - 25, 'Car').setOrigin(0.5, 0)
        // add Clowns (x2)
        this.topclown = new Clown(this, game.config.width + borderUISize*3, borderUISize*9 + borderPadding*2, 'Clown', 0, 40, 'Normal').setOrigin(0,0)
        this.bottomclown = new Clown(this, game.config.width, borderUISize*11 + borderPadding*4, 'Clown', 0, 10, 'Fast').setOrigin(0,0)

        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        // initialize score
        this.p1Score = 0
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#808080',
            color: '#FF2800',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 200
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, ' ', scoreConfig)
        this.FireElement = this.add.text(borderUISize + 300, borderUISize + borderPadding*2, 'Avoid the Clowns!', scoreConfig) //JUMP SIGN
        // GAME OVER flag
        this.gameOver = false

        // play Music
        this.Music.setLoop(true);
        this.Music.play();
        
        //Displaying the clock  REFERENCE: https://phaser.discourse.group/t/countdown-timer/2471/4
        //Initialization
        this.initialTime = 1;
        //Initial Time
        this.Text = this.add.text(borderUISize + borderPadding + 9, borderUISize + borderPadding*2 + 10, 'Time:' + this.formatTime(this.initialTime));
        //EVERY Second Update
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });


        // 60-second play clock  THIS SET THE GAME OVER EVENT//// HAVE TO CHANGE THIS FOR MOD 6 because it has to be initialized as initial time
        scoreConfig.fixedWidth = 0
    }

    update() {
        
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }
        this.starfield.tilePositionX += 2
        if(!this.gameOver) {               
            this.p1car.update()         // update car sprite
            //this.ship01.update()           // update Clowns (x2)
            this.topclown.update()
            this.bottomclown.update()
        } 
        // check collisions
        if(this.checkCollision(this.p1car, this.bottomclown)) {
            this.p1car.reset()
            //this.sound.play('sfx-explosion')
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', this.scoreConfig).setOrigin(0.5)  //COPY THESE FOR COLLISION!
            this.add.text(game.config.width/2, game.config.height/2 + 90, 'Credits: Assets: Shazer Rizzo, Music: David Fesliyan', this.scoreConfig).setOrigin(0.5)
            this.gameOver = true
            this.Music.setLoop(false);
            this.Music.stop();
            this.shipExplode(this.bottomclown)   
        }
        if (this.checkCollision(this.p1car, this.topclown)) {
            this.p1car.reset()
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', this.scoreConfig).setOrigin(0.5)  //COPY THESE FOR COLLISION!
            this.add.text(game.config.width/2, game.config.height/2 + 90, 'Credits: Assets: Shazer Rizzo, Music: David Fesliyan', this.scoreConfig).setOrigin(0.5)            
            this.gameOver = true
            this.Music.setLoop(false);
            this.Music.stop();
            this.shipExplode(this.topclown)
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }
        
        //Subtract time if Misses Mod 6
        if(this.p1car.y <= borderUISize * 3 + borderPadding + 2){
            this.initialTime -= 5;
        }
        
    }

    checkCollision(car, ship) {
        // simple AABB checking
        if (car.x < ship.x + ship.width && 
          car.x + car.width > ship.x && 
          car.y < ship.y + ship.height &&
          car.height + car.y > ship. y) {
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
        //this.p1Score += ship.points
        //this.scoreLeft.text = this.p1Score 
        //Mod 6
        //this.initialTime += 5;

        this.sound.play('sfx-explosion4')       
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
            this.initialTime += 1;
            this.Text.setText('Time:' + this.formatTime(this.initialTime));
        }
    }
}