const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const rows = 10, cols = 10;
let player = { x: 0, y: 0 };
let exit = { x: 9, y: 9 };
let maze = [];
let level = 1;

function generateMaze() {
  maze = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (Math.random() > 0.7 ? 1 : 0))
  );
  maze[0][0] = 0;
  maze[rows - 1][cols - 1] = 0;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cell = canvas.width / cols;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      ctx.fillStyle = maze[y][x] ? "#222" : "#eee";
      ctx.fillRect(x * cell, y * cell, cell - 2, cell - 2);
    }
  }
  ctx.fillStyle = "gold";
  ctx.fillRect(player.x * cell, player.y * cell, cell - 2, cell - 2);
  ctx.fillStyle = "lime";
  ctx.fillRect(exit.x * cell, exit.y * cell, cell - 2, cell - 2);
}

function movePlayer(dx, dy) {
  const nx = player.x + dx;
  const ny = player.y + dy;
  if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && maze[ny][nx] === 0) {
    player.x = nx;
    player.y = ny;
    draw();
    if (player.x === exit.x && player.y === exit.y) {
      alert(`Level ${level} complete!`);
      level++;
      generateMaze();
      player = { x: 0, y: 0 };
      draw();
    }
  }
}

document.addEventListener('keydown', e => {
  if (e.key === "ArrowUp") movePlayer(0, -1);
  if (e.key === "ArrowDown") movePlayer(0, 1);
  if (e.key === "ArrowLeft") movePlayer(-1, 0);
  if (e.key === "ArrowRight") movePlayer(1, 0);
});

document.querySelectorAll('.mobile-controls button').forEach(btn => {
  btn.addEventListener('click', () => {
    const dir = btn.dataset.dir;
    if (dir === "up") movePlayer(0, -1);
    if (dir === "down") movePlayer(0, 1);
    if (dir === "left") movePlayer(-1, 0);
    if (dir === "right") movePlayer(1, 0);
  });
});

generateMaze();
draw();
