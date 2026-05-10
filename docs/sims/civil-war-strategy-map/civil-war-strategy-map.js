// Civil War Battles and Strategy Map
// CANVAS_HEIGHT: 640
// Chapter 8: Sectionalism and the Civil War (1844-1865)
// Bloom Level: Analyze (L4) - Examine how geography shaped Civil War strategy
//
// Layout: drawHeight (560) + controlHeight (80) = 640
// Stylized map of eastern/southern US with major battles, rivers, coasts.
// Toggleable overlays show the Anaconda Plan: naval blockade + Mississippi push.
// Year slider 1861-1865 progressively reveals battles.
// Click any battle for date, victor, casualties, and strategic significance.

let canvasWidth = 900;
let drawHeight = 560;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 12;

// Geographic projection bounds (lon, lat) onto canvas
// Covers roughly the eastern/southern US: ~Mississippi to Atlantic, Gulf to Great Lakes
const LON_MIN = -97.0;
const LON_MAX = -73.0;
const LAT_MIN = 24.0;
const LAT_MAX = 43.5;

// Map drawing area (inside drawHeight)
let mapTop = 50;
let mapBottom = 540;
let mapLeft = 12;
let mapRight = 700;          // right side reserved for legend / detail panel
let panelLeft = 712;         // detail / legend panel
let panelRight = 888;

// Controls
let yearSlider;
let blockadeCheckbox;
let mississippiCheckbox;
let easternCheckbox;
let westernCheckbox;
let shermanCheckbox;
let resetBtn;

let selectedBattle = null;
let hoveredBattle = null;

// Colors
const C_UNION       = [205, 222, 245]; // light blue land
const C_CONFEDERATE = [240, 215, 215]; // light red land
const C_BORDER      = [232, 224, 200]; // border states (KY, MO, MD, DE, WV)
const C_OCEAN       = [225, 238, 245];
const C_RIVER       = [70, 120, 180];
const C_COAST_LINE  = [60, 90, 130];
const C_UNION_DARK  = [30, 70, 140];
const C_CONF_DARK   = [150, 50, 50];
const C_GOLD        = [230, 175, 35];

