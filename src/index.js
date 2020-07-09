const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const aspectRatio = 16 / 9;

const noScrollbarOffset = 3;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
if (canvas.width / canvas.height > aspectRatio) {
  canvas.width -= canvas.width - canvas.height * aspectRatio;
} else if (canvas.width / canvas.height < aspectRatio) {
  canvas.height -= canvas.height - canvas.width * aspectRatio;
}

canvas.width -= noScrollbarOffset;
canvas.height -= noScrollbarOffset;

ctx.fillStyle = "black";
ctx.strokeStyle = "white";

const gravity = new Vector(0, 0.98);
const rope = new Rope(
  new Vector(600, 200),
  new Vector(1000, 200),
  10,
  0.7,
  0.98,
  40
);
const tps = 20;

let startTime = Date.now();
let accumulator = 0;

function run() {
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  rope.update([gravity]);
  rope.draw(ctx);

  requestAnimationFrame(run);
}

run();
