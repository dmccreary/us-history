// Constitutional Structure — Checks and Balances Explorer
// CANVAS_HEIGHT: 720
// Chapter 5: Founding the Republic (1783–1800)
// Bloom Level: Understand (L2) — Explain checks and balances among the three branches
//
// Layout: drawHeight (660) + controlHeight (60) = 720
// Triangle of three branches with bidirectional check arrows.
// Click any arrow to read the check's name, source/target, and a historical example.
// Click a branch to highlight its outgoing/incoming checks.
// "Historical Moments" button cycles through famous confrontations.

let canvasWidth = 900;
let drawHeight = 660;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 16;

// State
let selectedCheck = null;     // index into checks[] or null
let highlightedBranch = null; // 'L', 'E', 'J' or null
let momentIdx = -1;           // -1 = no moment displayed
let momentBtn, resetBtn, prevMomentBtn;

// Branch colors (from spec)
const COLOR_L = [57, 73, 171];    // Legislative — indigo  #3949ab
const COLOR_E = [198, 40, 40];    // Executive  — red     #c62828
const COLOR_J = [249, 168, 37];   // Judicial   — gold    #f9a825

const branches = {
  L: {
    key: 'L',
    name: 'Legislative',
    sub: 'Congress',
    color: COLOR_L,
    powers: [
      'Make laws',
      'Override vetoes',
      'Control budget',
      'Declare war',
      'Confirm appointments',
      'Impeach'
    ]
  },
  E: {
    key: 'E',
    name: 'Executive',
    sub: 'President',
    color: COLOR_E,
    powers: [
      'Sign or veto laws',
      'Command military',
      'Nominate judges',
      'Executive orders',
      'Pardon power'
    ]
  },
  J: {
    key: 'J',
    name: 'Judicial',
    sub: 'Supreme Court',
    color: COLOR_J,
    powers: [
      'Declare laws unconstitutional',
      'Interpret laws',
      'Rule on executive action'
    ]
  }
};

