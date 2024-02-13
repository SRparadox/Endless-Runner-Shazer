//Shazer Rizzo
//Endless Runner

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load images/tile sprites
        this.load.image('Car', './assets/Car.png')
        this.load.image('Clown', './assets/Clown.png')
        this.load.image('City', './assets/City.png')
        this.load.image('TitleScreen', './assets/TitleScreen.png')  //Mod3 Title Screen
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        // load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion4', './assets/sfx-explosion4.wav') //Mod1 New 4
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
        this.load.audio('Music', './assets/bgm.wav')

    }

    create() {
        // animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0, 
                end: 9, 
                first: 0
            }),
            frameRate: 30
        })
        
        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '14px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //diplay Menu Text
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'TitleScreen').setOrigin(0, 0)   //BACkground
        this.add.text(game.config.width - 150, game.config.height - 70, 'Press F to Jump', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width -490, game.config.height - 70, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5)
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }
    
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
          }
          this.sound.play('sfx-select')
          this.scene.start('playScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
          }
          this.sound.play('sfx-select')
          this.scene.start('playScene')    
        }
    }
}