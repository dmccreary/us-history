// Transportation Revolution Connections Map
// CANVAS_HEIGHT: 700
// Chapter 7: Manifest Destiny and Antebellum Reform (1828-1848)
// Bloom Level: Analyze (L4) - Examine how transportation networks shaped economic geography
//
// Layout: drawHeight (620) + controlHeight (80) = 700
// Eastern US + Midwest map with rivers, canals, roads, and railroads.
// Time slider 1800 / 1820 / 1840 / 1860 progressively reveals layers.
// Click any route or city for a detail panel with date, endpoints, and impact.

let canvasWidth = 900;
let drawHeight = 620;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 12;

// Geographic projection bounds (lon, lat) onto canvas
// Covers roughly the eastern/midwestern US: Mississippi to Atlantic, Gulf to Great Lakes
const LON_MIN = -95.0;
const LON_MAX = -68.5;
const LAT_MIN = 28.0;
const LAT_MAX = 46.0;

// Map drawing area (inside drawHeight)
let mapTop = 50;
let mapBottom = 600;
let mapLeft = 12;
let mapRight = 700;          // right side reserved for legend / detail panel
let panelLeft = 712;         // detail / legend panel
let panelRight = 888;

// Controls
let yearSlider;
let resetBtn;

let selectedRoute = null;
let hoveredRoute = null;

// Colors
const C_LAND        = [240, 234, 214];   // pale tan land
const C_OCEAN       = [220, 233, 240];   // pale blue water
const C_RIVER       = [40, 80, 150];     // dark blue rivers
const C_CANAL       = [90, 170, 210];    // canal blue
const C_ROAD        = [180, 140, 80];    // tan road
const C_RAIL        = [200, 50, 50];     // red railroad
const C_RAIL_DARK   = [150, 30, 30];
const C_COAST_LINE  = [80, 110, 150];
const C_CITY_GOLD   = [230, 175, 35];
const C_CITY_OUTLINE= [120, 90, 20];

// ---- Coastline polygon for the land (eastern US + Midwest) ----
// We draw land as one polygon: clockwise from northern Maine, down the
// Atlantic coast, around Florida, along the Gulf, then up the Mississippi /
// western limit to the Great Lakes, then back east along the lakes to Maine.
const landPolygon = [
  // Northern Maine / NB border
  [-67.80, 45.70], [-69.05, 47.30], [-69.20, 46.60],
  // Maine coast south
  [-70.30, 43.65], [-70.70, 41.95],
  // Cape Cod / MA / RI
  [-70.00, 41.95], [-69.95, 41.65], [-70.70, 41.55],
  [-71.25, 41.30], [-71.85, 41.30], [-72.90, 41.20],
  // Long Island Sound / NYC
  [-73.20, 41.05], [-73.50, 40.95], [-74.05, 40.55],
  // NJ shore
  [-74.00, 39.80], [-74.40, 39.30], [-75.05, 38.85],
  // Delaware / Chesapeake mouth
  [-75.05, 38.45], [-75.45, 38.00], [-75.90, 37.20],
  // Virginia coast / NC OBX
  [-76.05, 36.95], [-75.50, 35.85], [-75.50, 35.20],
  // NC coast
  [-76.50, 34.70], [-77.95, 34.05], [-78.95, 33.85],
  // SC / GA coast
  [-79.55, 32.80], [-80.85, 32.05], [-81.10, 31.30],
  // GA / FL line
  [-81.50, 30.70], [-81.30, 29.85],
  // FL east coast / Keys
  [-80.10, 27.20], [-80.10, 25.80], [-80.30, 25.20],
  [-81.10, 25.20], [-82.10, 26.50], [-82.85, 28.10],
  // FL gulf
  [-83.70, 29.70], [-85.00, 29.70], [-86.40, 30.30],
  // panhandle / AL / MS
  [-87.50, 30.40], [-88.40, 30.20], [-89.30, 30.10],
  // LA gulf
  [-89.20, 29.10], [-89.90, 29.10], [-91.50, 29.10],
  [-93.85, 29.70],
  // TX east (cut off)
  [-94.50, 29.70], [-94.50, 33.00],
  // up the Mississippi-side western limit (cut off TX)
  [-94.50, 36.50], [-94.60, 39.00], [-94.90, 40.50],
  [-94.90, 43.50],
  // Great Lakes / northern boundary - Minnesota into Lake Superior
  [-92.10, 46.80], [-89.50, 46.80],
  // Lake Superior south shore
  [-88.00, 46.50], [-86.50, 46.50], [-85.00, 46.00],
  // Mackinac / Lake Michigan / Lake Huron simplified
  [-84.00, 45.85], [-83.00, 45.85],
  // Lake Huron east / Lake Erie north
  [-82.50, 43.00], [-83.50, 42.30],
  // Lake Erie south (we keep US side)
  [-83.20, 41.70], [-81.70, 41.50], [-80.50, 42.00],
  [-79.00, 42.50],
  // Lake Ontario / NY north (simplified)
  [-79.05, 43.30], [-76.50, 44.10], [-74.50, 45.00],
  // Northern NY / VT / NH back to Maine
  [-73.30, 45.00], [-71.40, 45.30], [-69.50, 45.70],
  [-67.80, 45.70]
];

