// Variables here
let dir = { x: 0, y: 0 };
let eatSound = new Audio('Sound/eat1.mp3');
let gameOverSound = new Audio('Sound/gameover.mp3');
let moveSound = new Audio('Sound/move.mp3');
let musicSound = new Audio('Sound/music.mp3');
let snakeSpeed = 10;
let prevTime = 0;
let snakeBody = [{ x: Math.round(2 + 18 * Math.random()), y: Math.round(2 + 18 * Math.random()) }
]; // initial position
let food = { x: Math.round(2 + 18 * Math.random()), y: Math.round(2 + 18 * Math.random()) };
let score = 0;
// Functions here
setTimeout(() => {
      //console.log("World!");
      snakeSpeed = prompt("Welcome to Snake's Snack Time! Enter the speed of your snake: ", 10);
}, 400);

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - prevTime) / 1000 < 1 / snakeSpeed) {
        return;
    }
    else {
        prevTime = ctime;
        DisplayGame();
    }
}

function isCollide(snake) {

    for (let i = 1; i < snakeBody.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) // if snake crosses itself
        {
            return true;
        }
    }

    if (snake[0].x > 20 || snake[0].x <= 0 || snake[0].y > 20 || snake[0].y <= 0) // if snake collides with the borders
    {
        return true;
    }

    return false;
}

function DisplayGame() {

    if (isCollide(snakeBody)) {
        if (score > highScoreVal) {
            alert("Congrats! You made a new High Score. Press OK to play again.");
            highScoreVal = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreVal));
            myHighScore.innerHTML = "High Score: " + highScoreVal;
        }
        else alert("GAME OVER! Press OK to play again.");
        score = 0;
        myScore.innerHTML = "Score: " + score;
        gameOverSound.play();
        musicSound.pause();

        dir = { x: 0, y: 0 };
        snakeBody = [{ x: Math.round(2 + 18 * Math.random()), y: Math.round(2 + 18 * Math.random()) }];
        food = { x: Math.round(2 + 18 * Math.random()), y: Math.round(2 + 18 * Math.random()) };
        musicSound.play();
    }

    // GamePlay, after each food eaten
    if (snakeBody[0].x == food.x && snakeBody[0].y == food.y) {
        score++;
        myScore.innerHTML = "Score: " + score;
        eatSound.play();
        snakeBody.unshift({ x: snakeBody[0].x + dir.x, y: snakeBody[0].y + dir.y }); // add head to the place where food was present(increase length)
        food = { x: Math.round(2 + 18 * Math.random()), y: Math.round(2 + 18 * Math.random()) }
        // console.log(food.x);
        // console.log(food.y);
    }

    // Move snake towards the head(shift all blocks forward)

    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }; // creating new object using "..." to move 
    }
    snakeBody[0].x += dir.x;
    snakeBody[0].y += dir.y;

    // Displaying the Snake 
    playField.innerHTML = "";
    snakeBody.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('snakeHead');
        }
        else snakeElement.classList.add('snakeBody');
        playField.appendChild(snakeElement);
    });

    // Displaying the Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    playField.appendChild(foodElement);

}



// Implementation of the logic

let highScore = localStorage.getItem("highScore");
if (highScore === null) {
    highScoreVal = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreVal));
}
else {
    highScoreVal = JSON.parse(highScore);
    myHighScore.innerHTML = "High Score: " + highScoreVal;
}

window.requestAnimationFrame(main);
dir = { x: 0, y: 0 }; // Starting the game
prevDir = { x: 0, y: 0 };

window.addEventListener('keydown', e => {
    musicSound.play();
    moveSound.play();
    switch (e.key) {
        case "w":
        case "ArrowUp":
            if (prevDir.y !== 0) break;
            dir.x = 0;
            dir.y = -1;
            break;
        case "s":
        case "ArrowDown":
            if (prevDir.y !== 0) break;
            dir.x = 0;
            dir.y = 1;
            //console.log("DOWN");
            break;
        case "a":
        case "ArrowLeft":
            if (prevDir.x !== 0) break;
            dir.x = -1;
            dir.y = 0;
            //console.log("LEFT");
            break;
        case "d":
        case "ArrowRight":
            if (prevDir.x !== 0) break;
            dir.x = 1;
            dir.y = 0;
            // console.log("RIGHT");
            break;
        default:
            break;
    }
    prevDir = dir;
});