// Each check: from -> to, with a label and a historical example.
// curveSide is +1 or -1 to push parallel arrows apart.
const checks = [
  // Congress -> President
  { from: 'L', to: 'E', side: +1, name: 'Override Presidential Veto',
    desc: 'A two-thirds vote in both chambers can enact a bill into law over the President\'s veto.',
    example: '1866 — Congress overrode President Andrew Johnson\'s veto of the Civil Rights Act, advancing Reconstruction over executive opposition.' },
  { from: 'L', to: 'E', side: 0, name: 'Impeach the President',
    desc: 'The House impeaches; the Senate tries and may remove the President for "high crimes and misdemeanors."',
    example: '1974 — President Nixon resigned as the House Judiciary Committee approved articles of impeachment over Watergate. Three presidents have been impeached: Andrew Johnson (1868), Bill Clinton (1998), Donald Trump (2019, 2021).' },
  { from: 'L', to: 'E', side: -1, name: 'Control the Budget',
    desc: 'Only Congress can appropriate funds; the President must spend within those limits.',
    example: '1973 — The War Powers Resolution and 1974 Impoundment Control Act limited Nixon\'s ability to withhold appropriated funds and wage undeclared war.' },

  // President -> Congress
  { from: 'E', to: 'L', side: +1, name: 'Veto Legislation',
    desc: 'The President can return a bill unsigned; it dies unless two-thirds of each chamber overrides.',
    example: '1832 — Andrew Jackson vetoed the re-charter of the Second Bank of the United States, reshaping economic policy and party politics.' },
  { from: 'E', to: 'L', side: 0, name: 'Call Special Sessions',
    desc: 'The President may convene Congress on extraordinary occasions when the chambers are not in session.',
    example: '1933 — FDR called a special session that produced the "Hundred Days" of New Deal legislation.' },
  { from: 'E', to: 'L', side: -1, name: 'Recommend Legislation',
    desc: 'The State of the Union and the bully pulpit let presidents set the legislative agenda.',
    example: '1965 — LBJ\'s Great Society address pushed Medicare, Medicaid, and the Voting Rights Act through Congress.' },

  // Congress -> Courts
  { from: 'L', to: 'J', side: +1, name: 'Confirm (or Reject) Judges',
    desc: 'The Senate provides "advice and consent" on every federal judicial nomination.',
    example: '1987 — The Senate rejected Robert Bork\'s nomination to the Supreme Court 58–42. 2016 — the Senate refused to consider Merrick Garland\'s nomination for nearly a year.' },
  { from: 'L', to: 'J', side: 0, name: 'Set Court Jurisdiction',
    desc: 'Congress defines the structure and appellate jurisdiction of the federal courts (Art. III §2).',
    example: '1869 — Congress fixed the Supreme Court at nine justices. 1937 — the Senate rejected FDR\'s court-packing plan to add up to six new justices.' },
  { from: 'L', to: 'J', side: -1, name: 'Impeach Federal Judges',
    desc: 'Judges serve "during good behavior" but can be impeached and removed by Congress.',
    example: '1804 — Justice Samuel Chase was impeached by the House but acquitted by the Senate, establishing that policy disagreement alone is not grounds for removal.' },

  // Courts -> Congress
  { from: 'J', to: 'L', side: 0, name: 'Declare Laws Unconstitutional',
    desc: 'Judicial review allows the courts to void acts of Congress that conflict with the Constitution.',
    example: '1803 — Marbury v. Madison established judicial review. 1857 — Dred Scott struck down the Missouri Compromise; 2013 — Shelby County v. Holder voided part of the Voting Rights Act.' },

  // President -> Courts
  { from: 'E', to: 'J', side: 0, name: 'Nominate Federal Judges',
    desc: 'The President nominates all federal judges, including Supreme Court justices.',
    example: '1937 — FDR\'s court-packing fight; 2016–2020 — three Trump Supreme Court nominations reshaped the Court for a generation.' },

  // Courts -> President
  { from: 'J', to: 'E', side: 0, name: 'Rule Executive Action Unconstitutional',
    desc: 'Courts can void executive orders and limit presidential power.',
    example: '1952 — Youngstown Sheet & Tube v. Sawyer struck down Truman\'s seizure of the steel mills. 1974 — U.S. v. Nixon forced release of the Watergate tapes.' }
];

// Famous historical "moments" cycled by the button
const moments = [
  { year: '1803', title: 'Marbury v. Madison',
    text: 'Chief Justice John Marshall establishes judicial review — the Court\'s power to strike down acts of Congress. Foundation of every check the Judicial branch exercises today.' },
  { year: '1832', title: 'Jackson\'s Bank Veto',
    text: 'Andrew Jackson vetoes the Second Bank of the United States, expanding the veto from a constitutional check to a political weapon. "Let him enforce it" — Jackson on the Court.' },
  { year: '1868', title: 'Impeachment of Andrew Johnson',
    text: 'House impeaches Johnson over Reconstruction policy; Senate acquits by one vote. Establishes that impeachment requires more than policy disagreement.' },
  { year: '1937', title: 'FDR\'s Court-Packing Plan',
    text: 'Roosevelt proposes adding up to six justices after the Court strikes down New Deal laws. The Senate refuses, but the Court soon shifts ("the switch in time that saved nine").' },
  { year: '1952', title: 'Youngstown Steel Seizure',
    text: 'Supreme Court rules Truman\'s seizure of steel mills during Korea unconstitutional — a foundational limit on emergency executive power.' },
  { year: '1974', title: 'United States v. Nixon / Watergate',
    text: 'Court orders Nixon to release Oval Office tapes; the Saturday Night Massacre and impeachment proceedings follow. Nixon resigns. All three branches in motion.' },
  { year: '1998', title: 'Clinton Impeachment',
    text: 'House impeaches Clinton over perjury and obstruction; Senate acquits. Reaffirms the high political bar for removal.' },
  { year: '2016', title: 'Garland Nomination Blocked',
    text: 'Senate Majority Leader McConnell refuses to hold hearings on President Obama\'s Supreme Court nominee Merrick Garland for 293 days. Tests the limits of "advice and consent."' }
];

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  momentBtn = createButton('Next Historical Moment ▶');
  momentBtn.parent(document.querySelector('main'));
  momentBtn.mousePressed(() => {
    momentIdx = (momentIdx + 1) % moments.length;
    selectedCheck = null;
    highlightedBranch = null;
  });

  prevMomentBtn = createButton('◀ Previous');
  prevMomentBtn.parent(document.querySelector('main'));
  prevMomentBtn.mousePressed(() => {
    momentIdx = (momentIdx - 1 + moments.length) % moments.length;
    selectedCheck = null;
    highlightedBranch = null;
  });

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(() => {
    selectedCheck = null;
    highlightedBranch = null;
    momentIdx = -1;
  });

  positionControls();
  describe('Triangle diagram of the three branches of U.S. government — Legislative, Executive, and Judicial — connected by curved arrows representing constitutional checks. Click an arrow to read the check\'s name and a historical example. Click a branch node to highlight its checks. The Historical Moments button cycles through famous confrontations.', LABEL);
}

