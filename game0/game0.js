let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let paddle1 = {
    x: 0,
    y: 0,
};
let paddle2 = {
    x: 0,
    y: 0,
};
let ball = {
    x: 0,
    y: 0,
    widthHeight: 15,
    xVelocity: 8,
    yVelocity: 4,
}

let paddleVelocity1 = paddleVelocity2 = 0;
let paddleWidth = 15;
let paddleHeight = 100;
let w = 0;
let h = 0;
let dy = 0;
let score1 = score2 = 0;
let randomY = 0;

let paddleSpeed = 10;


randomY = Math.random();
if(Math.round(randomY) == 0)
    ball.yVelocity = ball.yVelocity;
if(Math.round(randomY) == 1)
    ball.yVelocity = -ball.yVelocity;
randomX = Math.random();
if(Math.round(randomX) == 0)
    ball.xVelocity = ball.xVelocity;
if(Math.round(randomX) == 1)
    ball.xVelocity = -ball.xVelocity;


let keys = [];


//  1  -> false
//  -1 -> true
let starPress = 1;

let movementStopStart = 0;

let settingsInterval = 0;
let settingsOutline = 6;


//  Menu text
let textPaddleSpeed = 'Paddle Speed';
let textPaddleSpeedCenter = 0;
let textPaddleSpeedNumCenter = 0;
let textBallSpeed = 'Ball Speed';
let textBallSpeedCenter = 0;
let textBallSpeedNumCenter = 0;
let textMaxPoints = 'Max Points';
let textMaxPointsCenter = 0;
let textPoints10 = '10';
let textPoints20 = '20';
let textPoints30 = '30';
let textPointsInfinite = 'infinite';
let textMaxPointsNumCenter = 0;
let plus = '+';
let minus = '-';

//  10 - 10 points
//  20 - 20 points
//  30 - 30 points
let maxPoints = 0;
let infinitePoints = true;
let score2End = false;
let score1End = false;
let textPlayer1Win = 'Player 1 win!';
let textPlayer1WinWidth = 0;
let textPlayer2Win = 'Player 2 win!';
let textPlayer2WinWidth = 0;

let mouseX = 0;
let mouseY = 0;

//  Fullscreen
window.onload = function() {
    init();
    if ((w < window.innerWidth || w > window.innerWidth) || (h < window.innerHeight || w > window.innerHeight))
        screenCheck();
    //window.addEventListener('resize', screenCheck,false);
}
function init() {
    let deviceWidth = window.innerWidth;
    let deviceHeight = window.innerHeight;
    canvas.width = deviceWidth;
    canvas.height = deviceHeight;
    w = deviceWidth;
    h = deviceHeight;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, deviceWidth, deviceHeight);
    ctx.fillStyle = 'white';
    paddle1.y = canvas.height / 2 - 50;
    paddle2.y = canvas.height / 2 - 50;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ctx.fillRect(paddle1.x, paddle1.y, paddleWidth, paddleHeight);
    ctx.fillRect(deviceWidth - 16, paddle2.y, paddleWidth, paddleHeight);
    if(canvas.width % 2 == 0)
        ctx.lineWidth = 8;
    else
        ctx.lineWidth = 7;
    if(score1End == false && score2End == false) {
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
    }
    ctx.fillRect(ball.x - ball.widthHeight, ball.y - ball.widthHeight, ball.widthHeight, ball.widthHeight);
        ctx.font = "80px addl";
    ctx.fillText(score1, ((canvas.width / 2) / 2) - 40, paddleHeight);
    ctx.fillText(score2, canvas.width - ((canvas.width / 2) / 2), paddleHeight);

    if(starPress == 1)
        ctx.font = "80px addl";
    else if(starPress == -1)
        ctx.font = "50px addl";
    

    window.addEventListener("keypress",
        function(e){
            console.log(e.keyCode, starPress);
            if(e.keyCode == 42) {
                starPress = -starPress;
                if(starPress == -1) {
                    clearInterval(movementStopStart);
                    ctx.font = "50px addl";
                    settingsMenu();
                }
                else if(starPress == 1) {
                    clearInterval(settingsInterval);
                    ctx.font = "80px addl";
                    movement(keys);
                }
            }
        },
    false);



    window.addEventListener("keydown",
        function(e){
            //movement(keys);
            keys[e.keyCode] = e.keyCode;
            let keysArray = getNumberArray(keys);
            //document.body.innerHTML = "Keys currently pressed:" + keysArray;
            //if(keysArray.toString() == "17,65"){
            //    document.body.innerHTML += " Select all!"
            //}
            console.log(keysArray);
            //movement(keys);
    },
    false);

    window.addEventListener('keyup',
        function(e){
            //movement(keys);
            keys[e.keyCode] = false;
            //document.body.innerHTML = "Keys currently pressed: " + getNumberArray(keys);
            console.log(getNumberArray(keys));
            //movement(keys);
    },
    false);
    
    function getNumberArray(arr){
        var newArr = new Array();
        for(var i = 0; i < arr.length; i++){
            if(typeof arr[i] == "number"){
                newArr[newArr.length] = arr[i];
            }
        }
        return newArr;
    }
}