// ---- Rivers (drawn before roads / canals / rails) ----
const rivers = {
  mississippi: {
    name: 'Mississippi River',
    points: [
      [-90.07, 29.95],  // New Orleans
      [-91.20, 30.45],
      [-91.30, 32.30],  // Vicksburg
      [-90.85, 33.50],
      [-90.20, 34.75],
      [-90.05, 35.15],  // Memphis
      [-89.65, 36.50],  // Cairo, IL
      [-90.20, 38.65],  // St. Louis
      [-90.50, 40.00],
      [-91.50, 41.50],
      [-91.20, 43.50],
      [-92.10, 45.50]
    ],
    completion: 'Natural waterway',
    connects: 'Gulf of Mexico to the upper Midwest',
    impact: 'The primary southward shipping route for Western farm produce before railroads; steamboats (post-1811) cut upriver travel times dramatically.'
  },
  ohio: {
    name: 'Ohio River',
    points: [
      [-80.00, 40.45],  // Pittsburgh
      [-81.50, 40.00],
      [-83.00, 39.10],
      [-84.51, 39.10],  // Cincinnati
      [-85.75, 38.25],  // Louisville
      [-87.00, 37.90],
      [-88.40, 37.30],
      [-89.10, 37.05],
      [-89.65, 36.50]   // Cairo, IL (joins Mississippi)
    ],
    completion: 'Natural waterway',
    connects: 'Pittsburgh to the Mississippi at Cairo, IL',
    impact: 'The main westward corridor for settlers and produce from the East to the interior; flatboats and steamboats moved grain, pork, and people.'
  },
  hudson: {
    name: 'Hudson River',
    points: [
      [-74.02, 40.70],  // NYC
      [-73.95, 41.20],
      [-73.78, 41.70],
      [-73.78, 42.65]   // Albany
    ],
    completion: 'Natural waterway',
    connects: 'New York City to Albany',
    impact: 'Tidal and navigable to Albany, making NYC the natural Atlantic outlet for any interior route that could reach the Hudson - the key to the Erie Canal\'s value.'
  },
  missouri: {
    name: 'Missouri River',
    points: [
      [-90.20, 38.65],  // joins Mississippi at St. Louis
      [-91.50, 38.85],
      [-92.50, 38.90],
      [-94.60, 39.10],  // Kansas City area
      [-94.90, 40.80]
    ],
    completion: 'Natural waterway',
    connects: 'St. Louis to the Great Plains',
    impact: 'The main route west from St. Louis; carried fur, then settlers, and later anchored steamboat trade to the Plains.'
  }
};

// ---- Roads / turnpikes (1820 layer) ----
const roads = {
  nationalRoad: {
    name: 'National Road (Cumberland Road)',
    points: [
      [-78.77, 39.65],  // Cumberland, MD
      [-79.50, 39.75],
      [-80.72, 40.07],  // Wheeling, VA (now WV)
      [-81.50, 40.00],
      [-82.98, 39.96],  // Columbus, OH
      [-85.00, 39.80],
      [-86.16, 39.77],  // Indianapolis
      [-87.50, 39.50],
      [-89.10, 38.96]   // Vandalia, IL (1839 terminus)
    ],
    completion: 'Built 1811-1839',
    connects: 'Cumberland, MD to Vandalia, IL (via Wheeling, Columbus, Indianapolis)',
    impact: 'The first federally funded interstate highway; cut overland freight costs and opened the Old Northwest to settlement and trade.'
  },
  lancasterTurnpike: {
    name: 'Lancaster Turnpike',
    points: [
      [-75.16, 39.95],  // Philadelphia
      [-75.70, 40.05],
      [-76.30, 40.04]   // Lancaster, PA
    ],
    completion: 'Completed 1795',
    connects: 'Philadelphia to Lancaster, PA',
    impact: 'The first major chartered toll road in the U.S.; its success sparked the turnpike boom of 1800-1830 across the Northeast.'
  }
};