function positionControls() {
  momentBtn.position(margin, drawHeight + 18);
  prevMomentBtn.position(margin + 200, drawHeight + 18);
  resetBtn.position(canvasWidth - margin - 60, drawHeight + 18);
}

// Triangle node geometry — recalculated each frame so it tracks canvas width.
function nodeGeometry() {
  // Reserve right side for the detail panel
  const panelW = min(330, canvasWidth * 0.36);
  const triLeft = margin;
  const triRight = canvasWidth - panelW - margin * 2;
  const triW = triRight - triLeft;
  const nodeW = constrain(triW * 0.36, 150, 240);
  const nodeH = 110;

  const topY = 50;
  const botY = 360;

  const lx = triLeft + nodeW / 2 + 10;
  const ex = triRight - nodeW / 2 - 10;
  const jx = (lx + ex) / 2;

  return {
    panelW,
    L: { cx: lx, cy: topY + nodeH / 2, w: nodeW, h: nodeH },
    E: { cx: ex, cy: topY + nodeH / 2, w: nodeW, h: nodeH },
    J: { cx: jx, cy: botY + nodeH / 2, w: nodeW, h: nodeH }
  };
}

function draw() {
  updateCanvasSize();

  // Background regions
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill(20, 40, 90);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(20);
  text('Checks and Balances Explorer', canvasWidth / 2, 12);
  textStyle(NORMAL);
  textSize(12);
  fill(80);
  text('Click an arrow to read about that check. Click a branch to highlight its checks.', canvasWidth / 2, 36);

  const g = nodeGeometry();

  // Draw arrows under nodes
  drawAllArrows(g);

  // Draw the three branch nodes
  drawBranchNode(g.L, branches.L);
  drawBranchNode(g.E, branches.E);
  drawBranchNode(g.J, branches.J);

  // Right-side detail or moment panel
  drawSidePanel(g);

  // Footer reminder
  noStroke();
  fill(100);
  textAlign(LEFT, CENTER);
  textSize(12);
  textStyle(ITALIC);
  text('Tip: highlight a branch to see every check it exercises (outgoing) and every check it faces (incoming).',
    margin, drawHeight - 18);
  textStyle(NORMAL);

  positionControls();
}

