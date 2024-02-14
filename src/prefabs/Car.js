// Shazer Rizzo
// Car Player

class Car extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)

    // add object to existing scene
    scene.add.existing(this) //add to existing, displaylist, updatelist
    this.isJumping = false //Track Car Jumping Status
    this.moveSpeed = 2 //Car speed in pixel/frame
    this.sfxShot = scene.sound.add('sfx-shot')
    this.ground = game.config.height - borderUISize - borderPadding
    this.top = borderUISize * 9 + borderPadding
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
    if(this.isJumping && this.y >= this.top){
      this.y -= this.moveSpeed + .2
    }

    //reset on miss
    if(this.y <= this.top){
      this.isJumping = false
      this.y = this.ground
    }

  }

  // Resets Car
  reset(){
    this.isJumping = false
    this.y = this.ground
    //this.y += this.moveSpeed
  }
}