// Political Party Realignment — New Deal Coalition to Reagan Coalition
// CANVAS_HEIGHT: 720
// Chapter 19: From Reagan to 9/11 (1975-2001)
// Bloom Level: Analyze (L4) — Map demographic components of coalitions
//
// Layout: drawHeight (640) + controlHeight (80) = 720
// Two side-by-side coalition columns with demographic groups.
// Slider scrubs from 1932 to 2000 — group affiliation strength
// (D-blue / R-red intensity) animates along the timeline.
// Animated arrows show key group migrations between parties.
// Click any group to read vote-share data and the driver of its alignment.

let canvasWidth = 900;
let drawHeight = 640;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 16;

let yearSlider;
let resetBtn;
let arrowsCheckbox;
let issuesCheckbox;

let selectedGroup = null;
let hoveredGroup  = null;

// Color palette
const COLOR_DEM   = { r:  30, g:  90, b: 200 }; // blue
const COLOR_REP   = { r: 200, g:  40, b:  50 }; // red
const COLOR_MIXED = { r: 150, g: 110, b: 170 }; // purple-ish (transitional)
const COLOR_PANEL = { r: 248, g: 250, b: 252 };
const COLOR_BORDER= { r: 210, g: 215, b: 222 };

// Each demographic group has an "affinity timeline":
// affinity[year] = -1 (solid R) ... 0 (split) ... +1 (solid D)
// We store a set of anchor years and interpolate between them.
const groups = [
  {
    id: 'industrial-labor',
    name: 'Industrial Labor Unions',
    short: 'Auto, steel, mining, manufacturing union members',
    coalition: 'newdeal',
    anchors: [
      { year: 1932, val:  0.85, vote: '~75% D (1936)' },
      { year: 1948, val:  0.80, vote: '~75% D (Truman)' },
      { year: 1964, val:  0.85, vote: '~80% D (LBJ)' },
      { year: 1980, val:  0.05, vote: '~48% D / 44% Reagan' },
      { year: 2000, val:  0.30, vote: '~59% D (Gore)' }
    ],
    driver: 'Wagner Act (1935) and CIO organizing built deep loyalty to FDR. Deindustrialization, inflation, and cultural issues split union households in 1980 — many became "Reagan Democrats." Unions narrowed back toward Democrats by 1990s but weakened by membership collapse.',
    keyEvent: 'Wagner Act 1935; PATCO 1981; NAFTA 1993'
  },
  {
    id: 'urban-catholics',
    name: 'Urban Ethnic Catholics',
    short: 'Irish, Italian, Polish working-class urban Catholics',
    coalition: 'newdeal',
    anchors: [
      { year: 1932, val:  0.80, vote: '~73% D (FDR)' },
      { year: 1960, val:  0.90, vote: '~78% D (JFK)' },
      { year: 1972, val:  0.05, vote: '~48% D / Nixon wins many' },
      { year: 1984, val: -0.30, vote: '~44% D (Reagan landslide)' },
      { year: 2000, val:  0.05, vote: '~50/50 split' }
    ],
    driver: 'Backbone of FDR cities. Drifted away over abortion (1973 Roe), busing, crime, and patriotism in the 1970s. JFK\'s 1960 Catholic candidacy was the high-water mark; by 1984 white Catholics broke for Reagan.',
    keyEvent: 'Roe v. Wade 1973; busing crises; Reagan 1980'
  },
  {
    id: 'african-americans',
    name: 'African Americans',
    short: 'Black voters nationwide',
    coalition: 'newdeal',
    anchors: [
      { year: 1932, val: -0.40, vote: 'Mostly R (Lincoln\'s party)' },
      { year: 1936, val:  0.40, vote: '~71% D — first D majority' },
      { year: 1948, val:  0.70, vote: '~77% D (Truman desegregates army)' },
      { year: 1964, val:  0.95, vote: '~94% D (LBJ vs. Goldwater)' },
      { year: 1984, val:  0.92, vote: '~91% D' },
      { year: 2000, val:  0.95, vote: '~90% D (Gore)' }
    ],
    driver: 'Switched from "Party of Lincoln" to FDR over New Deal relief programs (1936). Locked in by Truman\'s 1948 desegregation of armed forces, JFK/LBJ embrace of civil rights, and Goldwater\'s 1964 vote against the Civil Rights Act. Most stable bloc in modern Democratic coalition.',
    keyEvent: 'Civil Rights Act 1964; Voting Rights Act 1965'
  },
  {
    id: 'southern-whites',
    name: 'Southern Whites',
    short: '"Solid South" Democrats since Reconstruction',
    coalition: 'newdeal',
    anchors: [
      { year: 1932, val:  0.85, vote: '~85% D (Solid South)' },
      { year: 1948, val:  0.40, vote: 'Dixiecrat revolt (Thurmond)' },
      { year: 1964, val: -0.30, vote: 'Goldwater wins Deep South' },
      { year: 1968, val: -0.40, vote: 'Wallace + Nixon split D vote' },
      { year: 1984, val: -0.65, vote: '~70% R (Reagan)' },
      { year: 2000, val: -0.55, vote: 'Bush sweeps South' }
    ],
    driver: 'The single largest defection in U.S. political history. 1948 Dixiecrats walked out over civil rights plank. 1964 Civil Rights Act + 1965 Voting Rights Act prompted LBJ to predict losing the South "for a generation." Nixon\'s 1968 Southern Strategy and Reagan\'s 1980 Neshoba County speech completed the switch.',
    keyEvent: 'Dixiecrats 1948; CRA 1964; Southern Strategy 1968'
  },
  {
    id: 'jewish-voters',
    name: 'Jewish Voters',
    short: 'American Jewish electorate',
    coalition: 'newdeal',
    anchors: [
      { year: 1932, val:  0.70, vote: '~82% D (FDR)' },
      { year: 1964, val:  0.85, vote: '~90% D (LBJ)' },
      { year: 1984, val:  0.50, vote: '~67% D (Mondale)' },
      { year: 2000, val:  0.70, vote: '~79% D (Gore-Lieberman)' }
    ],
    driver: 'Earliest and most durable New Deal bloc. FDR\'s coalition, civil rights alliance, and social-liberalism issues kept Jewish voters strongly Democratic even as other white ethnics drifted right.',
    keyEvent: 'New Deal; civil rights coalition'
  },
  {
    id: 'intellectuals',
    name: 'Academics / Intellectuals',
    short: 'College-educated professionals, professors, journalists',
    coalition: 'newdeal',
    anchors: [
      { year: 1932, val:  0.40, vote: 'Mixed; FDR Brain Trust' },
      { year: 1964, val:  0.60, vote: 'Strongly D vs. Goldwater' },
      { year: 1984, val:  0.10, vote: 'Split; Reagan wins many' },
      { year: 2000, val:  0.50, vote: 'Strongly D — diploma divide opens' }
    ],
    driver: 'New Deal "Brain Trust" started a long alignment. By 1990s a "diploma divide" opened: college-educated whites moved D, non-college whites moved R — the inverse of the New Deal pattern.',
    keyEvent: 'New Deal Brain Trust; diploma divide 1990s'
  },

  // ---- REAGAN COALITION GROUPS ----
  {
    id: 'evangelicals',
    name: 'Religious Conservatives / Evangelicals',
    short: 'White evangelical Protestants',
    coalition: 'reagan',
    anchors: [
      { year: 1932, val:  0.20, vote: 'Mostly D (Southern Baptist)' },
      { year: 1976, val:  0.40, vote: '~50% D (Carter, "born again")' },
      { year: 1980, val: -0.40, vote: '~63% R (Reagan)' },
      { year: 1984, val: -0.65, vote: '~78% R (Reagan)' },
      { year: 2000, val: -0.75, vote: '~80% R (Bush)' }
    ],
    driver: 'Politically dormant until 1979. Mobilized by Roe v. Wade (1973), IRS challenges to segregated Christian schools, and the Moral Majority (Jerry Falwell, 1979). Reagan won them despite being divorced and rarely attending church — over the openly evangelical Carter — because of issues, not biography.',
    keyEvent: 'Roe v. Wade 1973; Moral Majority 1979; Reagan 1980'
  },
  {
    id: 'switched-southern',
    name: 'Southern Whites (switched)',
    short: 'Same group, viewed from the Reagan side',
    coalition: 'reagan',
    anchors: [
      { year: 1932, val:  0.85, vote: 'Solid South D' },
      { year: 1968, val: -0.40, vote: 'Nixon Southern Strategy' },
      { year: 1984, val: -0.65, vote: 'Reagan ~70% R' },
      { year: 2000, val: -0.55, vote: 'Bush sweeps South' }
    ],
    driver: 'Mirror of "Southern Whites" group on the New Deal side. Same voters — the migration is the realignment. Civil rights legislation is the proximate cause; cultural and racial backlash is the broader driver.',
    keyEvent: 'CRA 1964; Southern Strategy; Reagan 1980'
  },
  {
    id: 'suburbanites',
    name: 'Suburbanites',
    short: 'Postwar middle-class suburban homeowners',
    coalition: 'reagan',
    anchors: [
      { year: 1932, val:  0.10, vote: 'Mixed (small group)' },
      { year: 1960, val: -0.20, vote: 'Lean R' },
      { year: 1984, val: -0.55, vote: '~62% R (Reagan)' },
      { year: 2000, val: -0.10, vote: 'Split — exurbs R, inner suburbs trending D' }
    ],
    driver: 'GI Bill, FHA loans, and interstate highways built suburbs. Tax-cut politics, Prop 13 (1978), and crime fears aligned them with Reagan. By 2000 the "inner-ring" suburbs began trending D while exurbs stayed R.',
    keyEvent: 'GI Bill 1944; Prop 13 1978; Reagan 1980'
  },
  {
    id: 'business',
    name: 'Business Class',
    short: 'Corporate executives, small-business owners, finance',
    coalition: 'reagan',
    anchors: [
      { year: 1932, val: -0.50, vote: 'Long-time R' },
      { year: 1984, val: -0.65, vote: '~65% R (Reagan tax cuts)' },
      { year: 2000, val: -0.55, vote: 'R majority — finance trending D' }
    ],
    driver: 'Republican base since the Gilded Age. Reagan\'s 1981 tax cut (top rate 70%→50%, then 28% in 1986) and deregulation deepened the alignment. Tech and finance began trending Democratic in the 1990s — first crack in the coalition.',
    keyEvent: 'Reagan tax cut 1981; deregulation'
  },
  {
    id: 'anti-communists',
    name: 'Anti-Communists / Defense Hawks',
    short: 'Cold War hawks, Cuban-Americans, defense voters',
    coalition: 'reagan',
    anchors: [
      { year: 1947, val: -0.10, vote: 'Mixed — Truman Doctrine' },
      { year: 1972, val: -0.30, vote: 'Nixon "peace with honor"' },
      { year: 1984, val: -0.70, vote: 'Reagan "Evil Empire"' },
      { year: 2000, val: -0.55, vote: 'Lean R post-Cold War' }
    ],
    driver: 'McGovern (1972) drove anti-communist Democrats to the GOP. Reagan\'s defense buildup and "Evil Empire" speech (1983) cemented the alignment. Cuban-Americans in Florida became and remain solidly R.',
    keyEvent: 'McGovern 1972; Reagan defense buildup'
  },
  {
    id: 'reagan-democrats',
    name: 'Working-Class Whites ("Reagan Democrats")',
    short: 'Non-college white workers, Rust Belt, ethnic Catholic',
    coalition: 'reagan',
    anchors: [
      { year: 1932, val:  0.80, vote: 'Backbone of FDR' },
      { year: 1968, val:  0.20, vote: 'Wallace 13% nationwide' },
      { year: 1980, val: -0.20, vote: 'Reagan flips Macomb County, MI' },
      { year: 1984, val: -0.50, vote: 'Reagan 49-state landslide' },
      { year: 2000, val: -0.10, vote: 'Split — culture vs. economics' }
    ],
    driver: 'Stanley Greenberg\'s 1985 Macomb County study named them. Drivers: stagflation (1979), Iran hostage crisis, busing, crime, taxes, and a sense the Democratic Party had stopped speaking to them. Inflection point of the realignment.',
    keyEvent: 'Stagflation 1979; Macomb County 1980'
  }
];

