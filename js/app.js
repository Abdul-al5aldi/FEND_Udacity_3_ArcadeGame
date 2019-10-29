let game = true;
let level = 0;


// Enemies our player must avoid
var Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.height = 65;
    this.width = 95;
    this.collision = false;
    this.speed = Math.floor(Math.random() * 5 )+1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {

    if (this.x > ctx.canvas.width + this.width) {
        this.x = -100 * Math.floor(Math.random()*4) + 1;
        this.speed = Math.floor(Math.random() * 5 )+1;
    } else {
        this.x += this.speed * 50 * (level+1) * dt;
    }

    // Check for collision
    if (collision(player.x, player.y, player.width, player.height, this.x, this.y, this.width, this.height)) {
        this.collision = true;
        level = 0;
        document.querySelector('.level-text span').innerHTML = level;
        
        // Reset player position
        if (player) {
            player.x = 202;
            player.y = 400;
        }
    } else {
        this.collision = false;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.height = 75;
    this.width = 65;
}

Player.prototype.update = function () {
    if (game && player.y < 40) {
        level++;
        //reset();
        console.log('level')
        document.querySelector('.level-text span').innerHTML = level;
        this.x = 202;
        this.y = 400;

        if ( level == 1 )
            win();
    }
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (direction) {
    if(!game) 
        return;

    const horizontal = 101,
        vertical = 83;

    if (direction === 'left' && this.x - horizontal >= 0) {
        this.x -= horizontal;
    } else if (direction === 'right' && this.x + horizontal < ctx.canvas.width) {
        this.x += horizontal;
    } else if (direction === 'down' && this.y + vertical < ctx.canvas.height - 200) {
        this.y += vertical;
    } else if (direction === 'up' && this.y - vertical >= 0 - player.height) {
        this.y -= vertical;
    }
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

const enemyPosition = [55, 140, 230];



const player = new Player(202, 400);

let allEnemies = enemyPosition.map((y, index) => {
    return new Enemy((-100 * (index + 1)), y);
})

function collision (px, py, pw, ph, ex, ey, ew, eh) {
    return (Math.abs(px - ex) * 2 < pw + ew) && (Math.abs(py - ey) * 2 < ph + eh);
}

function win() {
    console.log('Win!');
    document.querySelector('.level-text').innerHTML = "";
    document.querySelector(".win-text").innerHTML =
    `You Won!`;
    stop();
}

function stop() {
    allEnemies = [];
    game = false;
}

function reset() {
    window.location.reload(true);
    console.log("Reload ...")
}


console.log("Listen ...")
document.querySelector(".reload").addEventListener('click', reset, true);