function movement(keys) {
    movementStopStart = setInterval(function() {
    /*  Player one  */
    if (keys[87] == 87 && paddle1.y > 0) {
        paddle1.y -= paddleSpeed;
        repaint();
    }
    if (keys[83] == 83 && paddle1.y < (canvas.height - paddleHeight)) {
        paddle1.y += paddleSpeed;
        repaint();
    }
    

    /*  Player two  */
    if (keys[38] == 38 && paddle2.y > 0) {
        paddle2.y -= paddleSpeed;
        repaint();
    }
    if (keys[40] == 40 && paddle2.y < (canvas.height - paddleHeight)) {
        paddle2.y += paddleSpeed;
        repaint();
    }

    /*  Ball  */
    if(score2End == false && score1End == false) {
        ball.x += ball.xVelocity;
        ball.y += ball.yVelocity;
    }
    repaint();
    if (ball.y < 0 && ball.yVelocity < 0) {
        ball.yVelocity = -ball.yVelocity;
        repaint();
    }
    if (ball.y > canvas.height && ball.yVelocity > 0) {
        ball.yVelocity = -ball.yVelocity;
        repaint();
    }
    if(ball.x < paddleWidth) {
        if(ball.y >= (paddle1.y - ball.widthHeight + 12) && ball.y <= (paddle1.y + paddleHeight + ball.widthHeight + 2)){
            ball.xVelocity = -ball.xVelocity;
            //randomY = Math.random();
            //if(Math.round(randomY) == 0)
                //dy = ball.y - (paddle1.y + paddleHeight);
            if(ball.y + ball.widthHeight / 2 > (paddle1.y + (paddleHeight / 2)))
                dy = 20;
            //if(Math.round(randomY) == 1)
                //dy = - ball.y + (paddle1.y + paddleHeight);
            if(ball.y - ball.widthHeight / 2 <= (paddle1.y + (paddleHeight / 2)))
                dy = -20;
            ball.yVelocity = dy * 0.1;
            repaint();
        } else {
            if(score2End == false)
                score2++;
            if(score2 < maxPoints || infinitePoints == true)
                resetBall();

            if(score2End == false) {
                if(score2 >= maxPoints && infinitePoints == false) {
                    score2End = true;
                    ctx.fillStyle = 'white';
                    textPlayer2WinWidth = ctx.measureText(textPlayer2Win).width;
                    ctx.fillText(textPlayer2Win, (canvas.width / 2) - (textPlayer2WinWidth / 2), canvas.height / 2);
                }
            }
        }
    }
    if(ball.x > canvas.width - paddleWidth) {
        if(ball.y >= (paddle2.y - ball.widthHeight + 12) && ball.y <= (paddle2.y + paddleHeight + ball.widthHeight + 2)){
            ball.xVelocity = -ball.xVelocity;
            //randomY = Math.random();
            //if(Math.round(randomY) == 0)    
                //dy = ball.y - (paddle2.y + paddleHeight);
            if(ball.y + ball.widthHeight / 2 > (paddle2.y + (paddleHeight / 2)))
                dy = 20;
            //if(Math.round(randomY) == 1)
                //dy = - ball.y + (paddle2.y + paddleHeight);
            if(ball.y - ball.widthHeight / 2 <= (paddle2.y + (paddleHeight / 2)))
                dy = -20;
            ball.yVelocity = dy * 0.1;
            repaint();
        } else {
            if(score1End == false)
                score1++;
            if(score1 < maxPoints || infinitePoints == true)
                resetBall();

            if(score1End == false) {
                if(score1 >= maxPoints && infinitePoints == false) {
                    score1End = true;
                    ctx.fillStyle = 'white';
                    textPlayer1WinWidth = ctx.measureText(textPlayer1Win).width;
                    ctx.fillText(textPlayer1Win, (canvas.width / 2) - (textPlayer1WinWidth / 2), canvas.height / 2);
                }
            }
        }
    }
    }, 10);
}

