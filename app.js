const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

let ballCoords = {
  x: 20,
  y: 20
};

let direction = 'SE';
let turnNumber = 1;
let ballSpeed = 8;

let touchedTopWall = false;
let touchedBottomWall = false;
let touchedLeftPaddle = false;
let touchedRightPaddle = false;
let escapedLeft = false;
let escapedRight = false;

document.getElementById("left-paddle").style.top = `${windowHeight/2 - 75}px`;
document.getElementById("right-paddle").style.top = `${windowHeight/2 - 75}px`;
document.getElementById("net").style.height = `${windowHeight}px`;
document.getElementById("net").style.left = `${windowWidth/2}px`;
document.getElementById("ball").style.top = `${windowHeight/2}px`;
document.getElementById("ball").style.left = `${windowWidth/2}px`;
document.getElementById("left-score").style.left = `${windowWidth/4}px`;
document.getElementById("right-score").style.left = `${windowWidth*3/4}px`;

window.onload = function() {
  window.requestAnimationFrame(step)
};

document.onkeydown = (e) => {
  const leftPaddlePos = parseInt(document.getElementById("left-paddle").style.top);
  const rightPaddlePos = parseInt(document.getElementById("right-paddle").style.top);

  if (e.keyCode == '38' && rightPaddlePos > 0) {
    document.getElementById("right-paddle").style.top = `${parseInt(rightPaddlePos)-60}px`;
  } else if (e.keyCode == '40' && rightPaddlePos < windowHeight - 150) {
    document.getElementById("right-paddle").style.top = `${parseInt(rightPaddlePos)+60}px`;
  }
  if (e.keyCode == '87' && leftPaddlePos > 0) {
    document.getElementById("left-paddle").style.top = `${parseInt(leftPaddlePos)-60}px`;
  } else if (e.keyCode == '83' && leftPaddlePos < windowHeight - 150) {
    document.getElementById("left-paddle").style.top = `${parseInt(leftPaddlePos)+60}px`;
  }
};

const step = () => {
  detectCollisionOrEscape();
  changeDirection();
  handleEscapes();
  changeCoords();
  changeBallPosition();
  window.requestAnimationFrame(step);
};

const detectCollisionOrEscape = () => {
  const leftPaddlePosition = parseInt(document.getElementById("left-paddle").style.top);
  const rightPaddlePosition = parseInt(document.getElementById("right-paddle").style.top);

  if(ballCoords.y > windowHeight - 30) {
    touchedBottomWall = true;
  } else if(ballCoords.y < 0) {
    touchedTopWall = true;
  } else if(ballCoords.x > windowWidth - 60 && ballCoords.y > rightPaddlePosition && ballCoords.y < rightPaddlePosition + 150) {
    touchedRightPaddle = true;
  } else if(ballCoords.x < 30 && ballCoords.y > leftPaddlePosition && ballCoords.y < leftPaddlePosition + 150) {
    touchedLeftPaddle = true;
  } else if (ballCoords.x < 15) {
    escapedLeft = true;
  } else if (ballCoords.x > windowWidth - 15) {
    escapedRight = true;
  }
};

const changeDirection = () => {
  if (touchedBottomWall) {
    direction === 'SE' ? direction = 'NE' : direction = 'NW';
    touchedBottomWall = false;
  } else if(touchedTopWall) {
    direction === 'NE' ? direction = 'SE' : direction = 'SW';
    touchedTopWall = false;
  } else if(touchedRightPaddle) {
    direction === 'SE' ? direction = 'SW' : direction = 'NW';
    touchedRightPaddle = false;
  } else if(touchedLeftPaddle) {
    direction === 'NW' ? direction = 'NE' : direction = 'SE';
    touchedLeftPaddle = false;
  }
};

const handleEscapes = () => {
  if(escapedLeft) {
    resetBall();
    updateScore('right');
    escapedLeft = false;
  } else if(escapedRight) {
    resetBall();
    updateScore('left');
    escapedRight = false;
  }
};

const resetBall = () => {
  if(turnNumber % 2) {
    direction = 'SW';
    ballCoords.x = windowWidth - 20;
    ballCoords.y = 20;
  }
  else {
    direction = 'SE';
    ballCoords.x = 20;
    ballCoords.y = 20;
  }
  if(turnNumber % 10 === 0) {
    ballSpeed += 2;
  }
  turnNumber += 1;
};

const updateScore = (player) => {
  const leftScore = parseInt(document.getElementById("left-score").textContent);
  const rightScore = parseInt(document.getElementById("right-score").textContent);
  if(player === 'left') {
    document.getElementById("left-score").textContent = leftScore + 1;
  }
  else if(player === 'right') {
    document.getElementById("right-score").textContent = rightScore + 1;
  }
};

const changeCoords = () => {
  if(direction === 'SE') {
    ballCoords.x += ballSpeed;
    ballCoords.y += ballSpeed;
  }
  if(direction === 'SW') {
    ballCoords.x -= ballSpeed;
    ballCoords.y += ballSpeed;
  }
  if(direction === 'NW') {
    ballCoords.x -= ballSpeed;
    ballCoords.y -= ballSpeed;
  }
  if(direction === 'NE') {
    ballCoords.x += ballSpeed;
    ballCoords.y -= ballSpeed;
  }
};

const changeBallPosition = () => {
  document.getElementById("ball").style.left = `${ballCoords.x}px`;
  document.getElementById("ball").style.top = `${ballCoords.y}px`;
};