function drawBranchNode(geo, br) {
  const isHL = highlightedBranch === br.key;
  const c = br.color;

  // Card background
  if (isHL) {
    fill(c[0], c[1], c[2], 230);
    stroke(20);
    strokeWeight(3);
  } else {
    fill(c[0], c[1], c[2], 200);
    stroke(c[0] * 0.6, c[1] * 0.6, c[2] * 0.6);
    strokeWeight(1.5);
  }
  rectMode(CENTER);
  rect(geo.cx, geo.cy, geo.w, geo.h, 12);
  rectMode(CORNER);

  // Title
  noStroke();
  fill(255);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(15);
  text(br.name, geo.cx, geo.cy - geo.h / 2 + 8);
  textSize(11);
  textStyle(NORMAL);
  text('(' + br.sub + ')', geo.cx, geo.cy - geo.h / 2 + 26);

  // Powers list
  textAlign(LEFT, TOP);
  textSize(10);
  const px = geo.cx - geo.w / 2 + 10;
  let py = geo.cy - geo.h / 2 + 44;
  for (let i = 0; i < br.powers.length; i++) {
    text('• ' + br.powers[i], px, py, geo.w - 20);
    py += 11;
  }
}

function drawAllArrows(g) {
  // Group checks by ordered pair so we can spread parallels
  for (let i = 0; i < checks.length; i++) {
    drawCheckArrow(g, i);
  }
}

// Compute the geometry of a check arrow as a quadratic curve.
// Returns {x1,y1, cx,cy, x2,y2, midPt, color}
function checkArrowGeom(g, idx) {
  const ck = checks[idx];
  const a = g[ck.from];
  const b = g[ck.to];
  const col = branches[ck.from].color;

  // Direction unit vector from a to b
  let dx = b.cx - a.cx, dy = b.cy - a.cy;
  const len = sqrt(dx * dx + dy * dy);
  const ux = dx / len, uy = dy / len;

  // Offset start/end so arrows leave from the side of the rounded rect
  // (simple inset along the line by ~half the box dimension)
  const startInset = 0.42;
  const endInset = 0.42;
  const x1 = a.cx + ux * a.w * startInset * 0.95;
  const y1 = a.cy + uy * a.h * startInset * 0.95;
  const x2 = b.cx - ux * b.w * endInset * 0.95;
  const y2 = b.cy - uy * b.h * endInset * 0.95;

  // Perpendicular to spread parallel arrows.
  // Use a *direction-stable* perpendicular: for a given unordered pair {A,B}
  // we pick the perpendicular that points "outside" the triangle so that
  // a->b and b->a sit on opposite sides of the line.
  // Compute the perpendicular and ensure consistent sign by rotating so
  // it points away from the triangle's centroid.
  let px = -uy, py = ux;

  // Bow magnitude: base separates a->b from b->a (sign depends on direction),
  // plus a per-arrow channel offset for parallels.
  const baseBow = 60;            // separates a->b from b->a
  const channelGap = 36;         // separates parallel arrows in the same direction

  // Make a->b bow one way, b->a the other. Use lexicographic order of keys
  // so both directions are mirror-images of each other.
  const dirSign = (ck.from < ck.to) ? +1 : -1;
  const bow = dirSign * (baseBow + ck.side * channelGap);

  // Parameter t along the curve where the label sits. Stagger by side so
  // parallel arrows don't pile their labels at the same midpoint.
  const t = 0.5 + ck.side * 0.18;

  const mx = (x1 + x2) / 2 + px * bow;
  const my = (y1 + y2) / 2 + py * bow;

  // Quadratic Bezier point at parameter t.
  // B(t) = (1-t)^2 P1 + 2(1-t)t P + t^2 P2
  const oneMinusT = 1 - t;
  const midX = oneMinusT * oneMinusT * x1 + 2 * oneMinusT * t * mx + t * t * x2;
  const midY = oneMinusT * oneMinusT * y1 + 2 * oneMinusT * t * my + t * t * y2;

  return { x1, y1, cx: mx, cy: my, x2, y2, midX, midY, color: col, ck, t };
}