// ---- Erie Canal (1825 layer) ----
const canals = {
  erieCanal: {
    name: 'Erie Canal',
    points: [
      [-78.88, 42.89],  // Buffalo
      [-77.61, 43.16],  // Rochester
      [-76.15, 43.05],  // Syracuse
      [-75.20, 43.10],
      [-74.20, 43.00],
      [-73.78, 42.65]   // Albany (joins Hudson)
    ],
    completion: 'Completed 1825',
    connects: 'Buffalo (Lake Erie) to Albany (Hudson River, then on to NYC)',
    impact: 'Shipping a ton of flour from Buffalo to NYC dropped from about $100 (1817) to about $10 (1830); travel time fell from roughly 3 weeks to about 10 days. Made NYC the nation\'s leading port and opened the Great Lakes economy to the Atlantic.'
  }
};

// ---- Railroads (1840 layer = early; 1860 layer = dense) ----
const railroads1840 = {
  bostonLowell: {
    name: 'Boston & Lowell Railroad',
    points: [
      [-71.06, 42.36],  // Boston
      [-71.32, 42.65]   // Lowell, MA
    ],
    completion: 'Opened 1835',
    connects: 'Boston to the Lowell textile mills',
    impact: 'One of the first U.S. common-carrier rails; carried mill workers, raw cotton, and finished cloth between port and factory.'
  },
  camdenAmboy: {
    name: 'Camden & Amboy Railroad',
    points: [
      [-75.12, 39.94],  // Camden, NJ (across from Philadelphia)
      [-74.76, 40.22],  // Trenton
      [-74.28, 40.50]   // South Amboy, NJ (toward NYC)
    ],
    completion: 'Completed 1834',
    connects: 'Camden (Philadelphia) to South Amboy (New York Harbor)',
    impact: 'Created the first practical fast rail link between the nation\'s two largest cities, cutting Philadelphia-NYC travel to under a day.'
  },
  baltimoreOhio: {
    name: 'Baltimore & Ohio Railroad',
    points: [
      [-76.61, 39.29],  // Baltimore
      [-77.20, 39.40],
      [-77.74, 39.47],  // Harpers Ferry area
      [-78.16, 39.55],
      [-78.77, 39.65]   // Cumberland, MD
    ],
    completion: 'Reached Cumberland 1842',
    connects: 'Baltimore to Cumberland, MD (extended to Wheeling by 1853)',
    impact: 'The first major U.S. common-carrier railroad chartered (1827); pulled western trade away from the Erie Canal and toward Baltimore.'
  },
  earlyPa: {
    name: 'Philadelphia & Reading Railroad',
    points: [
      [-75.16, 39.95],  // Philadelphia
      [-75.50, 40.15],
      [-75.93, 40.34]   // Reading, PA
    ],
    completion: 'Completed 1842',
    connects: 'Philadelphia to the anthracite coalfields at Reading, PA',
    impact: 'Made cheap Pennsylvania anthracite available in coastal cities, fueling iron furnaces and steam power.'
  },
  earlyNy: {
    name: 'Mohawk & Hudson Railroad',
    points: [
      [-73.78, 42.65],  // Albany
      [-73.94, 42.81]   // Schenectady
    ],
    completion: 'Opened 1831',
    connects: 'Albany to Schenectady',
    impact: 'New York\'s first railroad; bypassed slow canal locks on the Erie\'s eastern end and previewed the rail consolidation that became the New York Central.'
  }
};

