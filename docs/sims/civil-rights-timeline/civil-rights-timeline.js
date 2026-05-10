// Civil Rights Movement Timeline — Strategies and Legislative Outcomes
// CANVAS_HEIGHT: 620
// Chapter 17: Civil Rights and the Great Society (1954–1968)
// Bloom Level: Analyze (L4) — Trace strategies to legislative outcomes
//
// Layout: drawHeight (560) + controlHeight (60) = 620
// Three horizontal tracks: Legal (top), Nonviolent Action (middle), Legislative (bottom)
// Filter by strategy; "Cause-Effect" mode draws arrows from movement events to outcomes.

let canvasWidth = 900;
let drawHeight = 560;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 16;

let yearStart = 1954;
let yearEnd = 1968;

let filterSelect;
let causeEffectCheckbox;
let resetBtn;

let selectedEvent = null;   // event id currently shown in detail panel
let hoveredEvent  = null;

// Color palette
const COLOR_LEGAL    = { r:  30, g:  90, b: 200 }; // blue
const COLOR_ACTION   = { r: 200, g:  60, b:  60 }; // red — direct action
const COLOR_BOYCOTT  = { r: 215, g: 165, b:  35 }; // gold — economic/boycott
const COLOR_LEGIS    = { r:  46, g: 125, b:  50 }; // green
const TRACK_COLOR_BG = { r: 245, g: 247, b: 250 };

