// Get the canvas and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Wall properties (a circle in the center)
const circleCenter = { x: canvas.width / 2, y: canvas.height / 2 };
const circleRadius = 250;

// Ball class
class Ball {
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }

    checkCollisionWithWall() {
        const distance = Math.sqrt(Math.pow(this.x - circleCenter.x, 2) + Math.pow(this.y - circleCenter.y, 2));
        // If the ball goes beyond the wall boundary, we bounce it back.
        if (distance + this.radius >= circleRadius) {
            // Reflect the velocity to simulate a bounce
            const angle = Math.atan2(this.y - circleCenter.y, this.x - circleCenter.x);
            const speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
            // Reverse the ball's direction along the angle of collision
            this.dx = -Math.cos(angle) * speed;
            this.dy = -Math.sin(angle) * speed;
        }
    }
}

// List to store balls
let balls = [];

// Function to spawn a new ball
function spawnBall() {
    const x = Math.random() * (canvas.width - 100) + 50;
    const y = Math.random() * (canvas.height - 100) + 50;
    const radius = 15;
    const dx = (Math.random() - 0.5) * 4;
    const dy = (Math.random() - 0.5) * 4;
    const newBall = new Ball(x, y, radius, dx, dy);
    balls.push(newBall);
}

// Draw the circle (wall)
function drawWall() {
    ctx.beginPath();
    ctx.arc(circleCenter.x, circleCenter.y, circleRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
}

// Update the game state
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the circular wall
    drawWall();

    // Move and draw each ball
    balls.forEach(ball => {
        ball.move();
        ball.checkCollisionWithWall(); // Check for collision with the wall
        ball.draw();
    });

    // Request the next frame
    requestAnimationFrame(update);
}

// Start the game by spawning the first ball
spawnBall();

// Spawn a new ball every 3 seconds
setInterval(spawnBall, 3000);

// Start the game loop
update();
