var gridSize = 20;
var snake;
var newDir;
var timer;
var speed;
var food;
var score;
var crash;
var pause;
var gameMode;
var started=false;
var whichLevel;
var gameStatus;
var reloaded=false;

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
	speed = 70;	
	score = 0;
	textSize(32);
	textAlign(CENTER, TOP);
	crash = false;
	pause = false;
	food = {
		x: 90,
		y: 310
	}
//	console.log(food.x +"food"+ food.y);
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
	if(reloaded==true){
		pause=false;		
	}
	    reloaded = false;
            if(pause){
		return;
	    }
	    if(millis() - timer >= speed){
	    background(255,255,86);
	    snake.dir = newDir;
	    if(!crash){
		    snakeMove();
	    }else{
		var r = confirm("Press okey button to continue!");
		if(r == true){
		  setup();
		}else {
		  pause = true;
		  reloaded = true;
		  gameStatus = "stop";

		}
	    }
		checkCrash();
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
var checkCrash = function(){
	for(var i = 0; i < snake.tail.length; i++){
		if(snake.x === snake.tail[i].x && snake.y === snake.tail[i].y){
			crash = true;
			reportMessage();
		}
	}
	if(whichLevel === "medium"){
		if(snake.x>0 && snake.y<30){
			crash = true;
			reportMessage();
		}else if(snake.x <30 && snake.y<=70 || snake.x >= 570 && snake.y <= 70){
			crash = true;
			reportMessage();
		}else if (snake.x>0 && snake.y>550){
			crash = true;
			reportMessage();
		}else if(snake.x<30 && snake.y > 490 || snake.x >= 570 && snake.y >490){
			crash = true;
			reportMessage();
		}
	}else if (whichLevel === "hard"){
		if(snake.y<30||snake.x<30||snake.x>550||snake.y>550){
			crash = true;
			reportMessage();
		}else if(snake.y<390 && snake.y >190 && snake.x===230){
			crash = true;
			reportMessage();
		}else if(snake.y<390 && snake.y >190 && snake.x===370){
			crash = true;
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
		if(food.x === snake.tail[i].x && food.y === snake.tail[i].y ){
			moveFood();
		}
		
		if(whichLevel === "medium"){
			if(food.x > 0 && food.y<30 ){
				moveFood();
			}else if(food.x <30 && food.y<=70 || food.x >= 570 && food.y <= 70){
				moveFood();
			}else if (food.x>0 && food.y>550){
				moveFood();
			}else if(food.x<30 && food.y > 490 || food.x >= 570 && food.y >490){
				moveFood();
			}
		}else if (whichLevel === "hard"){
			console.log("hard if e girdi");
			if(food.y<30||food.x<30||food.x>550||food.y>550){
				moveFood();
			}else if(food.y<390 && food.y >190 && food.x===230){
				moveFood();
			}else if(food.y<390 && food.y >190 && food.x===370){
				moveFood();
			}
		
	}
	}
	//console.log(food.x +"//"+ food.y);
	score=score+10;
	speed--;
};
var drawFood = function() {
	fill(255,0,0);
	rect(food.x, food.y, gridSize, gridSize);
};

var snakeDraw = function() {
	fill(55, 112, 206);
	rect(snake.x, snake.y, gridSize, gridSize);
	
	for(var i=0; i < snake.tail.length; i++){
		fill(123, 166, 237);
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
	//console.log(snake.x +"  /  "+ snake.y);
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
	if(keyCode === 82 && crash){
		setup();
	}
	if(keyCode === 80 && !crash){
		if(pause) {
			pause = false;
		} else {
			pause = true;
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

document.body.addEventListener('touchstart', function (e) {
    // e.preventDefault();
    touchX = e.touches[0].pageX;
    touchY = e.touches[0].pageY;
    touchId = e.touches[0].identifier;
});

document.body.addEventListener('touchend', function (e) {
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
    //console.log("DiffX: "+difX)
    //console.log("DiffY: "+difY)
    if (difX > 50 && snake.dir !== "left") {
        newDir="right";
    }
    else if (difX < -50 && snake.dir !== "right" ) { 
        newDir="left";
    }
    else if (difY < -50 && snake.dir !== "down") { 
        newDir="up";
    }
    else if (difY > 50 && snake.dir !== "up") {
        newDir="down";
    }else if (difX == 0 && difY ==0 && !crash){ 
    	if(pause) {
		pause = false;
	} else {
		pause = true;
		fill(0,0,0);
		rect(width/2 -100, height/2 -50,200,100);
		fill(255,255,255);
		text("PAUSED", width/2, height/2-16);
		}
    }
})
