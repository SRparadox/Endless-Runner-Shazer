// Shazer Rizzo
// Car Player

// Car prefab
class Car extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame)
  
      // add object to existing scene
      scene.add.existing(this) //add to existing, displaylist, updatelist
      this.isJumping = false //Track Car Jumping Status
      this.moveSpeed = 2 //Car speed in pixel/frame
      this.sfxShot = scene.sound.add('sfx-shot')
    }

    update(){
      //left right movement
      if(!this.isJumping){
        if(keyLEFT.isDown && this.x >= borderUISize + this.width){
          this.x -= this.moveSpeed
        } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
          this.x += this.moveSpeed
        }
      }
      //fire button
      if(Phaser.Input.Keyboard.JustDown(keyFIRE)){
        this.isJumping = true
        this.sfxShot.play()
      }
      //if fired move up
      if(this.isJumping && this.y >= borderUISize * 9 + borderPadding){
        this.y -= this.moveSpeed
      }
      //reset on miss
      if(this.y <= borderUISize * 9 + borderPadding){
        this.isJumping = false
        this.y = game.config.height - borderUISize - borderPadding
      }
    }

    // Resets Car
    reset(){
      this.isJumping = false
      this.y = game.config.height - borderUISize - borderPadding
    }

}