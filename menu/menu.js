//                      Intro animation font
//
//      https://www.dafont.com/m04fatal-fury.font?text=PONG
//      https://www.dafont.com/addlgbitmap09.font?text=Single+ball&back=bitmap

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let gameMode = 2;

let single = "Single ball";
let multiple = "Multiple balls"

let fontHeight = 100;

let btnWidth = [];
let btnHeight = [fontHeight, fontHeight];
let btnX = [];
let btnY = [];



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

let timeBeforeMenu = 0;
let animationTime = 350;
let pongTextHeight = 0;
let fadeIdIntro = 0;

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



//  Fullscreen
window.onload = function() {
    init();
    if ((w < window.innerWidth || w > window.innerWidth) || (h < window.innerHeight || w > window.innerHeight))
        screenCheck();
    //window.addEventListener('resize', screenCheck,false);
    movement();
    introAnimation();
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
    ctx.fillStyle = 'grey';

    

    ctx.textAlign = "center";
    ctx.font = "100px addl";
    /*ctx.fillText(single, canvas.width / 2, canvas.height / 2 - 100);
    ctx.fillText(multiple, canvas.width / 2, canvas.height / 2 + 100);
    */
    btnX[0] = (ctx.measureText(single).width / 2);
    btnX[1] = (ctx.measureText(multiple).width / 2);
    btnY[0] = window.innerHeight / 2 - (90 / 2) - 100 - 25;
    btnY[1] = window.innerHeight / 2 - (90 / 2) + 100 - 25;
    btnWidth[0] = ctx.measureText(single).width;
    btnWidth[1] = ctx.measureText(multiple).width;
    console.log(btnX);
    console.log(btnY);



    paddle1.y = canvas.height / 2 - 50;
    paddle2.y = canvas.height / 2 - 50;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    /*ctx.fillRect(paddle1.x, paddle1.y, paddleWidth, paddleHeight);
    ctx.fillRect(deviceWidth - 16, paddle2.y, paddleWidth, paddleHeight);
    //ctx.beginPath();
    ctx.fillRect(ball.x - ball.widthHeight, ball.y - ball.widthHeight, ball.widthHeight, ball.widthHeight);


    ctx.fillStyle = 'grey';
    ctx.fillText(single, canvas.width / 2, canvas.height / 2 - 100);
    ctx.fillText(multiple, canvas.width / 2, canvas.height / 2 + 100);*/
}

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




let mouseX;
let mouseY;
let frames = 30;


let timerId = 0;
let fadeId = 0;
let time = 0.0;

let move = 0;

canvas.addEventListener("mousemove", checkPos);
// mousedown
canvas.addEventListener("mouseup", checkClick);


function checkPos(event){
    ctx.font = "100px addl";
    if(timeBeforeMenu >= animationTime){
        if(event.pageX || event.pageY == 0){
            mouseX = event.pageX - this.offsetLeft;
            mouseY = event.pageY - this.offsetTop;
        }else if(event.offsetX || event.offsetY == 0){
            mouseX = event.offsetX;
            mouseY = event.offsetY;
        }

        if((mouseY > btnY[0] && mouseY < btnY[0] + btnHeight[0]) && (mouseX > btnX[0] && mouseX < btnX[0] + btnWidth[0])){
            ctx.fillStyle = 'white';
            ctx.fillText(single, canvas.width / 2, canvas.height / 2 - 100);
        }else if(mouseY > btnY[1] && mouseY < btnY[1] + btnHeight[1] && (mouseX > btnX[1] && mouseX < btnX[1] + btnWidth[1])){
            ctx.fillStyle = 'white';
            ctx.fillText(multiple, canvas.width / 2, canvas.height / 2 + 100);
        }

        if((mouseY <= btnY[0] || mouseY >= btnY[0] + btnHeight[0]) || (mouseX <= btnX[0] || mouseX >= btnX[0] + btnWidth[0])){
            ctx.fillStyle = 'grey';
            ctx.fillText(single, canvas.width / 2, canvas.height / 2 - 100);
        }
        if((mouseY <= btnY[1] || mouseY >= btnY[1] + btnHeight[1]) || (mouseX <= btnX[1] || mouseX >= btnX[1] + btnWidth[1])){
            ctx.fillStyle = 'grey';
            ctx.fillText(multiple, canvas.width / 2, canvas.height / 2 + 100);
        }
        //console.log(mouseX, mouseY);
    }
}


function checkClick(event){
    for(i = 0; i < btnX.length; i++){
        if(mouseX > btnX[i] && mouseX < btnX[i] + btnWidth[i]){
            if(mouseY > btnY[i] && mouseY < btnY[i] + btnHeight[i]){
                                  clearInterval(move);
                fadeId = setInterval("fadeOut()", 1000/frames);
                //clearInterval(timerId);
                canvas.removeEventListener("mousemove", checkPos);
                canvas.removeEventListener("mouseup", checkClick);
                if (i == 0) {
                    gameMode = 0;
                }
                if (i == 1){
                    gameMode = 1;
                }
            }
            
        }
    }
}




function fadeOut(){
    ctx.fillStyle = "rgba(0,0,0, 0.3)";
    ctx.fillRect (0, 0, window.innerWidth, window.innerHeight);
    time += 0.1;
    if(time >= 2){
        clearInterval(fadeId);
        time = 0;
        //timerId = setInterval("update()", 1000/frames);
        //canvas.addEventListener("mousemove", checkPos);
        //canvas.addEventListener("mouseup", checkClick);
        if(gameMode == 0) {
            console.log("0");
            window.location.href = '../game0/index.html';
        }
        else if(gameMode == 1) {
            console.log("1");
            window.location.href = '../game1/index.html';
        }
    }
}






