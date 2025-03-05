const ball = document.getElementById('ball');

const ballInfo = {
    posX: window.innerWidth / 2,
    posY: window.innerHeight / 2,
    velX: 2,
    velY: 0,
    gravity: 0.5,
    bounceFactor: -0.7,
    maxX: window.innerWidth - ball.offsetWidth,
    maxY: window.innerHeight - ball.offsetHeight,
    isDragging: false,
    dragOffsetX: 0,
    dragOffsetY: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    ballWidth: ball.offsetWidth,
    ballHeight: ball.offsetHeight,
}

function updateBounds() {
    ballInfo.ballWidth = ball.offsetWidth;
    ballInfo.ballHeight = ball.offsetHeight;
    ballInfo.maxX = window.innerWidth - ballInfo.ballWidth;
    ballInfo.maxY = window.innerHeight - ballInfo.ballHeight;
}

function updateBallPosition() {
    ball.style.left = ballInfo.posX + 'px';
    ball.style.top = ballInfo.posY + 'px';
}

updateBounds();
window.addEventListener('resize', updateBounds);

ball.addEventListener('mousedown', function(e) {
    ballInfo.isDragging = true;
    // drag ball to mouse position:
    ballInfo.dragOffsetX = e.clientX - ballInfo.posX;
    ballInfo.dragOffsetY = e.clientY - ballInfo.posY;
    ballInfo.lastMouseX = e.clientX;
    ballInfo.lastMouseY = e.clientY;
});

window.addEventListener('mousemove', function(e) {
    if (ballInfo.isDragging) {
        ballInfo.posX = e.clientX - ballInfo.dragOffsetX;
        ballInfo.posY = e.clientY - ballInfo.dragOffsetY;

        // stay within bounds:
        ballInfo.posX = Math.max(0, Math.min(ballInfo.posX, ballInfo.maxX));
        ballInfo.posY = Math.max(0, Math.min(ballInfo.posY, ballInfo.maxY));

        ballInfo.velX = e.clientX - ballInfo.lastMouseX;
        ballInfo.velY = e.clientY - ballInfo.lastMouseY;
        ballInfo.lastMouseX = e.clientX;
        ballInfo.lastMouseY = e.clientY;

        updateBallPosition();
    }
});

window.addEventListener('mouseup', function(e) {
    if (ballInfo.isDragging) {
        ballInfo.isDragging = false;
    }
});


function animate() {
    if (!ballInfo.isDragging) {
        ballInfo.velY += ballInfo.gravity;
        
        ballInfo.posX += ballInfo.velX;
        ballInfo.posY += ballInfo.velY;

        if (ballInfo.posX < 0) {
            ballInfo.posX = 0;
            ballInfo.velX *= ballInfo.bounceFactor;
        } else if (ballInfo.posX > ballInfo.maxX) {
            ballInfo.posX = ballInfo.maxX;
            ballInfo.velX *= ballInfo.bounceFactor;
        }

        if (ballInfo.posY < 0) {
            ballInfo.posY = 0;
            ballInfo.velY *= ballInfo.bounceFactor;
        } else if (ballInfo.posY > ballInfo.maxY) {
            ballInfo.posY = ballInfo.maxY;
            ballInfo.velY *= ballInfo.bounceFactor;
        }

        updateBallPosition();
    }
    
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);