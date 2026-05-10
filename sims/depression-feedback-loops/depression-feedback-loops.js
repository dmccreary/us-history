// Depression Causes — Interacting Feedback Loops
// CANVAS_HEIGHT: 720
// Chapter 14: The Roaring Twenties, Depression, and New Deal (1920–1941)
// Bloom Level: Analyze (L4) — Diagram the reinforcing feedback loops
//
// Layout: drawHeight (640) + controlHeight (80) = 720
// Eight-node causal loop diagram of the Great Depression's amplifying
// feedback loops (R1 deflationary spiral, R2 banking panic, R3 trade
// collapse, R4 stock-wealth shock). Click any loop button to highlight
// every arrow in that loop and read how it worked + which New Deal
// program tried to break it. The "Shock Size" slider drives a small
// dynamic-systems model that shows how a stock-market shock cascades
// through the loops into unemployment.

let canvasWidth = 900;
let drawHeight = 640;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 16;

// ---- Node definitions (the 8 nodes in the spec) -------------------------
// Positions are computed at draw-time from the canvas size; angle (in
// degrees, 0 = right, 90 = up) places them around an ellipse centred on
// the diagram region.
const nodes = [
  { id: 'stock',  label: 'Stock Market',         angle: 90  },
  { id: 'wealth', label: 'Consumer Spending',    angle: 45  },
  { id: 'biz',    label: 'Business Production',  angle: 0   },
  { id: 'jobs',   label: 'Employment',           angle: -45 },
  { id: 'farm',   label: 'Agricultural Prices',  angle: -90 },
  { id: 'trade',  label: 'International Trade',  angle: -135},
  { id: 'loans',  label: 'Bank Loans',           angle: 180 },
  { id: 'deps',   label: 'Bank Deposits',        angle: 135 }
];

// ---- Edges --------------------------------------------------------------
// polarity: '+' same direction (reinforcing link), '-' opposite direction
// loops: array of loop ids this edge belongs to
const edges = [
  // R1: Deflationary spiral -- jobs -> wealth -> biz -> jobs
  { from: 'jobs',   to: 'wealth', pol: '+', loops: ['R1'] },
  { from: 'wealth', to: 'biz',    pol: '+', loops: ['R1','R4'] },
  { from: 'biz',    to: 'jobs',   pol: '+', loops: ['R1','R2'] },

  // R2: Banking panic -- deps -> loans -> biz -> jobs -> deps
  { from: 'deps',   to: 'loans',  pol: '+', loops: ['R2'] },
  { from: 'loans',  to: 'biz',    pol: '+', loops: ['R2'] },
  { from: 'jobs',   to: 'deps',   pol: '+', loops: ['R2'] },

  // R3: Trade collapse -- trade -> biz -> jobs (and farm feeds trade)
  { from: 'trade',  to: 'biz',    pol: '+', loops: ['R3'] },
  { from: 'farm',   to: 'trade',  pol: '+', loops: ['R3'] },
  { from: 'farm',   to: 'wealth', pol: '+', loops: ['R3'] },

  // R4: Stock-wealth shock -- stock -> wealth (consumer wealth effect)
  //     and biz -> stock (bad earnings drive shares lower)
  { from: 'stock',  to: 'wealth', pol: '+', loops: ['R4'] },
  { from: 'biz',    to: 'stock',  pol: '+', loops: ['R4'] },

  // Cross-link: bank failures destroy deposits when biz collapses
  //    (defaults wipe out collateral) -- closes the banking loop
  { from: 'biz',    to: 'deps',   pol: '+', loops: ['R2'] }
];