function drawCheckArrow(g, idx) {
  const a = checkArrowGeom(g, idx);
  const ck = a.ck;

  const isSelected = selectedCheck === idx;
  const isDimmed = (highlightedBranch && ck.from !== highlightedBranch && ck.to !== highlightedBranch);
  const involvesHL = (highlightedBranch && (ck.from === highlightedBranch || ck.to === highlightedBranch));

  let alpha = 220;
  let weight = 2;
  if (isDimmed) alpha = 50;
  if (involvesHL) { alpha = 255; weight = 3; }
  if (isSelected) { alpha = 255; weight = 4; }

  // Curve
  noFill();
  stroke(a.color[0], a.color[1], a.color[2], alpha);
  strokeWeight(weight);
  // Quadratic curve via bezier with both control points equal to (cx,cy)
  bezier(a.x1, a.y1, a.cx, a.cy, a.cx, a.cy, a.x2, a.y2);

  // Arrow head at end
  const tx = a.x2, ty = a.y2;
  // Tangent at end of quadratic ≈ (P2 - P_ctrl)
  let tdx = tx - a.cx, tdy = ty - a.cy;
  const tlen = sqrt(tdx * tdx + tdy * tdy);
  tdx /= tlen; tdy /= tlen;
  const headSize = 9;
  const hx1 = tx - tdx * headSize - tdy * (headSize * 0.55);
  const hy1 = ty - tdy * headSize + tdx * (headSize * 0.55);
  const hx2 = tx - tdx * headSize + tdy * (headSize * 0.55);
  const hy2 = ty - tdy * headSize - tdx * (headSize * 0.55);
  noStroke();
  fill(a.color[0], a.color[1], a.color[2], alpha);
  triangle(tx, ty, hx1, hy1, hx2, hy2);

  // Mid label dot — clickable target
  const r = isSelected ? 8 : 6;
  fill(255);
  stroke(a.color[0], a.color[1], a.color[2], alpha);
  strokeWeight(isSelected ? 3 : 1.5);
  ellipse(a.midX, a.midY, r * 2, r * 2);

  // Push the label perpendicular to the curve's tangent at t, on the
  // outward side (away from the chord), so opposing-direction arrows
  // don't stack their labels.
  // Tangent of quadratic Bezier at t: B'(t) = 2(1-t)(P-P1) + 2t(P2-P)
  const tt = a.t;
  const tgx = 2 * (1 - tt) * (a.cx - a.x1) + 2 * tt * (a.x2 - a.cx);
  const tgy = 2 * (1 - tt) * (a.cy - a.y1) + 2 * tt * (a.y2 - a.cy);
  const tglen = max(1, sqrt(tgx * tgx + tgy * tgy));
  // Perpendicular (rotated 90deg)
  let nx = -tgy / tglen;
  let ny = tgx / tglen;
  // Choose the outward-facing side: same sign as (mid - chordMid)
  const cmx = a.midX - (a.x1 + a.x2) / 2;
  const cmy = a.midY - (a.y1 + a.y2) / 2;
  if (nx * cmx + ny * cmy < 0) { nx = -nx; ny = -ny; }
  const labelOffset = 14;
  const labelX = a.midX + nx * labelOffset;
  const labelY = a.midY + ny * labelOffset;

  // Short label
  textAlign(CENTER, CENTER);
  textStyle(isSelected ? BOLD : NORMAL);
  textSize(10);

  // Rounded background for the label
  const shortLabel = shortenCheckName(ck.name);
  const lw = textWidth(shortLabel) + 8;
  fill(255, 255, 255, isDimmed ? 90 : 240);
  stroke(a.color[0], a.color[1], a.color[2], alpha * 0.7);
  strokeWeight(1);
  rectMode(CENTER);
  rect(labelX, labelY, lw, 14, 4);
  rectMode(CORNER);

  noStroke();
  fill(30, 30, 30, alpha);
  text(shortLabel, labelX, labelY);
  textStyle(NORMAL);

  // Stash label hit-box on the geom so mousePressed can use it
  a.labelX = labelX;
  a.labelY = labelY;
  a.labelW = lw;
}

