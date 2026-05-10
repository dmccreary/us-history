// Causal Loop Diagram Builder — Industrial Era
// CANVAS_HEIGHT: 560
// Chapter 1: Historical Methods and Analytical Frameworks
// Bloom Level: Analyze (L4) — explore reinforcing and balancing feedback loops

let canvasWidth = 700;
let drawHeight = 500;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 14;

let showLoops = false;
let traceMode = false;
let traceStep = 0;
let selectedNode = null;
let selectedEdge = null;
let hoveredNode = null;
let hoveredEdge = null;

let showLoopsBtn, traceModeBtn, nextTraceBtn, resetBtn;

// Nodes (positions as fractions, mapped in draw)
const nodes = [
  { id:0, label:'Industrial\nOutput',       info:'The total volume of manufactured goods produced — grew ~400% between 1865–1900 in the U.S.',
    fx:0.50, fy:0.18, r:57,  g:73, b:171 },
  { id:1, label:'Worker\nWages',            info:'Average real wages for industrial workers. Rose in good times, but lagged far behind productivity gains — workers received a declining share of output.',
    fx:0.78, fy:0.32, r:0,  g:137, b:123 },
  { id:2, label:'Consumer\nDemand',         info:'Workers\' purchasing power drove demand for goods. Henry Ford later recognized this: workers must be able to buy what they make.',
    fx:0.78, fy:0.62, r:46,  g:125, b:50 },
  { id:3, label:'Corporate\nProfits',       info:'Profits soared in the Gilded Age — Carnegie\'s steel earned $25M/year by 1900. Concentrated in the hands of a few industrial barons.',
    fx:0.22, fy:0.62, r:230, g:81, b:0  },
  { id:4, label:'Capital\nInvestment',      info:'Reinvestment in machinery, rails, factories. Expanded productive capacity and raised barriers to entry. Made U.S. the world\'s largest economy by 1900.',
    fx:0.22, fy:0.32, r:123, g:31, b:162 },
  { id:5, label:'Labor\nUnrest',            info:'Strikes, boycotts, union organizing. Major events: Railroad Strike of 1877, Haymarket (1886), Homestead (1892), Pullman Strike (1894).',
    fx:0.50, fy:0.82, r:150, g:30, b:30 },
  { id:6, label:'Government\nRegulation',   info:'Sherman Antitrust Act (1890), Interstate Commerce Act (1887), labor legislation. Often weak at first — the railroad strike of 1877 ended with federal troops, not reform.',
    fx:0.50, fy:0.50, r:80,  g:80, b:80 }
];

// Edges: from → to, polarity (+/-), loop type, explanation
const edges = [
  { from:0, to:1, pol:'+', loop:'R1', label:'+', ex:'Higher industrial output → higher wages (when labor was scarce). But this link was often weak in the Gilded Age as immigration kept wages down.' },
  { from:1, to:2, pol:'+', loop:'R1', label:'+', ex:'Higher wages → more consumer purchasing power → higher demand for goods. Ford\'s insight in 1914: pay workers $5/day so they can buy cars.' },
  { from:2, to:0, pol:'+', loop:'R1', label:'+', ex:'Higher consumer demand → factories need to produce more → industrial output rises. This reinforcing loop drove rapid industrialization.' },
  { from:0, to:3, pol:'+', loop:'R2', label:'+', ex:'More industrial output → more revenue → higher corporate profits. Carnegie\'s steel profits rose directly with output volume.' },
  { from:3, to:4, pol:'+', loop:'R2', label:'+', ex:'Higher profits → more capital available for reinvestment in new machinery and factories. Vertical integration strategies depended on this.' },
  { from:4, to:0, pol:'+', loop:'R2', label:'+', ex:'More investment → expanded productive capacity → higher industrial output. This loop drove the investment-driven growth of the Gilded Age.' },
  { from:0, to:5, pol:'-', loop:'B1', label:'−', ex:'Initially, rising output → rising employment → LESS labor unrest (workers had jobs). But long hours, dangerous conditions, and wage cuts eventually caused unrest DESPITE high output.' },
  { from:5, to:6, pol:'+', loop:'B1', label:'+', ex:'Labor unrest → political pressure for regulation. Haymarket (1886) initially HURT labor but long-term pushed states toward 8-hour day laws.' },
  { from:6, to:0, pol:'-', loop:'B1', label:'−', ex:'Government regulation (antitrust, labor laws, ICC) → limits on industrial practices → somewhat constrains industrial output growth. The BALANCING BRAKE on the system.' }
];

