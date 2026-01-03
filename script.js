const width = 30;
const height = 15;

let playerY = Math.floor(height / 2);
let cpuY = playerY;

let ballX = Math.floor(width / 2);
let ballY = Math.floor(height / 2);

let ballVX = 1;
let ballVY = 1;

let delay = 120;
let alive = true;

const screen = document.getElementById("screen");

function draw() {
  let grid = Array.from({ length: height }, () =>
    Array(width).fill(" ")
  );

  // Player paddle
  grid[playerY][0] = "|";

  // CPU paddle
  grid[cpuY][width - 1] = "|";

  // Ball
  grid[ballY][ballX] = "O";

  screen.textContent = grid.map(r => r.join("")).join("\n");
}

function update() {
  if (!alive) return;

  ballX += ballVX;
  ballY += ballVY;

  // Top / bottom bounce
  if (ballY <= 0 || ballY >= height - 1) {
    ballVY *= -1;
  }

  // Player paddle collision
  if (ballX === 1 && ballY === playerY) {
    ballVX = 1;
    speedUp();
  }

  // CPU paddle collision
  if (ballX === width - 2 && ballY === cpuY) {
    ballVX = -1;
    speedUp();
  }

  // Missed ball
  if (ballX < 0 || ballX >= width) {
    alive = false;
    screen.textContent += "\n\nGAME OVER";
    return;
  }

  // CPU AI (follows ball)
  if (ballY > cpuY && cpuY < height - 1) cpuY++;
  if (ballY < cpuY && cpuY > 0) cpuY--;

  draw();
}

function speedUp() {
  delay = Math.max(40, delay - 5);
  clearInterval(loop);
  loop = setInterval(update, delay);
}

document.addEventListener("keydown", e => {
  if (e.key === "w" && playerY > 0) playerY--;
  if (e.key === "s" && playerY < height - 1) playerY++;
});

let loop = setInterval(update, delay);
draw();