const railroads1860 = {
  nyCentral: {
    name: 'New York Central Railroad',
    points: [
      [-73.99, 40.75],  // NYC
      [-73.78, 42.65],  // Albany
      [-75.20, 43.10],
      [-76.15, 43.05],  // Syracuse
      [-77.61, 43.16],  // Rochester
      [-78.88, 42.89]   // Buffalo
    ],
    completion: 'Consolidated 1853',
    connects: 'New York City - Albany - Buffalo (paralleling the Erie Canal)',
    impact: 'Cornelius Vanderbilt-era merger of ten short lines into one trunk; year-round, all-weather competitor to the Erie Canal.'
  },
  pennsylvaniaRR: {
    name: 'Pennsylvania Railroad',
    points: [
      [-75.16, 39.95],  // Philadelphia
      [-76.30, 40.04],  // Lancaster
      [-76.88, 40.27],  // Harrisburg
      [-78.40, 40.50],  // Altoona
      [-79.00, 40.45],
      [-79.99, 40.44]   // Pittsburgh
    ],
    completion: 'Through service 1854',
    connects: 'Philadelphia to Pittsburgh (and on to the Ohio River)',
    impact: 'Crossed the Alleghenies and gave Philadelphia a direct trunk line to the Ohio Valley; soon the largest U.S. corporation.'
  },
  erieRR: {
    name: 'Erie Railroad',
    points: [
      [-74.07, 40.74],  // Jersey City / NYC area
      [-74.75, 41.20],
      [-75.65, 41.40],
      [-77.05, 41.75],
      [-78.42, 42.00],
      [-78.88, 42.20],
      [-79.05, 42.45]   // Dunkirk, NY (Lake Erie)
    ],
    completion: 'Completed 1851',
    connects: 'Piermont, NY (Hudson River, near NYC) to Dunkirk on Lake Erie',
    impact: 'Gave NYC a second all-rail route to the Lakes; opened the southern tier of New York to commerce.'
  },
  baltimoreOhioWest: {
    name: 'B&O extension to the Ohio',
    points: [
      [-78.77, 39.65],  // Cumberland
      [-79.50, 39.70],
      [-80.72, 40.07]   // Wheeling, VA (now WV)
    ],
    completion: 'Reached Wheeling 1853',
    connects: 'Cumberland to Wheeling on the Ohio River',
    impact: 'Completed the B&O\'s through line from tidewater to the Ohio, joining Baltimore directly to the western river system.'
  },
  trunkChicago: {
    name: 'Lake Shore line to Chicago',
    points: [
      [-78.88, 42.89],  // Buffalo
      [-80.00, 42.10],
      [-81.70, 41.50],  // Cleveland
      [-83.00, 41.65],  // Toledo
      [-85.65, 41.70],
      [-87.65, 41.85]   // Chicago
    ],
    completion: 'Through trains 1852-1858',
    connects: 'Buffalo - Cleveland - Toledo - Chicago (south shore of Lake Erie)',
    impact: 'Linked the New York trunk lines to the booming Midwest; Chicago became the rail hub of the West.'
  },
  trunkCincinnati: {
    name: 'Little Miami / CH&D line',
    points: [
      [-82.98, 39.96],  // Columbus, OH
      [-83.80, 39.75],
      [-84.20, 39.50],
      [-84.51, 39.10]   // Cincinnati
    ],
    completion: 'Through service by mid-1850s',
    connects: 'Columbus to Cincinnati (extending eastern trunk lines to the Ohio)',
    impact: 'Tied Cincinnati - "Porkopolis" - directly into the eastern rail network for meatpacking shipments.'
  },
  trunkStLouis: {
    name: 'Ohio & Mississippi Railroad',
    points: [
      [-84.51, 39.10],  // Cincinnati
      [-86.16, 39.10],
      [-87.50, 38.70],
      [-88.50, 38.62],
      [-90.20, 38.65]   // East St. Louis (Mississippi River)
    ],
    completion: 'Completed 1857',
    connects: 'Cincinnati to East St. Louis (Mississippi River)',
    impact: 'Connected the Ohio River trade to St. Louis by rail; foreshadowed the post-war push to bridge the Mississippi.'
  },
  chicagoIllinoisCentral: {
    name: 'Illinois Central Railroad',
    points: [
      [-87.65, 41.85],  // Chicago
      [-88.50, 41.00],
      [-89.10, 40.20],
      [-89.65, 39.10],
      [-89.10, 38.20],
      [-89.10, 37.05]   // Cairo, IL (Ohio / Mississippi junction)
    ],
    completion: 'Completed 1856',
    connects: 'Chicago to Cairo, IL (700+ miles, then the longest railroad in the world)',
    impact: 'First land-grant railroad; opened Illinois prairie farmland and made Chicago the dominant Midwest rail center.'
  }
};

// ---- Cities (always shown; gold dots) ----
const cities = [
  { name: 'Boston',       lon: -71.06, lat: 42.36, off: { dx: 6,  dy: -6 } },
  { name: 'New York',     lon: -74.02, lat: 40.71, off: { dx: 6,  dy: 4  } },
  { name: 'Philadelphia', lon: -75.16, lat: 39.95, off: { dx: 6,  dy: 4  } },
  { name: 'Baltimore',    lon: -76.61, lat: 39.29, off: { dx: 6,  dy: 6  } },
  { name: 'Charleston',   lon: -79.93, lat: 32.78, off: { dx: 6,  dy: 4  } },
  { name: 'New Orleans',  lon: -90.07, lat: 29.95, off: { dx: 6,  dy: 4  } },
  { name: 'Pittsburgh',   lon: -79.99, lat: 40.44, off: { dx: -6, dy: -8 }, anchor: 'right' },
  { name: 'Buffalo',      lon: -78.88, lat: 42.89, off: { dx: -6, dy: -6 }, anchor: 'right' },
  { name: 'Albany',       lon: -73.78, lat: 42.65, off: { dx: 6,  dy: -8 } },
  { name: 'Cincinnati',   lon: -84.51, lat: 39.10, off: { dx: 6,  dy: 6  } },
  { name: 'Chicago',      lon: -87.65, lat: 41.85, off: { dx: 6,  dy: -8 } },
  { name: 'St. Louis',    lon: -90.20, lat: 38.65, off: { dx: -6, dy: 6  }, anchor: 'right' }
];

