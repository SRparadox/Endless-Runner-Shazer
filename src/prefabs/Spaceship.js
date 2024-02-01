//Shazer Rizzo
//Rocket Prefab

class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue, Speed){
        super(scene, x, y, texture, frame)
        scene.add.existing(this) //add to excisting scene
        this.points = pointValue //store pointValue
        this.Speed = Speed
        this.moveSpeed = game.settings.spaceshipSpeed //spaceship speed in pixel/frame
    }

    update(){
        if (this.Speed == 'Normal'){
            //move spaceship left
            this.x -= this.moveSpeed

            //wrap from left to right edge
            if(this.x <= 0 - this.width){
                this.x = game.config.width
            }
        }
        if (this.Speed == 'Fast'){
            //move spaceship left
            this.x -= this.moveSpeed * 1.5

            //wrap from left to right edge
            if(this.x <= 0 - this.width){
                this.x = game.config.width
            }
        }
    }

    reset(){
        this.x = game.config.width
    }
}