// ---- Loops --------------------------------------------------------------
const loops = [
  {
    id: 'R1',
    name: 'R1 — Deflationary Spiral',
    color: [200, 50, 50],          // red
    nodes: ['jobs', 'wealth', 'biz'],
    description:
      'Layoffs cut household income, which cuts consumer spending, which forces businesses to cut production, which forces more layoffs. Falling prices added a second twist: deflation made every dollar of debt heavier in real terms, so households and farms defaulted, deepening the spiral.',
    program: 'WPA · CCC · Social Security',
    programDetail:
      'The Works Progress Administration (1935) and Civilian Conservation Corps (1933) put 8.5 million people directly on the federal payroll, restoring wages and demand. Social Security (1935) created the first floor under retiree income, dampening the income-to-spending leg of the loop permanently.'
  },
  {
    id: 'R2',
    name: 'R2 — Banking Panic',
    color: [220, 110, 30],         // orange
    nodes: ['deps', 'loans', 'biz', 'jobs'],
    description:
      'When depositors heard one bank had failed, they pulled cash from every bank — even healthy ones. Without deposits banks could not lend; without loans businesses could not invest or pay workers; falling employment cut deposits further. Roughly 9,000 banks failed between 1930 and 1933.',
    program: 'FDIC · Glass-Steagall · Bank Holiday',
    programDetail:
      'FDR\'s Bank Holiday (March 1933) closed every bank for four days while examiners certified them. The Glass-Steagall Act (1933) created the FDIC, federally insuring deposits up to $2,500. Bank runs essentially ended once depositors knew their money was safe — the structural fix that broke this loop for fifty years.'
  },
  {
    id: 'R3',
    name: 'R3 — Trade Collapse',
    color: [30, 130, 60],          // green
    nodes: ['trade', 'biz', 'jobs', 'farm'],
    description:
      'The Smoot-Hawley Tariff (1930) raised U.S. duties on 20,000 goods. Twenty-five trading partners retaliated. World trade collapsed by ~65% from 1929 to 1934. Farm exports — wheat, cotton, tobacco — fell hardest, crushing rural America just as the dust storms began.',
    program: 'AAA · Reciprocal Trade Agreements Act',
    programDetail:
      'The Agricultural Adjustment Act (1933) paid farmers to cut output, raising crop prices ~50% by 1936. The Reciprocal Trade Agreements Act (1934) let FDR negotiate bilateral tariff cuts without Senate approval — quietly reversing Smoot-Hawley and re-opening export markets.'
  },
  {
    id: 'R4',
    name: 'R4 — Wealth-Effect Shock',
    color: [110, 60, 170],         // purple
    nodes: ['stock', 'wealth', 'biz'],
    description:
      'The October 1929 crash erased ~$30 billion in paper wealth — about 40% of GDP. Households pulled back on durable goods (cars, appliances). Falling sales hit corporate earnings, pushing share prices lower still. This was the first shock that lit the other three loops on fire.',
    program: 'SEC · Securities Acts',
    programDetail:
      'The Securities Act (1933) and Securities Exchange Act (1934) created the SEC, mandated disclosure for new stock issues, and outlawed insider trading and stock-pool manipulation. The reform was structural: it didn\'t prevent crashes, but it made the 1929-style fraud-driven bubble much harder to inflate.'
  }
];

// ---- State --------------------------------------------------------------
let activeLoop = 'R1';      // default selection
let showProgram = false;    // toggled by "Show New Deal Response" button
let shockSlider;            // 0..100 % market drop
let resetBtn, programBtn;
let loopBtns = {};          // R1..R4 buttons

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Loop selector buttons
  for (const lp of loops) {
    const b = createButton(lp.id);
    b.parent(document.querySelector('main'));
    b.mousePressed(() => { activeLoop = lp.id; });
    loopBtns[lp.id] = b;
  }

  programBtn = createButton('Show New Deal Response');
  programBtn.parent(document.querySelector('main'));
  programBtn.mousePressed(() => {
    showProgram = !showProgram;
    programBtn.html(showProgram ? 'Hide New Deal Response' : 'Show New Deal Response');
  });

  shockSlider = createSlider(0, 100, 40, 1);
  shockSlider.parent(document.querySelector('main'));

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(() => {
    activeLoop = 'R1';
    showProgram = false;
    programBtn.html('Show New Deal Response');
    shockSlider.value(40);
  });

  positionControls();
  describe(
    'Causal loop diagram of the Great Depression with eight nodes (Stock Market, Consumer Spending, Business Production, Employment, Agricultural Prices, International Trade, Bank Loans, Bank Deposits) connected by colored arrows. Four reinforcing loops are shown: R1 deflationary spiral, R2 banking panic, R3 trade collapse, R4 wealth-effect shock. Click R1 through R4 to highlight a loop and read how it worked plus which New Deal program targeted it. The Shock Size slider shows how a stock market drop is amplified by the loops into unemployment.',
    LABEL
  );
}

