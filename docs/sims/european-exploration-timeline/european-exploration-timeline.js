// European Exploration Timeline (1450-1620)
// CANVAS_HEIGHT: 500
// Chapter 2: Pre-Columbian Americas and European Contact
// Bloom Level: Remember (L1) — clickable timeline with nation filter

let canvasWidth = 700;
let drawHeight = 440;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 13;

let selectedEvent = null;
let filterNation = 'All';
let allBtn, portBtn, spainBtn, engBtn, franceBtn, nethBtn;

const YEAR_START = 1450;
const YEAR_END = 1625;

const nations = {
  'Portugal': { r:0,   g:120, b:50  },
  'Spain':    { r:200, g:30,  b:30  },
  'England':  { r:100, g:20,  b:20  },
  'France':   { r:30,  g:80,  b:180 },
  'Netherlands':{ r:230,g:120,b:0   }
};

const events = [
  { year:1488, nation:'Portugal', title:'Dias rounds Cape of Good Hope',
    detail:'Bartolomeu Dias became the first European to sail around the southern tip of Africa, proving a sea route to Asia was possible and opening the Age of Exploration.' },
  { year:1492, nation:'Spain', title:'Columbus reaches the Caribbean',
    detail:'Christopher Columbus, funded by Spain, landed in the Bahamas — believing he had reached Asia. This contact began sustained European colonization of the Americas.' },
  { year:1494, nation:'Spain', title:'Treaty of Tordesillas',
    detail:'Spain and Portugal divided the non-European world along a meridian, giving Portugal Africa/Asia and Spain the Americas (except Brazil). Other European powers ignored this treaty.' },
  { year:1497, nation:'England', title:'Cabot explores North America',
    detail:'John Cabot, sponsored by England, reached Newfoundland, establishing England\'s claim to North America — a foundation for later English colonization.' },
  { year:1498, nation:'Portugal', title:'Da Gama reaches India',
    detail:'Vasco da Gama completed the sea route to India, establishing direct Portuguese trade with Asia and breaking the Venetian/Ottoman monopoly on Eastern trade goods.' },
  { year:1513, nation:'Spain', title:'Balboa sees the Pacific',
    detail:'Vasco Núñez de Balboa crossed Panama and became the first European to see the Pacific Ocean from the Americas, dramatically expanding European understanding of world geography.' },
  { year:1519, nation:'Spain', title:'Cortés invades the Aztec Empire',
    detail:'Hernán Cortés landed in Mexico. By 1521, with the help of thousands of Indigenous allies opposed to Aztec rule, he conquered Tenochtitlán, ending the Aztec Empire.' },
  { year:1524, nation:'France', title:'Verrazano explores North America',
    detail:'Giovanni da Verrazano, sailing for France, explored the eastern coast of North America from the Carolinas to Canada, establishing French claims to the continent.' },
  { year:1532, nation:'Spain', title:'Pizarro conquers the Inca Empire',
    detail:'Francisco Pizarro captured Inca Emperor Atahualpa and, despite a ransom of gold and silver, executed him. The Inca Empire collapsed, giving Spain access to vast silver mines.' },
  { year:1534, nation:'France', title:'Cartier explores the St. Lawrence',
    detail:'Jacques Cartier sailed into the St. Lawrence River, claiming what became New France (Canada) for the French Crown and making contact with Iroquois and Huron nations.' },
  { year:1585, nation:'England', title:'First Roanoke Colony',
    detail:'England\'s first attempt to plant a permanent colony in North America, on Roanoke Island (present-day North Carolina). The colony failed — the "Lost Colony" mystery remains.' },
  { year:1607, nation:'England', title:'Jamestown founded',
    detail:'The first permanent English settlement in North America. Nearly half the settlers died the first winter; tobacco cultivation eventually made it profitable and established plantation agriculture.' },
  { year:1609, nation:'Netherlands', title:'Hudson explores New Netherlands',
    detail:'Henry Hudson, sailing for the Dutch East India Company, explored the Hudson River, establishing Dutch claims to what became New Amsterdam (present-day New York City).' }
];

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
}

function yearToX(year) {
  let range = YEAR_END - YEAR_START;
  return margin + 40 + (year - YEAR_START) / range * (canvasWidth - margin*2 - 80);
}

function filteredEvents() {
  if (filterNation === 'All') return events;
  return events.filter(e => e.nation === filterNation);
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  allBtn   = createButton('All');
  portBtn  = createButton('Portugal');
  spainBtn = createButton('Spain');
  engBtn   = createButton('England');
  franceBtn= createButton('France');
  nethBtn  = createButton('Netherlands');

  allBtn.mousePressed(() => { filterNation = 'All'; selectedEvent = null; });
  portBtn.mousePressed(() => { filterNation = 'Portugal'; selectedEvent = null; });
  spainBtn.mousePressed(() => { filterNation = 'Spain'; selectedEvent = null; });
  engBtn.mousePressed(() => { filterNation = 'England'; selectedEvent = null; });
  franceBtn.mousePressed(() => { filterNation = 'France'; selectedEvent = null; });
  nethBtn.mousePressed(() => { filterNation = 'Netherlands'; selectedEvent = null; });

  positionControls();
  describe('Interactive timeline of European exploration from 1450 to 1620. Click events to read details. Filter by nation using the buttons.', LABEL);
}