const events = [
  // ---- LEGAL TRACK ----
  {
    id: 'brown1',
    track: 'legal', strategy: 'legal', color: COLOR_LEGAL,
    year: 1954, label: 'Brown v. Board',
    short: 'Supreme Court strikes down "separate but equal" in public schools.',
    what: 'In a unanimous 9–0 decision, the Supreme Court ruled that racial segregation in public schools violates the 14th Amendment\'s Equal Protection Clause, overturning Plessy v. Ferguson (1896).',
    rationale: 'NAACP Legal Defense Fund built on a decade of incremental graduate-school cases (Sweatt, McLaurin) to challenge segregation at its weakest point — public education.',
    figures: 'Thurgood Marshall (NAACP); Chief Justice Earl Warren; plaintiff Oliver Brown.',
    response: 'Southern "Massive Resistance"; 101 congressmen sign 1956 Southern Manifesto opposing the ruling.',
    outcome: 'Legal foundation for later civil rights legislation; sparked the modern movement.',
    linksTo: ['cra1964']
  },
  {
    id: 'brown2',
    track: 'legal', strategy: 'legal', color: COLOR_LEGAL, labelStagger: 1,
    year: 1955, label: 'Brown II',
    short: 'Court orders desegregation "with all deliberate speed."',
    what: 'Follow-up ruling delegating implementation to local federal district courts using the vague phrase "with all deliberate speed."',
    rationale: 'Compromise to gain unanimous decision; intended to allow gradual compliance.',
    figures: 'Chief Justice Earl Warren; NAACP attorneys.',
    response: 'Many southern districts used "deliberate speed" to delay; only 2% of Black students attended integrated schools in 1964.',
    outcome: 'Highlighted the limits of legal victories without enforcement — pushed activists toward direct action.',
    linksTo: ['cra1964']
  },
  {
    id: 'boynton',
    track: 'legal', strategy: 'legal', color: COLOR_LEGAL,
    year: 1960, label: 'Boynton v. Virginia',
    short: 'Court bans segregation in interstate bus terminals.',
    what: 'Supreme Court ruled racial segregation in public transportation facilities serving interstate travel violated the Interstate Commerce Act.',
    rationale: 'Targeted federal commerce power as a wedge against segregation laws.',
    figures: 'Bruce Boynton (Howard Law student); Thurgood Marshall.',
    response: 'States ignored the ruling; bus terminals remained segregated in practice.',
    outcome: 'Legal opening for the Freedom Rides of 1961, which tested the ruling on the ground.',
    linksTo: ['freedomriders']
  },

  // ---- NONVIOLENT ACTION TRACK ----
  {
    id: 'montgomery',
    track: 'action', strategy: 'boycott', color: COLOR_BOYCOTT,
    year: 1955, label: 'Montgomery Bus Boycott',
    short: '381-day boycott desegregates Montgomery buses.',
    what: 'Sparked by Rosa Parks\'s arrest (Dec 1, 1955), Montgomery\'s Black community boycotted city buses for 381 days until the Supreme Court ruled bus segregation unconstitutional.',
    rationale: 'Economic pressure: Black riders were 75% of bus revenue. Nonviolent collective action modeled on Gandhi.',
    figures: 'Rosa Parks; Martin Luther King Jr. (emerges as leader); E. D. Nixon; Jo Ann Robinson.',
    response: 'White Citizens\' Councils retaliated; King\'s home was bombed; Browder v. Gayle (1956) ended segregation.',
    outcome: 'Proved nonviolent direct action could win; launched MLK and the SCLC (1957).',
    linksTo: ['cra1964']
  },
  {
    id: 'sitins',
    track: 'action', strategy: 'action', color: COLOR_ACTION, labelStagger: 1,
    year: 1960, label: 'Greensboro Sit-Ins',
    short: 'Four students sit-in at Woolworth\'s, sparking a national wave.',
    what: 'On Feb 1, 1960, four Black North Carolina A&T students sat at a "whites only" Woolworth\'s lunch counter. The tactic spread to 55 cities in 13 states within two months.',
    rationale: 'Direct, visible, locally organized confrontation that put segregation on television and in newspapers.',
    figures: 'Ezell Blair Jr., Franklin McCain, Joseph McNeil, David Richmond; Ella Baker (mentor).',
    response: 'Mass arrests; counter-protesters poured food on demonstrators; nationally televised images shocked viewers.',
    outcome: 'Birth of SNCC (April 1960); Woolworth\'s desegregated by July; built generational momentum.',
    linksTo: ['cra1964']
  },
  {
    id: 'freedomriders',
    track: 'action', strategy: 'action', color: COLOR_ACTION,
    year: 1961, label: 'Freedom Riders',
    short: 'Integrated bus riders test desegregation across the South.',
    what: 'CORE-organized integrated groups rode interstate buses through the South to test compliance with Boynton v. Virginia.',
    rationale: 'Force federal government to enforce existing Supreme Court rulings by creating crises it could not ignore.',
    figures: 'James Farmer (CORE); John Lewis; Diane Nash; Attorney General Robert Kennedy.',
    response: 'Anniston bus firebombed; Birmingham riders beaten by Klan with police complicity; JFK forced to send U.S. Marshals.',
    outcome: 'ICC issued binding desegregation rules (Sept 1961); proved federal intervention could be compelled.',
    linksTo: ['cra1964']
  },
  {
    id: 'birmingham',
    track: 'action', strategy: 'action', color: COLOR_ACTION, labelStagger: 0,
    year: 1963, label: 'Birmingham',
    short: 'Children\'s Crusade meets fire hoses and police dogs on TV.',
    what: 'SCLC-led campaign of marches and sit-ins targeting Birmingham — "the most segregated city in America." Children\'s Crusade (May 2–5) brought thousands of students into the streets.',
    rationale: '"Project C" (Confrontation): deliberately provoke a televised crisis to force federal intervention and shift public opinion.',
    figures: 'MLK Jr.; Fred Shuttlesworth; James Bevel (Children\'s Crusade); Bull Connor (police chief).',
    response: 'Bull Connor unleashed police dogs and fire hoses on children; images horrified the nation; JFK addressed the nation June 11.',
    outcome: 'Direct catalyst for JFK\'s civil rights bill (June 1963), which became the Civil Rights Act of 1964.',
    linksTo: ['cra1964']
  },
  {
    id: 'march',
    track: 'action', strategy: 'action', color: COLOR_ACTION, labelStagger: 1,
    year: 1963, label: 'March on Washington',
    short: '250,000 march; MLK delivers "I Have a Dream."',
    what: 'On Aug 28, 1963, an interracial coalition of ~250,000 people gathered at the Lincoln Memorial demanding jobs and freedom.',
    rationale: 'Demonstrate scale, dignity, and biracial support of the movement directly to Washington and to a national TV audience.',
    figures: 'A. Philip Randolph; Bayard Rustin (organizer); MLK Jr.; John Lewis; Roy Wilkins; Whitney Young.',
    response: 'Largely peaceful; widely televised; "I Have a Dream" speech became cultural touchstone.',
    outcome: 'Pressured Congress on civil rights bill; reframed the movement as a moral mainstream cause.',
    linksTo: ['cra1964']
  },
  {
    id: 'selma',
    track: 'action', strategy: 'action', color: COLOR_ACTION, labelStagger: 1,
    year: 1965, label: 'Selma',
    short: '"Bloody Sunday" televised attack drives voting rights legislation.',
    what: 'Three marches to demand voting rights. On "Bloody Sunday" (Mar 7), state troopers attacked marchers crossing the Edmund Pettus Bridge.',
    rationale: 'Apply Birmingham model to voting rights; force federal action by exposing state violence on television.',
    figures: 'MLK Jr.; John Lewis; Hosea Williams; Amelia Boynton; James Bevel; LBJ.',
    response: 'Bloody Sunday footage on ABC interrupted Judgment at Nuremberg; LBJ\'s "We Shall Overcome" speech (Mar 15).',
    outcome: 'Direct catalyst for the Voting Rights Act of 1965 — signed Aug 6, 1965.',
    linksTo: ['vra1965']
  },

  // ---- LEGISLATIVE TRACK ----
  {
    id: 'cra1964',
    track: 'legis', strategy: 'legis', color: COLOR_LEGIS, labelStagger: 1,
    year: 1964, label: 'Civil Rights Act',
    short: 'Bans segregation in public accommodations and employment discrimination.',
    what: 'Comprehensive federal law banning discrimination based on race, color, religion, sex, or national origin in public accommodations, employment, and federally funded programs.',
    rationale: 'Built on Birmingham, March on Washington, and JFK\'s assassination; LBJ used "Let us continue" to drive passage.',
    figures: 'LBJ; Hubert Humphrey; Everett Dirksen (key GOP votes); MLK Jr.',
    response: 'Title II upheld in Heart of Atlanta Motel (1964); broke Solid South alignment with Democratic Party.',
    outcome: 'Ended legal segregation in public life; enforcement mechanism in EEOC and DOJ.',
    linksTo: []
  },
  {
    id: 'amend24',
    track: 'legis', strategy: 'legis', color: COLOR_LEGIS, labelFlip: true,
    year: 1964, label: '24th Amendment',
    short: 'Bans poll taxes in federal elections.',
    what: 'Constitutional amendment ratified Jan 23, 1964, prohibiting the use of poll taxes (or any tax) as a condition for voting in federal elections.',
    rationale: 'Targeted a key Jim Crow voter-suppression tool that disenfranchised poor Black (and white) southerners.',
    figures: 'Senator Spessard Holland (sponsor since 1949); Kennedy/Johnson administrations.',
    response: 'Five states still had poll taxes; Harper v. Virginia Board (1966) extended ban to state elections.',
    outcome: 'Removed one financial barrier to voting; complemented later Voting Rights Act enforcement.',
    linksTo: []
  },
  {
    id: 'vra1965',
    track: 'legis', strategy: 'legis', color: COLOR_LEGIS,
    year: 1965, label: 'Voting Rights Act',
    short: 'Bans literacy tests; federal oversight of southern voting.',
    what: 'Banned literacy tests, authorized federal examiners to register voters, and required preclearance (Section 5) of voting changes in jurisdictions with histories of discrimination.',
    rationale: 'Selma made vivid that the 15th Amendment was not being enforced; LBJ moved within five months.',
    figures: 'LBJ; MLK Jr.; AG Nicholas Katzenbach.',
    response: 'Black voter registration in Mississippi rose from 7% (1964) to 67% (1969); transformed southern politics.',
    outcome: 'Most effective civil rights law ever passed — until Section 5 was gutted by Shelby County v. Holder (2013).',
    linksTo: []
  },
  {
    id: 'fha1968',
    track: 'legis', strategy: 'legis', color: COLOR_LEGIS,
    year: 1968, label: 'Fair Housing Act',
    short: 'Bans discrimination in renting and selling housing.',
    what: 'Title VIII of the Civil Rights Act of 1968 prohibited discrimination in the sale, rental, and financing of housing based on race, religion, or national origin.',
    rationale: 'Northern movement (Chicago Freedom Movement, 1966) had exposed housing as the next frontier; MLK\'s assassination broke the political logjam.',
    figures: 'LBJ; Walter Mondale; Edward Brooke; MLK Jr. (assassinated April 4, 1968).',
    response: 'Passed April 11, one week after King\'s death; weak enforcement initially; strengthened in 1988.',
    outcome: 'Final pillar of 1960s civil rights legislation; closed the de jure phase of the movement.',
    linksTo: []
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
  filterSelect.option('All strategies', 'all');
  filterSelect.option('Legal action', 'legal');
  filterSelect.option('Boycott / economic', 'boycott');
  filterSelect.option('Direct nonviolent action', 'action');
  filterSelect.option('Legislation', 'legis');
  filterSelect.selected('all');
  filterSelect.changed(() => { selectedEvent = null; });

  causeEffectCheckbox = createCheckbox(' Cause-Effect arrows', false);

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => {
    filterSelect.selected('all');
    causeEffectCheckbox.checked(false);
    selectedEvent = null;
  });

  positionControls();
  describe('Civil Rights Movement timeline 1954-1968 with three tracks (Legal, Nonviolent Action, Legislative). Filter by strategy or toggle Cause-Effect arrows from movement events to legislative outcomes. Click any event for details.', LABEL);
}

