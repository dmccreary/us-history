// AP Thematic Lens — American Identity and Politics and Power
// CANVAS_HEIGHT: 620
// Chapter 5: Founding the Republic (1783-1800)
// Bloom Level: Apply (L3) — Classify events under AP thematic lenses
// Library: p5.js

let canvasWidth = 900;
let drawHeight = 560;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 12;

let resetBtn, revealBtn;
let revealAll = false;

// Lens columns
const LENS_IDENTITY = 0;
const LENS_POWER = 1;

// Each event has a "primary" lens and an optional "secondary" lens (plausible alternative)
const events = [
  { id: 'farewell',   label: "Washington's Farewell Address",
    primary: LENS_IDENTITY, secondary: LENS_POWER,
    primaryWhy: "Shaped a national narrative warning against entangling alliances and partisan factions, defining what America should stand for.",
    secondaryWhy: "Also a political act — Washington used presidential prestige to constrain how parties and foreign powers competed for influence." },
  { id: 'alien',      label: "Alien and Sedition Acts",
    primary: LENS_POWER, secondary: LENS_IDENTITY,
    primaryWhy: "The Federalist majority used federal law to silence Republican press critics — a raw use of political power against rivals.",
    secondaryWhy: "Also a fight over identity — who counts as 'American' and who can speak for the nation." },
  { id: 'bor',        label: "Bill of Rights",
    primary: LENS_IDENTITY, secondary: LENS_POWER,
    primaryWhy: "Encoded liberties (speech, religion, press) that became central to how Americans defined themselves as a free people.",
    secondaryWhy: "Also a structural limit on federal power, negotiated to win Anti-Federalist support for ratification." },
  { id: 'vakr',       label: "Virginia and Kentucky Resolutions",
    primary: LENS_POWER, secondary: LENS_IDENTITY,
    primaryWhy: "Jefferson and Madison argued states could nullify federal law — a direct contest over where political power should reside.",
    secondaryWhy: "Also raised the deeper question of whether 'the nation' meant the federal union or a compact of sovereign states." },
  { id: 'threefifths',label: "Three-Fifths Compromise",
    primary: LENS_IDENTITY, secondary: LENS_POWER,
    primaryWhy: "Defined whose humanity the new nation would (partially) recognize — a foundational decision about who 'belongs' as American.",
    secondaryWhy: "Also a power-sharing deal that boosted Southern representation in Congress and the Electoral College." },
  { id: 'ec',         label: "Electoral College",
    primary: LENS_POWER, secondary: null,
    primaryWhy: "Designed the institutional rules by which political power is awarded in presidential elections — pure structural politics.",
    secondaryWhy: "" },
  { id: 'firstamend', label: "First Amendment",
    primary: LENS_IDENTITY, secondary: null,
    primaryWhy: "Free speech, press, religion, assembly — the rights Americans most often cite when defining national identity.",
    secondaryWhy: "" },
  { id: 'bank',       label: "National Bank Debate",
    primary: LENS_POWER, secondary: null,
    primaryWhy: "Hamilton vs. Jefferson over the bank was a foundational struggle over federal power and how to read the Constitution.",
    secondaryWhy: "" }
];

// Per-event UI state
let chipState = []; // { placed: null|0|1, x, y, w, h, dragging, dragOffsetX, dragOffsetY, homeX, homeY }
let lastFeedback = null; // { eventIdx, kind: 'correct'|'plausible'|'wrong', text }

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(resetAll);

  revealBtn = createButton('Show all connections');
  revealBtn.mousePressed(() => { revealAll = !revealAll; });

  initChipState();
  positionControls();

  describe('Drag event chips from the bottom pool into one of two AP thematic lens columns: American and National Identity (left) or Politics and Power (right). Receive feedback on whether each placement is the primary lens, a plausible alternative, or incorrect.', LABEL);
}

function resetAll() {
  revealAll = false;
  lastFeedback = null;
  initChipState();
}

function initChipState() {
  chipState = [];
  // Pool layout: chips arranged in a flow at the bottom of the draw area
  layoutPoolChips();
}