function movement() {
    move = setInterval(function() {
    if(timeBeforeMenu >= animationTime) {
        /*  Player one  */
        if (ball.x <= canvas.width / 2) {
            if (ball.y < paddle1.y && paddle1.y > 0) {
                paddle1.y -= 10;
                repaint();
            }
            if (ball.y> paddle1.y  + paddleHeight && paddle1.y < (canvas.height - paddleHeight)) {
                paddle1.y += 10;
                repaint();
            }
        }

        /*  Player two  */
        if (ball.x >= canvas.width / 2) {
            if (ball.y < paddle2.y && paddle2.y > 0) {
                paddle2.y -= 10;
                repaint();
            }
            if (ball.y> paddle2.y + paddleHeight && paddle2.y < (canvas.height - paddleHeight)) {
                paddle2.y += 10;
                repaint();
            }
        }
        /*  Ball  */
        ball.x += ball.xVelocity;
        ball.y += ball.yVelocity;
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
            if(ball.y >= (paddle1.y - ball.widthHeight + 12) && ball.y <= (paddle1.y + paddleHeight + ball.widthHeight + 1)){
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
                resetBall();
            }
        }
        if(ball.x > canvas.width - paddleWidth) {
            if(ball.y >= (paddle2.y - ball.widthHeight + 12) && ball.y <= (paddle2.y + paddleHeight + ball.widthHeight + 1)){
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
                resetBall();
            }
        }
    }
    timeBeforeMenu++;
    }, 10);
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
    ctx.fillRect(ball.x - ball.widthHeight, ball.y - ball.widthHeight, ball.widthHeight, ball.widthHeight);
}

function repaint() {
    btnX[0] = window.innerWidth / 2 - (ctx.measureText(single).width / 2);
    btnX[1] = window.innerWidth / 2 - (ctx.measureText(multiple).width / 2);
    btnY[0] = window.innerHeight / 2 - (90 / 2) - 100 - 50;
    btnY[1] = window.innerHeight / 2 - (90 / 2) + 100 - 50;
    btnWidth[0] = ctx.measureText(single).width;
    btnWidth[1] = ctx.measureText(multiple).width;

    

    ctx.font = "100px addl";

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(paddle1.x, paddle1.y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - 16, paddle2.y, paddleWidth, paddleHeight);
    ctx.fillRect(ball.x - ball.widthHeight, ball.y - ball.widthHeight, ball.widthHeight, ball.widthHeight);

    ctx.font = "20px addl";
    ctx.fillStyle = 'grey';
    ctx.fillText('Press \'*\' for settings', canvas.width / 2, canvas.height - 100);
    ctx.font = "100px addl";
    ctx.fillStyle = 'grey';
    ctx.fillText(single, canvas.width / 2, canvas.height / 2 - 100);
    ctx.fillText(multiple, canvas.width / 2, canvas.height / 2 + 100);

    if((mouseY > btnY[0] && mouseY < btnY[0] + btnHeight[0]) && (mouseX > btnX[0] && mouseX < btnX[0] + btnWidth[0])){
        ctx.fillStyle = 'white';
        ctx.fillText(single, canvas.width / 2, canvas.height / 2 - 100);
    }else if(mouseY > btnY[1] && mouseY < btnY[1] + btnHeight[1] && (mouseX > btnX[1] && mouseX < btnX[1] + btnWidth[1])){
        ctx.fillStyle = 'white';
        ctx.fillText(multiple, canvas.width / 2, canvas.height / 2 + 100);
    }

    if((mouseY <= btnY[0] || mouseY >= btnY[0] + btnHeight[0]) || (mouseX <= btnX[0] || mouseX >= btnX[0] + btnWidth[0])){
        ctx.fillStyle = 'grey';
        ctx.fillText(single, canvas.width / 2, canvas.height / 2 - 100);
    }
    if((mouseY <= btnY[1] || mouseY >= btnY[1] + btnHeight[1]) || (mouseX <= btnX[1] || mouseX >= btnX[1] + btnWidth[1])){
        ctx.fillStyle = 'grey';
        ctx.fillText(multiple, canvas.width / 2, canvas.height / 2 + 100);
    }


    
}


function fadeOutIntro(){
    ctx.fillStyle = "rgba(0,0,0, 0.3)";
    ctx.fillRect (0, 0, window.innerWidth, window.innerHeight);
    time += 0.1;
    if(time >= 2){
        clearInterval(fadeIdIntro);
        time = 0;
        //timerId = setInterval("update()", 1000/frames);
        //canvas.addEventListener("mousemove", checkPos);
        //canvas.addEventListener("mouseup", checkClick);
    }
}

function introAnimation() {
    pongIntroAnimation = setInterval(function() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        ctx.font = "150px addl";
        ctx.fillText("P O N G", canvas.width / 2, pongTextHeight);
        pongTextHeight += 5;
        //
        //  dodělat podle fontu
        //
        if(pongTextHeight >= canvas.height / 2) {
            clearInterval(pongIntroAnimation);
            //ctx.font = "100px addl";
            setTimeout(function(){
                fadeIdIntro = setInterval("fadeOutIntro()", 1000/frames);
            }, 1000);
        }
    }, 1000 / 60);
}