function positionControls() {
  let y = drawHeight + 14;
  filterSelect.position(margin + 70, y);
  filterSelect.style('font-size', '13px');
  causeEffectCheckbox.position(margin + 260, y + 2);
  causeEffectCheckbox.style('font-size', '13px');
  resetBtn.position(canvasWidth - 70, y);
}

function eventX(year) {
  let usableW = canvasWidth - margin * 2 - 40;
  return margin + 30 + ((year - yearStart) / (yearEnd - yearStart)) * usableW;
}

function trackY(track) {
  // titleArea ~70 px, then three tracks evenly in remaining ~360px
  let topPad = 80;
  let trackH = 110;
  if (track === 'legal')  return topPad + trackH * 0.5 + 6;
  if (track === 'action') return topPad + trackH * 1.5 + 6;
  if (track === 'legis')  return topPad + trackH * 2.5 + 6;
  return drawHeight / 2;
}

function isFiltered(ev) {
  let f = filterSelect.value();
  if (f === 'all') return false;
  return ev.strategy !== f;
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
  text('Civil Rights Movement: Strategies and Legislative Outcomes (1954–1968)', canvasWidth / 2, 10);
  textStyle(NORMAL);
  fill(90);
  textSize(12);
  text('Click any event for details. Toggle Cause-Effect arrows to see how movement events drove legislation.', canvasWidth / 2, 34);

  // Track backgrounds + labels
  drawTrack('legal',  'Legal Action',           COLOR_LEGAL);
  drawTrack('action', 'Nonviolent Direct Action', COLOR_ACTION);
  drawTrack('legis',  'Legislation',            COLOR_LEGIS);

  // Year axis (bottom of last track)
  drawYearAxis();

  // Cause-Effect arrows (drawn beneath nodes)
  if (causeEffectCheckbox.checked()) {
    drawCauseEffectArrows();
  }

  // Event nodes
  hoveredEvent = null;
  for (let ev of events) {
    drawEventNode(ev);
  }

  // Detail panel
  if (selectedEvent) {
    drawDetailPanel(selectedEvent);
  } else if (hoveredEvent) {
    drawHoverTooltip(hoveredEvent);
  } else {
    drawLegend();
  }

  // Control labels
  noStroke();
  fill(60);
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Filter:', margin + 8, drawHeight + controlHeight / 2 + 2);

  positionControls();
}

