// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // x1 = x0 + (v * dt) + (.5 * a * dt^2)
    this.x = this.x + (this.speed * dt);
    checkForCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(){
    // x1 = x0 + (v * dt) + (.5 * a * dt^2)
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(direction){
        if (direction === 'up') {
            this.y -= 85;
        } else if (direction === 'down') {
            if (this.y <= 300) {
                this.y += 85;
            }
        } else if (direction === 'left') {
            if (this.x >= 10) {
                this.x -= 100;
            }
        } else if (direction === 'right') {
            if (this.x <= 390) {
                this.x += 100;
            }
        }

        if (this.y <= 0) {
            this.y = 375;
        }
    console.log(`x = ${this.x}, y = ${this.y}`)
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const topStoneRow = 60;
const middleStoneRow = 142;
const bottomStoneRow = 224;

var allEnemies = [
    new Enemy(100, topStoneRow, 40),
    new Enemy(100, middleStoneRow, 40),
    new Enemy(100, bottomStoneRow, 40)
];

var player = new Player(200, 375);

function checkForCollision() {
    for(const enemy of allEnemies){
        if (isPlayerInXLimits(enemy) && isPlayerInYLimits(enemy)) {
            player.y = 375;
        }
    }
}

function isPlayerInYLimits(enemy) {
    if ((player.y < (enemy.y + 40)) && (player.y > (enemy.y - 40))){
        return true;
    } else {
        return false;
    }
}

function isPlayerInXLimits(enemy){
    if(player.x <= enemy.x + 50){
        return true;
    } else {
        return false;
    }
}

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
