

// namespaced
;(function(){

var Game = function(canvasId){

  var timer = document.getElementById("timer");
  var gameStarted = false;

  var canvas = document.getElementById(canvasId);
  var screen = canvas.getContext('2d'); // creates 2D canvas render context vs. something like WebGL
  screen.fillStyle = '#FFFFFF';
  var gameSize =  { x: canvas.width, y: canvas.height };
  var self = this;

  // tracks all entities on the screen, initializes player
  self.bodies = [new Player(this, gameSize), new Baddy(this, gameSize)];

  // render loop
  var tick = function(){
    self.update();
    self.draw(screen, gameSize);
    requestAnimationFrame(tick); // browser API request to call tick() ~60 times per second
  };

  tick();

};// Game

// Game is responsible for rendering all game objects
Game.prototype = {

  update: function(){
    for(var i = 0, len = this.bodies.length; i< len; i++ ){
      this.bodies[i].update();
    }
  },

  draw: function(screen, gameSize){
    screen.clearRect(0,0, gameSize.x, gameSize.y);
    for(var i = 0, len = this.bodies.length; i< len; i++ ){
      // drawRect(screen, this.bodies[i]);
      this.bodies[i].draw(screen, gameSize);
    }
    // TODO: Can defer this for loop to entity draw functions
  }
};// Game Prototypes


var Player = function(game, gameSize){
  this.game = game;
  this.size = { x: 16, y: 16};
  this.center = { x: gameSize.x/2,
                  y: gameSize.y - this.size.y},
  this.keyboard = new Keyboard();

  this.game.gameSize = gameSize;
}// Player

// player is responsible for monitoring player state
Player.prototype = {

  update: function(){

    if( this.keyboard.isDown(this.keyboard.KEYS.LEFT) &&
        this.center.x - this.size.x/2 >= 0 ){
      this.center.x -= 2;
    } else if( this.keyboard.isDown(this.keyboard.KEYS.RIGHT) &&
               this.center.x + this.size.x/2 <= this.game.gameSize.x ){
      this.center.x += 2;
    }

    if ( this.keyboard.isDown(this.keyboard.KEYS.UP) &&
         this.center.y - this.size.y/2 >= 0 ) {
      this.center.y -= 2;
    } else if ( this.keyboard.isDown(this.keyboard.KEYS.DOWN) &&
                this.center.y + this.size.y/2 <= this.game.gameSize.y ) {
      this.center.y += 2;
    }
  },

  draw: function(screen, gameSize){
    drawRect(screen, this, gameSize, true);
  }

};// Player Prototype

var Baddy = function(game, gameSize){
  this.game = game;
  this.size = { x: 16, y: 16};
  this.center = { x: gameSize.x/2,
                  y: gameSize.y/2},
  this.game.gameSize = gameSize;
}// Baddy

Baddy.prototype = {
  update: function(){},
  draw: function(screen, gameSize){
    drawRect(screen, this, gameSize, false);
  }

}// Baddy Prototype

var drawRect = function(screen, body, gameSize, colorize){
  screen.beginPath();
  screen.fillRect( body.center.x - body.size.x/2,
                   body.center.y - body.size.y/2,
                   body.size.x,
                   body.size.y
                 );
  if(colorize){
    screen.fillStyle ='rgb('+ Math.floor(255*body.center.x/gameSize.x) + ','
                            + Math.floor(255*(gameSize.x - body.center.x)/gameSize.x) + ','
                            + Math.floor(255*body.center.y/gameSize.y)+ ')' ;
   } else {
    screen.fillStyle = 'red';
  }
   screen.closePath();
};// drawRect

var Keyboard = function(){
  var keyState = {};

  window.onkeydown = function(e){
    e.preventDefault(); // stops screen jittering when you move
    keyState[e.keyCode] = true;
  };

  window.onkeyup = function(e){
    keyState[e.keyCode] = false;
  };

  this.isDown = function(keyCode){
    return keyState[keyCode] === true;
  };

  this.KEYS = { LEFT:  37,
                RIGHT: 39,
                UP:    38,
                DOWN:  40,
                SPACE: 32 };

};// Keyboard

window.onload = function(){
  new Game("screen");


};

})();//invoked immediately