function layoutPoolChips() {
  // The pool sits beneath the two columns
  const poolTop = drawHeight - 130;
  const cols = 4;
  const gapX = 8;
  const gapY = 8;
  // Compute chip width that exactly fits within margin..canvasWidth-margin
  const chipW = (canvasWidth - margin * 2 - gapX * (cols - 1)) / cols;
  const chipH = 36;
  for (let i = 0; i < events.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = margin + col * (chipW + gapX);
    const y = poolTop + row * (chipH + gapY);
    chipState[i] = chipState[i] || {};
    Object.assign(chipState[i], {
      placed: chipState[i].placed !== undefined ? chipState[i].placed : null,
      homeX: x, homeY: y,
      x: chipState[i].x !== undefined ? chipState[i].x : x,
      y: chipState[i].y !== undefined ? chipState[i].y : y,
      w: chipW, h: chipH,
      dragging: false, dragOffsetX: 0, dragOffsetY: 0
    });
    // If just-initialized (no placement), pin to home
    if (chipState[i].placed === null && !chipState[i].dragging) {
      chipState[i].x = x; chipState[i].y = y;
    }
  }
}

function positionControls() {
  resetBtn.position(10, drawHeight + 14);
  revealBtn.position(100, drawHeight + 14);
}

function getColumnRects() {
  // Two-column layout above the feedback strip and pool. Below 600px, stack vertically.
  const headerH = 50;
  const top = headerH + 10;
  // Feedback strip sits at drawHeight - 200; columns end above it
  const colBottom = drawHeight - 210;
  const colHeight = colBottom - top;

  if (canvasWidth < 600) {
    // Stacked
    const half = (colHeight - 10) / 2;
    return [
      { x: margin, y: top,                w: canvasWidth - margin * 2, h: half, lens: LENS_IDENTITY },
      { x: margin, y: top + half + 10,    w: canvasWidth - margin * 2, h: half, lens: LENS_POWER }
    ];
  }
  const colW = (canvasWidth - margin * 3) / 2;
  return [
    { x: margin,                  y: top, w: colW, h: colHeight, lens: LENS_IDENTITY },
    { x: margin * 2 + colW,       y: top, w: colW, h: colHeight, lens: LENS_POWER }
  ];
}

function draw() {
  updateCanvasSize();

  // Background
  noStroke();
  fill(248, 249, 250);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Header
  fill(26, 58, 108);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(18);
  text('AP Thematic Lenses — Founding the Republic', canvasWidth / 2, 8);
  textStyle(ITALIC);
  textSize(12);
  fill(80);
  text('Drag each event chip into the lens column it best illustrates.', canvasWidth / 2, 30);
  textStyle(NORMAL);

  // Columns
  const cols = getColumnRects();
  drawColumn(cols[0], 'American and National Identity',
    'How Americans have defined national identity, debated who belongs, and constructed narratives about what America means.',
    [255, 248, 220], [212, 160, 23]); // gold/amber
  drawColumn(cols[1], 'Politics and Power',
    'How political institutions, parties, and actors have competed for power, shaped policy, and responded to crises.',
    [232, 234, 246], [63, 81, 181]);  // indigo

  // Draw placed chips inside columns (laid out within each column)
  drawPlacedChips(cols);

  // Pool background label
  noStroke();
  fill(70);
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Event Pool — drag chips into a column:', margin, drawHeight - 158);
  textStyle(NORMAL);

  // Draw pool chips (those with placed === null) at home positions
  layoutPoolChips();
  for (let i = 0; i < events.length; i++) {
    const c = chipState[i];
    if (c.placed === null && !c.dragging) {
      drawChip(i, c.x, c.y, c.w, c.h, false);
    }
  }

  // Feedback panel (compact, above the pool / below header)
  drawFeedback(cols);

  // Reveal-all overlay
  if (revealAll) {
    drawRevealOverlay(cols);
  }

  // Draw the actively-dragged chip last so it floats on top
  for (let i = 0; i < events.length; i++) {
    const c = chipState[i];
    if (c.dragging) {
      drawChip(i, c.x, c.y, c.w, c.h, true);
    }
  }

  // Control area label (positioned right of buttons; truncated to canvas width)
  noStroke();
  fill(80);
  textAlign(LEFT, TOP);
  textSize(12);
  const labelX = 260;
  const labelMsg = revealAll ? 'Showing all primary lens connections.'
                             : 'Drag chips into a column, then "Show all connections".';
  text(labelMsg, labelX, drawHeight + 14,
       canvasWidth - labelX - margin, controlHeight - 18);

  positionControls();
}

