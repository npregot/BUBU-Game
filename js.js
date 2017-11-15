var canvas; 
var canvasContext;
var ball_x = 400;  // position of the ball for the x coordinate
var ball_y = 300;  // position of the ball for the y coordinate
var ball_speed_x = 5;  // ball's speed for the x coordinate
var ball_speed_y = 5;  // ball's speed for the y coordinate

var paddle1Y = 250; // Initial position of paddle1 relative to the y 
var paddle2Y = 250; // Initial position of paddle2 relative to the y
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;


var playerLeft = 0; // Starting score left player 
var playerRight = 0; // Starting score right player
const WINNING_SCORE = 5; // Score needed to win

var showingWinScreen = false; // Winning page showing the winner & option to play again

// To allow the paddle to move with the mouse
function calculateMousePosition (evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {x:mouseX, y:mouseY};
	}

// Event function when the User clicks after the match has ended
function handleMouseCLick(evt) {
	if(showingWinScreen){
		playerLeft = 0;
		playerRight = 0;
		showingWinScreen = false;
	}
}

// Events happening when the page is loaded
window.onload = function() {
	// "gameCanvas" is the id of element in HTML file, look up Ref.1
	canvas = document.getElementById('gameCanvas');
	// getContext() will allow to create elements in the canvas
	canvasContext = canvas.getContext('2d');
	// setInterval() calls functions every so often, 
	// "7" is interval in milliseconds
	setInterval(function(){
			drawEverything();
			moveEverything();
	}, 7);

	canvas.addEventListener('mousedown', handleMouseCLick);

	canvas.addEventListener('mousemove', 
		function(evt) {
				var mousePos = calculateMousePosition(evt);
				paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
	});

} // END of window.onload	


// The ball is set to beginning position after a point is scored
function ballReset() {
	if(playerLeft >= WINNING_SCORE || playerRight >= WINNING_SCORE){
		showingWinScreen = true;

	}
	ball_speed_x = - ball_speed_x;
	ball_x = canvas.width/2;
	ball_y = canvas.height/2;

}


// Function controlling the movement of the paddle handled by the computer
function computerMovement(){
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
	 if(paddle2YCenter < ball_y - 35){
	 	paddle2Y += 7;
	 	}
 	else if (paddle2YCenter > ball_y - 35){
 		paddle2Y -= 7;
 	}
}



function moveEverything() { // elements of the canvas moving
	if(showingWinScreen){
		return;
		}
	computerMovement();
	ball_x += ball_speed_x;
	ball_y += ball_speed_y;

	// bounce the ball from the RIGHT side of the canvas
	if (ball_x > canvas.width - 5){  // "canvas.width" is the right limit x = 800
		// ball_speed_x = - ball_speed_x;	
		if(ball_y > paddle2Y && ball_y < paddle2Y + PADDLE_HEIGHT){
			ball_speed_x = - ball_speed_x;

			var deltaY = ball_y - (paddle2Y + PADDLE_HEIGHT / 2);
			ball_speed_y = deltaY * 0.35;


			}
		else {
			playerLeft ++; // must be BEFORE ballReset()
			ballReset();
			}

	}
	// bounce the ball from the LEFT side of the canvas
	if (ball_x < 5){ // "0" is left limit x = 0
		
		if(ball_y > paddle1Y && ball_y < paddle1Y + PADDLE_HEIGHT){
			ball_speed_x = - ball_speed_x;

			var deltaY = ball_y - (paddle1Y + PADDLE_HEIGHT / 2);
			ball_speed_y = deltaY * 0.35;

			}
		else {
			playerRight ++; // must be BEFORE ballReset()

			ballReset();

			}		

	} 
	// bounces the ball from the BOTTOM side of the canvas
	if (ball_y > canvas.height - 5){
		ball_speed_y = - ball_speed_y; 


		
	}
	// bounces the ball from the TOP side of the canvas
	if (ball_y < 5){
		ball_speed_y = - ball_speed_y;



	}
} // END of function moveEverything



// For loop drawing the middle net
function drawNet(){
	for(var i=0; i<canvas.height; i+= 40)
	colorRect(canvas.width / 2 - 1, i, 2, 20, 'white');
}




// elements of the canvas displayed
function drawEverything() { 

	// IMPORTANT: For canvas' dimension look up Ref.1 in HTML file
	colorRect(0,0,canvas.width,canvas.height, 'black');  // the canvas (black box)

			if(showingWinScreen){

			canvasContext.font = "50px Impact";
			canvasContext.fillStyle = '#f45c42';
			if(playerLeft >= WINNING_SCORE) {canvasContext.fillText("You won!", canvas.width / 2 - 80, 200)}
			else if(playerRight >= WINNING_SCORE) {canvasContext.fillText("You lost!", canvas.width / 2 - 80, 200)}

			//canvasContext.fillStyle = 'red';
			canvasContext.fillText("Click To Continue", canvas.width / 2 - 175, 500);
			return;
		}

	drawNet();	

	colorRect(0,paddle1Y,PADDLE_THICKNESS,100,'white');  // the white paddle on the left
	colorRect(canvas.width - PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,100,'white'); // the white paddle on the right
	// colorRect(ball_x,ball_y,25,25, 'red');  // the ball as rectangle(red)
	colorCircle(ball_x, ball_y, 10, 'yellow');
	
	canvasContext.fillStyle = '#c5f7c6';
	canvasContext.font = "40px Helvetica";
	canvasContext.fillText(playerLeft, 100, 100,);
	canvasContext.fillText(playerRight, canvas.width - 100, 100);
	}

// next function draws the ball
function colorCircle (centerX, centerY, radius, drawColor){
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
	}

// "colorRect()" is the "template" function to draw elements in the canvas
function colorRect(leftX, topY, width, height, drawColor){
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
	}