function shortenCheckName(n) {
  // Trim down for the on-canvas chip
  const map = {
    'Override Presidential Veto': 'Override veto',
    'Impeach the President': 'Impeach',
    'Control the Budget': 'Budget',
    'Veto Legislation': 'Veto',
    'Call Special Sessions': 'Special session',
    'Recommend Legislation': 'Recommend laws',
    'Confirm (or Reject) Judges': 'Confirm judges',
    'Set Court Jurisdiction': 'Set jurisdiction',
    'Impeach Federal Judges': 'Impeach judges',
    'Declare Laws Unconstitutional': 'Judicial review',
    'Nominate Federal Judges': 'Nominate judges',
    'Rule Executive Action Unconstitutional': 'Limit exec action'
  };
  return map[n] || n;
}

function drawSidePanel(g) {
  const panelX = canvasWidth - g.panelW - margin;
  const panelY = 50;
  const panelW = g.panelW;
  const panelH = drawHeight - 50 - 40;

  // Panel background
  fill(248, 250, 252);
  stroke(180);
  strokeWeight(1.5);
  rect(panelX, panelY, panelW, panelH, 10);

  if (selectedCheck !== null) {
    drawCheckDetailPanel(panelX, panelY, panelW, panelH);
  } else if (momentIdx >= 0) {
    drawMomentPanel(panelX, panelY, panelW, panelH);
  } else {
    drawHelpPanel(panelX, panelY, panelW, panelH);
  }
}

function drawCheckDetailPanel(x, y, w, h) {
  const ck = checks[selectedCheck];
  const fromBr = branches[ck.from];
  const toBr = branches[ck.to];

  // Header
  noStroke();
  fill(fromBr.color[0], fromBr.color[1], fromBr.color[2]);
  rect(x, y, w, 36, 10, 10, 0, 0);
  fill(255);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(14);
  text(ck.name, x + 12, y + 18);

  // From / To row
  let cy = y + 50;
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(11);
  fill(80);
  text('EXERCISED BY', x + 12, cy);
  text('CONSTRAINS', x + w / 2 + 6, cy);
  cy += 14;
  textStyle(NORMAL);
  textSize(13);
  fill(fromBr.color[0], fromBr.color[1], fromBr.color[2]);
  text(fromBr.name + '\n(' + fromBr.sub + ')', x + 12, cy);
  fill(toBr.color[0], toBr.color[1], toBr.color[2]);
  text(toBr.name + '\n(' + toBr.sub + ')', x + w / 2 + 6, cy);

  cy += 44;
  // Description
  fill(80);
  textStyle(BOLD);
  textSize(11);
  text('HOW IT WORKS', x + 12, cy);
  cy += 14;
  fill(30);
  textStyle(NORMAL);
  textSize(12);
  text(ck.desc, x + 12, cy, w - 24, 80);
  cy += 86;

  // Historical example
  fill(80);
  textStyle(BOLD);
  textSize(11);
  text('HISTORICAL EXAMPLE', x + 12, cy);
  cy += 14;
  fill(30);
  textStyle(NORMAL);
  textSize(12);
  text(ck.example, x + 12, cy, w - 24, h - (cy - y) - 14);
}

function drawMomentPanel(x, y, w, h) {
  const m = moments[momentIdx];

  // Header
  noStroke();
  fill(20, 40, 90);
  rect(x, y, w, 36, 10, 10, 0, 0);
  fill(255);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(13);
  text('Historical Moment ' + (momentIdx + 1) + ' / ' + moments.length, x + 12, y + 18);

  // Year
  fill(20, 40, 90);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(28);
  text(m.year, x + 12, y + 50);
  textSize(15);
  fill(40);
  text(m.title, x + 12, y + 86, w - 24, 50);

  fill(30);
  textStyle(NORMAL);
  textSize(12);
  text(m.text, x + 12, y + 140, w - 24, h - 160);
}