function positionControls() {
  const row1y = drawHeight + 12;
  const row2y = drawHeight + 46;
  let x = margin;
  for (const lp of loops) {
    loopBtns[lp.id].position(x, row1y);
    loopBtns[lp.id].size(46, 24);
    x += 54;
  }
  programBtn.position(x + 8, row1y);
  resetBtn.position(canvasWidth - margin - 60, row1y);

  // Slider on row 2 — full width minus label and right-side readout
  const sliderX = margin + 90;
  shockSlider.position(sliderX, row2y + 4);
  shockSlider.size(max(120, canvasWidth - sliderX - margin - 240));
}

// Cached node positions for the current frame
function computeNodePositions() {
  // The diagram uses the left ~62% of the drawing area.
  // The right ~38% is the description/program panel.
  const panelW = min(330, canvasWidth * 0.36);
  const diagX = margin;
  const diagW = canvasWidth - panelW - margin * 3;
  const diagY = 60;
  const diagH = drawHeight - diagY - 60;
  const cx = diagX + diagW / 2;
  const cy = diagY + diagH / 2;
  const rx = diagW * 0.42;
  const ry = diagH * 0.42;

  const pos = {};
  for (const n of nodes) {
    const a = radians(n.angle);
    pos[n.id] = {
      x: cx + cos(a) * rx,
      y: cy - sin(a) * ry,
      label: n.label
    };
  }
  return { pos, panelW, diagX, diagY, diagW, diagH, cx, cy };
}

function draw() {
  updateCanvasSize();

  // Background
  noStroke();
  fill('#f4f6f9');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawHeader();

  const g = computeNodePositions();
  drawEdges(g);
  drawNodes(g);
  drawSidePanel(g);
  drawShockReadout();
  drawControlLabels();

  positionControls();
}

function drawHeader() {
  noStroke();
  fill(20, 40, 90);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(20);
  text('Depression Causes — Interacting Feedback Loops', canvasWidth / 2, 12);
  textStyle(NORMAL);
  textSize(12);
  fill(80);
  text(
    'Click R1–R4 to highlight a loop. Drag the Shock Size slider to see how the loops amplify a market drop.',
    canvasWidth / 2, 36
  );
}

function isEdgeInActiveLoop(e) {
  return e.loops.indexOf(activeLoop) >= 0;
}

function activeLoopColor() {
  const lp = loops.find(l => l.id === activeLoop);
  return lp ? lp.color : [120, 120, 120];
}

function drawEdges(g) {
  for (const e of edges) {
    const a = g.pos[e.from], b = g.pos[e.to];
    if (!a || !b) continue;

    const inLoop = isEdgeInActiveLoop(e);
    const col = inLoop ? activeLoopColor() : [180, 180, 180];
    const alpha = inLoop ? 240 : 110;
    const w = inLoop ? 3.2 : 1.4;
    drawCurvedArrow(a.x, a.y, b.x, b.y, col, alpha, w, e.pol, inLoop, g);
  }
}

