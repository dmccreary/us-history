// Populist Policy Platform — Then and Now
// CANVAS_HEIGHT: 700
// Chapter 11: Populism and the Closing of the Frontier (1880-1900)
// Bloom Level: Analyze (L4) — Examine how radical demands become mainstream
//
// Layout: drawHeight (640) + controlHeight (60) = 700
// Eight 1892 Omaha Platform demands as clickable cards, color-coded by
// fate. Filter by status. Click any card for full detail panel.

let canvasWidth = 900;
let drawHeight = 640;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 16;

let filterSelect;
let resetBtn;

let selectedDemand = null;
let hoveredDemand = null;

// Status colors
const COLOR_ENACTED  = { r:  46, g: 125, b:  50 };  // green — fully enacted
const COLOR_PARTIAL  = { r: 215, g: 165, b:  35 };  // amber — partially enacted / modified
const COLOR_REJECTED = { r: 200, g:  60, b:  60 };  // red — rejected / not enacted

// Card accent (gold border per spec)
const COLOR_CARD_ACCENT = { r: 184, g: 134, b:  11 };

const demands = [
  {
    id: 'income-tax',
    number: 1,
    title: 'Graduated income tax',
    status: 'enacted',
    statusLabel: 'ENACTED',
    year: 1913,
    mechanism: '16th Amendment (1913)',
    short: 'Tax wealthier Americans at higher rates to fund government.',
    problem: 'Federal revenue depended on tariffs and excise taxes that fell hardest on farmers and workers; an 1894 income tax was struck down in Pollock v. Farmers\' Loan (1895).',
    pathway: 'A constitutional amendment was required to overturn Pollock. Progressive Era reformers, supported by Western farmers and urban labor, secured ratification in February 1913 under Pres. Taft / Wilson.',
    legacy: 'Forms the backbone of federal revenue today. Top marginal rates rose to 94% during WWII before settling in the 25–40% range.',
    enabling: 'Constitutional amendment + cross-class progressive coalition.'
  },
  {
    id: 'direct-senators',
    number: 2,
    title: 'Direct election of senators',
    status: 'enacted',
    statusLabel: 'ENACTED',
    year: 1913,
    mechanism: '17th Amendment (1913)',
    short: 'Let voters — not state legislatures — choose U.S. senators.',
    problem: 'State legislatures elected senators; bribery scandals (Montana, Illinois) and frequent deadlocks left Senate seats vacant for months. Critics called the Senate a "millionaires\' club."',
    pathway: 'States adopted direct primaries (Oregon Plan, 1904) that bound legislatures to voter choice. By 1912, 29 states used this workaround. Pressure forced Congress to pass the 17th Amendment, ratified April 1913.',
    legacy: 'All U.S. senators are now popularly elected. A small revival movement on the right has called for repeal, but it has no traction.',
    enabling: 'State-level workarounds (Oregon Plan) created a fait accompli before federal action.'
  },
  {
    id: 'secret-ballot',
    number: 3,
    title: 'Secret (Australian) ballot',
    status: 'enacted',
    statusLabel: 'ENACTED',
    year: 1892,
    mechanism: 'State adoption, 1888-1910s',
    short: 'Replace party-printed ballots with state-printed secret ballots.',
    problem: 'Parties printed and distributed colored ballots so employers, landlords, and bosses could see how each man voted. Vote-buying and intimidation were routine.',
    pathway: 'Massachusetts adopted the Australian ballot in 1888; by 1892 most Northern states had followed. Southern states adopted it too — but often paired it with literacy tests to disenfranchise Black voters.',
    legacy: 'Universal in U.S. elections today. A reminder that procedural reforms can be repurposed: the same secret ballot used to free white voters was weaponized to disenfranchise Black ones.',
    enabling: 'State-by-state action; no federal amendment needed.'
  },
  {
    id: 'eight-hour',
    number: 4,
    title: 'Eight-hour workday',
    status: 'enacted',
    statusLabel: 'ENACTED',
    year: 1938,
    mechanism: 'Fair Labor Standards Act (1938)',
    short: '40-hour week; overtime pay for hours beyond.',
    problem: '60–80 hour weeks were normal in mills, packinghouses, and railroads. Earlier 8-hour laws (federal employees 1868, railroad workers 1916) covered only narrow groups.',
    pathway: 'Decades of strikes (Haymarket 1886, Pullman 1894) and state laws were repeatedly struck down by courts (Lochner v. NY, 1905). The Wagner Act (1935) restored union power, and the FLSA (1938) finally set a federal 40-hour standard.',
    legacy: 'Time-and-a-half overtime over 40 hours is now baseline U.S. labor law. Salaried-exempt loopholes have eroded coverage; gig work bypasses it entirely.',
    enabling: 'Required Supreme Court personnel changes (post-1937 "switch in time") and the Wagner Act\'s union framework.'
  },
  {
    id: 'postal-savings',
    number: 5,
    title: 'Postal savings banks',
    status: 'enacted',
    statusLabel: 'ENACTED',
    year: 1910,
    mechanism: 'Postal Savings System (1910–1967)',
    short: 'Government-backed savings accounts at every post office.',
    problem: 'Working-class and immigrant savers had no safe place for deposits. Bank panics (1893, 1907) wiped out savings; many distrusted private banks entirely.',
    pathway: 'Congress passed the Postal Savings System Act in 1910 under President Taft, after the Panic of 1907 made the case undeniable. Deposits paid 2% interest, capped at $2,500.',
    legacy: 'Abolished in 1967, after FDIC insurance (1933) made private banks safe enough. Some economists have called for its revival to serve unbanked Americans.',
    enabling: 'Bank panics softened opposition; FDIC later made it redundant.'
  },
  {
    id: 'railroads',
    number: 6,
    title: 'Government ownership of railroads',
    status: 'partial',
    statusLabel: 'PARTIAL',
    year: 1887,
    mechanism: 'ICC strengthened; brief WWI nationalization',
    short: 'Public control of railroad rates and routes.',
    problem: 'Railroads charged farmers more for short hauls than long ones, granted secret rebates to Standard Oil, and wielded political power that bought legislatures.',
    pathway: 'Interstate Commerce Act (1887) created the ICC; Hepburn Act (1906) gave it real rate-setting power. The U.S. Railroad Administration nationalized rails Dec 1917 – Mar 1920 during WWI, then returned them to private owners.',
    legacy: 'Never permanent nationalization. ICC abolished 1995; Surface Transportation Board took over residual oversight. Amtrak (1971) is publicly owned passenger rail; freight remains private.',
    enabling: 'Regulation, not ownership, became the path. Wartime emergency was the only window for true nationalization.'
  },
  {
    id: 'silver',
    number: 7,
    title: 'Free coinage of silver',
    status: 'partial',
    statusLabel: 'PARTIAL',
    year: 1933,
    mechanism: 'Gold standard abandoned; Federal Reserve flexibility',
    short: 'Inflate the money supply by minting silver dollars at 16:1.',
    problem: 'The 1873 Coinage Act demonetized silver; the resulting tight money squeezed debtors, especially indebted farmers. Falling crop prices made fixed-dollar mortgages crushing.',
    pathway: 'Bryan\'s 1896 "Cross of Gold" campaign was defeated by McKinley. But the Federal Reserve Act (1913) created an elastic currency, and FDR took the U.S. off the gold standard in 1933 — accomplishing the Populists\' inflationary goal by other means.',
    legacy: 'Silver coinage never returned, but the underlying demand — a flexible, expandable money supply — is now standard central-bank practice. Modern fiat money is more elastic than Bryan ever proposed.',
    enabling: 'The Great Depression made gold-standard orthodoxy untenable; Populist ends won under different means.'
  },
  {
    id: 'subtreasury',
    number: 8,
    title: 'Subtreasury system for farm loans',
    status: 'partial',
    statusLabel: 'PARTIAL',
    year: 1933,
    mechanism: 'Farm Credit Act (1933); AAA',
    short: 'Federal warehouses + low-interest crop loans for farmers.',
    problem: 'Farmers had to sell at harvest when prices were lowest, because they could not afford to store crops or carry debt. Local "furnishing merchants" charged 30–60% credit rates.',
    pathway: 'The original subtreasury plan was rejected as too radical in the 1890s. Its functional equivalent arrived 40 years later: the Farm Credit Act (1933) created federal land banks and production credit associations; the AAA (1933) added crop loans and price supports.',
    legacy: 'Farm Credit System still operates; the Commodity Credit Corporation (1933) administers nonrecourse loans backed by stored crops — essentially the subtreasury idea.',
    enabling: 'Required the Depression to make federal intervention in agriculture politically possible.'
  }
];

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  filterSelect = createSelect();
  filterSelect.option('All demands', 'all');
  filterSelect.option('Enacted', 'enacted');
  filterSelect.option('Partially enacted', 'partial');
  filterSelect.option('Rejected', 'rejected');
  filterSelect.selected('all');
  filterSelect.changed(() => { selectedDemand = null; });

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => {
    filterSelect.selected('all');
    selectedDemand = null;
  });

  positionControls();
  describe('Eight 1892 Populist platform demands shown as clickable cards. Each card is colored by fate: green = enacted, amber = partially enacted, red = rejected. Filter by status. Click any card for the year, mechanism, enabling conditions, and lasting legacy.', LABEL);
}