function drawColumn(rect_, title, definition, fillCol, borderCol) {
  push();
  noStroke();
  fill(fillCol[0], fillCol[1], fillCol[2]);
  rect(rect_.x, rect_.y, rect_.w, rect_.h, 10);
  stroke(borderCol[0], borderCol[1], borderCol[2]);
  strokeWeight(2);
  noFill();
  rect(rect_.x, rect_.y, rect_.w, rect_.h, 10);

  noStroke();
  fill(borderCol[0], borderCol[1], borderCol[2]);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(14);
  text(title, rect_.x + rect_.w / 2, rect_.y + 8);
  textStyle(NORMAL);
  textSize(11);
  fill(60);
  textAlign(LEFT, TOP);
  text(definition, rect_.x + 10, rect_.y + 28, rect_.w - 20, 50);
  pop();
}

function drawPlacedChips(cols) {
  // For each lens column, gather chips placed there and lay them out
  for (let li = 0; li < 2; li++) {
    const col = cols[li];
    const placedHere = [];
    for (let i = 0; i < events.length; i++) {
      if (chipState[i].placed === col.lens && !chipState[i].dragging) {
        placedHere.push(i);
      }
    }
    const innerTop = col.y + 80;
    const chipH = 32;
    const gap = 6;
    const innerW = col.w - 20;
    for (let k = 0; k < placedHere.length; k++) {
      const i = placedHere[k];
      const x = col.x + 10;
      const y = innerTop + k * (chipH + gap);
      // Snap chip to slot
      chipState[i].x = x;
      chipState[i].y = y;
      chipState[i].w = innerW;
      chipState[i].h = chipH;
      drawChip(i, x, y, innerW, chipH, false);
    }
  }
}

function drawChip(i, x, y, w, h, lifted) {
  const ev = events[i];
  const placed = chipState[i].placed;
  let borderR = 180, borderG = 180, borderB = 180;
  let borderWeight = 1;

  // If placed, color border by correctness
  if (placed !== null) {
    const correct = (placed === ev.primary);
    const plausible = (ev.secondary !== null && placed === ev.secondary);
    if (correct) { borderR = 46; borderG = 125; borderB = 50; borderWeight = 2.5; }
    else if (plausible) { borderR = 230; borderG = 145; borderB = 0; borderWeight = 2.5; }
    else { borderR = 200; borderG = 60; borderB = 60; borderWeight = 2.5; }
  }

  push();
  if (lifted) {
    drawingContext.shadowBlur = 14;
    drawingContext.shadowColor = 'rgba(0,0,0,0.25)';
  }
  stroke(borderR, borderG, borderB);
  strokeWeight(borderWeight);
  fill(255);
  rect(x, y, w, h, 6);
  noStroke();
  fill(33);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  // Auto-size text to fit chip width
  textStyle(BOLD);
  let ts = 13;
  textSize(ts);
  while (textWidth(ev.label) > w - 12 && ts > 9) {
    ts -= 0.5;
    textSize(ts);
  }
  text(ev.label, x + w / 2, y + h / 2);
  textStyle(NORMAL);
  pop();
}

function drawFeedback(cols) {
  // A small feedback strip directly above the pool
  const fy = drawHeight - 200;
  const fh = 36;
  if (!lastFeedback) return;
  const colors = {
    correct:   { bg: [232, 245, 233], border: [46, 125, 50],   text: [27, 94, 32] },
    plausible: { bg: [255, 243, 224], border: [230, 145, 0],   text: [120, 75, 0] },
    wrong:     { bg: [255, 235, 238], border: [200, 60, 60],   text: [140, 30, 30] }
  };
  const c = colors[lastFeedback.kind];
  push();
  noStroke();
  fill(c.bg[0], c.bg[1], c.bg[2]);
  rect(margin, fy, canvasWidth - margin * 2, fh, 6);
  stroke(c.border[0], c.border[1], c.border[2]);
  strokeWeight(1.5);
  noFill();
  rect(margin, fy, canvasWidth - margin * 2, fh, 6);
  noStroke();
  fill(c.text[0], c.text[1], c.text[2]);
  textAlign(LEFT, CENTER);
  textSize(12);
  textStyle(BOLD);
  const prefix = lastFeedback.kind === 'correct' ? '✓ Primary lens — '
              : lastFeedback.kind === 'plausible' ? '~ Plausible alternative — '
              : '✗ Not the best fit — ';
  text(prefix, margin + 10, fy + fh / 2);
  textStyle(NORMAL);
  const px = margin + 10 + textWidth(prefix);
  text(lastFeedback.text, px, fy + fh / 2 + 1, canvasWidth - margin * 2 - 20 - (px - margin - 10));
  pop();
}

