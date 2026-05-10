// Three Colonial Regions Comparison MicroSim
// CANVAS_HEIGHT: 540
// Chapter 3: Colonial America (1607–1754)
// Bloom Level: Analyze (L4) — click two regions to compare across dimensions

let canvasWidth = 700;
let drawHeight = 480;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 14;

let selected = [];  // up to 2 region indices
let hoveredRegion = null;
let resetBtn;

const regions = [
  { name: 'New England', short:'NE', r:21, g:101, b:192 },
  { name: 'Middle\nColonies', short:'MC', r:46, g:125, b:50 },
  { name: 'Southern\nColonies', short:'SC', r:230, g:81, b:0 }
];

const dimensions = [
  'Primary Economy',
  'Religious Character',
  'Labor System',
  'Self-Governance',
  'Main Tension w/ Britain'
];

const data = {
  'New England': [
    'Fishing, shipbuilding, timber, some subsistence farming; merchant trade with England and the Caribbean',
    'Puritan/Congregationalist; church membership required for full political rights; strong communal morality',
    'Free labor, family farms, some indentured servitude; very little slavery (~2–4% of pop.)',
    'Town meetings with broad (male, church-member) participation; elected representatives to colonial assemblies',
    'Navigation Acts hurt New England merchants; self-governing traditions made Crown control difficult'
  ],
  'Middle Colonies': [
    'Grain farming ("breadbasket"), diverse commerce; Philadelphia and New York as major trade hubs',
    'Pluralistic — Quakers, Dutch Reformed, Lutheran, Anglican, Catholic, Jewish; remarkable religious tolerance',
    'Mix of free labor, indentured servants (German/Scots-Irish), and some slavery (~7–10%)',
    'Proprietary and royal colonies; colonial assemblies existed; more ethnic and religious diversity than NE',
    'Debates over quitrents (land fees to proprietors); land conflicts with Native nations; Scots-Irish frontier tensions'
  ],
  'Southern Colonies': [
    'Tobacco (Virginia/Maryland), rice and indigo (Carolinas); large plantation export economy',
    'Anglican Church nominally dominant; in practice, religion less central than in New England; planter culture',
    'Shifted from indentured servitude to enslaved African labor by 1700; 40–50% enslaved in some areas',
    'House of Burgesses (1619); planter elite dominated assemblies; less participatory than NE town meetings',
    'Tobacco price volatility hurt planters; Navigation Acts forced trade through British merchants; slave rebellions (Stono, 1739)'
  ]
};

// Similarities (when both regions share a feature across a dimension)
function getSimilarity(dim, r1, r2) {
  // Simple similarity scoring per dimension pair
  const sims = {
    '0,1': ['Both had growing merchant classes; both exported goods to Britain'],
    '0,2': ['Both produced for export to Britain; both shaped by British mercantile system'],
    '1,2': ['Both had Anglican presence; both had tensions between religious ideals and economic realities'],
    '2,0': ['Both used indentured labor in early period; both developed distinct labor systems over time'],
    '2,1': ['Both transitioned from indentured to alternative labor; both shaped by British debt laws'],
    '3,0': ['Both had elected colonial assemblies; both pushed back on royal authority'],
    '3,1': ['Both had some form of representative assembly; both chafed under proprietary/royal oversight'],
    '3,2': ['All three had colonial assemblies; all three developed "salutary neglect" self-governance traditions'],
    '4,0': ['All three resented British trade restrictions; all three developed grievances that fueled Revolution'],
    '4,1': ['All three regions developed traditions of self-governance and pushed back on Crown control']
  };
  return null; // simplified — differences are highlighted in compare mode
}

function getDifference(dimIdx, r1, r2) {
  return data[regions[r1].name][dimIdx] !== data[regions[r2].name][dimIdx];
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  resetBtn = createButton('Reset');
  resetBtn.position(10, drawHeight + 12);
  resetBtn.mousePressed(() => { selected = []; hoveredRegion = null; });

  describe('Three-panel comparison of New England, Middle Colonies, and Southern Colonies across economy, religion, labor, governance, and tensions with Britain. Select one or two regions to explore.', LABEL);
}