// ---- Projection helpers ----
function project(lon, lat) {
  const w = mapRight - mapLeft;
  const h = mapBottom - mapTop;
  const x = mapLeft + ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * w;
  const y = mapTop + (1 - (lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * h;
  return { x, y };
}

// Convenience: route's segment hit-test (return true if mouse is near polyline)
function nearPolyline(mx, my, points, tol) {
  for (let i = 0; i < points.length - 1; i++) {
    const a = project(points[i][0],     points[i][1]);
    const b = project(points[i+1][0],   points[i+1][1]);
    if (distToSegment(mx, my, a.x, a.y, b.x, b.y) < tol) return true;
  }
  return false;
}

function distToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return dist(px, py, ax, ay);
  let t = ((px - ax) * dx + (py - ay) * dy) / len2;
  t = constrain(t, 0, 1);
  return dist(px, py, ax + t * dx, ay + t * dy);
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
  if (mapRight < 480) {
    mapRight = canvasWidth - 12;
    panelLeft = canvasWidth - 188;
  }
}

function setup() {
  updateCanvasSize();
  recomputeMapBounds();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  yearSlider = createSlider(1800, 1860, 1860, 20);

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => {
    yearSlider.value(1860);
    selectedRoute = null;
  });

  positionControls();
  describe('Map of the eastern United States and Midwest showing the build-out of transportation infrastructure from 1800 to 1860: natural rivers, the National Road and turnpikes (1820), the Erie Canal (1825), early Northeast railroads (1840), and the dense Northeast / Midwest rail network of 1860. Drag the year slider to advance layers. Click any route or city for details on completion date, what it connected, and economic impact.', LABEL);
}

function positionControls() {
  const y1 = drawHeight + 18;
  const y2 = drawHeight + 50;

  // Year slider
  yearSlider.position(margin + 80, y1);
  yearSlider.style('width', '260px');

  // Reset button at right of control band
  resetBtn.position(canvasWidth - 80, y1);

  // Tick labels are drawn in draw() at y2 below slider
}

function draw() {
  updateCanvasSize();
  recomputeMapBounds();

  // Background ocean
  noStroke();
  fill(C_OCEAN[0], C_OCEAN[1], C_OCEAN[2]);
  rect(0, 0, canvasWidth, drawHeight);
  // Control area background
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
  text('The Transportation Revolution: Connecting the American Economy (1800-1860)',
       (mapLeft + mapRight) / 2, 6);
  textStyle(NORMAL);
  textSize(11);
  fill(80);
  text('Year: ' + yearSlider.value() + ' - Drag the slider to add canals, roads, and rails. Click any route or city for details.',
       (mapLeft + mapRight) / 2, 28);

  // Land mass
  drawLand();

  // Always-visible: rivers
  drawRivers();

  // Layer rules (uses slider value)
  const year = yearSlider.value();

  // 1820 layer
  if (year >= 1820) {
    drawRouteSet(roads, C_ROAD, 'road', 3.0);
  }
  // 1825 layer: Erie Canal (dashed, light blue) - any year >= 1820 doesn't include it; spec says 1825
  if (year >= 1820 && yearAtLeastFor1825(year)) {
    drawRouteSet(canals, C_CANAL, 'canal', 3.2);
  }
  // 1840 layer: early railroads
  if (year >= 1840) {
    drawRouteSet(railroads1840, C_RAIL, 'rail', 2.6);
  }
  // 1860 layer: dense rail network
  if (year >= 1860) {
    drawRouteSet(railroads1860, C_RAIL_DARK, 'rail', 2.8);
  }

  // Cities (always shown, on top of routes but under labels of selection)
  drawCities();

  // Side panel: legend or detail
  if (selectedRoute) drawDetailPanel(selectedRoute);
  else drawLegend();

  // Hover tooltip on top
  if (hoveredRoute && (!selectedRoute || hoveredRoute.id !== selectedRoute.id)) {
    drawHoverTooltip(hoveredRoute);
  }

  // Control labels and tick marks for the slider
  drawSliderLabels();

  positionControls();
}

// Erie Canal is conventionally dated 1825. With a slider stepping
// 1800/1820/1840/1860 the value at 1820 is just before completion - we show
// the canal starting at 1820 (so students see it appear with the National
// Road era) but the detail panel reads "Completed 1825". This is the cleanest
// fit for the four-stop slider.
function yearAtLeastFor1825(year) {
  return year >= 1820;
}