// Battle data — coordinates approximate to real geography
const battles = [
  {
    id: 'sumter', name: 'Fort Sumter',
    lon: -79.87, lat: 32.75,
    year: 1861, dateStr: 'April 12-13, 1861',
    theater: 'eastern',
    victor: 'confederate',
    casualtiesUnion: '0 killed', casualtiesConf: '0 killed',
    significance: 'Confederate bombardment of the Union-held fort in Charleston Harbor began the Civil War. No combat deaths, but Lincoln responded by calling for 75,000 volunteers, prompting four more states to secede.',
    connection: 'War begins.'
  },
  {
    id: 'bullrun1', name: 'First Bull Run',
    lon: -77.52, lat: 38.81,
    year: 1861, dateStr: 'July 21, 1861',
    theater: 'eastern',
    victor: 'confederate',
    casualtiesUnion: '~2,900', casualtiesConf: '~2,000',
    significance: 'First major land battle. Confederate victory shattered Northern hopes of a quick war and earned Thomas J. Jackson the nickname "Stonewall."',
    connection: 'Ended illusions of a 90-day war.'
  },
  {
    id: 'shiloh', name: 'Shiloh',
    lon: -88.34, lat: 35.14,
    year: 1862, dateStr: 'April 6-7, 1862',
    theater: 'western',
    victor: 'union',
    casualtiesUnion: '~13,000', casualtiesConf: '~10,700',
    significance: 'Grant\'s costly victory in Tennessee opened the western Confederacy. Casualties shocked both nations and previewed a long, brutal war.',
    connection: 'Anchored Union push down the Mississippi.'
  },
  {
    id: 'bullrun2', name: 'Second Bull Run',
    lon: -77.52, lat: 38.81, lonOffset: 0, latOffset: -0.25,
    year: 1862, dateStr: 'August 28-30, 1862',
    theater: 'eastern',
    victor: 'confederate',
    casualtiesUnion: '~14,000', casualtiesConf: '~8,000',
    significance: 'Lee\'s decisive victory cleared Virginia of Union forces and set the stage for his first invasion of the North.',
    connection: 'Triggered Antietam campaign.'
  },
  {
    id: 'antietam', name: 'Antietam',
    lon: -77.74, lat: 39.47,
    year: 1862, dateStr: 'September 17, 1862',
    theater: 'eastern',
    victor: 'union',  // tactical draw, strategic Union win
    casualtiesUnion: '~12,400', casualtiesConf: '~10,300',
    significance: 'Bloodiest single day in American history (~22,700 casualties). Lee\'s retreat gave Lincoln the strategic victory he needed to issue the preliminary Emancipation Proclamation five days later.',
    connection: 'Triggered the Emancipation Proclamation (Jan 1, 1863).'
  },
  {
    id: 'chancellorsville', name: 'Chancellorsville',
    lon: -77.63, lat: 38.31,
    year: 1863, dateStr: 'April 30 - May 6, 1863',
    theater: 'eastern',
    victor: 'confederate',
    casualtiesUnion: '~17,300', casualtiesConf: '~13,300',
    significance: 'Lee\'s tactical masterpiece against a force twice his size — but at the cost of Stonewall Jackson, mortally wounded by friendly fire.',
    connection: 'Emboldened Lee\'s second invasion of the North.'
  },
  {
    id: 'vicksburg', name: 'Vicksburg',
    lon: -90.88, lat: 32.35,
    year: 1863, dateStr: 'May 18 - July 4, 1863',
    theater: 'western',
    victor: 'union',
    casualtiesUnion: '~4,800', casualtiesConf: '~32,700 (mostly captured)',
    significance: 'Grant\'s 47-day siege gave the Union complete control of the Mississippi River, splitting the Confederacy in two. Surrendered July 4, one day after Gettysburg.',
    connection: 'Completed the Anaconda Plan\'s Mississippi pillar.'
  },
  {
    id: 'gettysburg', name: 'Gettysburg',
    lon: -77.23, lat: 39.83,
    year: 1863, dateStr: 'July 1-3, 1863',
    theater: 'eastern',
    victor: 'union',
    casualtiesUnion: '~23,000', casualtiesConf: '~28,000',
    significance: 'Turning point of the Eastern Theater. Lee\'s second invasion repulsed; Confederacy never again mounted a major offensive into the North. Set up Lincoln\'s Gettysburg Address (Nov 19, 1863).',
    connection: 'Eastern Theater high-water mark of the Confederacy.'
  },
  {
    id: 'atlanta', name: 'Atlanta',
    lon: -84.39, lat: 33.75,
    year: 1864, dateStr: 'July 22 - September 2, 1864',
    theater: 'western',
    victor: 'union',
    casualtiesUnion: '~31,700 (campaign)', casualtiesConf: '~34,900 (campaign)',
    significance: 'Sherman\'s capture of Atlanta secured Lincoln\'s 1864 re-election and opened the March to the Sea. Demonstrated that Confederate logistics could be broken.',
    connection: 'Launched Sherman\'s March to the Sea (Nov-Dec 1864).'
  },
  {
    id: 'petersburg', name: 'Petersburg',
    lon: -77.40, lat: 37.23,
    year: 1864, dateStr: 'June 1864 - April 1865',
    theater: 'eastern',
    victor: 'union',
    casualtiesUnion: '~42,000', casualtiesConf: '~28,000',
    significance: 'Nine-month siege of Richmond\'s rail hub previewed WWI trench warfare. Its fall (April 2, 1865) forced Lee to abandon Richmond.',
    connection: 'Set up Lee\'s retreat to Appomattox.'
  },
  {
    id: 'appomattox', name: 'Appomattox',
    lon: -78.85, lat: 37.38,
    year: 1865, dateStr: 'April 9, 1865',
    theater: 'eastern',
    victor: 'union',
    casualtiesUnion: '~150', casualtiesConf: '~500 + ~28,000 surrendered',
    significance: 'Lee surrendered the Army of Northern Virginia to Grant at Wilmer McLean\'s house. Generous terms — paroles, no prison — set the tone for reunion.',
    connection: 'Effective end of the Civil War.'
  }
];

// Confederate state polygon outlines (very simplified) for shading
// Each polygon is an array of [lon, lat] points.
const confederatePolygon = [
  [-94.0, 33.0], [-94.5, 36.5], [-90.5, 36.5], [-89.5, 36.5],  // AR/TN north
  [-88.5, 35.0], [-85.5, 35.0], [-83.5, 35.0], [-82.0, 36.5],  // TN/NC line
  [-78.5, 36.55], [-75.95, 36.55],                              // NC/VA line
  [-75.85, 38.0], [-77.05, 38.95], [-77.5, 39.0],               // VA/MD east
  [-77.7, 39.15], [-78.4, 39.45], [-79.15, 39.4],               // VA top (WV stays Union)
  [-80.5, 38.5], [-81.0, 37.5], [-82.5, 37.4],                  // VA west
  [-82.5, 36.6], [-85.5, 35.0],                                  // back south for sweep around WV/KY
  [-87.0, 35.0], [-89.5, 36.5],                                  // (ignore — duplicates avoided in draw)
];
// We'll draw individual simplified state shapes instead — easier to control:

