// Four Historical Thinking Skills Explorer
// CANVAS_HEIGHT: 510
// Chapter 1: Historical Methods and Analytical Frameworks
// Bloom Level: Understand (L2) — click-to-reveal pattern

let canvasWidth = 600;
let drawHeight = 460;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 16;
let selectedSkill = -1;
let hoveredSkill = -1;
let resetButton;

const skills = [
  {
    name: "Causation",
    question: "Why did it happen?",
    definition: "Historians analyze the causes and effects of historical events, distinguishing between immediate triggers and deeper long-term factors that made an event possible.",
    example: "The Civil War resulted not just from the attack on Fort Sumter (trigger) but from decades of sectional conflict over slavery, economic divergence between North and South, and disputes over states' rights.",
    r: 57, g: 73, b: 171
  },
  {
    name: "Continuity & Change",
    question: "What stayed the same? What shifted?",
    definition: "Historians examine what changes over time and what persists, resisting the assumption that history is a story of constant, linear progress in any one direction.",
    example: "The 13th Amendment ended legal slavery in 1865, but racial discrimination continued through Black Codes and Jim Crow laws — change and continuity operating simultaneously after the Civil War.",
    r: 0, g: 137, b: 123
  },
  {
    name: "Comparison",
    question: "How are cases similar or different?",
    definition: "Historians compare events, societies, or time periods to identify broader patterns, test generalizations, and understand what is unique versus typical about a specific case.",
    example: "Comparing the French and American Revolutions reveals similarities (Enlightenment ideals, rejection of monarchy) but also key differences: France's revolution was far more radical and violent, leading to the Terror.",
    r: 46, g: 125, b: 50
  },
  {
    name: "Contextuali-zation",
    question: "What was the broader setting?",
    definition: "Historians place events in their broader historical context — the political, economic, social, and cultural environment that shaped what was possible, meaningful, and likely at that moment.",
    example: "The Declaration of Independence must be read in context: Enlightenment philosophy, Atlantic trade networks, British imperial taxation policy, and Locke's theory of natural rights all shaped its language and claims.",
    r: 230, g: 81, b: 0
  }
];

let quadrants = [];

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
}

function computeQuadrants() {
  let qw = (canvasWidth - margin * 3) / 2;
  let qh = (drawHeight - margin * 3) / 2;
  quadrants = [
    { x: margin,           y: margin,           w: qw, h: qh, idx: 0 },
    { x: margin*2 + qw,    y: margin,           w: qw, h: qh, idx: 1 },
    { x: margin,           y: margin*2 + qh,    w: qw, h: qh, idx: 2 },
    { x: margin*2 + qw,    y: margin*2 + qh,    w: qw, h: qh, idx: 3 }
  ];
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  resetButton = createButton('Close Panel');
  resetButton.position(10, drawHeight + 10);
  resetButton.mousePressed(() => { selectedSkill = -1; });

  computeQuadrants();
  describe('Four quadrant interactive diagram of historical thinking skills. Click a quadrant to read its definition and a U.S. history example.', LABEL);
}

function draw() {
  updateCanvasSize();
  computeQuadrants();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Detect hover
  hoveredSkill = -1;
  if (mouseY < drawHeight) {
    for (let q of quadrants) {
      if (mouseX > q.x && mouseX < q.x+q.w && mouseY > q.y && mouseY < q.y+q.h) {
        hoveredSkill = q.idx;
      }
    }
  }

  // Draw quadrants
  for (let q of quadrants) {
    let sk = skills[q.idx];
    let isHov = hoveredSkill === q.idx;
    let isSel = selectedSkill === q.idx;

    fill(sk.r, sk.g, sk.b, isHov || isSel ? 220 : 170);
    if (isHov) { stroke(249, 168, 37); strokeWeight(3); }
    else if (isSel) { stroke(255, 255, 255); strokeWeight(2); }
    else { stroke(180); strokeWeight(1); }
    rect(q.x, q.y, q.w, q.h, 10);
    strokeWeight(1);

    noStroke();
    // Skill name
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(min(20, q.w * 0.12));
    text(sk.name, q.x + q.w/2, q.y + q.h * 0.32);

    // Key question
    textStyle(ITALIC);
    textSize(min(13, q.w * 0.08));
    fill(255, 255, 210);
    text('"' + sk.question + '"', q.x + q.w/2, q.y + q.h * 0.6, q.w - 20, q.h * 0.3);

    if (!isHov && selectedSkill === -1) {
      textStyle(NORMAL);
      textSize(11);
      fill(255, 255, 255, 140);
      text('Click to explore ▶', q.x + q.w/2, q.y + q.h * 0.85);
    }
  }

  // Central hub — spokes
  let cx = canvasWidth / 2, cy = drawHeight / 2;
  stroke(249, 168, 37, 160);
  strokeWeight(2);
  for (let q of quadrants) {
    line(q.x + q.w/2, q.y + q.h/2, cx, cy);
  }
  strokeWeight(1);

  // Central circle
  let cr = min(canvasWidth, drawHeight) * 0.09;
  fill(249, 168, 37);
  stroke('white');
  strokeWeight(2);
  ellipse(cx, cy, cr*2, cr*2);
  noStroke();
  fill(26, 35, 126);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(min(11, cr * 0.55));
  text('Historical\nAnalysis', cx, cy);
  textStyle(NORMAL);

  // Infobox overlay
  if (selectedSkill >= 0) drawInfobox(selectedSkill);

  // Control label
  noStroke();
  fill(80);
  textAlign(LEFT, CENTER);
  textSize(14);
  textStyle(NORMAL);
  let hint = selectedSkill >= 0 ? '← close, or click outside the panel' : 'Click a skill quadrant to see its definition and a U.S. history example';
  text(hint, 145, drawHeight + controlHeight/2);
}

