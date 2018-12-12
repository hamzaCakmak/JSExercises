
var gridSize = 20;
var snake;
var newDir;
var timer;
var tickSpeed;
var apple;
var score;

var setup = function() {
	createCanvas(600,600);
	newDir = "right";
	timer = millis();
	tickSpeed = 50;
	score = 0;
	textSize(40);
	textAlign(CENTER, TOP);
	apple = {
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
	if(millis() - timer >= tickSpeed){
	background(255,255,86);
	snake.dir = newDir;
	moveSnake();
	drawSnake();
	eatApple();
	drawApple();
	//drawScore();
	timer = millis();
	}
};
var eatApple = function(){
	if(apple.x == snake.x && apple.y==snake.y){
		snake.tail.push({x: snake.x, y: snake.y});
		moveApple();
	}
	
};
var moveApple = function(){
	apple.x = floor(random(0, width/gridSize))*gridSize + 10;
	apple.y = floor(random(5, height/gridSize))*gridSize + 10;
	for(var i = 0; i < snake.tail.length; i++){
		if(apple.x === snake.tail[i].x && apple.y === snake.tail[i].y){
			moveApple();
		}
	}
};
var drawApple = function() {
	fill(255,0,0);
	rect(apple.x, apple.y, gridSize, gridSize);
};

var drawSnake = function() {
	fill(150, 255, 0);
	rect(snake.x, snake.y, gridSize, gridSize);
	
	for(var i=0; i < snake.tail.length; i++){
		fill(0,255,0);
		stroke(0,0,0);
		strokeWeight(1);
		rect(snake.tail[i].x, snake.tail[i].y, gridSize, gridSize);
	}
};
/*var drawScore = function(){
	fill(0,255,0);
	stroke(255,255,255);
	strokeWeight(1);
	noStroke();
};*/
var moveSnake = function(){
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
};

var wrap = function(){
	if(snake.x > width){
		snake.x = snake.x - width;
	} else if (snake.x < 0){
		snake.x = snake.x + width;
	} else if (snake.y > height){
		snake.y = snake.y - height;
	} else if (snake.y < 0){
		snake.y = snake.y + height;
	}
	
	

}