function positionControls() {
  let y = drawHeight + 18;
  filterSelect.position(margin + 60, y);
  filterSelect.style('font-size', '13px');
  resetBtn.position(canvasWidth - margin - 60, y);
}

function statusColor(status) {
  if (status === 'enacted')  return COLOR_ENACTED;
  if (status === 'partial')  return COLOR_PARTIAL;
  return COLOR_REJECTED;
}

function isFiltered(d) {
  let f = filterSelect.value();
  if (f === 'all') return false;
  return d.status !== f;
}

function cardLayout() {
  // Two-column grid for the eight demand cards
  let topPad = 70;        // title area
  let gridTop = topPad;
  let colGap = 14;
  let rowGap = 10;
  let cols = 2;
  let colW = (canvasWidth - margin * 2 - colGap * (cols - 1)) / cols;
  let cardH = 70;
  return { gridTop, colGap, rowGap, cols, colW, cardH };
}

function demandCardRect(d) {
  let layout = cardLayout();
  let idx = demands.indexOf(d);
  let row = Math.floor(idx / layout.cols);
  let col = idx % layout.cols;
  let x = margin + col * (layout.colW + layout.colGap);
  let y = layout.gridTop + row * (layout.cardH + layout.rowGap);
  return { x, y, w: layout.colW, h: layout.cardH };
}