function drawHelpPanel(x, y, w, h) {
  noStroke();
  fill(20, 40, 90);
  rect(x, y, w, 36, 10, 10, 0, 0);
  fill(255);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(13);
  text('How to use this explorer', x + 12, y + 18);

  let cy = y + 50;
  textAlign(LEFT, TOP);
  fill(30);
  textStyle(NORMAL);
  textSize(13);
  text('The Constitution divides power among three branches and lets each one check the others.',
    x + 12, cy, w - 24, 80);
  cy += 64;

  // Legend
  fill(80);
  textStyle(BOLD);
  textSize(11);
  text('LEGEND', x + 12, cy);
  cy += 16;
  drawLegendRow(x + 12, cy, COLOR_L, 'Legislative — Congress');
  cy += 22;
  drawLegendRow(x + 12, cy, COLOR_E, 'Executive — President');
  cy += 22;
  drawLegendRow(x + 12, cy, COLOR_J, 'Judicial — Supreme Court');
  cy += 28;

  fill(80);
  textStyle(BOLD);
  textSize(11);
  text('TRY THIS', x + 12, cy);
  cy += 16;
  fill(30);
  textStyle(NORMAL);
  textSize(12);
  text('1. Click any arrow label to read what that check does and a historical example.',
    x + 12, cy, w - 24, 40); cy += 38;
  text('2. Click a branch box to highlight every check it exercises and every check it faces.',
    x + 12, cy, w - 24, 50); cy += 46;
  text('3. Click "Next Historical Moment" to walk through famous confrontations from 1803 to today.',
    x + 12, cy, w - 24, 60);
}

function drawLegendRow(x, y, c, label) {
  noStroke();
  fill(c[0], c[1], c[2]);
  rect(x, y, 14, 14, 3);
  fill(40);
  textStyle(NORMAL);
  textSize(12);
  textAlign(LEFT, CENTER);
  text(label, x + 22, y + 7);
}

function mousePressed() {
  // Ignore clicks in the control area
  if (mouseY > drawHeight) return;

  const g = nodeGeometry();

  // 1) Check for arrow midpoint click first (smaller, more specific targets).
  //    We have to compute label positions the same way drawCheckArrow does.
  for (let i = 0; i < checks.length; i++) {
    const a = checkArrowGeom(g, i);
    if (dist(mouseX, mouseY, a.midX, a.midY) < 14) {
      selectedCheck = i;
      momentIdx = -1;
      return;
    }
    // Recreate label hit-box (mirror of draw logic)
    const tt = a.t;
    const tgx = 2 * (1 - tt) * (a.cx - a.x1) + 2 * tt * (a.x2 - a.cx);
    const tgy = 2 * (1 - tt) * (a.cy - a.y1) + 2 * tt * (a.y2 - a.cy);
    const tglen = max(1, sqrt(tgx * tgx + tgy * tgy));
    let nx = -tgy / tglen;
    let ny = tgx / tglen;
    const cmx = a.midX - (a.x1 + a.x2) / 2;
    const cmy = a.midY - (a.y1 + a.y2) / 2;
    if (nx * cmx + ny * cmy < 0) { nx = -nx; ny = -ny; }
    const lx = a.midX + nx * 14;
    const ly = a.midY + ny * 14;
    if (mouseX > lx - 60 && mouseX < lx + 60 &&
        mouseY > ly - 9 && mouseY < ly + 9) {
      selectedCheck = i;
      momentIdx = -1;
      return;
    }
  }

  // 2) Branch node click → toggle highlight
  const keys = ['L', 'E', 'J'];
  for (const k of keys) {
    const n = g[k];
    if (mouseX > n.cx - n.w / 2 && mouseX < n.cx + n.w / 2 &&
        mouseY > n.cy - n.h / 2 && mouseY < n.cy + n.h / 2) {
      highlightedBranch = (highlightedBranch === k) ? null : k;
      selectedCheck = null;
      momentIdx = -1;
      return;
    }
  }

  // 3) Click empty space — clear selection
  selectedCheck = null;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}