function drawRevealOverlay(cols) {
  push();
  noStroke();
  fill(255, 255, 255, 235);
  rect(margin, cols[0].y, canvasWidth - margin * 2, cols[0].h, 10);
  fill(26, 58, 108);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(15);
  text('Primary Lens Connections', canvasWidth / 2, cols[0].y + 8);
  textStyle(NORMAL);

  // Two columns of text
  const colW = (canvasWidth - margin * 3) / 2;
  const left = { x: margin, y: cols[0].y + 32 };
  const right = { x: margin * 2 + colW, y: cols[0].y + 32 };
  let lyL = left.y, lyR = right.y;
  textAlign(LEFT, TOP);
  textSize(11);
  for (let i = 0; i < events.length; i++) {
    const ev = events[i];
    const target = (ev.primary === LENS_IDENTITY) ? left : right;
    const lyRef = (target === left) ? lyL : lyR;
    fill(20);
    textStyle(BOLD);
    text('• ' + ev.label, target.x + 4, lyRef, colW - 8);
    textStyle(NORMAL);
    fill(60);
    text(ev.primaryWhy, target.x + 14, lyRef + 14, colW - 18);
    if (target === left) lyL += 50; else lyR += 50;
  }
  pop();
}

function chipUnderMouse() {
  for (let i = events.length - 1; i >= 0; i--) {
    const c = chipState[i];
    if (mouseX >= c.x && mouseX <= c.x + c.w && mouseY >= c.y && mouseY <= c.y + c.h) {
      return i;
    }
  }
  return -1;
}

function mousePressed() {
  if (mouseY > drawHeight) return; // ignore clicks in control strip
  const i = chipUnderMouse();
  if (i === -1) return;
  chipState[i].dragging = true;
  chipState[i].dragOffsetX = mouseX - chipState[i].x;
  chipState[i].dragOffsetY = mouseY - chipState[i].y;
  // If chip was placed, lift it so layout reflows
  // (we keep its placed flag until release)
}

function mouseDragged() {
  for (let i = 0; i < events.length; i++) {
    const c = chipState[i];
    if (c.dragging) {
      c.x = mouseX - c.dragOffsetX;
      c.y = mouseY - c.dragOffsetY;
    }
  }
}

function mouseReleased() {
  for (let i = 0; i < events.length; i++) {
    const c = chipState[i];
    if (!c.dragging) continue;
    c.dragging = false;
    // Determine drop target by chip center
    const cx = c.x + c.w / 2;
    const cy = c.y + c.h / 2;
    const cols = getColumnRects();
    let dropped = null;
    for (const col of cols) {
      if (cx >= col.x && cx <= col.x + col.w && cy >= col.y && cy <= col.y + col.h) {
        dropped = col.lens;
        break;
      }
    }
    if (dropped !== null) {
      c.placed = dropped;
      classifyFeedback(i, dropped);
    } else {
      // Released outside any column — return to pool
      c.placed = null;
      lastFeedback = null;
      // home position will be re-applied on next layoutPoolChips()
    }
  }
}

function classifyFeedback(eventIdx, lens) {
  const ev = events[eventIdx];
  if (lens === ev.primary) {
    lastFeedback = { eventIdx, kind: 'correct',
      text: ev.label + ': ' + ev.primaryWhy };
  } else if (ev.secondary !== null && lens === ev.secondary) {
    lastFeedback = { eventIdx, kind: 'plausible',
      text: ev.label + ': ' + ev.secondaryWhy };
  } else {
    lastFeedback = { eventIdx, kind: 'wrong',
      text: ev.label + " is more clearly an example of the other lens. Try the other column." };
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}
