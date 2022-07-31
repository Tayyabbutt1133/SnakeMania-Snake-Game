//Snake initial position 
let inputDir = { x: 0, y: 0 };
const foodaudio = new Audio('food.mp3');
const gameoveraudio = new Audio('gameover.mp3');
const moveaudio = new Audio('move.mp3');
const gamemusic = new Audio('music.mp3');



//  initializing some variables for use
let speed = 10;
let lastPaintTime = 0;
//snake making 
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };
//this is when snake eats food score will increment accordingly.
let score = 0;



//game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    //  console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gamemusic.play();
    gameEngine();
}


function isCollide(snake) {
    //when you collide with yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
            gamemusic.pause();
        }

    }
    //    if you collapse with wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
        gamemusic.pause();
    }
}



function gameEngine() {
    //part 1 updating the snake 
    if (isCollide(snakeArr)) {

        gameoveraudio.play();
        gamemusic.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over.Press Any Key to Play Again!");
        snakeArr = [{ x: 13, y: 15 }]
        gamemusic.play();
        score = 0;
    }

    //if snake eats the food then increment the food and regenrate 
    //the food 
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodaudio.play();
        score = score + 1;
        //to save highscore in local storage 
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            HighscoreBox.innerHTML = "HighScore:" + hiscoreval;
        }
        scoreBox.innerHTML = "Score:" + score;
        //here when snake eats the food we are increasing his tail and in simple words increment snake 
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        //and when snakes eats then we also generate  snake food 
        //to find random number 
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //Now to move snake 
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;












    //part 3   display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    });
    // part 4 display food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);



}




//main logic starts here
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}

else {
    hiscoreval = JSON.parse(hiscore);
    HighscoreBox.innerHTML = "HighScore:" + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }//game starts when keydown 
    moveaudio.play();
    //now we have to detect which key is clicked 
    //keys directions
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            //input.Dir:this is basically snake velocity means that when 
            //we click on some point it travels across that direction
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;


        default:
            break;
    }
});