function draw() {
  updateCanvasSize();

  // Background
  noStroke();
  fill(248, 249, 251);
  rect(0, 0, canvasWidth, drawHeight);
  fill(255);
  rect(0, drawHeight, canvasWidth, controlHeight);
  stroke(220);
  strokeWeight(1);
  line(0, drawHeight, canvasWidth, drawHeight);
  noStroke();

  // Title
  fill(20, 50, 110);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(18);
  text('1892 Omaha Platform: Then and Now', canvasWidth / 2, 10);
  textStyle(NORMAL);
  fill(90);
  textSize(12);
  text('Eight Populist demands and their fate. Click any card to see when, how, and what enabled or blocked adoption.',
       canvasWidth / 2, 34);

  // Demand cards
  hoveredDemand = null;
  for (let d of demands) drawDemandCard(d);

  // Detail or legend panel
  if (selectedDemand) {
    drawDetailPanel(selectedDemand);
  } else {
    drawBottomPanel();
  }

  // Control labels
  noStroke();
  fill(60);
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Filter:', margin + 8, drawHeight + controlHeight / 2 + 2);

  positionControls();
}

function drawDemandCard(d) {
  let r = demandCardRect(d);
  let dimmed = isFiltered(d);
  let alpha = dimmed ? 60 : 255;
  let sc = statusColor(d.status);

  // Hover detection
  let isHover = (mouseX >= r.x && mouseX <= r.x + r.w &&
                 mouseY >= r.y && mouseY <= r.y + r.h && !dimmed);
  if (isHover) hoveredDemand = d;
  let isSelected = selectedDemand && selectedDemand.id === d.id;

  // Card background — white panel with gold border per spec
  if (isSelected) {
    fill(sc.r, sc.g, sc.b, dimmed ? 30 : 40);
  } else {
    fill(255, 255, 255, alpha);
  }
  stroke(COLOR_CARD_ACCENT.r, COLOR_CARD_ACCENT.g, COLOR_CARD_ACCENT.b, dimmed ? 60 : 200);
  strokeWeight(isSelected ? 3 : 1.5);
  rect(r.x, r.y, r.w, r.h, 6);
  noStroke();

  // Status badge (left strip)
  fill(sc.r, sc.g, sc.b, alpha);
  rect(r.x, r.y, 6, r.h, 6, 0, 0, 6);

  // Number circle
  fill(COLOR_CARD_ACCENT.r, COLOR_CARD_ACCENT.g, COLOR_CARD_ACCENT.b, dimmed ? 80 : 230);
  ellipse(r.x + 22, r.y + 16, 18, 18);
  fill(255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(11);
  text(d.number, r.x + 22, r.y + 16);

  // Demand title
  fill(30, 30, 30, dimmed ? 80 : 255);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(13);
  text(d.title, r.x + 38, r.y + 8, r.w - 50, 22);

  // Mechanism / year line
  fill(80, 80, 80, dimmed ? 80 : 230);
  textStyle(NORMAL);
  textSize(11);
  text(d.mechanism, r.x + 38, r.y + 32, r.w - 110, 22);

  // Status pill (right)
  let pillW = 78;
  let pillH = 18;
  let pillX = r.x + r.w - pillW - 8;
  let pillY = r.y + 8;
  fill(sc.r, sc.g, sc.b, dimmed ? 60 : 230);
  noStroke();
  rect(pillX, pillY, pillW, pillH, 9);
  fill(255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(10);
  text(d.statusLabel, pillX + pillW / 2, pillY + pillH / 2);

  // Year (bottom right)
  fill(120, 120, 120, dimmed ? 80 : 255);
  textStyle(NORMAL);
  textSize(11);
  textAlign(RIGHT, BOTTOM);
  text(d.year, r.x + r.w - 10, r.y + r.h - 6);

  textStyle(NORMAL);
}

function drawBottomPanel() {
  let layout = cardLayout();
  // Find lowest card bottom
  let maxBottom = 0;
  for (let d of demands) {
    let r = demandCardRect(d);
    maxBottom = max(maxBottom, r.y + r.h);
  }
  let panelY = maxBottom + 14;
  let panelH = drawHeight - panelY - 8;
  if (panelH < 40) return;
  let panelW = canvasWidth - margin * 2;

  noStroke();
  fill(252);
  stroke(220);
  strokeWeight(1);
  rect(margin, panelY, panelW, panelH, 8);
  noStroke();

  if (hoveredDemand) {
    drawHoverContent(hoveredDemand, panelY, panelW, panelH);
  } else {
    drawLegendAndSummary(panelY, panelW, panelH);
  }
}

function drawHoverContent(d, panelY, panelW, panelH) {
  let sc = statusColor(d.status);
  noStroke();
  fill(sc.r, sc.g, sc.b);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(13);
  text('#' + d.number + '  ' + d.title + '  (' + d.year + ')', margin + 12, panelY + 8);
  fill(60);
  textStyle(NORMAL);
  textSize(12);
  text(d.short, margin + 12, panelY + 28, panelW - 24, panelH - 32);
  fill(120);
  textSize(11);
  textAlign(RIGHT, BOTTOM);
  text('Click for full detail', margin + panelW - 12, panelY + panelH - 6);
}

function drawLegendAndSummary(panelY, panelW, panelH) {
  // Left: legend
  let leftX = margin + 12;
  fill(60);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(12);
  text('Legend:', leftX, panelY + 8);
  textStyle(NORMAL);

  let legendItems = [
    { color: COLOR_ENACTED,  label: 'Enacted into law' },
    { color: COLOR_PARTIAL,  label: 'Partially enacted / modified form' },
    { color: COLOR_REJECTED, label: 'Rejected — never enacted' }
  ];
  textSize(11.5);
  for (let i = 0; i < legendItems.length; i++) {
    let it = legendItems[i];
    let y = panelY + 28 + i * 16;
    fill(it.color.r, it.color.g, it.color.b);
    ellipse(leftX + 6, y + 6, 10, 10);
    fill(40);
    textAlign(LEFT, TOP);
    text(it.label, leftX + 18, y);
  }

  // Right: summary statistic
  let rightX = margin + panelW * 0.50;
  let enacted = demands.filter(d => d.status === 'enacted').length;
  let partial = demands.filter(d => d.status === 'partial').length;
  let rejected = demands.filter(d => d.status === 'rejected').length;
  let total = demands.length;

  fill(60);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(12);
  text('From radical to mainstream:', rightX, panelY + 8);
  textStyle(NORMAL);
  fill(35);
  textSize(12);
  let summary =
    enacted + ' of ' + total + ' demands were fully enacted; ' +
    partial + ' were partly enacted by other means; ' +
    rejected + ' were rejected outright. Most adoptions came 20–45 years after 1892, ' +
    'after panics, wars, or depressions made reform politically possible.';
  text(summary, rightX, panelY + 28, panelW - (rightX - margin) - 14, panelH - 32);
}

function drawDetailPanel(d) {
  let maxBottom = 0;
  for (let q of demands) {
    let r = demandCardRect(q);
    maxBottom = max(maxBottom, r.y + r.h);
  }
  let panelY = maxBottom + 14;
  let panelH = drawHeight - panelY - 8;
  let panelW = canvasWidth - margin * 2;
  let sc = statusColor(d.status);

  noStroke();
  fill(255);
  stroke(sc.r, sc.g, sc.b);
  strokeWeight(2);
  rect(margin, panelY, panelW, panelH, 8);
  noStroke();

  // Title row
  fill(20, 50, 110);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(14);
  text('#' + d.number + '  ' + d.title + '  (' + d.mechanism + ')', margin + 12, panelY + 8);

  // Status badge (right)
  textAlign(RIGHT, TOP);
  textStyle(BOLD);
  textSize(11);
  fill(sc.r, sc.g, sc.b);
  text(d.statusLabel, margin + panelW - 12, panelY + 10);

  // Close hint
  fill(120);
  textStyle(NORMAL);
  textSize(10);
  textAlign(RIGHT, TOP);
  text('(click card again or Reset to close)', margin + panelW - 12, panelY + 26);

  // Two-column body
  let colW = (panelW - 30) / 2;
  let leftX = margin + 12;
  let rightX = margin + 22 + colW;
  let bodyY = panelY + 42;
  let lineH = 14;

  textAlign(LEFT, TOP);
  textSize(11.5);

  let yL = bodyY;
  yL = drawField(leftX,  yL,        colW, 'Problem in 1892:',     d.problem,  sc, lineH);
  yL = drawField(leftX,  yL + 4,    colW, 'Path to adoption:',    d.pathway,  sc, lineH);

  let yR = bodyY;
  yR = drawField(rightX, yR,        colW, 'Lasting legacy:',      d.legacy,   sc, lineH);
  yR = drawField(rightX, yR + 4,    colW, 'What enabled / blocked:', d.enabling, sc, lineH);

  textStyle(NORMAL);
}

function drawField(x, y, w, label, body, color, lineH) {
  noStroke();
  fill(color.r, color.g, color.b);
  textStyle(BOLD);
  textSize(11);
  text(label, x, y);
  fill(35);
  textStyle(NORMAL);
  textSize(11.5);
  let bodyH = textHeightWrap(body, w, lineH);
  text(body, x, y + 13, w, bodyH + 4);
  return y + 13 + bodyH + 2;
}

function textHeightWrap(str, w, lineH) {
  textSize(11.5);
  let words = str.split(' ');
  let line = '';
  let lines = 1;
  for (let word of words) {
    let test = line + word + ' ';
    if (textWidth(test) > w) {
      lines++;
      line = word + ' ';
    } else {
      line = test;
    }
  }
  return lines * lineH;
}

function mousePressed() {
  for (let d of demands) {
    if (isFiltered(d)) continue;
    let r = demandCardRect(d);
    if (mouseX >= r.x && mouseX <= r.x + r.w &&
        mouseY >= r.y && mouseY <= r.y + r.h) {
      if (selectedDemand && selectedDemand.id === d.id) {
        selectedDemand = null;
      } else {
        selectedDemand = d;
      }
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}