function getRegionX(i) {
  let panelW = (canvasWidth - margin * 4) / 3;
  return margin + i * (panelW + margin);
}
function getPanelW() { return (canvasWidth - margin * 4) / 3; }

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let panelW = getPanelW();

  // Title
  noStroke();
  fill(30, 30, 100);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(16);
  text('Three Colonial Regions — Comparative Analysis', canvasWidth/2, 8);
  textStyle(NORMAL);
  fill(80);
  textSize(12);
  text(selected.length === 0 ? 'Click one or two regions to compare' : selected.length === 1 ? 'Click a second region to compare' : 'Comparing ' + regions[selected[0]].name.replace('\n',' ') + ' vs ' + regions[selected[1]].name.replace('\n',' '), canvasWidth/2, 28);

  // Detect hover
  hoveredRegion = null;
  for (let i = 0; i < 3; i++) {
    let rx = getRegionX(i);
    if (mouseX > rx && mouseX < rx + panelW && mouseY > 44 && mouseY < drawHeight - 10) {
      hoveredRegion = i;
    }
  }

  // Draw region panels
  for (let i = 0; i < 3; i++) {
    let reg = regions[i];
    let rx = getRegionX(i);
    let isSel = selected.includes(i);
    let isHov = hoveredRegion === i;

    // Header panel
    fill(reg.r, reg.g, reg.b, isSel ? 220 : (isHov ? 170 : 120));
    stroke(isSel ? 'white' : (isHov ? [249,168,37] : 160));
    strokeWeight(isSel ? 2.5 : 1);
    rect(rx, 44, panelW, 50, 8, 8, 0, 0);

    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(14);
    text(reg.name, rx + panelW/2, 69);
    textStyle(NORMAL);

    // Dimension rows
    let rowH = (drawHeight - 106) / dimensions.length;
    for (let d = 0; d < dimensions.length; d++) {
      let ry = 96 + d * rowH;
      let cellH = rowH - 4;

      // In compare mode with 2 selected, highlight differences
      let isCompareMode = selected.length === 2;
      let isBothSelected = isSel && isCompareMode;
      let isDifferent = isCompareMode && isSel &&
        data[regions[selected[0]].name][d] !== data[regions[selected[1]].name][d];
      let isSimilar = isCompareMode && isSel && !isDifferent;

      if (isBothSelected) {
        fill(isDifferent ? [255,230,230] : [230,255,230]);
        stroke(isDifferent ? [220,60,60] : [60,180,60]);
      } else if (isSel) {
        fill(reg.r, reg.g, reg.b, 25);
        stroke(reg.r, reg.g, reg.b, 150);
      } else {
        fill(245);
        stroke(200);
      }
      strokeWeight(1);
      rect(rx, ry, panelW, cellH, 4);

      // Dimension label
      noStroke();
      fill(reg.r, reg.g, reg.b);
      textStyle(BOLD);
      textSize(10);
      textAlign(LEFT, TOP);
      text(dimensions[d], rx+6, ry+4);

      // Content
      fill(isSel ? 30 : 100);
      textStyle(NORMAL);
      textSize(10);
      let content = isSel || isHov ? data[reg.name][d] : '(click to reveal)';
      text(content, rx+6, ry+17, panelW-12, cellH-22);

      // Difference/similarity badges in compare mode
      if (isBothSelected && i === selected[0]) {
        fill(isDifferent ? [220,60,60] : [60,160,60]);
        noStroke();
        let bx = rx + panelW - 38, by = ry + 4;
        rect(bx, by, 32, 14, 6);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(8);
        textStyle(BOLD);
        text(isDifferent ? 'DIFF' : 'SAME', bx+16, by+7);
        textStyle(NORMAL);
        textAlign(LEFT, TOP);
      }
    }
  }

  // Legend (compare mode)
  if (selected.length === 2) {
    noStroke();
    fill(220, 60, 60, 180);
    rect(margin, drawHeight - 34, 14, 14, 2);
    fill(60, 180, 60, 180);
    rect(margin + 80, drawHeight - 34, 14, 14, 2);
    fill(50);
    textAlign(LEFT, CENTER);
    textSize(11);
    text('= Different', margin + 16, drawHeight - 27);
    text('= Similar', margin + 96, drawHeight - 27);
  }

  // Control area label
  noStroke();
  fill(80);
  textAlign(LEFT, CENTER);
  textSize(13);
  let label = selected.length === 2 ? 'Green = similar, Red = different across that dimension.' :
              selected.length === 1 ? 'Select a second region to activate comparison mode.' :
              'Click a region panel to see its details.';
  text(label, 80, drawHeight + controlHeight/2);

  resetBtn.position(10, drawHeight + 12);
}

function mousePressed() {
  for (let i = 0; i < 3; i++) {
    let rx = getRegionX(i);
    let panelW = getPanelW();
    if (mouseX > rx && mouseX < rx+panelW && mouseY > 44 && mouseY < drawHeight-10) {
      if (selected.includes(i)) {
        selected = selected.filter(s => s !== i);
      } else if (selected.length < 2) {
        selected.push(i);
      } else {
        selected = [selected[1], i];
      }
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  resetBtn.position(10, drawHeight + 12);
}