// Draw a slightly-curved arrow from a to b. Polarity label is + or -.
// We inset both endpoints by the node radius (24) so arrows don't bury
// themselves in the node bubble.
function drawCurvedArrow(x1, y1, x2, y2, col, alpha, w, polarity, highlighted, g) {
  // Inset endpoints by node radius
  const nodeR = 30;
  let dx = x2 - x1, dy = y2 - y1;
  const len = sqrt(dx * dx + dy * dy);
  if (len < 1) return;
  const ux = dx / len, uy = dy / len;
  const sx = x1 + ux * nodeR;
  const sy = y1 + uy * nodeR;
  const ex = x2 - ux * nodeR;
  const ey = y2 - uy * nodeR;

  // Curve: bend the arrow toward the diagram centre so loops "wrap"
  // visibly and parallel arrows don't overlap. Sign of the perpendicular
  // is chosen so curves bend AWAY from the centre (consistent ring look).
  const mxL = (sx + ex) / 2;
  const myL = (sy + ey) / 2;
  let nx = -uy, ny = ux;     // perpendicular
  // Choose perpendicular pointing AWAY from diagram centre:
  const toC = (g.cx - mxL) * nx + (g.cy - myL) * ny;
  if (toC > 0) { nx = -nx; ny = -ny; }
  const bow = min(40, len * 0.08);
  const cx = mxL + nx * bow;
  const cy = myL + ny * bow;

  // Curve
  noFill();
  stroke(col[0], col[1], col[2], alpha);
  strokeWeight(w);
  bezier(sx, sy, cx, cy, cx, cy, ex, ey);

  // Arrow head
  const tdx = ex - cx, tdy = ey - cy;
  const tlen = max(1, sqrt(tdx * tdx + tdy * tdy));
  const txu = tdx / tlen, tyu = tdy / tlen;
  const headSize = highlighted ? 11 : 8;
  const hx1 = ex - txu * headSize - tyu * (headSize * 0.55);
  const hy1 = ey - tyu * headSize + txu * (headSize * 0.55);
  const hx2 = ex - txu * headSize + tyu * (headSize * 0.55);
  const hy2 = ey - tyu * headSize - txu * (headSize * 0.55);
  noStroke();
  fill(col[0], col[1], col[2], alpha);
  triangle(ex, ey, hx1, hy1, hx2, hy2);

  // Polarity label near the curve midpoint, offset perpendicular so it
  // sits OUTSIDE the curve (clear of the node bubbles).
  // Bezier midpoint with both controls equal to (cx,cy) is:
  //   M = 0.25*P0 + 0.5*Pc + 0.25*P1
  const midX = 0.25 * sx + 0.5 * cx + 0.25 * ex;
  const midY = 0.25 * sy + 0.5 * cy + 0.25 * ey;
  // Push the label a bit further outward (same direction as the curve bow)
  const labelX = midX + nx * 10;
  const labelY = midY + ny * 10;

  // Background chip
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(highlighted ? 13 : 11);
  const chipR = highlighted ? 9 : 7;
  fill(255, 255, 255, highlighted ? 240 : 160);
  stroke(col[0], col[1], col[2], alpha);
  strokeWeight(1);
  ellipse(labelX, labelY, chipR * 2, chipR * 2);
  noStroke();
  fill(col[0], col[1], col[2], alpha);
  text(polarity, labelX, labelY);
  textStyle(NORMAL);
}

function drawNodes(g) {
  // Determine which nodes are in the active loop
  const lp = loops.find(l => l.id === activeLoop);
  const inLoopSet = new Set(lp ? lp.nodes : []);

  for (const n of nodes) {
    const p = g.pos[n.id];
    if (!p) continue;
    const isHL = inLoopSet.has(n.id);

    // Bubble
    if (isHL) {
      const c = activeLoopColor();
      fill(c[0], c[1], c[2]);
      stroke(20);
      strokeWeight(2);
    } else {
      fill(245, 248, 252);
      stroke(140);
      strokeWeight(1.4);
    }
    ellipse(p.x, p.y, 60, 60);

    // Label (multi-line, wrap two words per line if long)
    noStroke();
    fill(isHL ? 255 : 30);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(11);
    const words = p.label.split(' ');
    if (words.length === 1) {
      text(p.label, p.x, p.y);
    } else if (words.length === 2) {
      text(words[0], p.x, p.y - 6);
      text(words[1], p.x, p.y + 6);
    } else {
      // 3 words -> stack
      text(words[0], p.x, p.y - 10);
      text(words[1], p.x, p.y);
      text(words[2], p.x, p.y + 10);
    }
    textStyle(NORMAL);

    // Show projected drop% under node when slider is active and node
    // is in the currently selected loop
    if (isHL) {
      const dropPct = projectedDrop(n.id, shockSlider ? shockSlider.value() : 0);
      if (dropPct !== null) {
        noStroke();
        fill(180, 30, 30);
        textSize(11);
        textStyle(BOLD);
        text('-' + dropPct + '%', p.x, p.y + 44);
        textStyle(NORMAL);
      }
    }
  }
}

// Map shock-size (0..100% market drop) to a downstream variable's drop.
// This is a teaching approximation: each downstream variable gets a
// gain factor calibrated so a 40% market drop produces ~25% unemployment
// drop, which matches 1929–1933 history.
function projectedDrop(nodeId, shockPct) {
  if (shockPct <= 0) return null;
  const gains = {
    stock:  1.00,   // by definition
    wealth: 0.55,   // wealth effect on consumer spending
    biz:    0.45,   // business output (industrial production fell ~46%)
    jobs:   0.62,   // unemployment ROSE 25 pts -- show as 0.62*shock for 40-> ~25
    farm:   1.20,   // ag prices fell ~60% on a 40% shock
    trade:  1.62,   // world trade fell ~65% on a 40% shock
    deps:   0.85,   // bank deposits fell ~33% (bank closures)
    loans:  1.20    // bank lending fell ~50%+
  };
  const g = gains[nodeId];
  if (g === undefined) return null;
  return Math.round(shockPct * g);
}