function repaint() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(paddle1.x, paddle1.y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - 16, paddle2.y, paddleWidth, paddleHeight);
    if(canvas.width % 2 == 0)
        ctx.lineWidth = 8;
    else
        ctx.lineWidth = 7;
    if(score1End == false && score2End == false) {
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
    }
    if(score2End == false && score1End == false)
        ctx.fillRect(ball.x - ball.widthHeight, ball.y - ball.widthHeight, ball.widthHeight, ball.widthHeight);
    ctx.fillText(score1, ((canvas.width / 2) / 2) - 40, paddleHeight);
    ctx.fillText(score2, canvas.width - ((canvas.width / 2) / 2), paddleHeight);
    

    if(score2 >= maxPoints && infinitePoints == false) {
        score2End = true;
        ctx.fillStyle = 'white';
        textPlayer2WinWidth = ctx.measureText(textPlayer2Win).width;
        ctx.fillText(textPlayer2Win, (canvas.width / 2) - (textPlayer2WinWidth / 2), canvas.height / 2);
    }    
    if(score1 >= maxPoints && infinitePoints == false) {
        score1End = true;
        ctx.fillStyle = 'white';
        textPlayer1WinWidth = ctx.measureText(textPlayer1Win).width;
        ctx.fillText(textPlayer1Win, (canvas.width / 2) - (textPlayer1WinWidth / 2), canvas.height / 2);
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.xVelocity = -ball.xVelocity;
    randomY = Math.random();
    if(Math.round(randomY) == 0)
        ball.yVelocity = 3;
    if(Math.round(randomY) == 1)
        ball.yVelocity = -3;
    if(score2End == false && score1End == false)
        ctx.fillRect(ball.x - ball.widthHeight, ball.y - ball.widthHeight, ball.widthHeight, ball.widthHeight);
}

/*function init2() {
    let deviceWidth = window.innerWidth;
    let deviceHeight = window.innerHeight;
    canvas.width = deviceWidth;
    canvas.height = deviceHeight;
    w = deviceWidth;
    h = deviceHeight;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, deviceWidth, deviceHeight);
    ctx.fillStyle = 'white';
    paddle1 = canvas.height/ 2 - 50;
    paddle2 = canvas.height / 2 - 50;
    ctx.fillRect(0, paddle1, paddleWidth, paddleHeight);
    ctx.fillRect(deviceWidth - 16, paddle2, paddleWidth, paddleHeight);
    
}*/

function screenCheck() {
    setInterval(function() {
        if ((w < window.innerWidth || w > window.innerWidth) || (h < window.innerHeight || h > window.innerHeight)){
            console.log(w);
            console.log(h);
            console.log(window.innerWidth);
            console.log(window.innerHeight);
            init();
        }
    }, 20);
    
}


