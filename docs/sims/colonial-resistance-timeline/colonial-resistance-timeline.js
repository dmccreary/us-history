// Colonial Resistance Timeline (1763–1775)
// CANVAS_HEIGHT: 600
// Chapter 4: The American Revolution (1754–1783)
// Bloom Level: Analyze (L4) — Examine action -> reaction -> escalation cycle
//
// Layout: drawHeight (540) + controlHeight (60) = 600
// Two horizontal tracks: top = British actions (gold), bottom = Colonial responses (indigo)
// Curved arrows show the action -> reaction -> escalation cycle.
// Click any event for a detail panel; toggle "Cause-Effect arrows" to highlight the cycle.

let canvasWidth = 900;
let drawHeight = 540;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 16;

let yearStart = 1763;
let yearEnd = 1775;

let filterSelect;
let causeEffectCheckbox;
let resetBtn;

let selectedEvent = null;
let hoveredEvent = null;

// Color palette
const COLOR_BRITISH  = { r: 249, g: 168, b:  37 }; // gold #f9a825
const COLOR_COLONIAL = { r:  57, g:  73, b: 171 }; // indigo #3949ab
const TRACK_COLOR_BG = { r: 245, g: 247, b: 250 };

const events = [
  // ---- BRITISH ACTIONS (top) ----
  {
    id: 'proc1763',
    track: 'british', side: 'British', color: COLOR_BRITISH,
    year: 1763, label: 'Proclamation of 1763',
    short: 'Bars colonial settlement west of the Appalachians.',
    what: 'After the French and Indian War, King George III\'s proclamation forbade colonial settlement west of the Appalachian Mountains, reserving the territory for Native nations and the Crown.',
    rationale: 'Aimed to prevent costly conflicts with Native peoples (e.g., Pontiac\'s War) and keep colonists on the seaboard, where they could be more easily taxed and governed.',
    response: 'Speculators and settlers (including George Washington) ignored the line and pushed west anyway.',
    systems: 'Reinforcing loop kicks off: imperial restriction breeds colonial defiance, which prompts more imperial restriction.',
    linksTo: ['landrush']
  },
  {
    id: 'sugar1764',
    track: 'british', side: 'British', color: COLOR_BRITISH, labelStagger: 1,
    year: 1764, label: 'Sugar Act',
    short: 'Tightens enforcement of duties on molasses and sugar.',
    what: 'Parliament cut the molasses duty in half but cracked down on smuggling with new admiralty courts that denied jury trials.',
    rationale: 'Pay down war debt and force colonists to share imperial costs through stricter customs collection.',
    response: 'Merchants in Boston and New York protested vice-admiralty jurisdiction as a violation of English liberty.',
    systems: 'Reinforcing: enforcement crackdowns harden colonial identity around "rights of Englishmen."',
    linksTo: []
  },
  {
    id: 'stamp1765',
    track: 'british', side: 'British', color: COLOR_BRITISH,
    year: 1765, label: 'Stamp Act',
    short: 'First direct internal tax on the colonies.',
    what: 'Required printed stamps on newspapers, legal documents, playing cards, and other paper goods. The first direct tax Parliament levied on the colonists themselves.',
    rationale: 'Raise revenue for British troops stationed in North America after 1763.',
    response: 'Stamp Act Congress, Sons of Liberty riots, effigies of stamp distributors, mass non-importation agreements.',
    systems: 'Reinforcing: a tax meant to fund order produced disorder, which proved colonial unity was possible.',
    linksTo: ['stampcong', 'sons']
  },
  {
    id: 'quartering1765',
    track: 'british', side: 'British', color: COLOR_BRITISH, labelStagger: 1,
    year: 1765, label: 'Quartering Act',
    short: 'Colonies must house and supply British troops.',
    what: 'Required colonial assemblies to provide barracks and provisions for British soldiers stationed in North America.',
    rationale: 'Reduce the cost of imperial defense by shifting it onto colonial budgets.',
    response: 'New York assembly refused to comply in 1766; Parliament suspended it in retaliation.',
    systems: 'Reinforcing: forced cohabitation with redcoats made occupation visible and personal.',
    linksTo: []
  },
  {
    id: 'townshend1767',
    track: 'british', side: 'British', color: COLOR_BRITISH,
    year: 1767, label: 'Townshend Acts',
    short: 'Indirect duties on glass, paint, paper, and tea.',
    what: 'Charles Townshend\'s duties on imported British goods, paired with new customs commissioners headquartered in Boston.',
    rationale: 'Raise revenue through "external" duties Townshend believed colonists would accept; pay royal officials directly so they were independent of colonial assemblies.',
    response: 'Non-importation agreements spread; women organized "spinning bees" to make homespun cloth.',
    systems: 'Reinforcing: economic resistance built grassroots networks (especially among women) that later mobilized for war.',
    linksTo: ['nonimport']
  },
  {
    id: 'troops1768',
    track: 'british', side: 'British', color: COLOR_BRITISH, labelStagger: 1,
    year: 1768, label: 'Troops to Boston',
    short: 'Two regiments occupy Boston to enforce customs.',
    what: 'After customs officials were harassed in the Liberty affair, Britain stationed roughly 2,000 regulars in a town of 16,000.',
    rationale: 'Restore order and protect customs officers from intimidation.',
    response: 'Daily friction between soldiers and Bostonians; broadsides denounced the "standing army."',
    systems: 'Reinforcing: troops sent to suppress resistance instead concentrated grievances into a single visible target.',
    linksTo: ['massacre']
  },
  {
    id: 'tea1773',
    track: 'british', side: 'British', color: COLOR_BRITISH,
    year: 1773, label: 'Tea Act',
    short: 'Gives the East India Company a monopoly on tea.',
    what: 'Allowed the East India Company to ship tea directly to the colonies — undercutting colonial merchants — while keeping the Townshend tea duty.',
    rationale: 'Bail out the financially distressed East India Company without seeming to introduce a new tax.',
    response: 'Boston Tea Party (Dec 16, 1773): ~92,000 pounds of tea dumped into Boston Harbor.',
    systems: 'Reinforcing: a "cheap tea" rescue plan radicalized merchants who had previously stayed neutral.',
    linksTo: ['teaparty']
  },
  {
    id: 'intolerable1774',
    track: 'british', side: 'British', color: COLOR_BRITISH, labelStagger: 1,
    year: 1774, label: 'Intolerable Acts',
    short: 'Punish Boston: close port, alter Mass. charter.',
    what: 'Coercive Acts closed Boston Harbor, revoked the Massachusetts charter, allowed trials of officials in Britain, and expanded quartering.',
    rationale: 'Make an example of Massachusetts and isolate it from the other colonies.',
    response: 'Other colonies sent food and aid; First Continental Congress convened in Philadelphia (Sept 1774).',
    systems: 'Reinforcing: an attempt to isolate Boston instead unified the thirteen colonies.',
    linksTo: ['firstcc']
  },

  // ---- COLONIAL RESPONSES (bottom) ----
  {
    id: 'landrush',
    track: 'colonial', side: 'Colonial', color: COLOR_COLONIAL,
    year: 1763, label: 'Westward Defiance',
    short: 'Settlers and speculators cross the Proclamation Line.',
    what: 'Despite the royal ban, settlers, land companies, and figures like George Washington pursued claims in the Ohio Valley.',
    rationale: 'Land hunger and post-war expectations of expansion proved stronger than royal authority enforced from 3,000 miles away.',
    systems: 'Reinforcing: defiance demonstrated the limits of imperial enforcement and emboldened later resistance.',
    linksTo: []
  },
  {
    id: 'stampcong',
    track: 'colonial', side: 'Colonial', color: COLOR_COLONIAL,
    year: 1765, label: 'Stamp Act Congress',
    short: 'Nine colonies meet in New York; first intercolonial body.',
    what: 'Delegates from nine colonies issued a Declaration of Rights and Grievances asserting "no taxation without representation."',
    rationale: 'Articulate a shared constitutional argument and coordinate petitions to King and Parliament.',
    systems: 'Reinforcing: established the precedent of intercolonial political action.',
    linksTo: []
  },
  {
    id: 'sons',
    track: 'colonial', side: 'Colonial', color: COLOR_COLONIAL, labelStagger: 1,
    year: 1765, label: 'Sons of Liberty',
    short: 'Crowd networks intimidate stamp distributors into resigning.',
    what: 'Local associations — Samuel Adams in Boston, the Loyal Nine — organized effigy hangings, tar-and-feathering, and crowd actions that forced every stamp distributor in the colonies to resign before the act took effect.',
    rationale: 'Make the law unenforceable on the ground while elite petitioners argued in print.',
    systems: 'Reinforcing: street power complemented elite politics; both pushed in the same direction.',
    linksTo: []
  },
  {
    id: 'nonimport',
    track: 'colonial', side: 'Colonial', color: COLOR_COLONIAL,
    year: 1768, label: 'Non-Importation',
    short: 'Merchants and women boycott British goods.',
    what: 'Colonial merchants signed agreements not to import British goods; "Daughters of Liberty" produced homespun cloth and policed compliance socially.',
    rationale: 'Hit British merchants in the pocketbook to pressure Parliament to repeal the duties.',
    systems: 'Reinforcing: economic pressure worked — most Townshend duties were repealed in 1770 (except tea).',
    linksTo: []
  },
  {
    id: 'massacre',
    track: 'colonial', side: 'Colonial', color: COLOR_COLONIAL, labelStagger: 1,
    year: 1770, label: 'Boston Massacre',
    short: 'Five colonists killed; Revere\'s engraving spreads outrage.',
    what: 'On March 5, 1770, British soldiers fired into a Boston crowd, killing five — including Crispus Attucks. Paul Revere\'s engraving turned the event into propaganda.',
    rationale: 'Confrontation between occupying troops and townspeople was, by 1770, almost inevitable; activists exploited the resulting deaths.',
    systems: 'Reinforcing: a single street brawl, narrated and re-narrated, hardened anti-British identity across the colonies.',
    linksTo: []
  },
  {
    id: 'teaparty',
    track: 'colonial', side: 'Colonial', color: COLOR_COLONIAL,
    year: 1773, label: 'Boston Tea Party',
    short: 'Sons of Liberty dump 342 chests of tea into Boston Harbor.',
    what: 'On Dec 16, 1773, ~100 men disguised as Mohawks boarded three ships and threw 342 chests of East India Company tea — about 92,000 pounds — into the harbor.',
    rationale: 'Block the tea from being landed (and the duty from being collected) without compromise.',
    systems: 'Reinforcing: a deliberately provocative act invited a deliberately provocative British response — escalation locked in.',
    linksTo: []
  },
  {
    id: 'firstcc',
    track: 'colonial', side: 'Colonial', color: COLOR_COLONIAL, labelStagger: 1,
    year: 1774, label: 'First Continental Congress',
    short: '12 colonies meet; create Continental Association.',
    what: 'Delegates from 12 colonies met in Philadelphia (Sept–Oct 1774), endorsed the Suffolk Resolves, and created the Continental Association to enforce non-importation.',
    rationale: 'Coordinate a continent-wide response to the Coercive Acts.',
    systems: 'Reinforcing: the Coercive Acts produced exactly the unity they were meant to prevent.',
    linksTo: ['lex']
  },
  {
    id: 'lex',
    track: 'colonial', side: 'Colonial', color: COLOR_COLONIAL,
    year: 1775, label: 'Lexington & Concord',
    short: '"Shot heard \'round the world" — fighting begins.',
    what: 'On April 19, 1775, British regulars marching to seize colonial arms at Concord were met by militia at Lexington and harried back to Boston, suffering 273 casualties.',
    rationale: 'General Gage tried to disarm the Massachusetts militia preemptively; warned by Revere and Dawes, the militia mobilized first.',
    systems: 'Tipping point: the reinforcing escalation loop crosses into open war — political resistance becomes armed conflict.',
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
  filterSelect.option('All events', 'all');
  filterSelect.option('British actions only', 'british');
  filterSelect.option('Colonial responses only', 'colonial');
  filterSelect.selected('all');
  filterSelect.changed(() => { selectedEvent = null; });

  causeEffectCheckbox = createCheckbox(' Show action -> response arrows', true);

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => {
    filterSelect.selected('all');
    causeEffectCheckbox.checked(true);
    selectedEvent = null;
  });

  positionControls();
  describe('Two-track timeline 1763-1775. Top track shows British actions in gold; bottom track shows Colonial responses in indigo. Curved gray arrows connect each action to the response it provoked. Click any event for a detail panel.', LABEL);
}

