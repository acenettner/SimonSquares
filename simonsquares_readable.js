var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');
const GAME_WIDTH = 256;
const GAME_HEIGHT = 256;
const SPRITE_WIDTH = 16;
const SPRITE_HEIGHT = 16;
var choice = 0;
var timer = 0;
var maxTime = 750;
var choiceMaxTime = 150;
var gameStart = false;
var lastTime = 0;
var turn = false;
var keyReady = true;
var index = 0;
var order = [1, 2, 3];
var gameOver = false;
var score = 0;
draw();

// Draws all elements on screen
function draw(deltaTime) {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = 'azure';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = 'tan';
    if (choice != 0) {
        timer += deltaTime;
        if ((turn && timer > choiceMaxTime) || (!turn && timer > maxTime)) {
            choice = 0;
            timer = 0;
            index++;
            //
            if (turn && index >= order.length) {
                turn = false;
                index = 0;
                timer = 0;
                choice = 0;
                order.push(0);
                requestOrder();
            }
        }
    }
    if (choice != 1) {
        ctx.fillRect(96 - SPRITE_WIDTH / 2, 128 - SPRITE_HEIGHT / 2, SPRITE_WIDTH, SPRITE_HEIGHT);
    }
    if (choice != 2) {
        ctx.fillRect(128 - SPRITE_WIDTH / 2, 96 - SPRITE_HEIGHT / 2, SPRITE_WIDTH, SPRITE_HEIGHT);
    }
    if (choice != 3) {
        ctx.fillRect(160 - SPRITE_WIDTH / 2, 128 - SPRITE_HEIGHT / 2, SPRITE_WIDTH, SPRITE_HEIGHT);
    }
}


// Gets player inputs
function input() {
    document.addEventListener("keydown", (event)=> {
        if (turn && keyReady && !gameOver) {

            if (event.key == 'ArrowLeft') {
                choice = 1;
                keyReady = false;
            }
            if (event.key == 'Enter') {
                choice = 2;
                keyReady = false;
            }
            if (event.key == 'ArrowRight') {
                choice = 3;
                keyReady = false;
            }
            inputChecker();
        }

        // Press enter to restart game after losing
        if (keyReady && gameOver && event.key == 'Enter') {
                order = [1, 2, 3];
                turn = false;
                index = 0;
                timer = 0;
                choice = 0;
                score = 0;
                gameOver = false;
            }
    })
    document.addEventListener("keyup", (event)=> {
        keyReady = true;
    })
}

// plays the sequence of inputs
function playOrder(deltaTime) {
    choice = order[index];
    // resets values to be used with player inputs
    if (index >= order.length) {
        turn = true;
        index = 0;
        timer = 0;
        choice = 0;
    }
}

// Generates a new random order for the player to follow
function requestOrder() {
    for (var i = 0; i < order.length; i++) {
        var r = Math.floor(Math.random() * 3) + 1;
        order[i] = r;
    }
}

// gets player input, increment score if guess is correct
function inputChecker() {
    if (choice != order[index]) {
        gameOver = true;
        alert('Final Score: ' + score + '\nTo play again, press the enter key after closing this.');
        keyReady = true;
        return;
    }
    score++;
}

// Updates the game
function gameLoop(timestamp) {
    var deltaTime = timestamp - lastTime; //Use this when time is needed for other functions
    lastTime = timestamp;
    draw(deltaTime);
    if (!turn && !gameOver)
    {
        playOrder(deltaTime);
    }
    input();
    // Allows gameLoop to be called repeatedly
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);