function settingsMenu() {
    settingsInterval = setInterval(function() {
        ctx.fillStyle = 'rgb(5, 5, 5)';
        ctx.fillRect(canvas.width / settingsOutline, canvas.height / settingsOutline, canvas.width - 2 * (canvas.width / settingsOutline), canvas.height - 2*(canvas.height / settingsOutline));

        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.moveTo(canvas.width / settingsOutline, canvas.height / settingsOutline);
        ctx.lineTo(canvas.width / settingsOutline, canvas.height - canvas.height / settingsOutline);
        ctx.lineTo(canvas.width - canvas.width / settingsOutline, canvas.height - canvas.height / settingsOutline);
        ctx.lineTo(canvas.width - canvas.width / settingsOutline, canvas.height / settingsOutline);
        ctx.lineTo(canvas.width / settingsOutline, canvas.height / settingsOutline);
        ctx.stroke();

        ctx.fillStyle = 'white';


        textPaddleSpeedCenter = ((canvas.width / 2) / (settingsOutline / 2)) * (settingsOutline / 2 - 1) - (ctx.measureText(textPaddleSpeed).width / 2);
        //console.log(textPaddleSpeedCenter);
        ctx.fillText(textPaddleSpeed, canvas.width / settingsOutline + textPaddleSpeedCenter, canvas.height / settingsOutline + 100);
        textPaddleSpeedNumCenter = ((canvas.width / 2) / (settingsOutline / 2)) * (settingsOutline / 2 - 1) - ((ctx.measureText(textPaddleSpeed).width - 
                                                                                                                ctx.measureText(plus).width - 400) / 2);
                                                                                                                //console.log(textPaddleSpeedNumCenter);
        ctx.fillStyle = 'white';
        ctx.fillText(paddleSpeed, canvas.width / settingsOutline + textPaddleSpeedNumCenter, canvas.height / settingsOutline + 170);
        ctx.font = "20px addl";
        ctx.fillStyle = 'rgb(105, 105, 105)';
        //  Plus for Paddle speed
        if((mouseY > canvas.height / settingsOutline + 125 && mouseY < canvas.height / settingsOutline + 145) && (mouseX > canvas.width / settingsOutline + textPaddleSpeedNumCenter + 130 && mouseX < canvas.width / settingsOutline + textPaddleSpeedNumCenter + 150))
            ctx.fillStyle = 'rgb(200, 200, 200)';
        
        ctx.fillText(plus, canvas.width / settingsOutline + textPaddleSpeedNumCenter + 130, canvas.height / settingsOutline + 145);
        ctx.fillStyle = 'rgb(105, 105, 105)';
        //  Minus for Paddle speed
        if((mouseY > canvas.height / settingsOutline + 150 && mouseY < canvas.height / settingsOutline + 170) && (mouseX > canvas.width / settingsOutline + textPaddleSpeedNumCenter + 131 && mouseX < canvas.width / settingsOutline + textPaddleSpeedNumCenter + 151))
            ctx.fillStyle = 'rgb(200, 200, 200)';
        ctx.fillText(minus, canvas.width / settingsOutline + textPaddleSpeedNumCenter + 131, canvas.height / settingsOutline + 170);
        ctx.font = "50px addl";
        ctx.fillStyle = 'white';

        textBallSpeedCenter = ((canvas.width / 2) / (settingsOutline / 2)) * (settingsOutline / 2 - 1) - (ctx.measureText(textBallSpeed).width / 2);
        //console.log(textBallSpeedCenter);
        ctx.fillText(textBallSpeed, canvas.width / settingsOutline + textBallSpeedCenter, canvas.height / settingsOutline + 275);
        textBallSpeedNumCenter = ((canvas.width / 2) / (settingsOutline / 2)) * (settingsOutline / 2 - 1) - ((ctx.measureText(textBallSpeed).width - 
                                                                                                                ctx.measureText(plus).width - 400) / 2);
                                                                                                                //console.log(textPaddleSpeedNumCenter);
        ctx.fillStyle = 'white';
        if(ball.xVelocity >= 0)
            ctx.fillText(ball.xVelocity, canvas.width / settingsOutline + textPaddleSpeedNumCenter, canvas.height / settingsOutline + 345);
        if(ball.xVelocity < 0)
            ctx.fillText(-(ball.xVelocity), canvas.width / settingsOutline + textPaddleSpeedNumCenter, canvas.height / settingsOutline + 345);
        ctx.font = "20px addl";
        ctx.fillStyle = 'rgb(105, 105, 105)';
        //  Plus for Ball speed
        if((mouseY > canvas.height / settingsOutline + 300 && mouseY < canvas.height / settingsOutline + 320) && (mouseX > canvas.width / settingsOutline + textBallSpeedNumCenter + 63 && mouseX < canvas.width / settingsOutline + textBallSpeedNumCenter + 83))
            ctx.fillStyle = 'rgb(200, 200, 200)';
        ctx.fillText(plus, canvas.width / settingsOutline + textBallSpeedNumCenter + 63, canvas.height / settingsOutline + 320);
        ctx.fillStyle = 'rgb(105, 105, 105)';
        //  Minus for Ball speed
        if((mouseY > canvas.height / settingsOutline + 325 && mouseY < canvas.height / settingsOutline + 345) && (mouseX > canvas.width / settingsOutline + textBallSpeedNumCenter + 64 && mouseX < canvas.width / settingsOutline + textBallSpeedNumCenter + 84))
            ctx.fillStyle = 'rgb(200, 200, 200)';
        ctx.fillText(minus, canvas.width / settingsOutline + textBallSpeedNumCenter + 64, canvas.height / settingsOutline + 345);
        ctx.font = "50px addl";
        ctx.fillStyle = 'white';
        textMaxPointsCenter = ((canvas.width / 2) / (settingsOutline / 2)) * (settingsOutline / 2 - 1) - (ctx.measureText(textMaxPoints).width / 2);
        //console.log(textMaxPointsCenter);
        ctx.fillText(textMaxPoints, canvas.width / settingsOutline + textMaxPointsCenter, canvas.height / settingsOutline + 450);
        textMaxPointsNumCenter = ((canvas.width / 2) / (settingsOutline / 2)) * (settingsOutline / 2 - 1) - ((ctx.measureText(textPoints10).width + 
                                                                                                              ctx.measureText(textPoints20).width +
                                                                                                              ctx.measureText(textPoints30).width +
                                                                                                              ctx.measureText(textPointsInfinite).width + 150) / 2);
                                                                                                              //console.log(textPaddleSpeedNumCenter);
        ctx.fillStyle = 'rgb(105, 105, 105)';
        //  10 points
        if((mouseY > canvas.height / settingsOutline + 470 && mouseY < canvas.height / settingsOutline + 520) && (mouseX > canvas.width / settingsOutline + textMaxPointsNumCenter + 20 && mouseX < canvas.width / settingsOutline + textMaxPointsNumCenter + 20 + ctx.measureText(textPoints10).width))
            ctx.fillStyle = 'rgb(200, 200, 200)';
        if(maxPoints == 10)
            ctx.fillStyle = 'white';
        ctx.fillText(textPoints10, canvas.width / settingsOutline + textMaxPointsNumCenter + 20, canvas.height / settingsOutline + 520);
        ctx.fillStyle = 'rgb(105, 105, 105)';
        //  20 points
        if((mouseY > canvas.height / settingsOutline + 470 && mouseY < canvas.height / settingsOutline + 520) && (mouseX > canvas.width / settingsOutline + textMaxPointsNumCenter + 160 && mouseX < canvas.width / settingsOutline + textMaxPointsNumCenter + 160 + ctx.measureText(textPoints20).width))
            ctx.fillStyle = 'rgb(200, 200, 200)';
        if(maxPoints == 20)
            ctx.fillStyle = 'white';
        ctx.fillText(textPoints20, canvas.width / settingsOutline + textMaxPointsNumCenter + 160, canvas.height / settingsOutline + 520);
        ctx.fillStyle = 'rgb(105, 105, 105)';
        //  30 points
        if((mouseY > canvas.height / settingsOutline + 470 && mouseY < canvas.height / settingsOutline + 520) && (mouseX > canvas.width / settingsOutline + textMaxPointsNumCenter + 320 && mouseX < canvas.width / settingsOutline + textMaxPointsNumCenter + 320 + ctx.measureText(textPoints30).width))
            ctx.fillStyle = 'rgb(200, 200, 200)';
        if(maxPoints == 30)
            ctx.fillStyle = 'white';
        ctx.fillText(textPoints30, canvas.width / settingsOutline + textMaxPointsNumCenter + 320, canvas.height / settingsOutline + 520);
        ctx.fillStyle = 'rgb(105, 105, 105)';
        //  Infinite points
        if((mouseY > canvas.height / settingsOutline + 470 && mouseY < canvas.height / settingsOutline + 520) && (mouseX > canvas.width / settingsOutline + textMaxPointsNumCenter + 480 && mouseX < canvas.width / settingsOutline + textMaxPointsNumCenter + 480 + ctx.measureText(textPointsInfinite).width))
            ctx.fillStyle = 'rgb(200, 200, 200)';
        if(infinitePoints == true)
            ctx.fillStyle = 'white';
        ctx.fillText(textPointsInfinite, canvas.width / settingsOutline + textMaxPointsNumCenter + 480, canvas.height / settingsOutline + 520);
        ctx.fillStyle = 'white';
    }, 10);
}