// Loop definitions
const loops = [
  { id:'R1', label:'R1: Consumer Demand Growth Engine', color:[249,168,37], type:'Reinforcing',
    steps:[0,1,2,0], desc:'Industrial Output → (+) Worker Wages → (+) Consumer Demand → (+) Industrial Output. A REINFORCING loop: growth feeds growth. When this loop was strong, it supported rising living standards.' },
  { id:'R2', label:'R2: Investment Engine', color:[255,120,50], type:'Reinforcing',
    steps:[0,3,4,0], desc:'Industrial Output → (+) Corporate Profits → (+) Capital Investment → (+) Industrial Output. Another REINFORCING loop: profits fund expansion which increases profits further. The engine of Gilded Age industrial growth.' },
  { id:'B1', label:'B1: Regulatory Brake', color:[0,180,180], type:'Balancing',
    steps:[0,5,6,0], desc:'Industrial Output → (−) Labor Unrest → (+) Government Regulation → (−) Industrial Output. A BALANCING loop: high output creates conditions for reform that eventually slow growth. This loop was WEAK in the Gilded Age — regulation was slow and often toothless.' }
];

// Trace sequences per loop
const traceSequences = {
  R1: [
    { nodeIdx:0, edgeIdx:0, text:'Step 1 → Industrial Output rises (e.g., Carnegie\'s steel mills double production)' },
    { nodeIdx:1, edgeIdx:1, text:'Step 2 → Higher output → (+) Worker Wages rise (when labor demand exceeded supply — rare in Gilded Age)' },
    { nodeIdx:2, edgeIdx:2, text:'Step 3 → Higher wages → (+) Consumer Demand rises (workers buy goods they produce)' },
    { nodeIdx:0, edgeIdx:-1, text:'Step 4 → Higher demand → (+) back to Industrial Output. REINFORCING LOOP COMPLETE ↺ (R loops amplify initial change)' }
  ],
  R2: [
    { nodeIdx:0, edgeIdx:3, text:'Step 1 → Industrial Output rises → revenues increase for Rockefeller, Carnegie, Morgan' },
    { nodeIdx:3, edgeIdx:4, text:'Step 2 → Higher Output → (+) Corporate Profits soar. By 1900, Carnegie Steel earns $25M/year.' },
    { nodeIdx:4, edgeIdx:5, text:'Step 3 → Higher Profits → (+) Capital Investment in new factories, rails, and machinery' },
    { nodeIdx:0, edgeIdx:-1, text:'Step 4 → Investment → (+) back to Industrial Output. REINFORCING LOOP COMPLETE ↺ (Gilded Age engine of industrial expansion)' }
  ],
  B1: [
    { nodeIdx:0, edgeIdx:6, text:'Step 1 → Industrial Output rises → more factories, longer hours, lower real wages relative to productivity' },
    { nodeIdx:5, edgeIdx:7, text:'Step 2 → These conditions → (−) Labor Unrest increases. Haymarket (1886), Homestead (1892), Pullman (1894)' },
    { nodeIdx:6, edgeIdx:8, text:'Step 3 → Labor Unrest → (+) Government Regulation (Sherman Act 1890, ICC 1887, later Progressive Era reforms)' },
    { nodeIdx:0, edgeIdx:-1, text:'Step 4 → Regulation → (−) back to Industrial Output (limits monopoly power, improves conditions). BALANCING LOOP ⊃ (B loops resist change — in this case, reform was slow and weak)' }
  ]
};

let activeLoop = null;
let activeTraceLoop = null;

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
}

function nx(node) { return margin + 30 + node.fx * (canvasWidth * 0.56); }
function ny(node) { return 40 + node.fy * (drawHeight - 80); }
function nodeRadius() { return min(38, (canvasWidth * 0.56) * 0.08); }