// ---- Drawing helpers ----

function drawLand() {
  noStroke();
  fill(C_LAND[0], C_LAND[1], C_LAND[2]);
  beginShape();
  for (const pt of landPolygon) {
    const p = project(pt[0], pt[1]);
    vertex(p.x, p.y);
  }
  endShape(CLOSE);

  // Coastline stroke
  stroke(C_COAST_LINE[0], C_COAST_LINE[1], C_COAST_LINE[2]);
  strokeWeight(1);
  noFill();
  beginShape();
  for (const pt of landPolygon) {
    const p = project(pt[0], pt[1]);
    vertex(p.x, p.y);
  }
  endShape(CLOSE);
  noStroke();
}

function drawRivers() {
  // Reset hover for routes (we recompute below for visible layers)
  // hoveredRoute is cleared at the top of route drawing below
  drawRouteSet(rivers, C_RIVER, 'river', 2.4);

  // River labels
  noStroke();
  fill(C_RIVER[0], C_RIVER[1], C_RIVER[2]);
  textStyle(ITALIC);
  textSize(10);
  textAlign(LEFT, CENTER);
  const lblMiss = project(-91.1, 34.2);
  text('Mississippi R.', lblMiss.x - 70, lblMiss.y);
  const lblOhio = project(-83.5, 38.7);
  text('Ohio R.', lblOhio.x - 10, lblOhio.y + 10);
  const lblHud = project(-73.85, 41.85);
  text('Hudson R.', lblHud.x + 6, lblHud.y);
  const lblMo = project(-93.0, 39.0);
  text('Missouri R.', lblMo.x - 4, lblMo.y - 8);
  textStyle(NORMAL);
}

function drawRouteSet(routeMap, color, kind, weight) {
  // Pre-pass: hover detection for these routes
  for (const id in routeMap) {
    const r = routeMap[id];
    const isHover = nearPolyline(mouseX, mouseY, r.points, 7);
    if (isHover && mouseY < drawHeight) {
      hoveredRoute = { id: id, name: r.name, completion: r.completion,
                       connects: r.connects, impact: r.impact, kind: kind };
    }
  }

  // Draw each route
  for (const id in routeMap) {
    const r = routeMap[id];
    const isSelected = selectedRoute && selectedRoute.id === id;
    const isHover = hoveredRoute && hoveredRoute.id === id;

    noFill();
    if (kind === 'canal') {
      // Dashed
      drawingContext.setLineDash([8, 5]);
    } else {
      drawingContext.setLineDash([]);
    }
    stroke(color[0], color[1], color[2], isSelected ? 255 : 220);
    strokeWeight(isSelected ? weight + 1.5 : (isHover ? weight + 1.0 : weight));
    beginShape();
    for (const pt of r.points) {
      const p = project(pt[0], pt[1]);
      vertex(p.x, p.y);
    }
    endShape();
    drawingContext.setLineDash([]);
  }
  noStroke();
}

function drawCities() {
  const year = yearSlider.value();
  noStroke();
  textStyle(BOLD);
  textSize(10);
  for (const c of cities) {
    const p = project(c.lon, c.lat);
    // Hover detection
    const d = dist(mouseX, mouseY, p.x, p.y);
    const isHover = d < 7 && mouseY < drawHeight;
    if (isHover) {
      hoveredRoute = {
        id: 'city-' + c.name,
        name: c.name,
        completion: 'Established before 1800',
        connects: '',
        impact: cityImpact(c.name, year),
        kind: 'city'
      };
    }
    // Gold dot with dark outline
    stroke(C_CITY_OUTLINE[0], C_CITY_OUTLINE[1], C_CITY_OUTLINE[2]);
    strokeWeight(1);
    fill(C_CITY_GOLD[0], C_CITY_GOLD[1], C_CITY_GOLD[2]);
    ellipse(p.x, p.y, 8, 8);
    noStroke();

    // Label
    fill(30);
    textAlign(c.anchor === 'right' ? RIGHT : LEFT, CENTER);
    // White halo for legibility
    push();
    drawingContext.shadowColor = 'rgba(255,255,255,0.85)';
    drawingContext.shadowBlur = 4;
    text(c.name, p.x + (c.off ? c.off.dx : 6), p.y + (c.off ? c.off.dy : 0));
    pop();
  }
  textStyle(NORMAL);
}