// Simplified polygons for Confederate states (clockwise)
const confStates = [
  { name: 'Virginia',     pts: [[-83.65,36.6],[-81.7,36.6],[-81.95,37.2],[-82.9,37.4],[-82.8,38.1],[-81.6,37.5],[-80.8,38.6],[-79.5,39.45],[-78.4,39.45],[-77.7,39.15],[-77.05,38.95],[-76.0,38.0],[-75.85,37.95],[-75.95,37.2],[-76.5,37.0],[-77.0,36.55],[-78.0,36.55],[-79.0,36.55],[-80.0,36.55],[-81.7,36.6]] },
  { name: 'NorthCarolina',pts: [[-84.32,35.0],[-82.0,35.2],[-80.5,35.0],[-78.5,33.85],[-77.5,34.4],[-75.5,35.2],[-75.45,36.55],[-78.5,36.55],[-81.7,36.6],[-83.65,36.6],[-84.32,35.0]] },
  { name: 'SouthCarolina',pts: [[-83.35,35.2],[-82.0,35.2],[-80.5,35.0],[-78.5,33.85],[-79.5,32.8],[-80.85,32.05],[-83.0,33.5],[-83.35,35.2]] },
  { name: 'Georgia',      pts: [[-85.6,35.0],[-83.35,35.2],[-83.0,33.5],[-80.85,32.05],[-81.5,30.7],[-83.0,30.6],[-85.0,30.7],[-85.0,31.5],[-85.0,32.4],[-85.6,35.0]] },
  { name: 'Florida',      pts: [[-87.5,30.95],[-85.0,30.7],[-83.0,30.6],[-81.5,30.7],[-80.05,26.0],[-81.05,25.2],[-82.85,28.0],[-83.7,29.7],[-85.0,29.7],[-86.5,30.4],[-87.5,30.95]] },
  { name: 'Alabama',      pts: [[-88.5,35.0],[-85.6,35.0],[-85.0,32.4],[-85.0,31.5],[-85.0,30.7],[-87.5,30.95],[-88.0,30.4],[-88.4,31.0],[-88.45,32.0],[-88.5,35.0]] },
  { name: 'Mississippi',  pts: [[-91.0,34.99],[-88.5,35.0],[-88.45,32.0],[-88.4,31.0],[-89.6,30.2],[-91.65,30.2],[-91.05,32.0],[-91.0,34.99]] },
  { name: 'Louisiana',    pts: [[-94.04,33.02],[-91.0,33.0],[-91.05,32.0],[-91.65,30.2],[-89.6,30.2],[-89.0,29.0],[-91.5,29.0],[-93.85,29.7],[-94.04,33.02]] },
  { name: 'Tennessee',    pts: [[-90.3,35.0],[-88.0,35.0],[-85.5,35.0],[-83.65,35.0],[-82.0,36.6],[-83.65,36.6],[-85.0,36.6],[-87.5,36.6],[-89.5,36.5],[-90.3,35.0]] },
  { name: 'Arkansas',     pts: [[-94.5,36.5],[-90.5,36.5],[-90.3,35.0],[-91.0,34.99],[-91.0,33.0],[-94.04,33.02],[-94.5,33.02],[-94.5,36.5]] },
  { name: 'Texas-east',   pts: [[-97.0,33.85],[-94.04,33.02],[-93.85,29.7],[-97.0,28.0],[-97.0,33.85]] }
];

// Simplified Union and border state shapes
const unionStates = [
  { name: 'Pennsylvania', pts: [[-80.5,39.72],[-74.69,39.78],[-75.0,40.5],[-74.7,41.35],[-79.76,42.0],[-80.5,42.0],[-80.5,39.72]] },
  { name: 'NewYork',      pts: [[-79.76,42.0],[-74.7,41.35],[-73.5,40.95],[-73.5,42.0],[-73.25,42.75],[-73.4,45.0],[-76.3,44.3],[-77.5,43.6],[-79.76,43.3],[-79.76,42.0]] },
  { name: 'NewJersey',    pts: [[-74.7,41.35],[-75.0,40.5],[-74.0,39.5],[-74.0,40.5],[-74.7,41.35]] },
  { name: 'Ohio',         pts: [[-84.81,41.7],[-80.51,41.7],[-80.5,40.6],[-80.5,39.72],[-82.5,39.0],[-84.81,39.1],[-84.81,41.7]] },
  { name: 'Indiana',      pts: [[-87.52,41.76],[-84.81,41.7],[-84.81,39.1],[-85.0,38.0],[-86.8,38.0],[-87.52,38.5],[-87.52,41.76]] },
  { name: 'Illinois',     pts: [[-91.51,42.5],[-87.52,42.5],[-87.52,41.76],[-87.52,38.5],[-88.0,37.0],[-89.5,37.0],[-91.0,37.0],[-91.4,38.5],[-90.5,40.0],[-91.51,42.5]] },
  { name: 'Massachusetts',pts: [[-73.5,42.0],[-71.0,42.0],[-70.0,42.05],[-70.5,42.9],[-73.5,42.75],[-73.5,42.0]] }
];