function drawTrack(track, label, color) {
  let y = trackY(track);
  let h = 90;
  noStroke();
  fill(TRACK_COLOR_BG.r, TRACK_COLOR_BG.g, TRACK_COLOR_BG.b);
  rect(margin, y - h / 2, canvasWidth - margin * 2, h, 6);

  // Track label
  fill(color.r, color.g, color.b);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(12);
  text(label, margin + 8, y - h / 2 + 12);
  textStyle(NORMAL);

  // Track baseline
  stroke(color.r, color.g, color.b, 90);
  strokeWeight(2);
  line(margin + 30, y, canvasWidth - margin - 10, y);
  noStroke();
}

function drawYearAxis() {
  let y = trackY('legis') + 70;
  stroke(150);
  strokeWeight(1);
  line(margin + 30, y, canvasWidth - margin - 10, y);
  noStroke();
  fill(80);
  textAlign(CENTER, TOP);
  textSize(11);
  for (let yr = yearStart; yr <= yearEnd; yr++) {
    let x = eventX(yr);
    stroke(180);
    line(x, y - 3, x, y + 3);
    noStroke();
    if (yr % 2 === 0 || yr === yearStart || yr === yearEnd) {
      fill(80);
      text(yr, x, y + 5);
    }
  }
}

function drawEventNode(ev) {
  let x = eventX(ev.year);
  let y = trackY(ev.track);
  let r = 11;
  let dimmed = isFiltered(ev);
  let alpha = dimmed ? 50 : 255;

  // Hover detection
  let d = dist(mouseX, mouseY, x, y);
  let isHover = d < r + 4 && !dimmed;
  if (isHover) hoveredEvent = ev;
  let isSelected = selectedEvent && selectedEvent.id === ev.id;

  // Connector to label — alternate offsets per event to avoid overlap on close years
  let stagger = (ev.labelStagger || 0); // 0 = near, 1 = far
  let baseOffset = (ev.track === 'legis') ? -28 : 28;
  // labelFlip flips label to opposite side of node
  let flip = ev.labelFlip ? -1 : 1;
  let labelOffset = (baseOffset * flip) + (stagger ? (ev.track === 'legis' ? -14 : 14) * flip : 0);
  stroke(ev.color.r, ev.color.g, ev.color.b, dimmed ? 40 : 180);
  strokeWeight(1);
  line(x, y, x, y + labelOffset);

  // Node
  noStroke();
  if (isSelected || isHover) {
    fill(ev.color.r, ev.color.g, ev.color.b, alpha);
    stroke(255);
    strokeWeight(3);
  } else {
    fill(ev.color.r, ev.color.g, ev.color.b, alpha);
    stroke(255);
    strokeWeight(2);
  }
  ellipse(x, y, r * 2, r * 2);
  noStroke();

  // Year inside node
  fill(255, dimmed ? 80 : 255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(9);
  text(ev.year.toString().slice(2), x, y + 1);
  textStyle(NORMAL);

  // Label
  fill(40, 40, 40, dimmed ? 70 : 230);
  let labelAbove = labelOffset < 0;
  textAlign(CENTER, labelAbove ? BOTTOM : TOP);
  textSize(10.5);
  textStyle(isSelected ? BOLD : NORMAL);
  let labelY = y + labelOffset + (labelAbove ? -4 : 4);
  let labelX = constrain(x - 65, margin + 2, canvasWidth - margin - 132);
  text(ev.label, labelX, labelY, 130, 28);
  textStyle(NORMAL);
}

function drawCauseEffectArrows() {
  for (let ev of events) {
    if (!ev.linksTo || ev.linksTo.length === 0) continue;
    if (isFiltered(ev)) continue;
    for (let targetId of ev.linksTo) {
      let target = events.find(e => e.id === targetId);
      if (!target) continue;
      if (isFiltered(target)) continue;

      let x1 = eventX(ev.year);
      let y1 = trackY(ev.track);
      let x2 = eventX(target.year);
      let y2 = trackY(target.track);

      // Curved arrow
      stroke(120, 120, 120, 150);
      strokeWeight(1.5);
      noFill();
      let mx = (x1 + x2) / 2;
      let my = (y1 + y2) / 2 + 20;
      bezier(x1, y1, mx, my, mx, my, x2, y2);

      // Arrowhead at target
      push();
      translate(x2, y2);
      let angle = atan2(y2 - my, x2 - mx);
      rotate(angle);
      fill(120, 120, 120, 200);
      noStroke();
      triangle(-8, -4, -8, 4, 0, 0);
      pop();
    }
  }
}

function drawHoverTooltip(ev) {
  let x = eventX(ev.year);
  let y = trackY(ev.track);
  let txt = ev.year + ' — ' + ev.label + ': ' + ev.short;

  textSize(12);
  let tw = min(textWidth(txt) + 16, canvasWidth - 40);
  let th = 36;
  let tx = constrain(x - tw / 2, margin, canvasWidth - tw - margin);
  let ty = (ev.track === 'legis') ? y - th - 30 : y + 50;

  noStroke();
  fill(30, 40, 60, 235);
  rect(tx, ty, tw, th, 6);
  fill(255);
  textAlign(LEFT, CENTER);
  text(txt, tx + 8, ty + th / 2, tw - 16, th - 8);
}

function drawDetailPanel(ev) {
  let panelY = trackY('legis') + 100;
  let panelH = drawHeight - panelY - 8;
  let panelW = canvasWidth - margin * 2;

  // Background
  noStroke();
  fill(255);
  stroke(ev.color.r, ev.color.g, ev.color.b);
  strokeWeight(2);
  rect(margin, panelY, panelW, panelH, 8);
  noStroke();

  // Title
  fill(ev.color.r, ev.color.g, ev.color.b);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(14);
  text(ev.year + ' — ' + ev.label, margin + 10, panelY + 8);

  // Close hint
  fill(120);
  textAlign(RIGHT, TOP);
  textStyle(NORMAL);
  textSize(11);
  text('(click event again or Reset to close)', canvasWidth - margin - 10, panelY + 10);

  // Two-column body
  let colW = (panelW - 30) / 2;
  let leftX = margin + 10;
  let rightX = margin + 20 + colW;
  let bodyY = panelY + 32;
  let lineH = 14;

  textAlign(LEFT, TOP);
  textSize(11.5);

  // Left column
  let yL = bodyY;
  yL = drawField(leftX, yL, colW, 'What happened:', ev.what, ev.color, lineH);
  yL = drawField(leftX, yL + 4, colW, 'Strategic rationale:', ev.rationale, ev.color, lineH);

  // Right column
  let yR = bodyY;
  yR = drawField(rightX, yR, colW, 'Key figures:', ev.figures, ev.color, lineH);
  yR = drawField(rightX, yR + 4, colW, 'Immediate response:', ev.response, ev.color, lineH);
  yR = drawField(rightX, yR + 4, colW, 'Outcome:', ev.outcome, ev.color, lineH);

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
  // Approximation: count wrapped lines
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

function drawLegend() {
  let panelY = trackY('legis') + 100;
  let panelH = drawHeight - panelY - 8;
  let panelW = canvasWidth - margin * 2;

  noStroke();
  fill(252);
  stroke(220);
  strokeWeight(1);
  rect(margin, panelY, panelW, panelH, 8);
  noStroke();

  fill(60);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(12);
  text('Strategy Legend:', margin + 10, panelY + 8);
  textStyle(NORMAL);

  let legendItems = [
    { color: COLOR_LEGAL,   label: 'Legal action — court cases challenging segregation' },
    { color: COLOR_BOYCOTT, label: 'Boycott / economic pressure' },
    { color: COLOR_ACTION,  label: 'Direct nonviolent action — sit-ins, marches, freedom rides' },
    { color: COLOR_LEGIS,   label: 'Legislation — federal civil rights laws' }
  ];

  textSize(11.5);
  for (let i = 0; i < legendItems.length; i++) {
    let it = legendItems[i];
    let y = panelY + 28 + i * 16;
    fill(it.color.r, it.color.g, it.color.b);
    ellipse(margin + 22, y + 6, 12, 12);
    fill(40);
    textAlign(LEFT, TOP);
    text(it.label, margin + 36, y);
  }

  textStyle(NORMAL);
}

function mousePressed() {
  // Check event nodes
  for (let ev of events) {
    if (isFiltered(ev)) continue;
    let x = eventX(ev.year);
    let y = trackY(ev.track);
    if (dist(mouseX, mouseY, x, y) < 14) {
      if (selectedEvent && selectedEvent.id === ev.id) {
        selectedEvent = null;
      } else {
        selectedEvent = ev;
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