function drawSidePanel(g) {
  const panelX = canvasWidth - g.panelW - margin;
  const panelY = 60;
  const panelW = g.panelW;
  const panelH = drawHeight - panelY - 30;

  fill(248, 250, 252);
  stroke(180);
  strokeWeight(1.5);
  rect(panelX, panelY, panelW, panelH, 10);

  const lp = loops.find(l => l.id === activeLoop);
  if (!lp) return;

  // Header strip
  noStroke();
  fill(lp.color[0], lp.color[1], lp.color[2]);
  rect(panelX, panelY, panelW, 36, 10, 10, 0, 0);
  fill(255);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(14);
  text(lp.name, panelX + 12, panelY + 18);

  // Body
  let cy = panelY + 50;
  fill(80);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(11);
  text('HOW THIS LOOP WORKED', panelX + 12, cy);
  cy += 14;
  fill(30);
  textStyle(NORMAL);
  textSize(12);
  text(lp.description, panelX + 12, cy, panelW - 24, 200);
  cy += 200;

  // Loop sequence (which nodes, in order, with arrows)
  fill(80);
  textStyle(BOLD);
  textSize(11);
  text('LOOP PATH', panelX + 12, cy);
  cy += 14;
  fill(30);
  textStyle(NORMAL);
  textSize(12);
  const labels = lp.nodes.map(id => nodes.find(n => n.id === id).label);
  const path = labels.join(' → ') + ' → ...';
  text(path, panelX + 12, cy, panelW - 24, 50);
  cy += 50;

  // New Deal targeted programs — shown when toggle is on, otherwise just
  // the program names as a hint
  fill(80);
  textStyle(BOLD);
  textSize(11);
  text('NEW DEAL PROGRAM(S) THAT TARGETED THIS LOOP', panelX + 12, cy);
  cy += 14;

  if (showProgram) {
    fill(20, 100, 50);
    textStyle(BOLD);
    textSize(13);
    text(lp.program, panelX + 12, cy, panelW - 24, 36);
    cy += 32;
    fill(30);
    textStyle(NORMAL);
    textSize(12);
    text(lp.programDetail, panelX + 12, cy, panelW - 24, panelH - (cy - panelY) - 12);
  } else {
    fill(20, 100, 50);
    textStyle(BOLD);
    textSize(13);
    text(lp.program, panelX + 12, cy, panelW - 24, 36);
    cy += 36;
    fill(120);
    textStyle(ITALIC);
    textSize(11);
    text('Click "Show New Deal Response" to read how the program broke this loop.',
      panelX + 12, cy, panelW - 24, 60);
    textStyle(NORMAL);
  }
}

function drawShockReadout() {
  // Bottom strip showing the cascade: shock -> unemployment, etc.
  const barY = drawHeight - 22;
  const shock = shockSlider ? shockSlider.value() : 40;
  const unemp = Math.round(shock * 0.62);
  const indProd = Math.round(shock * 1.15);
  const trade = Math.round(shock * 1.62);
  const banks = Math.round(shock * 0.85);

  noStroke();
  fill(245, 248, 252);
  rect(margin, barY - 4, canvasWidth - margin * 2, 22, 4);

  textAlign(LEFT, CENTER);
  textSize(11);
  textStyle(BOLD);
  fill(180, 30, 30);
  text('Cascade @ ' + shock + '% market drop:', margin + 8, barY + 7);
  fill(40);
  textStyle(NORMAL);
  text('Industrial production -' + indProd + '%', margin + 200, barY + 7);
  text('Unemployment +' + unemp + ' pts', margin + 360, barY + 7);
  text('World trade -' + trade + '%', margin + 510, barY + 7);
  text('Bank deposits -' + banks + '%', margin + 640, barY + 7);
}

function drawControlLabels() {
  noStroke();
  fill(60);
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Loops:', margin, drawHeight + 0);
  text('Shock Size: ' + (shockSlider ? shockSlider.value() : 0) + '%',
    margin, drawHeight + 50);
  textStyle(NORMAL);

  // Highlight active loop button by drawing a colored bar under it
  const lp = loops.find(l => l.id === activeLoop);
  if (lp) {
    const idx = loops.findIndex(l => l.id === activeLoop);
    const x = margin + idx * 54;
    noStroke();
    fill(lp.color[0], lp.color[1], lp.color[2]);
    rect(x, drawHeight + 38, 46, 3);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}
