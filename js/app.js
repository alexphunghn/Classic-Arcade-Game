// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.random()*(100) + 50;
};

enemyRows = [60, 140, 220]

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt,speed) {
  //if enemy moves off canvas, enemy resets to start
  if (this.x > 500) {
      this.x = -1;
      this.y = enemyRows[Math.round(Math.random()* (enemyRows.length-1))];
      this.speed = Math.random()*(100) + 50;
  } else {
      this.x += this.speed * dt;
  }

};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
  this.sprite = 'images/char-boy.png';
  this.x = 2;
  this.y = 0;

};

Player.prototype.update = function(){
  this.Collisions();

  //or player wins!
  if (this.y >= 500) {
    console.log('Congratulations!');
    this.reset();
  }
};

Player.prototype.Collisions = function(){
  for (var i = 0; i < allEnemies.length; i++) {
    /*add calculation to determine row*/
    if (this.x >= Enemy.x + 0 &&
        this.x < Enemy.x + 30 &&
        this.y >= Enemy.y + 0 &&
        this.y < Enemy.y + 30) {
          console.log('Sorry!');

        }
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 103, this.y + 400);
};

Player.prototype.reset = function() {
  this.x = 2;
  this.y = 0;
};

Player.prototype.handleInput = function(allowedKeys){
  switch (allowedKeys) {
    case 'left':
    if (this.x > 0){
      this.x--;
    } break;

    case 'down':
    if (this.y <= 100){
      this.y = this.y + 80;
    } break;

    case 'up':
    if (this.y >= 0){
      this.y = this.y - 80;
    } break;

    case 'right':
    if (this.x < 4){
      this.x++;
    } break;


    default:

  }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
allEnemies[0] = new Enemy(0, 140);
allEnemies[1] = new Enemy(0, 60);
allEnemies[2] = new Enemy(0, 220);
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