function edgeHitTest(mx, my, e) {
  let n1 = nodes[e.from], n2 = nodes[e.to];
  let x1=nx(n1), y1=ny(n1), x2=nx(n2), y2=ny(n2);
  // Midpoint check
  let midX=(x1+x2)/2, midY=(y1+y2)/2;
  return dist(mx, my, midX, midY) < 18;
}

function nodeHitTest(mx, my) {
  let r = nodeRadius();
  for (let n of nodes) {
    if (dist(mx, my, nx(n), ny(n)) < r + 4) return n;
  }
  return null;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  showLoopsBtn = createButton('Find Loops');
  traceModeBtn = createButton('Trace a Loop');
  nextTraceBtn = createButton('Next Step ▶');
  resetBtn     = createButton('Reset');

  showLoopsBtn.mousePressed(() => { showLoops = !showLoops; showLoopsBtn.html(showLoops ? 'Hide Loops' : 'Find Loops'); selectedNode = null; selectedEdge = null; activeLoop = null; });
  traceModeBtn.mousePressed(() => { traceMode = !traceMode; if (traceMode) { activeTraceLoop = 'R1'; traceStep = 0; showLoops = false; } else { activeTraceLoop = null; traceStep = 0; } traceModeBtn.html(traceMode ? 'Stop Tracing' : 'Trace a Loop'); });
  nextTraceBtn.mousePressed(() => { if (traceMode && activeTraceLoop) { let seq = traceSequences[activeTraceLoop]; traceStep = (traceStep + 1) % seq.length; } });
  resetBtn.mousePressed(() => { showLoops = false; traceMode = false; activeLoop = null; activeTraceLoop = 'R1'; traceStep = 0; selectedNode = null; selectedEdge = null; showLoopsBtn.html('Find Loops'); traceModeBtn.html('Trace a Loop'); });

  positionControls();
  describe('Causal loop diagram of the late 19th-century industrial economy. Click nodes for historical context, click edges for polarity explanation, use Find Loops and Trace buttons to explore reinforcing and balancing feedback loops.', LABEL);
}

function positionControls() {
  let y = drawHeight + 12;
  showLoopsBtn.position(10, y);
  traceModeBtn.position(115, y);
  nextTraceBtn.position(235, y);
  resetBtn.position(canvasWidth - 70, y);
}

