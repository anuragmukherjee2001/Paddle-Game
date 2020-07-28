var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeed = 10;
var ballSpeedY = 4;

var paddle1Y = 250;
var paddle2Y = 250;

var player1Score = 0;
var player2Score = 0;

var show_score = false;

const paddle_height = 100;
const paddle_thickness = 10;

const winning_score = 3;

function calculateMousePos(evt) {

    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;

    return {

        x: mouseX,
        y: mouseY

    };
}

function handleMouseClick(evt) {

    if (show_score) {

        player1Score = 0;
        player2Score = 0;
        show_score = false;

    }
}

window.onload = function () {

    canvas = document.getElementById('gamecanvas');
    canvasContext = canvas.getContext('2d');

    var FPS = 30;

    setInterval(callBoth, 1000 / FPS);

    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove',
        function (evt) {

            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - (paddle_height / 2);

        });

}

function DrawDash() {
    for (var i = 0; i < canvas.height; i = i + 40) {
        colorRect(canvas.width / 2 - 1, i, 2, 20, 'white');

    }
}

function drawEverything() {

    // It blacks out the screen

    colorRect(0, 0, canvas.width, canvas.height, 'black');

    if (show_score) {

        canvasContext.fillStyle = "white";

        if (player1Score >= winning_score) {

            canvasContext.fillText("You Won!!", 350, 200);
        }

        else if (player2Score >= winning_score) {

            canvasContext.fillText("Computer Won!!", 350, 200);
        }
        canvasContext.fillText("click to Continue", 350, 500);
        return;

    }

    // calling of the dashed line

    DrawDash();

    // This is left palyer bat

    colorRect(0, paddle1Y, paddle_thickness, 100, 'white');

    // This draws the right player bat

    colorRect(canvas.width - paddle_thickness, paddle2Y, paddle_thickness, 100, 'white');


    // This line draws the ball

    ColorCircle(ballX, ballY, 10, 'white');

    // This will display the score

    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width - 100, 100);

}

function ColorCircle(centerX, centerY, radius, drawcolor) {

    canvasContext.fillStyle = drawcolor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();

}

function computerMovement() {

    var paddle2Ycenter = paddle2Y + (paddle_height / 2);

    if (paddle2Ycenter < ballY - 35) {

        paddle2Y = paddle2Y + 6;
    }
    else if (paddle2Ycenter > ballY + 35) {

        paddle2Y = paddle2Y - 6;

    }
}

function moveEverything() {

    if (show_score) {

        return;

    }

    computerMovement();

    ballX = ballX + ballSpeed;
    ballY = ballY + ballSpeedY;

    // moving of the game

    if (ballX > canvas.width) {

        // ballSpeed = -ballSpeed;

        if (ballY > paddle2Y && ballY < paddle2Y + paddle_height) {

            ballSpeed = -ballSpeed;

            var deltaX = ballX - (paddle2Y + paddle_height / 2);
            ballSpeedX = deltaX * 0.35;
        }

        else {

            player1Score = player1Score + 1;
            ballReset();
        }
    }
    if (ballX < 0) {

        if (ballY > paddle1Y && ballY < paddle1Y + paddle_height) {

            ballSpeed = -ballSpeed;

            var deltaY = ballY - (paddle1Y + paddle_height / 2);
            ballSpeedY = deltaY * 0.35;
        }
        else {

            player2Score = player2Score + 1;
            ballReset();
        }

    }

    if (ballY > canvas.height) {

        ballSpeedY = -ballSpeedY;
    }

    if (ballY < 0) {

        ballSpeedY = -ballSpeedY;
    }
}

function callBoth() {

    // calls both the function

    moveEverything();
    drawEverything();

}

function colorRect(leftX, topY, width, height, drawColor) {

    // Creates the canvas

    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function ballReset() {

    if (player1Score >= winning_score || player2Score >= winning_score) {

        show_score = true;

    }

    ballSpeed = -ballSpeed;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;

}