// namespaced
;(function(){

var Game = function(canvasId){

  var canvas = document.getElementById(canvasId);
  var screen = canvas.getContext('2d'); // creates 2D canvas render context vs. something like WebGL
  var gameSize =  { x: canvas.width, y: canvas.height };
  var self = this;

  // tracks all entities on the screen
  self.bodies = [new Player(this, gameSize)];

  // render loop
  var tick = function(){
    self.update();
    self.draw(screen, gameSize);
    requestAnimationFrame(tick); // browser API request to call tick() ~60 times per second
  };

  tick();

};// Game

Game.prototype = {

  update: function(){
    console.log('hi');
  },

  draw: function(screen, gameSize){
    // x, y, width, height
    // screen.fillRect( 30, 30, 40, 40);
    for(var i = 0, len = this.bodies.length; i< len; i++ ){
      drawRect(screen, this.bodies[i]);
    }
  }
};// Game Prototypes

var Player = function(game, gameSize){
  this.game = game;
  this.size = { x: 15, y: 15};
  this.center = { x: gameSize.x/2,
                  y: gameSize.y - this.size.y/2}
}// Player

Player.prototype = {

  update: function(){

  },
  draw: function(screen, gameSize){

  }

};// Player Prototype

var drawRect = function(screen, body){
  screen.fillRect( body.center.x - body.size.x/2,
                   body.center.y - body.size.y/2,
                   body.size.x,
                   body.size.y
                 );
};// drawRect

var Keyboard = function(){

};// Keyboard

window.onload = function(){
  new Game("screen");
};

})();//invoked immediately
