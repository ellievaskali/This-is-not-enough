let mousePositions = [];
const MAX_POS = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // Clear the canvas on every frame to avoid any residual shapes
  clear();

  stroke(219, 242, 39);
  strokeWeight(5);

  // Draw the current pose as a line
  line(pmouseX, pmouseY, mouseX, mouseY);

  // Store the last 30 poses
  mousePositions.push({ x: mouseX, y: mouseY });

  // Remove poses that are older than 30
  if (mousePositions.length > MAX_POS) {
    mousePositions.shift();
  }

  // Draw the previous poses as lines
  for (let i = 0; i < mousePositions.length - 1; i += 1) {
    let pos = mousePositions[i];
    let nextPos = mousePositions[i + 1];
    let weight = i * 2;
    strokeWeight(weight);
    line(pos.x, pos.y, nextPos.x, nextPos.y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}