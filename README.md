SHAZER RIZZO
Rocket Patrol Mods

Works Cited:
https://phaser.discourse.group/t/countdown-timer/2471/4


LIST OF MODS:

MOD 1 (3 Points)
//Create 4 new explosion sound effects and randomize which one plays on impact (3)
javascript randomize between 0,1,2,3,4 in Play.js
Make 4 new sounds in jsfxr into Menu.js

MOD 2 (5 points) 8
//Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
Make new Ship Sprite
Replace Ship 2
increase speed

MOD 3 (3 points) 11
//Create a new title screen (e.g., new artwork, typography, layout) (3)
Create a title Screen Artwork
Move the title down
Change Font
Replace Background

MOD 4 (1 Point) 12
//Implement the 'FIRE' UI text from the original game (1)
Type Fire at the top of the screen
Modify the excisting score and move it to the middle

Mod 5 (3 Points) 15
//Display the time remaining (in seconds) on the screen (3)
Display the clock using a reference from https://phaser.discourse.group/t/countdown-timer/2471/4
Make the Initial time
The Formatting of time
The Updating of time (On Event)
 

Mod 6 (5 points) 20
//5 Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)
Implement the adding of time in the play.js under ship explode
Change the clock to work under initialized time from mod 5
create a check in Play.js update() to see if the ship has missed and then subtract time