function cityImpact(name, year) {
  // Short, year-aware blurbs
  switch (name) {
    case 'New York':
      return year >= 1820
        ? 'NYC\'s Hudson + Erie Canal + rail trunk lines made it the nation\'s leading port by the 1830s.'
        : 'Major Atlantic port at the mouth of the Hudson.';
    case 'New Orleans':
      return 'Gulf outlet of the Mississippi system; the great downstream market for Western grain and cotton.';
    case 'Pittsburgh':
      return 'Head of the Ohio River; gateway from East to the western interior, and a rising iron / glass center.';
    case 'Buffalo':
      return 'Lake Erie terminus of the Erie Canal (1825); the funnel for Great Lakes grain heading to NYC.';
    case 'Albany':
      return 'Head of Hudson navigation; eastern end of the Erie Canal and an early rail hub.';
    case 'Baltimore':
      return 'Terminus of the National Road and chartering city of the Baltimore & Ohio Railroad.';
    case 'Philadelphia':
      return 'Anchor of the Pennsylvania Railroad and Lancaster Turnpike; long the nation\'s commercial capital.';
    case 'Boston':
      return 'Northern manufacturing port; tied to mill towns by early lines like the Boston & Lowell.';
    case 'Charleston':
      return 'Major Atlantic cotton port for the Lower South; less integrated into the northern rail network by 1860.';
    case 'Cincinnati':
      return '"Porkopolis" on the Ohio River; meatpacking center linked east by trunk railroads in the 1850s.';
    case 'Chicago':
      return 'By 1860 the rail hub of the Midwest, fed by the Illinois Central and the Lake Shore line from Buffalo.';
    case 'St. Louis':
      return 'Confluence of the Missouri and Mississippi; gateway to the West and end of the Ohio & Mississippi RR.';
    default:
      return '';
  }
}

// ---- Slider tick labels ----
function drawSliderLabels() {
  noStroke();
  fill(50);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(12);
  text('Year', margin + 8, drawHeight + 28);
  text(yearSlider.value(), margin + 350, drawHeight + 28);
  textStyle(NORMAL);

  // Tick labels under the slider
  const sliderX = margin + 80;
  const sliderW = 260;
  const years = [1800, 1820, 1840, 1860];
  textAlign(CENTER, TOP);
  textSize(10);
  fill(70);
  for (let i = 0; i < years.length; i++) {
    const x = sliderX + (i / (years.length - 1)) * sliderW;
    // tick mark
    stroke(120);
    strokeWeight(1);
    line(x, drawHeight + 42, x, drawHeight + 46);
    noStroke();
    fill(70);
    text(years[i], x, drawHeight + 48);
  }

  // What each tick adds
  textAlign(LEFT, TOP);
  textSize(10);
  fill(95);
  textStyle(ITALIC);
  const hintY = drawHeight + 62;
  text('1800: rivers only   |   1820: + National Road and Erie Canal   |   1840: + early NE railroads   |   1860: + trunk rail network',
       margin + 8, hintY);
  textStyle(NORMAL);
}

// ---- Legend panel ----
function drawLegend() {
  const x = panelLeft;
  const y = mapTop;
  const w = panelRight - panelLeft;
  const h = mapBottom - mapTop;

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

  let yy = y + 32;
  drawLineSwatch(x + 12, yy, C_RIVER,   false, 'Rivers');           yy += 18;
  drawLineSwatch(x + 12, yy, C_ROAD,    false, 'Roads / turnpikes');yy += 18;
  drawLineSwatch(x + 12, yy, C_CANAL,   true,  'Canal (dashed)');   yy += 18;
  drawLineSwatch(x + 12, yy, C_RAIL,    false, 'Early railroads');  yy += 18;
  drawLineSwatch(x + 12, yy, C_RAIL_DARK, false, 'Trunk railroads'); yy += 22;

  // City dot
  stroke(C_CITY_OUTLINE[0], C_CITY_OUTLINE[1], C_CITY_OUTLINE[2]);
  strokeWeight(1);
  fill(C_CITY_GOLD[0], C_CITY_GOLD[1], C_CITY_GOLD[2]);
  ellipse(x + 20, yy + 6, 8, 8);
  noStroke();
  fill(40);
  textAlign(LEFT, CENTER);
  textSize(11);
  text('Major city', x + 32, yy + 6);
  yy += 24;

  // Layer key
  fill(40);
  textStyle(BOLD);
  textSize(11);
  textAlign(LEFT, TOP);
  text('What appears by year', x + 10, yy); yy += 16;
  textStyle(NORMAL);
  textSize(10);
  fill(50);
  text('1800: rivers + cities', x + 12, yy);   yy += 13;
  text('1820: + National Road,',  x + 12, yy); yy += 13;
  text('Erie Canal (1825)',       x + 22, yy); yy += 13;
  text('1840: + early NE rails',  x + 12, yy); yy += 13;
  text('1860: + trunk rails',     x + 12, yy); yy += 18;

  fill(70);
  textSize(10);
  textStyle(ITALIC);
  text('Drag the year slider to add layers. Click a route or city for details.',
       x + 10, yy, w - 20);
  textStyle(NORMAL);
}