// Key realignment elections to highlight on the timeline.
const keyElections = [
  { year: 1932, label: 'FDR' },
  { year: 1948, label: 'Dixiecrats' },
  { year: 1964, label: 'CRA / LBJ' },
  { year: 1968, label: 'So. Strategy' },
  { year: 1980, label: 'Reagan' },
  { year: 2000, label: 'Bush' }
];

// Migration arrows between groups when arrows checkbox is on
const migrations = [
  { fromId: 'southern-whites',  toId: 'switched-southern', label: 'CRA backlash 1964' },
  { fromId: 'urban-catholics',  toId: 'reagan-democrats',  label: 'Cultural realignment' },
  { fromId: 'industrial-labor', toId: 'reagan-democrats',  label: 'Deindustrialization' },
  { fromId: 'african-americans',toId: 'african-americans', label: 'Solidified D 1936-1964', selfHighlight: true }
];

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  yearSlider = createSlider(1932, 2000, 1936, 1);
  yearSlider.style('width', '260px');

  arrowsCheckbox = createCheckbox(' Migration arrows', true);
  issuesCheckbox = createCheckbox(' Key drivers', false);

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => {
    yearSlider.value(1936);
    arrowsCheckbox.checked(true);
    issuesCheckbox.checked(false);
    selectedGroup = null;
  });

  positionControls();
  describe('Side-by-side comparison of the New Deal Democratic coalition (left) and the Reagan Republican coalition (right). Slider scrubs from 1932 to 2000; demographic groups shift color (blue=Democratic, red=Republican) based on their party affinity that year. Animated arrows show which groups migrated between parties. Click a group for vote-share data and historical drivers.', LABEL);
}

function positionControls() {
  let y = drawHeight + 18;
  yearSlider.position(margin + 100, y);
  arrowsCheckbox.position(margin + 380, y);
  arrowsCheckbox.style('font-size', '13px');
  issuesCheckbox.position(margin + 380, y + 22);
  issuesCheckbox.style('font-size', '13px');
  resetBtn.position(canvasWidth - margin - 60, y);
}

// Interpolate group affinity at a given year
function affinityAt(group, year) {
  const a = group.anchors;
  if (year <= a[0].year) return a[0].val;
  if (year >= a[a.length - 1].year) return a[a.length - 1].val;
  for (let i = 0; i < a.length - 1; i++) {
    if (year >= a[i].year && year <= a[i + 1].year) {
      let t = (year - a[i].year) / (a[i + 1].year - a[i].year);
      return lerp(a[i].val, a[i + 1].val, t);
    }
  }
  return 0;
}

// Closest anchor's vote string for display
function voteAt(group, year) {
  const a = group.anchors;
  let best = a[0];
  let bestDist = Math.abs(a[0].year - year);
  for (let anchor of a) {
    let d = Math.abs(anchor.year - year);
    if (d < bestDist) { bestDist = d; best = anchor; }
  }
  return best;
}

function affinityColor(val) {
  // val in [-1, +1]; -1 = R, +1 = D
  if (val >= 0) {
    // mix from MIXED (val=0) to DEM (val=+1)
    let t = val;
    return [
      lerp(COLOR_MIXED.r, COLOR_DEM.r, t),
      lerp(COLOR_MIXED.g, COLOR_DEM.g, t),
      lerp(COLOR_MIXED.b, COLOR_DEM.b, t)
    ];
  } else {
    let t = -val;
    return [
      lerp(COLOR_MIXED.r, COLOR_REP.r, t),
      lerp(COLOR_MIXED.g, COLOR_REP.g, t),
      lerp(COLOR_MIXED.b, COLOR_REP.b, t)
    ];
  }
}