function positionControls() {
  let y = drawHeight + 12;
  allBtn.position(10, y);
  portBtn.position(55, y);
  spainBtn.position(140, y);
  engBtn.position(215, y);
  franceBtn.position(285, y);
  nethBtn.position(355, y);
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
  textSize(16);
  text('European Exploration Timeline  (1450 – 1620)', canvasWidth/2, 8);
  textStyle(NORMAL);

  // Nation legend
  let lx = margin;
  for (let [name, col] of Object.entries(nations)) {
    fill(col.r, col.g, col.b);
    noStroke();
    rect(lx, 30, 12, 12, 2);
    fill(60);
    textSize(11);
    textAlign(LEFT, CENTER);
    text(name, lx + 15, 36);
    lx += textWidth(name) + 26;
  }

  // Timeline axis
  let axisY = drawHeight * 0.48;
  stroke(100);
  strokeWeight(2);
  line(margin + 40, axisY, canvasWidth - margin - 40, axisY);

  // Year ticks
  for (let y = 1450; y <= 1625; y += 25) {
    let x = yearToX(y);
    stroke(120);
    strokeWeight(1);
    line(x, axisY - 5, x, axisY + 5);
    noStroke();
    fill(80);
    textAlign(CENTER, TOP);
    textSize(11);
    text(y, x, axisY + 7);
  }

  // Draw events
  let fe = filteredEvents();
  for (let i = 0; i < fe.length; i++) {
    let ev = fe[i];
    let col = nations[ev.nation];
    let x = yearToX(ev.year);
    let above = i % 2 === 0;
    let markerY = axisY + (above ? -18 : 18);
    let labelY = above ? markerY - 60 : markerY + 10;
    let isSelected = selectedEvent && selectedEvent.year === ev.year;
    let isHovered = !selectedEvent && mouseX > x-40 && mouseX < x+40 &&
                    mouseY > Math.min(labelY, axisY-10) && mouseY < Math.max(labelY+50, axisY+30);

    // Stem line
    stroke(col.r, col.g, col.b, 180);
    strokeWeight(1.5);
    line(x, axisY + (above ? -6 : 6), x, markerY + (above ? 0 : 0));

    // Marker circle
    fill(col.r, col.g, col.b, isSelected || isHovered ? 255 : 180);
    stroke('white');
    strokeWeight(1.5);
    circle(x, markerY, isSelected ? 18 : 14);

    // Year label on marker
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(9);
    text(ev.year, x, markerY);
    textStyle(NORMAL);

    // Event title label (short)
    let shortTitle = ev.title.length > 22 ? ev.title.substring(0, 20) + '…' : ev.title;
    fill(col.r, col.g, col.b);
    textAlign(CENTER, above ? BOTTOM : TOP);
    textSize(11);
    textStyle(isSelected ? BOLD : NORMAL);
    text(shortTitle, x, above ? markerY - 8 : markerY + 8, 120, 40);
    textStyle(NORMAL);
  }

  // Detail panel if event selected
  if (selectedEvent) {
    let ev = selectedEvent;
    let col = nations[ev.nation];
    let px = margin, py = drawHeight * 0.62, pw = canvasWidth - margin*2, ph = drawHeight * 0.34;

    fill(255, 255, 255, 245);
    stroke(col.r, col.g, col.b);
    strokeWeight(2);
    rect(px, py, pw, ph, 8);

    noStroke();
    fill(col.r, col.g, col.b);
    rect(px, py, pw, 32, 8, 8, 0, 0);
    fill(255);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    textSize(14);
    text(ev.year + ' — ' + ev.title, px+10, py+16);
    text('[' + ev.nation + ']', px + pw - 100, py + 16);

    fill(30);
    textStyle(NORMAL);
    textSize(13);
    textAlign(LEFT, TOP);
    text(ev.detail, px+10, py+40, pw-20, ph-50);

    // Close hint
    fill(150);
    textAlign(RIGHT, BOTTOM);
    textSize(11);
    text('Click anywhere to close', px+pw-8, py+ph-4);
  }

  // Control area label
  noStroke();
  fill(80);
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Filter by nation →', 450, drawHeight + controlHeight/2);

  positionControls();
}

function mousePressed() {
  if (selectedEvent) { selectedEvent = null; return; }

  let fe = filteredEvents();
  let axisY = drawHeight * 0.48;
  for (let i = 0; i < fe.length; i++) {
    let ev = fe[i];
    let x = yearToX(ev.year);
    let above = i % 2 === 0;
    let markerY = axisY + (above ? -18 : 18);
    if (dist(mouseX, mouseY, x, markerY) < 20) {
      selectedEvent = ev;
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}