movement(keys);

canvas.addEventListener("mousemove", checkPos);
canvas.addEventListener("mouseup", checkClick);

function checkPos(event) {
    if(event.pageX || event.pageY == 0){
        mouseX = event.pageX - this.offsetLeft;
        mouseY = event.pageY - this.offsetTop;
    }else if(event.offsetX || event.offsetY == 0){
        mouseX = event.offsetX;
        mouseY = event.offsetY;
    }
}

function checkClick(event) {
    //  Plus for Paddle speed
    if((mouseY > canvas.height / settingsOutline + 125 && mouseY < canvas.height / settingsOutline + 145) && (mouseX > canvas.width / settingsOutline + textPaddleSpeedNumCenter + 130 && mouseX < canvas.width / settingsOutline + textPaddleSpeedNumCenter + 150)) {
        if(paddleSpeed < 15)
            paddleSpeed ++;
    }
    //  Minus for Paddle speed
    if((mouseY > canvas.height / settingsOutline + 150 && mouseY < canvas.height / settingsOutline + 170) && (mouseX > canvas.width / settingsOutline + textPaddleSpeedNumCenter + 131 && mouseX < canvas.width / settingsOutline + textPaddleSpeedNumCenter + 151)) {
        if(paddleSpeed > 5)
            paddleSpeed --;
    }
    //  Plus for Ball speed
    if((mouseY > canvas.height / settingsOutline + 300 && mouseY < canvas.height / settingsOutline + 320) && (mouseX > canvas.width / settingsOutline + textBallSpeedNumCenter + 63 && mouseX < canvas.width / settingsOutline + textBallSpeedNumCenter + 83)) {
        if(ball.xVelocity >= 0) {
            if(ball.xVelocity < 16) {
                ball.xVelocity ++;
                ball.yVelocity = ball.xVelocity / 2;
            }
        }
        if(ball.xVelocity < 0) {
            if(ball.xVelocity > -16) {
                ball.xVelocity --;
                ball.yVelocity = ball.xVelocity / 2;
            } 
        }
    }
    //  Minus for Ball speed
    if((mouseY > canvas.height / settingsOutline + 325 && mouseY < canvas.height / settingsOutline + 345) && (mouseX > canvas.width / settingsOutline + textBallSpeedNumCenter + 64 && mouseX < canvas.width / settingsOutline + textBallSpeedNumCenter + 84)) {
        if(ball.xVelocity >= 0) {
            if(ball.xVelocity > 4) {
                ball.xVelocity --;
                ball.yVelocity = ball.xVelocity / 2;
            }
        }
        if(ball.xVelocity < 0) {
            if(ball.xVelocity < -4) {
                ball.xVelocity ++;
                ball.yVelocity = ball.xVelocity / 2;
            }
        }
    }
    //  10 points
    if((mouseY > canvas.height / settingsOutline + 470 && mouseY < canvas.height / settingsOutline + 520) && (mouseX > canvas.width / settingsOutline + textMaxPointsNumCenter + 20 && mouseX < canvas.width / settingsOutline + textMaxPointsNumCenter + 20 + ctx.measureText(textPoints10).width)) {
        maxPoints = 10;
        infinitePoints = false;
    }
    //  20 points
    if((mouseY > canvas.height / settingsOutline + 470 && mouseY < canvas.height / settingsOutline + 520) && (mouseX > canvas.width / settingsOutline + textMaxPointsNumCenter + 160 && mouseX < canvas.width / settingsOutline + textMaxPointsNumCenter + 160 + ctx.measureText(textPoints20).width)) {
        maxPoints = 20;
        infinitePoints = false;
    }
    //  30 points
    if((mouseY > canvas.height / settingsOutline + 470 && mouseY < canvas.height / settingsOutline + 520) && (mouseX > canvas.width / settingsOutline + textMaxPointsNumCenter + 320 && mouseX < canvas.width / settingsOutline + textMaxPointsNumCenter + 320 + ctx.measureText(textPoints30).width)) {
        maxPoints = 30;
        infinitePoints = false;
    }
    //  Infinite points
    if((mouseY > canvas.height / settingsOutline + 470 && mouseY < canvas.height / settingsOutline + 520) && (mouseX > canvas.width / settingsOutline + textMaxPointsNumCenter + 480 && mouseX < canvas.width / settingsOutline + textMaxPointsNumCenter + 480 + ctx.measureText(textPointsInfinite).width)) {
        maxPoints = 0;
        infinitePoints = true;
    }
}