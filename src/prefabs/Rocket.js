// Shazer Rizzo
// Rocket Player

// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame)
  
      // add object to existing scene
      scene.add.existing(this) //add to existing, displaylist, updatelist
      this.isFiring = false //Track Rocket Firing Status
      this.moveSpeed = 2 //rocket speed in pixel/frame
      this.sfxShot = scene.sound.add('sfx-shot')
    }

    update(){
      //left right movement
      if(!this.isFiring){
        if(keyLEFT.isDown && this.x >= borderUISize + this.width){
          this.x -= this.moveSpeed
        } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
          this.x += this.moveSpeed
        }
      }
      //fire button
      if(Phaser.Input.Keyboard.JustDown(keyFIRE)){
        this.isFiring = true
        this.sfxShot.play()
      }
      //if fired move up
      if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
        this.y -= this.moveSpeed
      }
      //reset on miss
      if(this.y <= borderUISize * 3 + borderPadding){
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding
      }
    }

    // Resets Rocket
    reset(){
      this.isFiring = false
      this.y = game.config.height - borderUISize - borderPadding
    }

}