function groupBoxes() {
  // Returns positions of every group box, keyed by id
  const newdealGroups = groups.filter(g => g.coalition === 'newdeal');
  const reaganGroups  = groups.filter(g => g.coalition === 'reagan');

  let topY = 92;
  let bottomY = drawHeight - 230; // leave room for timeline + detail/legend
  let colW = (canvasWidth - margin * 3) / 2;
  let leftX = margin;
  let rightX = margin * 2 + colW;

  let boxes = {};
  let layoutCol = (list, x) => {
    let n = list.length;
    let availH = bottomY - topY - 12;
    let boxH = Math.max(46, Math.min(58, availH / n - 6));
    for (let i = 0; i < n; i++) {
      let y = topY + i * (boxH + 6) + 6;
      boxes[list[i].id] = {
        group: list[i], x: x + 8, y: y, w: colW - 16, h: boxH
      };
    }
  };
  layoutCol(newdealGroups, leftX);
  layoutCol(reaganGroups,  rightX);
  return { boxes, leftX, rightX, colW, topY, bottomY };
}

function draw() {
  updateCanvasSize();

  // Background
  noStroke();
  fill(255);
  rect(0, 0, canvasWidth, canvasHeight);
  fill(COLOR_PANEL.r, COLOR_PANEL.g, COLOR_PANEL.b);
  rect(0, drawHeight, canvasWidth, controlHeight);
  stroke(COLOR_BORDER.r, COLOR_BORDER.g, COLOR_BORDER.b);
  strokeWeight(1);
  line(0, drawHeight, canvasWidth, drawHeight);
  noStroke();

  // Title
  fill(20, 50, 110);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(18);
  text('Political Party Realignment — New Deal vs. Reagan Coalitions', canvasWidth / 2, 10);
  textStyle(NORMAL);
  fill(90);
  textSize(11.5);
  let yr = yearSlider.value();
  text('Year: ' + yr + ' — color shows each group\'s party affinity (blue = D, red = R). Click any group for detail.',
       canvasWidth / 2, 36);

  // Layout
  const { boxes, leftX, rightX, colW, topY, bottomY } = groupBoxes();

  // Coalition column headers
  noStroke();
  fill(COLOR_DEM.r, COLOR_DEM.g, COLOR_DEM.b);
  rect(leftX, topY - 36, colW, 28, 6);
  fill(255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(13);
  text('NEW DEAL COALITION (Democratic, FDR-LBJ)', leftX + colW / 2, topY - 22);

  fill(COLOR_REP.r, COLOR_REP.g, COLOR_REP.b);
  rect(rightX, topY - 36, colW, 28, 6);
  fill(255);
  text('REAGAN COALITION (Republican, 1980-)', rightX + colW / 2, topY - 22);
  textStyle(NORMAL);

  // Group boxes
  hoveredGroup = null;
  for (let id in boxes) {
    drawGroupBox(boxes[id], yr);
  }

  // Migration arrows
  if (arrowsCheckbox.checked()) {
    drawMigrationArrows(boxes, yr);
  }

  // Timeline
  drawTimeline(yr);

  // Detail panel or legend
  if (selectedGroup) {
    drawDetailPanel(selectedGroup, yr);
  } else if (hoveredGroup) {
    drawHoverTooltip(hoveredGroup, yr);
  } else {
    drawLegend();
  }

  // Control labels
  noStroke();
  fill(60);
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Year: ' + yr, margin + 8, drawHeight + 28);

  positionControls();
}

function drawGroupBox(box, yr) {
  let val = affinityAt(box.group, yr);
  let col = affinityColor(val);

  // Hover detection
  let isHover = mouseX >= box.x && mouseX <= box.x + box.w &&
                mouseY >= box.y && mouseY <= box.y + box.h;
  if (isHover) hoveredGroup = box.group;
  let isSel = selectedGroup && selectedGroup.id === box.group.id;

  // Box
  stroke(isSel ? 30 : 200, isSel ? 30 : 205, isSel ? 30 : 215);
  strokeWeight(isSel ? 3 : 1);
  fill(col[0], col[1], col[2], 240);
  rect(box.x, box.y, box.w, box.h, 6);
  noStroke();

  // Affinity bar (small)
  let barX = box.x + 8;
  let barY = box.y + box.h - 10;
  let barW = box.w - 16;
  let cx = barX + barW / 2;
  // background bar
  fill(255, 255, 255, 80);
  rect(barX, barY, barW, 4, 2);
  // value indicator
  let absVal = Math.abs(val);
  fill(255);
  if (val >= 0) {
    rect(cx, barY, (barW / 2) * absVal, 4, 2);
  } else {
    rect(cx - (barW / 2) * absVal, barY, (barW / 2) * absVal, 4, 2);
  }
  // center tick
  stroke(255, 255, 255, 200);
  strokeWeight(1);
  line(cx, barY - 2, cx, barY + 6);
  noStroke();

  // Group name
  fill(255);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(12);
  text(box.group.name, box.x + 8, box.y + 6, box.w - 16, box.h - 22);
  textStyle(NORMAL);

  // Affinity label
  let labelTxt = val > 0.4 ? 'Strong D' :
                 val > 0.1 ? 'Lean D' :
                 val > -0.1 ? 'Split' :
                 val > -0.4 ? 'Lean R' : 'Strong R';
  fill(255, 220);
  textAlign(RIGHT, TOP);
  textSize(10);
  text(labelTxt, box.x + box.w - 10, box.y + 6);
}

function drawMigrationArrows(boxes, yr) {
  for (let m of migrations) {
    let from = boxes[m.fromId];
    let to   = boxes[m.toId];
    if (!from || !to) continue;
    if (m.selfHighlight) continue; // skip self loops

    let x1 = from.x + from.w;
    let y1 = from.y + from.h / 2;
    let x2 = to.x;
    let y2 = to.y + to.h / 2;

    // Animate dash position based on year
    let phase = ((yr - 1932) * 6 + frameCount * 0.5) % 16;

    stroke(80, 80, 80, 180);
    strokeWeight(1.4);
    drawingContext.setLineDash([6, 6]);
    drawingContext.lineDashOffset = -phase;
    noFill();
    let mx = (x1 + x2) / 2;
    bezier(x1, y1, mx, y1, mx, y2, x2 - 8, y2);
    drawingContext.setLineDash([]);

    // Arrowhead at target
    push();
    translate(x2 - 8, y2);
    fill(80, 80, 80, 220);
    noStroke();
    triangle(-2, -4, -2, 4, 6, 0);
    pop();

    // Label if "Key drivers" is on
    if (issuesCheckbox.checked()) {
      noStroke();
      fill(60);
      textAlign(CENTER, BOTTOM);
      textSize(10);
      textStyle(ITALIC);
      text(m.label, mx, (y1 + y2) / 2 - 4);
      textStyle(NORMAL);
    }
  }
}

function drawTimeline(yr) {
  let y = drawHeight - 130;
  let x1 = margin + 140;
  let x2 = canvasWidth - margin - 30;

  noStroke();
  fill(245, 247, 250);
  rect(margin, y - 22, canvasWidth - margin * 2, 78, 6);

  // Section label
  fill(40);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(11);
  text('Realignment Timeline', margin + 8, y - 19);
  textStyle(NORMAL);

  // Axis line
  stroke(120);
  strokeWeight(1.5);
  line(x1, y + 14, x2, y + 14);

  // Tick marks every 4 years
  noStroke();
  for (let t = 1932; t <= 2000; t += 4) {
    let tx = map(t, 1932, 2000, x1, x2);
    stroke(180);
    strokeWeight(1);
    line(tx, y + 11, tx, y + 17);
    noStroke();
    if (t % 8 === 0) {
      fill(90);
      textAlign(CENTER, TOP);
      textSize(10);
      text(t, tx, y + 20);
    }
  }

  // Key elections
  for (let ke of keyElections) {
    let kx = map(ke.year, 1932, 2000, x1, x2);
    stroke(180, 130, 30);
    strokeWeight(1);
    line(kx, y - 8, kx, y + 14);
    noStroke();
    fill(140, 90, 20);
    textAlign(CENTER, BOTTOM);
    textSize(9.5);
    text(ke.label, kx, y - 9);
  }

  // Current year marker
  let cx = map(yr, 1932, 2000, x1, x2);
  stroke(20, 50, 110);
  strokeWeight(2);
  line(cx, y - 4, cx, y + 22);
  fill(20, 50, 110);
  noStroke();
  triangle(cx - 5, y - 4, cx + 5, y - 4, cx, y + 2);

  // Key event annotation for nearest election
  let nearest = keyElections.reduce((a, b) =>
    Math.abs(b.year - yr) < Math.abs(a.year - yr) ? b : a);
  fill(60);
  textAlign(CENTER, TOP);
  textSize(11);
  textStyle(ITALIC);
  text('Nearest realignment moment: ' + nearest.year + ' (' + nearest.label + ')',
       canvasWidth / 2, y + 38);
  textStyle(NORMAL);
}

function drawHoverTooltip(group, yr) {
  let val = affinityAt(group, yr);
  let voteAnchor = voteAt(group, yr);
  let txt = group.name + ' (' + yr + '): ' + voteAnchor.vote +
            '  —  click for full detail';

  textSize(12);
  let tw = min(textWidth(txt) + 16, canvasWidth - 40);
  let th = 30;
  let tx = constrain(mouseX - tw / 2, margin, canvasWidth - tw - margin);
  let ty = drawHeight - 18;
  noStroke();
  fill(30, 40, 60, 235);
  rect(tx, ty - th, tw, th, 6);
  fill(255);
  textAlign(LEFT, CENTER);
  text(txt, tx + 8, ty - th / 2);
}

function drawDetailPanel(group, yr) {
  let pw = canvasWidth - margin * 2;
  let ph = 125;
  let px = margin;
  let py = drawHeight - ph - 6;

  noStroke();
  fill(255);
  let col = affinityColor(affinityAt(group, yr));
  stroke(col[0], col[1], col[2]);
  strokeWeight(2);
  rect(px, py, pw, ph, 8);
  noStroke();

  // Header
  fill(col[0], col[1], col[2]);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(13);
  text(group.name + '  —  ' + yr, px + 10, py + 8);

  fill(120);
  textAlign(RIGHT, TOP);
  textStyle(NORMAL);
  textSize(11);
  text('(click again or Reset to close)', px + pw - 10, py + 10);

  // Vote anchor for current year
  let voteAnchor = voteAt(group, yr);

  // Two columns
  let colW = (pw - 30) / 2;
  let leftX = px + 10;
  let rightX = px + 20 + colW;

  // Left: Snapshot
  fill(col[0], col[1], col[2]);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(11);
  text('Vote share (' + voteAnchor.year + '):', leftX, py + 28);
  fill(35);
  textStyle(NORMAL);
  textSize(11.5);
  text(voteAnchor.vote, leftX, py + 42, colW, 30);

  fill(col[0], col[1], col[2]);
  textStyle(BOLD);
  textSize(11);
  text('Key inflection points:', leftX, py + 70);
  fill(35);
  textStyle(NORMAL);
  textSize(11.5);
  text(group.keyEvent, leftX, py + 84, colW, 40);

  // Right: Driver
  fill(col[0], col[1], col[2]);
  textStyle(BOLD);
  textSize(11);
  text('What drove the alignment:', rightX, py + 28);
  fill(35);
  textStyle(NORMAL);
  textSize(11.5);
  text(group.driver, rightX, py + 42, colW, ph - 50);
}

function drawLegend() {
  let pw = canvasWidth - margin * 2;
  let ph = 60;
  let px = margin;
  let py = drawHeight - ph - 6;

  noStroke();
  fill(252);
  stroke(220);
  strokeWeight(1);
  rect(px, py, pw, ph, 8);
  noStroke();

  fill(60);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(12);
  text('Legend:', px + 10, py + 8);
  textStyle(NORMAL);
  textSize(11.5);

  // Color swatches
  let sx = px + 70;
  let sy = py + 8;
  fill(COLOR_DEM.r, COLOR_DEM.g, COLOR_DEM.b);
  rect(sx, sy, 16, 12, 2);
  fill(40);
  text('Strong Democratic', sx + 22, sy);

  fill(COLOR_MIXED.r, COLOR_MIXED.g, COLOR_MIXED.b);
  rect(sx + 160, sy, 16, 12, 2);
  fill(40);
  text('Split / transitional', sx + 182, sy);

  fill(COLOR_REP.r, COLOR_REP.g, COLOR_REP.b);
  rect(sx + 320, sy, 16, 12, 2);
  fill(40);
  text('Strong Republican', sx + 342, sy);

  fill(60);
  textSize(11);
  textStyle(ITALIC);
  text('Move the year slider to scrub through the realignment. Click any group to read its drivers and vote share.',
       px + 10, py + 30, pw - 20, 24);
  textStyle(NORMAL);
}

function mousePressed() {
  // Re-layout to know where boxes are
  const { boxes } = groupBoxes();
  for (let id in boxes) {
    let b = boxes[id];
    if (mouseX >= b.x && mouseX <= b.x + b.w &&
        mouseY >= b.y && mouseY <= b.y + b.h) {
      if (selectedGroup && selectedGroup.id === b.group.id) {
        selectedGroup = null;
      } else {
        selectedGroup = b.group;
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