const borderStates = [
  { name: 'WestVirginia', pts: [[-82.5,37.4],[-80.8,38.6],[-79.5,39.45],[-79.15,39.4],[-78.4,39.45],[-78.0,39.45],[-77.7,39.15],[-78.5,39.0],[-79.0,38.5],[-80.5,38.5],[-81.0,37.5],[-82.5,37.4]] },
  { name: 'Kentucky',     pts: [[-89.5,36.5],[-84.81,36.6],[-82.0,36.6],[-83.65,36.6],[-83.65,38.5],[-85.0,38.5],[-87.5,37.5],[-88.0,37.0],[-89.5,37.0],[-89.5,36.5]] },
  { name: 'Maryland',     pts: [[-79.5,39.45],[-77.0,39.7],[-75.0,39.7],[-75.05,38.45],[-76.05,38.0],[-77.05,38.95],[-77.7,39.15],[-78.4,39.45],[-79.15,39.4],[-79.5,39.45]] },
  { name: 'Delaware',     pts: [[-75.79,39.83],[-75.05,39.83],[-75.05,38.45],[-75.45,38.45],[-75.79,39.83]] },
  { name: 'Missouri',     pts: [[-95.77,40.6],[-90.5,40.6],[-90.5,38.7],[-89.5,37.0],[-91.0,37.0],[-94.6,36.5],[-95.77,36.5],[-95.77,40.6]] }
];

// Mississippi River polyline
const mississippi = [
  [-90.18, 29.95],  // mouth (New Orleans)
  [-90.95, 30.45],
  [-91.20, 31.30],
  [-91.30, 32.30],  // Vicksburg
  [-90.85, 33.50],
  [-90.20, 34.75],
  [-90.30, 35.15],  // Memphis
  [-89.65, 36.50],  // Cairo, IL
  [-90.20, 38.65],  // St Louis
  [-90.50, 40.00],
  [-91.51, 42.00]
];

// Coastline polyline (Atlantic + Gulf, simplified) for blockade arrows
const coastPoints = [
  [-75.05, 38.45], // Delaware
  [-75.45, 37.20], // VA Eastern Shore
  [-76.50, 37.00], // VA
  [-75.95, 36.55], // NC outer
  [-75.50, 35.20], // OBX
  [-77.50, 34.40], // NC coast
  [-78.50, 33.85], // border SC
  [-79.50, 32.80], // Charleston
  [-80.85, 32.05], // SC/GA
  [-81.50, 30.70], // GA/FL
  [-81.05, 29.20], // FL east
  [-80.05, 26.00], // FL east
  [-81.05, 25.20], // FL Keys
  [-82.85, 28.00], // FL gulf
  [-83.70, 29.70], // FL
  [-85.00, 29.70], // FL panhandle
  [-86.50, 30.40], // FL
  [-87.50, 30.95], // AL
  [-88.00, 30.40], // AL/MS
  [-89.00, 30.20], // MS
  [-89.20, 29.10], // LA
  [-91.50, 29.00], // LA
  [-93.85, 29.70], // LA/TX
  [-95.50, 29.00]  // TX
];

