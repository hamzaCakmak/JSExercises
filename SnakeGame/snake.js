var gridSize = 20;
var snake;
var newDir;
var timer;
var tickSpeed;
var food;
var score;
var crashed;
var paused;
var gameMode;
var started=false;
var whichLevel;
var gameStatus;
var name = document.getElementById("helper").getAttribute("data-name");
var gameStatusF = function (condition) {

	gameStatus = condition;
};
var level = function(levelstat){
	whichLevel = levelstat;
};
var setup = function() {
	createCanvas(600,600);
	newDir = "right";
	timer = millis();
	tickSpeed = 70;	
	score = 0;
	textSize(32);
	textAlign(CENTER, TOP);
	crashed = false;
	paused = false;
	food = {
		x: floor(random(0, width/gridSize))*gridSize + 10,
		y: floor(random(5, height/gridSize))*gridSize + 10
	}
	snake = {
		dir: "right",
		x: 110,
		y: 50,
		tail: [
			{x: 50, y:50},
			{x: 70, y:50},
			{x: 90, y:50}
			]
		};
};
var draw = function(){
	if(gameStatus ==="start"){
		if(paused){
		return;
	}
	if(millis() - timer >= tickSpeed){
	background(255,255,86);
	snake.dir = newDir;
	if(!crashed){
		snakeMove();
	}
		crashCheck();
		snakeDraw();
		eatFood();
		drawFood();
		drawScore();
	if (whichLevel === "medium"){
		drawBarMed();
	}else if(whichLevel ==="hard"){
		drawBarHard();
	}else if(whichLevel ==="easy"){
		
	}
		timer = millis();
	}
	
	}
};
var reportMessage = function() {
			if(whichLevel === "medium" || whichLevel ==="easy"){
				fill(0,0,0);
				rect(width/2 -100, height/2 -50,200,100);
				fill(255,0,0);
				text("CRASHED", width/2, height/2-16);
			}else {
				fill(0,0,0);
				rect(width-380, height-490 -50,200,100);
				fill(255,0,0);
				text("CRASHED", width-280, height-505);
			}
			
}
var crashCheck = function(){
	for(var i = 0; i < snake.tail.length; i++){
		if(snake.x === snake.tail[i].x && snake.y === snake.tail[i].y){
			crashed = true;
			reportMessage();
		}
	}
	if(whichLevel === "medium"){
		if(snake.x>0 && snake.y<30){
			crashed = true;
			reportMessage();
		}else if(snake.x <30 && snake.y<=70 || snake.x >= 570 && snake.y <= 70){
			crashed = true;
			reportMessage();
		}else if (snake.x>0 && snake.y>550){
			crashed = true;
			reportMessage();
		}else if(snake.x<30 && snake.y > 490 || snake.x >= 570 && snake.y >490){
			crashed = true;
			reportMessage();
		}
	}else if (whichLevel === "hard"){
		if(snake.y<30||snake.x<30||snake.x>550||snake.y>550){
			crashed = true;
			reportMessage();
		}else if(snake.y<390 && snake.y >190 && snake.x===230){
			crashed = true;
			reportMessage();
		}else if(snake.y<390 && snake.y >190 && snake.x===370){
			crashed = true;
			reportMessage();
		}
		
	}
	
};

var eatFood = function(){
	if(food.x == snake.x && food.y==snake.y){
		snake.tail.push({x: snake.x, y: snake.y});
		moveFood();
	}
	
};
var moveFood = function(){
	food.x = floor(random(10, width/gridSize))*gridSize-30;
	food.y = floor(random(10, height/gridSize))*gridSize-30;
	for(var i = 0; i < snake.tail.length; i++){
		if(food.x === snake.tail[i].x && food.y === snake.tail[i].y){
			moveFood();
		}
	}
	score=score+10;
};
var drawFood = function() {
	fill(255,0,0);
	rect(food.x, food.y, gridSize, gridSize);
};

var snakeDraw = function() {
	fill(150, 255, 0);
	rect(snake.x, snake.y, gridSize, gridSize);
	
	for(var i=0; i < snake.tail.length; i++){
		fill(0,255,0);
		stroke(0,0,0);
		strokeWeight(1);
		rect(snake.tail[i].x, snake.tail[i].y, gridSize, gridSize);
	}
};

var drawScore = function(){
	fill(0,0,0);
	text(score, width/2,height-570);
};

var drawBarMed = function() {
	fill(0);
	//Up side
	rect(10,10,580,20);
	//Up side left stick
	rect(10,10,20,80);
	//Up side right stick
	rect(570,10,20,80);
	//Down side
	rect(10,570,580,20);
	//Down side left stick	
	rect(10,510,20,70);
	//Down side right stick
	rect(570,510,20,70);
	
};
var drawBarHard = function() {
	fill(0);
	//Up Side
	rect(10,10,580,20);
	//Left Side
	rect(10,20,20,570);
	//Right Side
	rect(570,20,20,570);
	//Down Side
	rect(25,570,550,20);
	rect(370,210,20,180);
	rect(230,210,20,180);
	
};


var snakeMove = function(){
	snake.tail.push({x: snake.x, y: snake.y});
	if(snake.dir === "right"){
		snake.x += gridSize;
	} else if (snake.dir === "left"){
		snake.x -= gridSize;
	} else if (snake.dir === "up"){
		snake.y -= gridSize;
	} else if (snake.dir === "down"){
		snake.y += gridSize;
	}
	wrap();
	snake.tail.splice(0,1);
};


var keyPressed = function(){
	if(keyCode === RIGHT_ARROW && snake.dir !== "left"){
		newDir = "right";
	}
	if (keyCode === LEFT_ARROW && snake.dir !== "right"){
		newDir = "left";
	}
	if(keyCode === UP_ARROW && snake.dir !== "down"){
		newDir = "up";
	}
	if(keyCode === DOWN_ARROW && snake.dir !== "up"){
		newDir = "down";
	}
	if(keyCode === 82 && crashed){
		setup();
	}
	if(keyCode === 80 && !crashed){
		if(paused) {
			paused = false;
		} else {
			paused = true;
			fill(0,0,0);
			rect(width/2 -100, height/2 -50,200,100);
			fill(255,255,255);
			text("PAUSED", width/2, height/2-16);
		}
	}
};

var wrap = function(){
	if(snake.x > (width-20)){
		snake.x = snake.x - (width-20);
	} else if (snake.x < 0){
		snake.x = snake.x + width;
	} else if (snake.y > (height-20)){
		snake.y = snake.y - (height-20);
	} else if (snake.y < 0){
		snake.y = snake.y + (height-20);
	}
};
var touchX;
var touchY;
var touchId;

document.getElementById('body').addEventListener('touchstart', function (e) {
    // e.preventDefault();
    touchX = e.touches[0].pageX;
    touchY = e.touches[0].pageY;
    touchId = e.touches[0].identifier;
});

document.getElementById('tetris').addEventListener('touchend', function (e) {
    // e.preventDefault();
    var touchEndX;
    var touchEndY;
    var touch = e.changedTouches.item(0);
    try {
        touchEndX = touch.pageX;
        touchEndY = touch.pageY;
    } catch (err) {
        console.log(arr);
        return;
    }

    var difX = (touchEndX - touchX);
    var difY = (touchEndY - touchY);
    // console.log("DiffX: "+difX)
    // console.log("DiffY: "+difY)
    if (difX > 50) {
        snake.dir="right";
    }
    else if (difX < -50) {
        snake.dir="left";
    }
    else if (difY < -50) {
        snake.dir="up";
    }
    else if (difY < 50) {
        snake.dir="down";
    }
})
