// Shazer Rizzo
// Rocket Patrol: The Rise of The Rocket
// 12 hours
// Mod 1 (3 Points) Create 4 new random explosion effects
// Mod 2 (5 Points) Create a new Spaceship that is faster and smaller and worth more
// Mod 3 (3 Points) Create new title screen
// Mod 4 (1 Point) Adds Fire UI element
// Mod 5 (3 Points) Displays the time remaining on screen

let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  scene: [Menu, Play]
}

let game = new Phaser.Game(config)
// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT