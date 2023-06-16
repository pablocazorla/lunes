const canvas = document.getElementById("canvas-main");
const ctx = canvas.getContext("2d");

/*****************************/

const TOTAL_COLS = 6;
const TOTAL_ROWS = 8;
const SIZE = 80;
const PADDING_X = 0.5 * (canvas.width - TOTAL_COLS * SIZE);
const PADDING_Y = 0.5 * (canvas.height - TOTAL_ROWS * SIZE);

const WALL_WIDTH = 5;
const DOOR_WIDTH = 40;
const WALL_DOOR_WIDTH = 0.5 * (SIZE - DOOR_WIDTH);

/*****************************/

const map = [];

for (let x = 0; x < TOTAL_COLS; x++) {
  map.push([]);
  for (let y = 0; y < TOTAL_ROWS; y++) {
    map[x].push({
      position: { x, y },
      bounds: { top: 0, right: 0, left: 0, bottom: 0 },
    });
  }
}

map[0][0] =
  map[0][1] =
  map[5][0] =
  map[5][1] =
  map[0][6] =
  map[0][7] =
  map[1][6] =
  map[1][7] =
  map[4][6] =
  map[4][7] =
  map[5][6] =
  map[5][7] =
    null;

map[2][7].bounds.top =
  map[3][1].bounds.left =
  map[3][1].bounds.bottom =
  map[2][1].bounds.right =
  map[2][1].bounds.top =
  map[1][1].bounds.top =
  map[1][0].bounds.bottom =
  map[2][0].bounds.bottom =
    1;

map[1][0].bounds.top =
  map[1][0].bounds.left =
  map[2][6].bounds.bottom =
  map[2][6].bounds.top =
  map[3][7].bounds.top =
  map[3][7].bounds.left =
  map[3][6].bounds.top =
  map[3][6].bounds.bottom =
  map[2][6].bounds.right =
  map[3][6].bounds.left =
  map[3][0].bounds.right =
  map[3][0].bounds.bottom =
  map[4][0].bounds.left =
  map[4][0].bounds.bottom =
  map[3][1].bounds.right =
  map[3][1].bounds.top =
  map[4][1].bounds.left =
  map[4][1].bounds.top =
  map[2][1].bounds.bottom =
  map[2][1].bounds.left =
  map[1][1].bounds.bottom =
  map[1][1].bounds.right =
    2;

/*****************************/

const drawWalls = (a, b, { bounds }) => {
  const { top, right, bottom, left } = bounds;
  if (top === 0) {
    //top
    ctx.beginPath();
    ctx.moveTo(a, b);
    ctx.lineTo(a + SIZE, b);
    ctx.lineTo(a + SIZE, b + WALL_WIDTH);
    ctx.lineTo(a, b + WALL_WIDTH);
    ctx.lineTo(a, b);
    ctx.fill();
  }
  if (top === 1) {
    ctx.beginPath();
    ctx.moveTo(a, b);
    ctx.lineTo(a + WALL_DOOR_WIDTH, b);
    ctx.lineTo(a + WALL_DOOR_WIDTH, b + WALL_WIDTH);
    ctx.lineTo(a, b + WALL_WIDTH);
    ctx.lineTo(a, b);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(a + WALL_DOOR_WIDTH + DOOR_WIDTH, b);
    ctx.lineTo(a + SIZE, b);
    ctx.lineTo(a + SIZE, b + WALL_WIDTH);
    ctx.lineTo(a + WALL_DOOR_WIDTH + DOOR_WIDTH, b + WALL_WIDTH);
    ctx.lineTo(a + WALL_DOOR_WIDTH + DOOR_WIDTH, b);
    ctx.fill();
  }
  if (right === 0) {
    ctx.beginPath();
    ctx.moveTo(a + SIZE - WALL_WIDTH, b);
    ctx.lineTo(a + SIZE, b);
    ctx.lineTo(a + SIZE, b + SIZE);
    ctx.lineTo(a + SIZE - WALL_WIDTH, b + SIZE);
    ctx.lineTo(a + SIZE - WALL_WIDTH, b);
    ctx.fill();
  }
  if (right === 1) {
    ctx.beginPath();
    ctx.moveTo(a + SIZE - WALL_WIDTH, b);
    ctx.lineTo(a + SIZE, b);
    ctx.lineTo(a + SIZE, b + WALL_DOOR_WIDTH);
    ctx.lineTo(a + SIZE - WALL_WIDTH, b + WALL_DOOR_WIDTH);
    ctx.lineTo(a + SIZE - WALL_WIDTH, b);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(a + SIZE - WALL_WIDTH, b + WALL_DOOR_WIDTH + DOOR_WIDTH);
    ctx.lineTo(a + SIZE, b + WALL_DOOR_WIDTH + DOOR_WIDTH);
    ctx.lineTo(a + SIZE, b + SIZE);
    ctx.lineTo(a + SIZE - WALL_WIDTH, b + SIZE);
    ctx.lineTo(a + SIZE - WALL_WIDTH, b + WALL_DOOR_WIDTH + DOOR_WIDTH);
    ctx.fill();
  }
  if (bottom === 0) {
    ctx.beginPath();
    ctx.moveTo(a, b + SIZE - WALL_WIDTH);
    ctx.lineTo(a + SIZE, b + SIZE - WALL_WIDTH);
    ctx.lineTo(a + SIZE, b + SIZE);
    ctx.lineTo(a, b + SIZE);
    ctx.lineTo(a, b + SIZE - WALL_WIDTH);
    ctx.fill();
  }
  if (bottom === 1) {
    ctx.beginPath();
    ctx.moveTo(a, b + SIZE - WALL_WIDTH);
    ctx.lineTo(a + WALL_DOOR_WIDTH, b + SIZE - WALL_WIDTH);
    ctx.lineTo(a + WALL_DOOR_WIDTH, b + SIZE);
    ctx.lineTo(a, b + SIZE);
    ctx.lineTo(a, b + SIZE - WALL_WIDTH);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(a + WALL_DOOR_WIDTH + DOOR_WIDTH, b + SIZE - WALL_WIDTH);
    ctx.lineTo(a + SIZE, b + SIZE - WALL_WIDTH);
    ctx.lineTo(a + SIZE, b + SIZE);
    ctx.lineTo(a + WALL_DOOR_WIDTH + DOOR_WIDTH, b + SIZE);
    ctx.lineTo(a + WALL_DOOR_WIDTH + DOOR_WIDTH, b + SIZE - WALL_WIDTH);
    ctx.fill();
  }

  if (left === 0) {
    ctx.beginPath();
    ctx.moveTo(a, b);
    ctx.lineTo(a + WALL_WIDTH, b);
    ctx.lineTo(a + WALL_WIDTH, b + SIZE);
    ctx.lineTo(a, b + SIZE);
    ctx.lineTo(a, b);
    ctx.fill();
  }
  if (left === 1) {
    ctx.beginPath();
    ctx.moveTo(a, b);
    ctx.lineTo(a + WALL_WIDTH, b);
    ctx.lineTo(a + WALL_WIDTH, b + WALL_DOOR_WIDTH);
    ctx.lineTo(a, b + WALL_DOOR_WIDTH);
    ctx.lineTo(a, b);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(a, b + WALL_DOOR_WIDTH + DOOR_WIDTH);
    ctx.lineTo(a + WALL_WIDTH, b + WALL_DOOR_WIDTH + DOOR_WIDTH);
    ctx.lineTo(a + WALL_WIDTH, b + SIZE);
    ctx.lineTo(a, b + SIZE);
    ctx.lineTo(a, b + WALL_DOOR_WIDTH + DOOR_WIDTH);
    ctx.fill();
  }
};
/*****************************/
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "#999";

ctx.font = "30px Arial";

map.forEach((col, x) => {
  col.forEach((cell, y) => {
    const a = x * SIZE + PADDING_X;
    const b = y * SIZE + PADDING_Y;

    if (cell) {
      ctx.fillStyle = "#444";
      ctx.beginPath();
      ctx.moveTo(a, b);
      ctx.lineTo(a + SIZE, b);
      ctx.lineTo(a + SIZE, b + SIZE);
      ctx.lineTo(a, b + SIZE);
      ctx.lineTo(a, b);
      ctx.fill();
      ctx.stroke();

      // ctx.fillStyle = "#f80";
      // ctx.fillText(`${x},${y}`, a + 16, b + 60);

      ctx.fillStyle = "#fff";

      drawWalls(a, b, cell);
    }
    //}
  });
});