function drawLineSwatch(x, y, color, dashed, label) {
  if (dashed) drawingContext.setLineDash([6, 4]);
  stroke(color[0], color[1], color[2]);
  strokeWeight(3);
  line(x, y + 6, x + 28, y + 6);
  drawingContext.setLineDash([]);
  noStroke();
  fill(40);
  textAlign(LEFT, CENTER);
  textSize(11);
  text(label, x + 36, y + 6);
}

// ---- Detail panel ----
function drawDetailPanel(r) {
  const x = panelLeft;
  const y = mapTop;
  const w = panelRight - panelLeft;
  const h = mapBottom - mapTop;
  const c = panelAccentColor(r.kind);

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
  text(r.name, x + 10, y + 10, w - 20);
  textStyle(NORMAL);

  let yy = y + 50;
  yy = drawDetailField(x + 10, yy, w - 20, 'Completed:', r.completion);
  if (r.connects && r.connects.length > 0) {
    yy = drawDetailField(x + 10, yy, w - 20, 'Connected:', r.connects);
  }
  yy = drawDetailField(x + 10, yy, w - 20, 'Economic impact:', r.impact);

  fill(120);
  textStyle(ITALIC);
  textSize(9.5);
  textAlign(LEFT, BOTTOM);
  text('Click the route again or press Reset to close.', x + 10, y + h - 8, w - 20);
  textStyle(NORMAL);
}

function panelAccentColor(kind) {
  if (kind === 'river') return C_RIVER;
  if (kind === 'road')  return C_ROAD;
  if (kind === 'canal') return C_CANAL;
  if (kind === 'rail')  return C_RAIL;
  if (kind === 'city')  return C_CITY_OUTLINE;
  return [80, 80, 80];
}

function drawDetailField(x, y, w, label, body) {
  fill(60);
  textStyle(BOLD);
  textSize(10.5);
  textAlign(LEFT, TOP);
  text(label, x, y);
  textStyle(NORMAL);
  fill(35);
  textSize(10.5);
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
function drawHoverTooltip(r) {
  textSize(11);
  const txt = r.name;
  const tw = textWidth(txt) + 14;
  const th = 22;
  let tx = mouseX + 12;
  let ty = mouseY - th - 8;
  if (tx + tw > mapRight - 4) tx = mouseX - tw - 12;
  if (ty < mapTop + 2) ty = mouseY + 14;
  noStroke();
  fill(30, 40, 60, 235);
  rect(tx, ty, tw, th, 5);
  fill(255);
  textAlign(LEFT, CENTER);
  text(txt, tx + 7, ty + th / 2);
}

// ---- Interaction ----
function mousePressed() {
  if (mouseY > drawHeight) return;

  // Cities first (smaller hit target, exact match preferred)
  for (const c of cities) {
    const p = project(c.lon, c.lat);
    if (dist(mouseX, mouseY, p.x, p.y) < 9) {
      const id = 'city-' + c.name;
      if (selectedRoute && selectedRoute.id === id) {
        selectedRoute = null;
      } else {
        selectedRoute = {
          id: id, name: c.name, completion: 'Established before 1800',
          connects: '',
          impact: cityImpact(c.name, yearSlider.value()),
          kind: 'city'
        };
      }
      return;
    }
  }

  // Then routes (most-recent layer first)
  const year = yearSlider.value();
  if (year >= 1860 && hitTestRouteSet(railroads1860, 'rail')) return;
  if (year >= 1840 && hitTestRouteSet(railroads1840, 'rail')) return;
  if (year >= 1820 && hitTestRouteSet(canals,        'canal')) return;
  if (year >= 1820 && hitTestRouteSet(roads,         'road'))  return;
  if (hitTestRouteSet(rivers, 'river')) return;
}

function hitTestRouteSet(routeMap, kind) {
  for (const id in routeMap) {
    const r = routeMap[id];
    if (nearPolyline(mouseX, mouseY, r.points, 8)) {
      if (selectedRoute && selectedRoute.id === id) {
        selectedRoute = null;
      } else {
        selectedRoute = {
          id: id, name: r.name, completion: r.completion,
          connects: r.connects, impact: r.impact, kind: kind
        };
      }
      return true;
    }
  }
  return false;
}

function windowResized() {
  updateCanvasSize();
  recomputeMapBounds();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}
