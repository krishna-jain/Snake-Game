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
let firstVis = true;
let mins = 0;
let secs = 0;
// Functions here

setTimeout(( ) =>{
    let username = localStorage.getItem("username");
    if(username === null || username == "Gamer")
    {
        username = prompt("Enter a nickname", "Gamer");
        localStorage.setItem("username", username);
        snakeSpeed = prompt("Welcome to Snake's Snack Time " + username + "! Enter the speed of your snake: ", 10);
    }
    else
    {
        snakeSpeed = prompt("Welcome back " + username + "! Enter the speed of your snake: ", 10);
    }
    myName.innerHTML = username;
}, 500);

let startTime = new Date().getTime()/1000;
function main(ctime) {
    window.requestAnimationFrame(main);
    //console.log(ctime/1000);
    if ((ctime - prevTime) / 1000 < 1 / snakeSpeed) {
        return;
    }
    else {
        prevTime = ctime;
        DisplayGame();
    }
    //console.log(ctime/1000);
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

    if(!firstVis)
    {
        let timeElapsed = new Date().getTime()/1000 - startTime;
        
        //console.log(timeElapsed);
        timeElapsed = Math.round(timeElapsed);
        mins = timeElapsed/60;
        mins = Math.floor(mins);
        // console.log("TimeElabsed" + timeElapsed);
        // console.log("MINS" + mins);
        // console.log("secs" + secs);

        secs = timeElapsed % 60;
        let secString, minString;
        if(secs <= 9)
        {
            secString = "0"+secs;
        }
        else secString = secs;
        if(mins <= 9)
        {
            minString = "0"+mins;
        }
        else minString = mins;
        myTime.innerHTML = minString + ":" + secString;
        //console.log();
    }
    if (isCollide(snakeBody)) {
        gameOverSound.play();
        musicSound.pause();
        firstVis = true;
        myTime.innerHTML = "00:00";
        if (score > highScoreVal) {
            alert("Congrats! You made a new High Score. Press OK to play again.");
            highScoreVal = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreVal));
            myHighScore.innerHTML = "High Score: " + highScoreVal;
        }
        else alert("GAME OVER! Press OK to play again.");
        score = 0;
        myScore.innerHTML = "Score: " + score;
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
    
    if(firstVis)
    {
        firstVis = false;
        startTime = new Date().getTime()/1000;
    }

    musicSound.play();
    moveSound.play();
    musicSound.volume = 0.2;
    moveSound.volume = 0.1;
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