// ---- Projection helpers ----
function project(lon, lat) {
  const w = mapRight - mapLeft;
  const h = mapBottom - mapTop;
  const x = mapLeft + ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * w;
  const y = mapTop + (1 - (lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * h;
  return { x, y };
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
}

function recomputeMapBounds() {
  mapLeft = 12;
  mapRight = canvasWidth - 200;
  panelLeft = canvasWidth - 188;
  panelRight = canvasWidth - 12;
  // If canvas narrow, panel stacks below not implemented; clamp instead
  if (mapRight < 480) {
    mapRight = canvasWidth - 12;
    panelLeft = canvasWidth - 188; // panel can overlap on tiny screens
  }
}

function setup() {
  updateCanvasSize();
  recomputeMapBounds();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  yearSlider = createSlider(1861, 1865, 1865, 1);

  blockadeCheckbox    = createCheckbox(' Anaconda blockade', true);
  mississippiCheckbox = createCheckbox(' Mississippi campaign', true);
  easternCheckbox     = createCheckbox(' Eastern Theater', false);
  westernCheckbox     = createCheckbox(' Western Theater', false);
  shermanCheckbox     = createCheckbox(' Sherman\'s March', false);

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => {
    yearSlider.value(1865);
    blockadeCheckbox.checked(true);
    mississippiCheckbox.checked(true);
    easternCheckbox.checked(false);
    westernCheckbox.checked(false);
    shermanCheckbox.checked(false);
    selectedBattle = null;
  });

  positionControls();
  describe('Stylized map of the eastern and southern United States showing major Civil War battles, the Union naval blockade, and the Mississippi River campaign. Use the year slider to reveal battles 1861-1865. Toggle overlays for the Anaconda Plan and theater campaigns. Click any battle for date, casualties, and strategic significance.', LABEL);
}

function positionControls() {
  const y1 = drawHeight + 10;
  const y2 = drawHeight + 36;
  const y3 = drawHeight + 58;

  // Row 1: year slider
  yearSlider.position(margin + 60, y1);
  yearSlider.style('width', '180px');

  // Row 2: overlay checkboxes (left group)
  blockadeCheckbox.position(margin + 8, y2);
  blockadeCheckbox.style('font-size', '12px');
  mississippiCheckbox.position(margin + 170, y2);
  mississippiCheckbox.style('font-size', '12px');
  easternCheckbox.position(margin + 340, y2);
  easternCheckbox.style('font-size', '12px');

  // Row 3: more overlays
  westernCheckbox.position(margin + 8, y3);
  westernCheckbox.style('font-size', '12px');
  shermanCheckbox.position(margin + 170, y3);
  shermanCheckbox.style('font-size', '12px');

  // Reset button (top-right of control band)
  resetBtn.position(canvasWidth - 70, y1);
}

function draw() {
  updateCanvasSize();
  recomputeMapBounds();

  // Backgrounds
  noStroke();
  fill(C_OCEAN[0], C_OCEAN[1], C_OCEAN[2]);
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
  textSize(16);
  text('Civil War Battles and Strategy: Geography Shapes the War (1861-1865)',
       (mapLeft + mapRight) / 2, 6);
  textStyle(NORMAL);
  textSize(11);
  fill(80);
  text('Year: ' + yearSlider.value() + ' — Click a battle for details. Toggle overlays to see Union strategy.',
       (mapLeft + mapRight) / 2, 28);

  // Land (Union, border, Confederate) — drawn in order so Confederate is on top of any overlap
  drawStateGroup(unionStates, C_UNION);
  drawStateGroup(borderStates, C_BORDER);
  drawStateGroup(confStates, C_CONFEDERATE);

  // Mississippi River
  drawMississippi();

  // Coastline (drawn with a darker stroke to suggest the Confederate coastline)
  drawCoastline();

  // Strategy overlays (under battle markers)
  if (blockadeCheckbox.checked())    drawAnacondaBlockade();
  if (mississippiCheckbox.checked()) drawMississippiCampaign();
  if (easternCheckbox.checked())     drawEasternTheater();
  if (westernCheckbox.checked())     drawWesternTheater();
  if (shermanCheckbox.checked())     drawShermansMarch();

  // City labels
  drawCityLabels();

  // Battles (filtered by year slider)
  hoveredBattle = null;
  for (const b of battles) {
    if (b.year <= yearSlider.value()) drawBattle(b);
  }

  // Side panel — legend or detail
  if (selectedBattle) drawDetailPanel(selectedBattle);
  else drawLegend();

  // Hover tooltip on top
  if (hoveredBattle && (!selectedBattle || selectedBattle.id !== hoveredBattle.id)) {
    drawHoverTooltip(hoveredBattle);
  }

  // Control labels
  noStroke();
  fill(60);
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Year:', margin + 8, drawHeight + 18);
  fill(40);
  textStyle(BOLD);
  text(yearSlider.value(), margin + 248, drawHeight + 18);
  textStyle(NORMAL);

  positionControls();
}

// ---- Drawing helpers ----

function drawStateGroup(group, fillColor) {
  noStroke();
  fill(fillColor[0], fillColor[1], fillColor[2]);
  for (const st of group) {
    beginShape();
    for (const pt of st.pts) {
      const p = project(pt[0], pt[1]);
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
  }
  // State outlines
  stroke(180, 180, 180);
  strokeWeight(0.8);
  noFill();
  for (const st of group) {
    beginShape();
    for (const pt of st.pts) {
      const p = project(pt[0], pt[1]);
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
  }
  noStroke();
}

function drawMississippi() {
  noFill();
  stroke(C_RIVER[0], C_RIVER[1], C_RIVER[2]);
  strokeWeight(2.4);
  beginShape();
  for (const pt of mississippi) {
    const p = project(pt[0], pt[1]);
    vertex(p.x, p.y);
  }
  endShape();
  noStroke();
  fill(C_RIVER[0], C_RIVER[1], C_RIVER[2]);
  textAlign(LEFT, CENTER);
  textStyle(ITALIC);
  textSize(10);
  const lbl = project(-91.0, 35.7);
  text('Mississippi R.', lbl.x - 60, lbl.y);
  textStyle(NORMAL);
}

function drawCoastline() {
  noFill();
  stroke(C_COAST_LINE[0], C_COAST_LINE[1], C_COAST_LINE[2]);
  strokeWeight(1.2);
  beginShape();
  for (const pt of coastPoints) {
    const p = project(pt[0], pt[1]);
    vertex(p.x, p.y);
  }
  endShape();
  noStroke();
}

// ---- Strategy overlays ----

function drawAnacondaBlockade() {
  // Dotted blue arrows pointing inward along the coast
  drawingContext.setLineDash([5, 4]);
  stroke(20, 80, 180, 200);
  strokeWeight(1.6);
  noFill();
  // Trace coast as a dashed line
  beginShape();
  for (const pt of coastPoints) {
    const p = project(pt[0], pt[1]);
    vertex(p.x, p.y);
  }
  endShape();
  drawingContext.setLineDash([]);

  // Inward arrows from offshore points
  const arrowFromTo = [
    [[-74.5, 36.0], [-76.0, 36.55]],   // toward NC
    [[-78.5, 32.5], [-79.5, 32.8]],    // toward Charleston
    [[-80.5, 30.5], [-81.5, 30.7]],    // toward GA/FL
    [[-83.0, 27.5], [-82.85, 28.5]],   // toward FL gulf
    [[-87.5, 28.5], [-88.0, 30.0]],    // toward AL/MS
    [[-90.0, 28.5], [-90.0, 29.5]]     // toward LA mouth
  ];
  for (const seg of arrowFromTo) {
    drawArrow(seg[0][0], seg[0][1], seg[1][0], seg[1][1],
              [20, 80, 180], 2, 8);
  }

  // Label
  noStroke();
  fill(20, 80, 180);
  textStyle(BOLD);
  textSize(11);
  textAlign(LEFT, TOP);
  const lp = project(-79.0, 30.0);
  text('Union Naval Blockade', lp.x, lp.y);
  textStyle(NORMAL);
}

function drawMississippiCampaign() {
  // Big blue arrow pushing south along the river
  const arrows = [
    [[-89.50, 36.40], [-90.30, 35.20]],   // Cairo -> Memphis
    [[-90.30, 35.10], [-91.20, 32.50]],   // Memphis -> Vicksburg
    [[-91.25, 32.20], [-90.30, 30.10]]    // Vicksburg -> mouth
  ];
  for (const seg of arrows) {
    drawArrow(seg[0][0], seg[0][1], seg[1][0], seg[1][1],
              [30, 100, 200], 4, 12);
  }
  // Label
  noStroke();
  fill(30, 100, 200);
  textStyle(BOLD);
  textSize(11);
  textAlign(LEFT, TOP);
  const lp = project(-94.0, 33.5);
  text('Mississippi Campaign', lp.x, lp.y);
  textStyle(NORMAL);
}

function drawEasternTheater() {
  // Lee's invasion attempts north (red arrows toward MD/PA)
  const arrows = [
    [[-77.50, 38.30], [-77.74, 39.47]],   // toward Antietam
    [[-77.50, 38.30], [-77.23, 39.83]]    // toward Gettysburg
  ];
  for (const seg of arrows) {
    drawArrow(seg[0][0], seg[0][1], seg[1][0], seg[1][1],
              [180, 50, 50], 3, 10);
  }
  // Counter Union arrow south (Petersburg/Appomattox)
  drawArrow(-77.30, 38.85, -77.40, 37.40, [30, 80, 160], 3, 10);
  drawArrow(-77.40, 37.40, -78.85, 37.38, [30, 80, 160], 3, 10);

  noStroke();
  fill(180, 50, 50);
  textStyle(BOLD);
  textSize(11);
  textAlign(LEFT, TOP);
  const lp = project(-76.0, 39.55);
  text('Lee\'s Invasions North', lp.x, lp.y);
  textStyle(NORMAL);
}

function drawWesternTheater() {
  // Grant moves south through TN
  const arrows = [
    [[-88.50, 37.20], [-88.34, 35.14]],   // toward Shiloh
    [[-88.34, 35.14], [-90.88, 32.35]]    // Shiloh toward Vicksburg
  ];
  for (const seg of arrows) {
    drawArrow(seg[0][0], seg[0][1], seg[1][0], seg[1][1],
              [40, 110, 80], 3, 10);
  }
  noStroke();
  fill(40, 110, 80);
  textStyle(BOLD);
  textSize(11);
  textAlign(LEFT, TOP);
  const lp = project(-89.5, 37.5);
  text('Grant\'s Western Campaign', lp.x, lp.y);
  textStyle(NORMAL);
}

function drawShermansMarch() {
  // Sherman: Atlanta -> Savannah -> Columbia
  const arrows = [
    [[-84.39, 33.75], [-81.09, 32.08]],   // Atlanta -> Savannah
    [[-81.09, 32.08], [-81.04, 34.00]]    // Savannah -> Columbia
  ];
  for (const seg of arrows) {
    drawArrow(seg[0][0], seg[0][1], seg[1][0], seg[1][1],
              [200, 130, 30], 3, 10);
  }
  noStroke();
  fill(200, 130, 30);
  textStyle(BOLD);
  textSize(11);
  textAlign(LEFT, TOP);
  const lp = project(-83.5, 32.5);
  text('Sherman\'s March (1864)', lp.x, lp.y);
  textStyle(NORMAL);
}

function drawArrow(lon1, lat1, lon2, lat2, color, weight, headSize) {
  const a = project(lon1, lat1);
  const b = project(lon2, lat2);
  stroke(color[0], color[1], color[2], 220);
  strokeWeight(weight);
  line(a.x, a.y, b.x, b.y);
  // Arrowhead
  const ang = atan2(b.y - a.y, b.x - a.x);
  push();
  translate(b.x, b.y);
  rotate(ang);
  noStroke();
  fill(color[0], color[1], color[2], 220);
  triangle(0, 0, -headSize, -headSize * 0.55, -headSize, headSize * 0.55);
  pop();
  noStroke();
}

// ---- Battles ----

function battleColor(b) {
  if (b.victor === 'union')       return C_GOLD;
  if (b.victor === 'confederate') return [200, 70, 70];
  return [240, 240, 240];
}

function drawBattle(b) {
  const p = project(b.lon + (b.lonOffset || 0), b.lat + (b.latOffset || 0));
  const c = battleColor(b);
  const r = 9;

  // Hover detection
  const d = dist(mouseX, mouseY, p.x, p.y);
  const isHover = d < r + 4;
  if (isHover) hoveredBattle = b;
  const isSelected = selectedBattle && selectedBattle.id === b.id;

  // 5-point star
  push();
  translate(p.x, p.y);
  stroke(40);
  strokeWeight(isSelected || isHover ? 2 : 1);
  fill(c[0], c[1], c[2]);
  drawStar(0, 0, r * 0.55, r, 5);
  pop();
  noStroke();

  // Label — manually offset crowded eastern theater cluster so labels don't overlap
  const labelOffsets = {
    'gettysburg':       { dx:  -8, dy: -18 },  // up-left
    'antietam':         { dx: -34, dy:  -2 },  // left
    'bullrun1':         { dx: -42, dy:  10 },  // lower-left
    'bullrun2':         { dx:  34, dy:  14 },  // lower-right
    'chancellorsville': { dx:  44, dy:  -2 },  // right
    'petersburg':       { dx:  38, dy:  10 },  // lower-right
    'appomattox':       { dx: -44, dy:   6 },  // left
    'shiloh':           { dx:   0, dy:  14 },
    'vicksburg':        { dx:   0, dy: -14 },
    'atlanta':          { dx:   0, dy:  14 },
    'sumter':           { dx:  18, dy:   0 }
  };
  const off = labelOffsets[b.id] || { dx: 0, dy: -14 };
  fill(20);
  textAlign(off.dx < 0 ? RIGHT : (off.dx > 0 ? LEFT : CENTER),
            off.dy < 0 ? BOTTOM : (off.dy > 0 ? TOP : CENTER));
  textSize(10);
  textStyle(isSelected ? BOLD : NORMAL);
  // light halo behind label for legibility
  push();
  drawingContext.shadowColor = 'rgba(255,255,255,0.85)';
  drawingContext.shadowBlur = 4;
  text(b.name, p.x + off.dx, p.y + off.dy);
  pop();
  textStyle(NORMAL);
}

function drawStar(cx, cy, rInner, rOuter, points) {
  beginShape();
  const step = TWO_PI / (points * 2);
  let a = -HALF_PI;
  for (let i = 0; i < points * 2; i++) {
    const r = (i % 2 === 0) ? rOuter : rInner;
    vertex(cx + cos(a) * r, cy + sin(a) * r);
    a += step;
  }
  endShape(CLOSE);
}

// ---- City labels (small reference cities, not battles) ----
function drawCityLabels() {
  const cities = [
    { name: 'Washington, D.C.', lon: -77.04, lat: 38.91 },
    { name: 'Richmond',         lon: -77.46, lat: 37.54 },
    { name: 'New Orleans',      lon: -90.07, lat: 29.95 },
    { name: 'Memphis',          lon: -90.05, lat: 35.15 },
    { name: 'Savannah',         lon: -81.09, lat: 32.08 }
  ];
  noStroke();
  fill(80);
  textSize(9);
  textStyle(ITALIC);
  textAlign(LEFT, CENTER);
  for (const c of cities) {
    const p = project(c.lon, c.lat);
    fill(60);
    ellipse(p.x, p.y, 3, 3);
    fill(80);
    text(c.name, p.x + 4, p.y - 4);
  }
  textStyle(NORMAL);
}

// ---- Side panel: legend ----

function drawLegend() {
  const x = panelLeft;
  const y = mapTop;
  const w = panelRight - panelLeft;
  const h = mapBottom - mapTop;

  noStroke();
  fill(252);
  stroke(220);
  strokeWeight(1);
  rect(x, y, w, h, 8);
  noStroke();

  fill(40);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(12);
  text('Legend', x + 10, y + 10);
  textStyle(NORMAL);

  // Land swatches
  const swatchX = x + 12;
  let yy = y + 32;
  drawSwatch(swatchX, yy, C_UNION,       'Union states');         yy += 18;
  drawSwatch(swatchX, yy, C_BORDER,      'Border states');        yy += 18;
  drawSwatch(swatchX, yy, C_CONFEDERATE, 'Confederate states');   yy += 22;

  // Battle outcome stars
  fill(40);
  textStyle(BOLD);
  textSize(11);
  text('Battle outcome', x + 10, yy); yy += 16;
  textStyle(NORMAL);
  drawStarSwatch(swatchX + 4, yy, C_GOLD,        'Union victory');      yy += 16;
  drawStarSwatch(swatchX + 4, yy, [200,70,70],   'Confederate victory'); yy += 22;

  // Overlays explained
  fill(40);
  textStyle(BOLD);
  textSize(11);
  text('Overlays', x + 10, yy); yy += 16;
  textStyle(NORMAL);
  textSize(10);
  fill(20, 80, 180);  text('• Anaconda blockade', x + 12, yy); yy += 13;
  fill(30, 100, 200); text('• Mississippi push',  x + 12, yy); yy += 13;
  fill(180, 50, 50);  text('• Lee invasions N.',  x + 12, yy); yy += 13;
  fill(40, 110, 80);  text('• Grant in the West', x + 12, yy); yy += 13;
  fill(200, 130, 30); text('• Sherman\'s March',  x + 12, yy); yy += 18;

  fill(70);
  textSize(10);
  textStyle(ITALIC);
  text('Drag year slider to reveal battles in chronological order. Click any star for details.',
       x + 10, yy, w - 20);
  textStyle(NORMAL);
}

function drawSwatch(x, y, color, label) {
  noStroke();
  fill(color[0], color[1], color[2]);
  stroke(170);
  strokeWeight(0.8);
  rect(x, y, 18, 12, 2);
  noStroke();
  fill(40);
  textAlign(LEFT, CENTER);
  textSize(11);
  text(label, x + 24, y + 6);
}

function drawStarSwatch(x, y, color, label) {
  push();
  translate(x + 8, y + 6);
  stroke(40);
  strokeWeight(1);
  fill(color[0], color[1], color[2]);
  drawStar(0, 0, 3.5, 7, 5);
  pop();
  noStroke();
  fill(40);
  textAlign(LEFT, CENTER);
  textSize(11);
  text(label, x + 22, y + 6);
}

// ---- Side panel: detail ----

function drawDetailPanel(b) {
  const x = panelLeft;
  const y = mapTop;
  const w = panelRight - panelLeft;
  const h = mapBottom - mapTop;
  const c = battleColor(b);

  noStroke();
  fill(255);
  stroke(c[0], c[1], c[2]);
  strokeWeight(2);
  rect(x, y, w, h, 8);
  noStroke();

  // Title
  fill(c[0] * 0.7, c[1] * 0.7, c[2] * 0.7);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(13);
  text(b.name, x + 10, y + 10, w - 20);

  // Date
  fill(60);
  textStyle(NORMAL);
  textSize(10.5);
  text(b.dateStr, x + 10, y + 30, w - 20);

  // Victor banner
  let victorTxt, vCol;
  if (b.victor === 'union')       { victorTxt = 'Union victory';       vCol = C_UNION_DARK; }
  else if (b.victor === 'confederate') { victorTxt = 'Confederate victory'; vCol = C_CONF_DARK; }
  else                             { victorTxt = 'Inconclusive';       vCol = [110, 110, 110]; }
  fill(vCol[0], vCol[1], vCol[2]);
  textStyle(BOLD);
  textSize(11);
  text(victorTxt, x + 10, y + 46);
  textStyle(NORMAL);

  let yy = y + 64;
  yy = drawDetailField(x + 10, yy, w - 20, 'Union casualties:', b.casualtiesUnion);
  yy = drawDetailField(x + 10, yy, w - 20, 'Confederate casualties:', b.casualtiesConf);
  yy = drawDetailField(x + 10, yy, w - 20, 'Significance:', b.significance);
  yy = drawDetailField(x + 10, yy, w - 20, 'Connection:', b.connection);

  // Close hint
  fill(120);
  textStyle(ITALIC);
  textSize(9.5);
  textAlign(LEFT, BOTTOM);
  text('Click again or press Reset to close.', x + 10, y + h - 8, w - 20);
  textStyle(NORMAL);
}

function drawDetailField(x, y, w, label, body) {
  noStroke();
  fill(60);
  textStyle(BOLD);
  textSize(10.5);
  textAlign(LEFT, TOP);
  text(label, x, y);
  textStyle(NORMAL);
  fill(35);
  textSize(10.5);
  // approximate wrap height
  const lines = wrapLineCount(body, w);
  text(body, x, y + 13, w, lines * 13 + 6);
  return y + 16 + lines * 13;
}

function wrapLineCount(str, w) {
  textSize(10.5);
  const words = str.split(' ');
  let line = '';
  let lines = 1;
  for (const word of words) {
    const test = line + word + ' ';
    if (textWidth(test) > w) { lines++; line = word + ' '; }
    else { line = test; }
  }
  return lines;
}

// ---- Hover tooltip ----

function drawHoverTooltip(b) {
  const p = project(b.lon + (b.lonOffset || 0), b.lat + (b.latOffset || 0));
  const txt = b.year + ' — ' + b.name;
  textSize(11);
  const tw = textWidth(txt) + 14;
  const th = 22;
  let tx = p.x + 10;
  let ty = p.y - th - 6;
  if (tx + tw > mapRight - 4) tx = p.x - tw - 10;
  if (ty < mapTop + 2) ty = p.y + 14;
  noStroke();
  fill(30, 40, 60, 235);
  rect(tx, ty, tw, th, 5);
  fill(255);
  textAlign(LEFT, CENTER);
  text(txt, tx + 7, ty + th / 2);
}

// ---- Interaction ----

function mousePressed() {
  // Ignore clicks outside the draw region
  if (mouseY > drawHeight) return;

  for (const b of battles) {
    if (b.year > yearSlider.value()) continue;
    const p = project(b.lon + (b.lonOffset || 0), b.lat + (b.latOffset || 0));
    if (dist(mouseX, mouseY, p.x, p.y) < 12) {
      if (selectedBattle && selectedBattle.id === b.id) selectedBattle = null;
      else selectedBattle = b;
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  recomputeMapBounds();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}