function positionControls() {
  let y = drawHeight + 14;
  filterSelect.position(margin + 50, y);
  filterSelect.style('font-size', '13px');
  causeEffectCheckbox.position(margin + 240, y + 2);
  causeEffectCheckbox.style('font-size', '13px');
  resetBtn.position(canvasWidth - 70, y);
}

function eventX(year) {
  let usableW = canvasWidth - margin * 2 - 50;
  return margin + 35 + ((year - yearStart) / (yearEnd - yearStart)) * usableW;
}

function trackY(track) {
  // Title area ~70 px, then two tracks evenly in ~200 px
  let topPad = 80;
  if (track === 'british')  return topPad + 50;
  if (track === 'colonial') return topPad + 170;
  return drawHeight / 2;
}

function isFiltered(ev) {
  let f = filterSelect.value();
  if (f === 'all') return false;
  return ev.track !== f;
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
  text('Colonial Resistance: Action and Response (1763–1775)', canvasWidth / 2, 10);
  textStyle(NORMAL);
  fill(90);
  textSize(12);
  text('Each British measure provoked a colonial response that intensified the next British measure. Click any event for details.', canvasWidth / 2, 34);

  // Tracks
  drawTrack('british',  'British Actions',     COLOR_BRITISH);
  drawTrack('colonial', 'Colonial Responses',  COLOR_COLONIAL);

  // Year axis between tracks
  drawYearAxis();

  // Cause-effect arrows beneath nodes
  if (causeEffectCheckbox.checked()) {
    drawCauseEffectArrows();
  }

  // Event nodes
  hoveredEvent = null;
  for (let ev of events) {
    drawEventNode(ev);
  }

  // Detail panel or legend
  if (selectedEvent) {
    drawDetailPanel(selectedEvent);
  } else if (hoveredEvent) {
    drawHoverTooltip(hoveredEvent);
    drawLegend();
  } else {
    drawLegend();
  }

  // Control labels
  noStroke();
  fill(60);
  textAlign(LEFT, CENTER);
  textSize(13);
  text('View:', margin + 8, drawHeight + controlHeight / 2 + 2);

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
  stroke(color.r, color.g, color.b, 110);
  strokeWeight(2);
  line(margin + 35, y, canvasWidth - margin - 10, y);
  noStroke();
}