function drawArrow(x1, y1, x2, y2, col, weight, offset) {
  // Offset for parallel edges
  let dx = x2-x1, dy = y2-y1;
  let len = Math.sqrt(dx*dx+dy*dy);
  let nx2 = dy/len*offset, ny2 = -dx/len*offset;
  x1+=nx2; y1+=ny2; x2+=nx2; y2+=ny2;

  let r = nodeRadius();
  let ang = Math.atan2(y2-y1, x2-x1);
  // Shorten to node edge
  let ex = x2 - Math.cos(ang)*r, ey = y2 - Math.sin(ang)*r;
  let sx = x1 + Math.cos(ang)*r, sy = y1 + Math.sin(ang)*r;

  stroke(col[0], col[1], col[2]);
  strokeWeight(weight);
  line(sx, sy, ex, ey);
  // Arrowhead
  fill(col[0], col[1], col[2]);
  noStroke();
  push();
  translate(ex, ey);
  rotate(ang);
  triangle(0, 0, -10, 4, -10, -4);
  pop();
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill(30, 30, 120);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(15);
  text('Causal Loop Diagram — Gilded Age Industrial Economy', canvasWidth/2, 6);
  textStyle(NORMAL);

  // Detect hover
  hoveredNode = null; hoveredEdge = null;
  if (!selectedNode && !selectedEdge) {
    hoveredNode = nodeHitTest(mouseX, mouseY);
    if (!hoveredNode) {
      for (let e of edges) { if (edgeHitTest(mouseX, mouseY, e)) { hoveredEdge = e; break; } }
    }
  }

  // Determine active trace step
  let traceHighlightNode = -1, traceHighlightEdge = -1;
  if (traceMode && activeTraceLoop) {
    let seq = traceSequences[activeTraceLoop];
    traceHighlightNode = seq[traceStep].nodeIdx;
    traceHighlightEdge = seq[traceStep].edgeIdx;
  }

  // Draw edges
  for (let i = 0; i < edges.length; i++) {
    let e = edges[i];
    let lp = loops.find(l => l.id === e.loop);
    let col = [160, 160, 160];
    let wt = 2;

    if (showLoops) {
      col = lp.color;
      wt = 2.5;
    } else if (traceMode && traceHighlightEdge === i) {
      col = lp.color;
      wt = 4;
    } else if (hoveredEdge === e) {
      col = [249, 168, 37];
      wt = 3;
    } else if (activeLoop && activeLoop === e.loop) {
      col = lp.color;
      wt = 3;
    }

    drawArrow(nx(nodes[e.from]), ny(nodes[e.from]), nx(nodes[e.to]), ny(nodes[e.to]), col, wt, 5);

    // Polarity label at midpoint
    let mx2 = (nx(nodes[e.from])+nx(nodes[e.to]))/2 + 5;
    let my2 = (ny(nodes[e.from])+ny(nodes[e.to]))/2;
    noStroke();
    fill(col[0], col[1], col[2]);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(14);
    text(e.pol === '+' ? '+' : '−', mx2, my2 - 8);
    textStyle(NORMAL);
  }

  // Draw nodes
  for (let n of nodes) {
    let r = nodeRadius();
    let isSel = selectedNode && selectedNode.id === n.id;
    let isHov = hoveredNode && hoveredNode.id === n.id;
    let isTrace = traceMode && traceHighlightNode === n.id;

    fill(n.r, n.g, n.b, isSel || isTrace ? 230 : (isHov ? 200 : 160));
    stroke(isSel || isTrace ? 'white' : (isHov ? [249,168,37] : 80));
    strokeWeight(isSel || isTrace ? 3 : 1.5);
    ellipse(nx(n), ny(n), r*2, r*2);

    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(min(11, r*0.5));
    text(n.label, nx(n), ny(n), r*1.8, r*1.8);
    textStyle(NORMAL);
  }

  // Loop legend (when showLoops)
  if (showLoops) {
    let lx = canvasWidth * 0.62, ly = 44;
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(lx, ly, canvasWidth - lx - margin, 140, 8);
    noStroke();
    fill(50);
    textStyle(BOLD);
    textSize(12);
    textAlign(LEFT, TOP);
    text('Loop Legend:', lx+8, ly+6);
    textStyle(NORMAL);
    for (let i = 0; i < loops.length; i++) {
      let lp = loops[i];
      fill(lp.color[0], lp.color[1], lp.color[2]);
      rect(lx+8, ly+24+i*34, 16, 4, 2);
      noStroke();
      textStyle(BOLD);
      textSize(11);
      text(lp.id + ' (' + lp.type + '):', lx+28, ly+20+i*34);
      fill(50);
      textStyle(NORMAL);
      textSize(10);
      text(lp.label.replace(lp.id+': ',''), lx+28, ly+32+i*34, canvasWidth-lx-margin-36, 20);
    }
  }

  // Trace panel
  if (traceMode && activeTraceLoop) {
    let seq = traceSequences[activeTraceLoop];
    let step = seq[traceStep];
    let lp = loops.find(l => l.id === activeTraceLoop);

    let px = canvasWidth * 0.60, py = 44;
    let pw = canvasWidth - px - margin, ph = 200;
    fill(255, 255, 255, 240);
    stroke(lp.color[0], lp.color[1], lp.color[2]);
    strokeWeight(2);
    rect(px, py, pw, ph, 8);
    noStroke();
    fill(lp.color[0], lp.color[1], lp.color[2]);
    rect(px, py, pw, 28, 8, 8, 0, 0);
    fill(255);
    textStyle(BOLD);
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Tracing ' + activeTraceLoop + ' — ' + lp.type, px+8, py+14);

    // Loop selector buttons (drawn)
    let tabs = ['R1','R2','B1'];
    for (let i = 0; i < tabs.length; i++) {
      let lp2 = loops.find(l => l.id === tabs[i]);
      fill(lp2.color[0], lp2.color[1], lp2.color[2], activeTraceLoop === tabs[i] ? 220 : 100);
      noStroke();
      rect(px+8 + i*48, py+30, 44, 18, 4);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(10);
      textStyle(BOLD);
      text(tabs[i], px+30+i*48, py+39);
      textStyle(NORMAL);
    }

    fill(30);
    textAlign(LEFT, TOP);
    textStyle(NORMAL);
    textSize(12);
    text(step.text, px+8, py+55, pw-16, ph-70);
    fill(100);
    textSize(10);
    text('Step ' + (traceStep+1) + ' of ' + seq.length + ' — click "Next Step" to continue', px+8, py+ph-14, pw-16, 20);
  }

  // Info panel (node or edge selected)
  if (!traceMode && (selectedNode || selectedEdge)) {
    let px = canvasWidth * 0.60, py = 44;
    let pw = canvasWidth - px - margin, ph = 170;
    fill(255, 255, 255, 240);
    stroke(100);
    strokeWeight(1);
    rect(px, py, pw, ph, 8);
    noStroke();
    fill(50);
    textStyle(BOLD);
    textSize(12);
    textAlign(LEFT, TOP);
    if (selectedNode) {
      fill(selectedNode.r, selectedNode.g, selectedNode.b);
      text(selectedNode.label.replace('\n',' '), px+8, py+8);
      fill(30);
      textStyle(NORMAL);
      textSize(12);
      text(selectedNode.info, px+8, py+28, pw-16, ph-36);
    } else {
      let lp = loops.find(l => l.id === selectedEdge.loop);
      fill(lp.color[0], lp.color[1], lp.color[2]);
      text('Edge: ' + nodes[selectedEdge.from].label.replace('\n',' ') + ' → ' + nodes[selectedEdge.to].label.replace('\n',' '), px+8, py+8, pw-16, 30);
      text('Polarity: ' + (selectedEdge.pol === '+' ? 'Positive (+)' : 'Negative (−)') + ' | Loop: ' + selectedEdge.loop, px+8, py+40);
      fill(30);
      textStyle(NORMAL);
      textSize(12);
      text(selectedEdge.ex, px+8, py+60, pw-16, ph-68);
    }
    fill(150);
    textAlign(RIGHT, BOTTOM);
    textSize(10);
    text('Click to close', px+pw-6, py+ph-4);
  }

  // Hover tooltip
  if (hoveredNode && !selectedNode && !traceMode) {
    noStroke();
    fill(30, 30, 30, 200);
    rect(mouseX+10, mouseY-15, 140, 22, 4);
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Click for historical context', mouseX+15, mouseY-4);
  }

  // Control area label
  noStroke();
  fill(80);
  textAlign(LEFT, CENTER);
  textSize(13);
  let hint = traceMode ? 'Select loop: click R1/R2/B1 tabs in panel → use "Next Step"' : showLoops ? 'Loops highlighted: gold=Reinforcing, teal=Balancing. Click nodes/edges.' : 'Click a node or edge for historical context.';
  text(hint, 10, drawHeight + controlHeight/2);

  positionControls();
}

function mousePressed() {
  // Check trace loop tab clicks
  if (traceMode) {
    let px = canvasWidth * 0.60, py = 44;
    let tabs = ['R1','R2','B1'];
    for (let i = 0; i < tabs.length; i++) {
      let tx = px+8+i*48, ty = py+30;
      if (mouseX > tx && mouseX < tx+44 && mouseY > ty && mouseY < ty+18) {
        activeTraceLoop = tabs[i];
        traceStep = 0;
        return;
      }
    }
    return;
  }

  // Dismiss info panel
  if (selectedNode || selectedEdge) {
    let px = canvasWidth * 0.60;
    if (mouseX > px) { selectedNode = null; selectedEdge = null; return; }
  }

  // Node click
  let nh = nodeHitTest(mouseX, mouseY);
  if (nh) {
    selectedNode = selectedNode && selectedNode.id === nh.id ? null : nh;
    selectedEdge = null;
    return;
  }

  // Edge click
  for (let e of edges) {
    if (edgeHitTest(mouseX, mouseY, e)) {
      selectedEdge = selectedEdge === e ? null : e;
      selectedNode = null;
      return;
    }
  }

  selectedNode = null;
  selectedEdge = null;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}