function drawInfobox(idx) {
  let sk = skills[idx];
  let iw = min(canvasWidth * 0.52, 400);
  let ih = drawHeight - margin * 2;
  let ix = canvasWidth - iw - margin;
  let iy = margin;
  let pad = 14;

  // Background
  fill(255, 255, 255, 240);
  stroke(sk.r, sk.g, sk.b);
  strokeWeight(3);
  rect(ix, iy, iw, ih, 10);
  strokeWeight(1);

  // Colored header strip
  noStroke();
  fill(sk.r, sk.g, sk.b);
  rect(ix, iy, iw, 40, 10, 10, 0, 0);

  // Skill name in header
  fill(255);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(17);
  text(sk.name.replace('-', ''), ix + pad, iy + 20);

  // Close button
  let bx = ix + iw - 22, by = iy + 20;
  fill(255, 80, 80);
  stroke('white');
  strokeWeight(1);
  circle(bx, by, 22);
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text('✕', bx, by);

  let y = iy + 55;

  // Question
  fill(sk.r, sk.g, sk.b);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(13);
  text('Key Question:', ix + pad, y);
  y += 18;
  fill(50);
  textStyle(ITALIC);
  textSize(13);
  text('"' + sk.question + '"', ix + pad, y, iw - pad*2, 40);
  y += 40;

  // Divider
  stroke(220);
  line(ix + pad, y, ix + iw - pad, y);
  noStroke();
  y += 10;

  // Definition
  fill(sk.r, sk.g, sk.b);
  textStyle(BOLD);
  textSize(13);
  text('Definition:', ix + pad, y);
  y += 18;
  fill(40);
  textStyle(NORMAL);
  textSize(12);
  text(sk.definition, ix + pad, y, iw - pad*2, 110);
  y += 115;

  // Divider
  stroke(220);
  line(ix + pad, y, ix + iw - pad, y);
  noStroke();
  y += 10;

  // Example
  fill(sk.r, sk.g, sk.b);
  textStyle(BOLD);
  textSize(13);
  text('U.S. History Example:', ix + pad, y);
  y += 18;
  fill(40);
  textStyle(NORMAL);
  textSize(12);
  text(sk.example, ix + pad, y, iw - pad*2, ih - y + iy - pad);
}

function mousePressed() {
  if (selectedSkill >= 0) {
    let iw = min(canvasWidth * 0.52, 400);
    let ix = canvasWidth - iw - margin;
    let iy = margin;
    let bx = ix + iw - 22, by = iy + 20;
    if (dist(mouseX, mouseY, bx, by) < 14) { selectedSkill = -1; return; }
    if (mouseX < ix || mouseX > ix + iw || mouseY < iy || mouseY > iy + drawHeight - margin*2) {
      selectedSkill = -1;
      return;
    }
    return;
  }
  for (let q of quadrants) {
    if (mouseX > q.x && mouseX < q.x+q.w && mouseY > q.y && mouseY < q.y+q.h && mouseY < drawHeight) {
      selectedSkill = q.idx;
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  computeQuadrants();
  resetButton.position(10, drawHeight + 10);
}
