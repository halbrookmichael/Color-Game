var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".circle");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message")
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

// Reset and get new colors
resetButton.addEventListener("click", reset);

function init() {
	setUpModeButtons();
	setUpSquares();
	reset();
}

function setUpSquares() {
	// Loop through colors
	for(i = 0; i < squares.length; i ++){
		// add click listeners
		squares[i].addEventListener("click", function(){
			// Grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			// Compare color to pickedColor to see if correct
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?"
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function setUpModeButtons() {
	// Mode button event listeners
	for(i = 0; i < modeButtons.length; i ++){
		modeButtons[i].addEventListener("click", function(){
			removeSelectedFromButtons();
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares =6;
			reset();
		});
	}
}

function changeColors(color){
	for(i = 0; i < squares.length; i ++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	// Make an array
	var arr = [];
	// Add num random colors to array
	for(i = 0; i < num; i ++){
		// Get random color and push into array
		arr.push(randomColor());
	}
	// Return the array
	return arr;
}

function randomColor(){
	// Pick a red from 0-255
	var r = Math.floor(Math.random() * 256);
	// Pick a green from 0-255
	var g = Math.floor(Math.random() * 256);
	// Pick a blue from 0-255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function reset() {
	// Generate all new colors
	colors = generateRandomColors(numSquares);
	// Pick new random colors from array
	pickedColor = pickColor();
	// Change color display to match picked color
	colorDisplay.textContent = pickedColor;
	// Change display text
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	// Change colors of sqaures
	for(i = 0; i < squares.length; i ++){
		if(colors[i]){
			squares[i].style.display = "block";
			// Add initial colors
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "";
}

function removeSelectedFromButtons() {
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].classList.remove("selected");
	}
}