function drawYearAxis() {
  // Axis halfway between the two tracks
  let y = (trackY('british') + trackY('colonial')) / 2;
  stroke(150);
  strokeWeight(1);
  line(margin + 35, y, canvasWidth - margin - 10, y);
  noStroke();
  fill(80);
  textAlign(CENTER, CENTER);
  textSize(11);
  for (let yr = yearStart; yr <= yearEnd; yr++) {
    let x = eventX(yr);
    stroke(180);
    line(x, y - 3, x, y + 3);
    noStroke();
    fill(80);
    text(yr, x, y);
  }
}

function drawEventNode(ev) {
  let x = eventX(ev.year);
  let y = trackY(ev.track);
  let r = 12;
  let dimmed = isFiltered(ev);
  let alpha = dimmed ? 50 : 255;

  // Hover detection
  let d = dist(mouseX, mouseY, x, y);
  let isHover = d < r + 4 && !dimmed;
  if (isHover) hoveredEvent = ev;
  let isSelected = selectedEvent && selectedEvent.id === ev.id;

  // Connector to label — labels go AWAY from the year axis (outside)
  let stagger = (ev.labelStagger || 0);
  let baseOffset = (ev.track === 'british') ? -28 : 28;
  let labelOffset = baseOffset + (stagger ? (ev.track === 'british' ? -16 : 16) : 0);
  stroke(ev.color.r, ev.color.g, ev.color.b, dimmed ? 40 : 180);
  strokeWeight(1);
  line(x, y, x, y + labelOffset);

  // Node
  noStroke();
  fill(ev.color.r, ev.color.g, ev.color.b, alpha);
  if (isSelected) {
    stroke(255);
    strokeWeight(4);
  } else if (isHover) {
    stroke(255);
    strokeWeight(3);
  } else {
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

      // Start/end at the edges of the circles, not centers
      let r = 12;
      // crossing-track arrows leave node from bottom (british) or top (colonial)
      let startY = (ev.track === 'british') ? y1 + r : y1 - r;
      let endY   = (target.track === 'british') ? y2 + r : y2 - r;

      // Highlight if either endpoint is selected/hovered
      let active = (selectedEvent && (selectedEvent.id === ev.id || selectedEvent.id === target.id))
                || (hoveredEvent && (hoveredEvent.id === ev.id || hoveredEvent.id === target.id));
      let alpha = active ? 220 : 130;
      let weight = active ? 2.4 : 1.4;

      stroke(110, 110, 110, alpha);
      strokeWeight(weight);
      noFill();
      let mx = (x1 + x2) / 2;
      let my = (startY + endY) / 2;
      bezier(x1, startY, mx, my, mx, my, x2, endY);

      // Arrowhead at target
      push();
      translate(x2, endY);
      let angle = atan2(endY - my, x2 - mx);
      rotate(angle);
      fill(110, 110, 110, alpha + 30);
      noStroke();
      triangle(-9, -5, -9, 5, 0, 0);
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
  let ty = (ev.track === 'british') ? y - th - 50 : y + 60;

  noStroke();
  fill(30, 40, 60, 235);
  rect(tx, ty, tw, th, 6);
  fill(255);
  textAlign(LEFT, CENTER);
  text(txt, tx + 8, ty + th / 2, tw - 16, th - 8);
}

function drawDetailPanel(ev) {
  let panelY = trackY('colonial') + 70;
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
  text(ev.year + ' — ' + ev.label + '   (' + ev.side + ')', margin + 10, panelY + 8);

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
  yL = drawField(leftX, yL + 4, colW, 'British / colonial rationale:', ev.rationale, ev.color, lineH);

  // Right column
  let yR = bodyY;
  if (ev.response) {
    yR = drawField(rightX, yR, colW, 'Immediate consequence:', ev.response, ev.color, lineH);
  }
  yR = drawField(rightX, yR + 4, colW, 'Systems-thinking note:', ev.systems, ev.color, lineH);

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

function drawLegend() {
  let panelY = trackY('colonial') + 70;
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
  text('Legend  &  How to read this timeline', margin + 10, panelY + 8);
  textStyle(NORMAL);

  textSize(11.5);
  let items = [
    { color: COLOR_BRITISH,  label: 'British action  — laws, taxes, troops, and proclamations imposed by Crown and Parliament.' },
    { color: COLOR_COLONIAL, label: 'Colonial response — petitions, congresses, boycotts, riots, and (eventually) armed resistance.' }
  ];
  for (let i = 0; i < items.length; i++) {
    let it = items[i];
    let y = panelY + 30 + i * 18;
    fill(it.color.r, it.color.g, it.color.b);
    ellipse(margin + 22, y + 6, 14, 14);
    fill(40);
    textAlign(LEFT, TOP);
    text(it.label, margin + 38, y, panelW - 50, 18);
  }

  // Systems-thinking note
  fill(60);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(11);
  text('Systems thinking:', margin + 10, panelY + 72);
  textStyle(NORMAL);
  fill(40);
  textSize(11);
  text('Each gray arrow links a British action to the colonial response it provoked. Together they form a reinforcing loop — every escalation made the next one more likely, ending in war at Lexington and Concord.',
       margin + 10, panelY + 88, panelW - 20, 60);

  textStyle(NORMAL);
}

function mousePressed() {
  for (let ev of events) {
    if (isFiltered(ev)) continue;
    let x = eventX(ev.year);
    let y = trackY(ev.track);
    if (dist(mouseX, mouseY, x, y) < 15) {
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
