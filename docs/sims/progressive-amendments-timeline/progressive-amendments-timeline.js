// Four Progressive Era Amendments — Timeline and Context
// CANVAS_HEIGHT: 560
// Chapter 12: The Progressive Era (1890–1914)
// Bloom Level: Understand (L2) — Explain purpose and movement behind each amendment
//
// Layout: drawHeight (500) + controlHeight (60) = 560
// Two horizontal tracks: Amendments (top), Related Events (bottom)
// Filter to highlight one amendment family. Click any node for the detail panel.

let canvasWidth = 900;
let drawHeight = 500;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 16;

let yearStart = 1900;
let yearEnd = 1925;

let filterSelect;
let showRelatedCheckbox;
let resetBtn;

let selectedEvent = null;
let hoveredEvent  = null;
let hoveringWWI   = false;

// Color palette — one per amendment
const COLOR_16 = { r: 200, g: 160, b:  35 }; // gold — 16th (income tax)
const COLOR_17 = { r:  70, g:  60, b: 160 }; // indigo — 17th (direct election)
const COLOR_18 = { r: 190, g:  50, b:  50 }; // red — 18th (Prohibition)
const COLOR_19 = { r:  35, g: 140, b: 140 }; // teal — 19th (suffrage)
const COLOR_RELATED = { r: 110, g: 110, b: 120 };
const TRACK_COLOR_BG = { r: 245, g: 247, b: 250 };
const COLOR_WWI = { r: 130, g: 130, b: 130 };

const amendments = [
  {
    id: 'amend16',
    track: 'amend', kind: 'amend16', color: COLOR_16, labelDX: -55,
    year: 1913, label: '16th Amendment',
    short: 'Authorizes the federal income tax.',
    what: 'Ratified February 3, 1913. Empowers Congress to lay and collect taxes on incomes from whatever source derived, without apportionment among the states.',
    movement: 'Populist legacy and Progressive reformers. The Populist Party platform of 1892 demanded a graduated income tax; Progressives revived it as a way to shift the federal revenue base from regressive tariffs onto the wealthy.',
    context: 'After the Supreme Court struck down the 1894 income tax in Pollock v. Farmers\' Loan & Trust (1895), reformers needed a constitutional amendment. Bipartisan support grew once Republicans saw it as a way to defuse Democratic tariff attacks.',
    figures: 'William Jennings Bryan; President William Howard Taft (proposed it in 1909); Senator Norris Brown.',
    next: 'Made the modern federal government financially possible — funded WWI, the New Deal, and WWII. Tax burden gradually broadened from the wealthy to the middle class.',
    linksTo: []
  },
  {
    id: 'amend17',
    track: 'amend', kind: 'amend17', color: COLOR_17, labelStagger: 1, labelDX: 55,
    year: 1913, label: '17th Amendment',
    short: 'Direct popular election of U.S. senators.',
    what: 'Ratified April 8, 1913. Senators are elected directly by the voters of each state instead of being chosen by state legislatures.',
    movement: 'Direct-democracy wing of the Progressive movement. Tied to initiative, referendum, recall, and the secret ballot — reforms aimed at breaking machine and corporate control of state legislatures.',
    context: 'Decades of deadlocked legislatures and bribery scandals (William Lorimer of Illinois, 1912) discredited indirect election. By 1912, 29 states already used party primaries to bind their legislatures; the amendment ratified the de-facto change.',
    figures: 'William Jennings Bryan; muckraker David Graham Phillips ("Treason of the Senate," 1906); Senator Joseph Bristow.',
    next: 'Reduced the most blatant forms of senatorial corruption but did not end the Senate\'s role as a slow, deliberative body. Strengthened ties between senators and statewide donors.',
    linksTo: []
  },
  {
    id: 'amend18',
    track: 'amend', kind: 'amend18', color: COLOR_18, labelDX: -55,
    year: 1919, label: '18th Amendment',
    short: 'Prohibits the manufacture, sale, and transport of intoxicating liquors.',
    what: 'Ratified January 16, 1919; took effect January 17, 1920. Established nationwide Prohibition.',
    movement: 'Temperance movement, led by the Woman\'s Christian Temperance Union (WCTU, founded 1874) and the Anti-Saloon League (founded 1893) — the first modern single-issue pressure group.',
    context: 'WWI tipped a long-running campaign over the top: anti-German sentiment hurt brewers (Pabst, Busch); grain conservation arguments cast drinking as unpatriotic; wartime federal power normalized regulation of private behavior.',
    figures: 'Frances Willard (WCTU); Wayne Wheeler (Anti-Saloon League); Andrew Volstead (Volstead Act, 1919).',
    next: 'Largely unenforceable. Drove the rise of organized crime (Capone), speakeasies, and bootlegging. Repealed by the 21st Amendment in 1933 — the only amendment ever fully undone.',
    linksTo: ['repeal21']
  },
  {
    id: 'amend19',
    track: 'amend', kind: 'amend19', color: COLOR_19, labelStagger: 1, labelDX: 55,
    year: 1920, label: '19th Amendment',
    short: 'Guarantees women the right to vote.',
    what: 'Ratified August 18, 1920. Prohibits the federal and state governments from denying the right to vote on the basis of sex.',
    movement: 'Women\'s suffrage movement. Began at Seneca Falls (1848); led in the 20th century by NAWSA (Carrie Chapman Catt\'s "Winning Plan") and the more militant National Woman\'s Party (Alice Paul).',
    context: 'WWI was the decisive accelerant. Women\'s war work — in factories, the Red Cross, food administration — made denying them the vote politically untenable. NWP picketers ("Silent Sentinels") at the White House and their force-feeding in jail produced sympathetic press.',
    figures: 'Susan B. Anthony, Elizabeth Cady Stanton (earlier era); Carrie Chapman Catt (NAWSA); Alice Paul (NWP); Tennessee legislator Harry Burn (deciding ratification vote).',
    next: 'Doubled the eligible electorate, but Black women in the South remained largely disenfranchised by Jim Crow until the Voting Rights Act of 1965. Did not produce the immediate "women\'s bloc" suffragists predicted.',
    linksTo: []
  }
];

const relatedEvents = [
  {
    id: 'wctu-peak',
    track: 'related', kind: 'related', color: COLOR_RELATED,
    year: 1900, label: 'WCTU at peak',
    short: 'Woman\'s Christian Temperance Union at peak national influence under Frances Willard\'s legacy.',
    what: 'By 1900 the WCTU was the largest women\'s organization in the U.S., linking temperance to suffrage, labor reform, and child welfare under the slogan "Do Everything."',
    movement: 'Temperance — but functioning as a gateway to broader women\'s political activism.',
    context: 'Provided organizational training and political experience to a generation of women decades before they could vote.',
    figures: 'Frances Willard (d. 1898); successor leadership.',
    next: 'Channeled energy into the Anti-Saloon League and the suffrage movement.',
    linksTo: ['amend18', 'amend19']
  },
  {
    id: 'mckinley',
    track: 'related', kind: 'related', color: COLOR_RELATED, labelStagger: 1,
    year: 1901, label: 'McKinley assassinated',
    short: 'TR becomes president; Progressive Era accelerates.',
    what: 'President McKinley shot in Buffalo on Sept 6, 1901; died Sept 14. Vice President Theodore Roosevelt sworn in.',
    movement: 'Progressive reform — Roosevelt brought trust-busting, conservation, and consumer protection (Pure Food and Drug Act, Meat Inspection Act, 1906) to the federal level.',
    context: 'McKinley\'s assassination by an anarchist heightened public anxiety about industrial-era unrest and gave reformers a sympathetic chief executive.',
    figures: 'William McKinley; Theodore Roosevelt; assassin Leon Czolgosz.',
    next: 'TR\'s "Square Deal" set the rhetorical and legislative stage for the four amendments that followed.',
    linksTo: []
  },
  {
    id: 'asl-power',
    track: 'related', kind: 'related', color: COLOR_RELATED,
    year: 1905, label: 'Anti-Saloon League ascendant',
    short: 'Single-issue pressure-group politics perfected.',
    what: 'Under Wayne Wheeler the Anti-Saloon League pioneered "pressure politics" — endorsing dry candidates of either party, threatening primary challenges, mobilizing churches.',
    movement: 'Temperance, organizationally distinct from the WCTU and explicitly nonpartisan.',
    context: 'Model for every modern single-issue lobby (NRA, AARP, environmental groups). Wheeler personally drafted the Volstead Act.',
    figures: 'Wayne Wheeler; Howard Hyde Russell.',
    next: 'Drove Prohibition through Congress and 36 state legislatures in 13 months.',
    linksTo: ['amend18']
  },
  {
    id: 'nawsa-plan',
    track: 'related', kind: 'related', color: COLOR_RELATED, labelStagger: 1,
    year: 1916, label: 'NAWSA "Winning Plan"',
    short: 'Carrie Chapman Catt unifies state and federal strategies.',
    what: 'NAWSA adopted Catt\'s "Winning Plan" in 1916: simultaneous, coordinated pressure on Congress for a federal amendment and on state legislatures for state suffrage laws.',
    movement: 'Mainstream women\'s suffrage — moderate, broad-coalition wing.',
    context: 'Came at the same time the National Woman\'s Party (Alice Paul) was breaking off to wage confrontational tactics — the two-track pressure proved decisive.',
    figures: 'Carrie Chapman Catt; Anna Howard Shaw.',
    next: 'Federal amendment passed Congress in 1919 and was ratified August 1920.',
    linksTo: ['amend19']
  },
  {
    id: 'wwi',
    track: 'related', kind: 'related', color: COLOR_RELATED,
    year: 1917, label: 'U.S. enters WWI',
    short: 'Wartime nationalism accelerates both Prohibition and suffrage.',
    what: 'U.S. declares war April 6, 1917. Federal government takes unprecedented control of food, fuel, transport, and speech.',
    movement: 'Wartime nationalism — not a reform movement, but the political atmosphere that pushed both amendments over the line.',
    context: 'Anti-German feeling targeted brewers; grain conservation made beer "unpatriotic." Women\'s war work refuted the argument that they were unfit for citizenship. WWI shading on this timeline marks 1917–1918.',
    figures: 'Woodrow Wilson; Herbert Hoover (Food Administrator); women in the Red Cross and munitions factories.',
    next: 'Both the 18th and 19th Amendments were ratified within two years of the Armistice.',
    linksTo: ['amend18', 'amend19']
  },
  {
    id: 'volstead',
    track: 'related', kind: 'related', color: COLOR_RELATED, labelStagger: 1,
    year: 1919, label: 'Volstead Act',
    short: 'Implementing law for the 18th Amendment.',
    what: 'National Prohibition Act, passed October 28, 1919 over Wilson\'s veto, defined "intoxicating liquor" as anything over 0.5% alcohol — far stricter than most supporters expected.',
    movement: 'Anti-Saloon League — Wayne Wheeler effectively wrote the bill.',
    context: 'The 0.5% threshold banned beer and wine, alienating immigrant communities (German, Italian, Irish) who had supported only spirits restrictions.',
    figures: 'Andrew Volstead; Wayne Wheeler.',
    next: 'Made enforcement nearly impossible; enriched bootleggers and organized crime.',
    linksTo: ['amend18']
  },
  {
    id: 'repeal21',
    track: 'related', kind: 'related', color: COLOR_RELATED,
    year: 1925, label: 'Repeal pressure rising',
    short: 'By 1925 enforcement collapse and gangland violence build the case for repeal.',
    what: 'By the mid-1920s, urban juries refused to convict bootleggers, federal agents were hopelessly outnumbered, and Capone\'s Chicago organization grossed an estimated $60 million/year.',
    movement: 'Anti-Prohibition coalition — "wets" — including AAPA (Association Against the Prohibition Amendment) funded by industrialists like Pierre du Pont.',
    context: 'Demonstrated the limits of constitutional moralism; foreshadowed full repeal by the 21st Amendment in 1933.',
    figures: 'Pauline Sabin (Women\'s Organization for National Prohibition Reform); Al Capone (as embodiment of the failure).',
    next: 'Ratification of the 21st Amendment in December 1933 — the only amendment to repeal another.',
    linksTo: []
  }
];

const allEvents = amendments.concat(relatedEvents);

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  filterSelect = createSelect();
  filterSelect.option('All amendments', 'all');
  filterSelect.option('16th — Income tax', 'amend16');
  filterSelect.option('17th — Direct election', 'amend17');
  filterSelect.option('18th — Prohibition', 'amend18');
  filterSelect.option('19th — Suffrage', 'amend19');
  filterSelect.selected('all');
  filterSelect.changed(() => { selectedEvent = null; });

  showRelatedCheckbox = createCheckbox(' Show related events', true);

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => {
    filterSelect.selected('all');
    showRelatedCheckbox.checked(true);
    selectedEvent = null;
  });

  positionControls();
  describe('Progressive Era Amendments timeline 1900-1925 with two tracks. Top track shows the four amendments (16th, 17th, 18th, 19th). Bottom track shows related social-movement and political events. Filter by amendment, toggle related events, and click any node for a detail panel including the movement that produced it and what happened next.', LABEL);
}

function positionControls() {
  let y = drawHeight + 14;
  filterSelect.position(margin + 70, y);
  filterSelect.style('font-size', '13px');
  showRelatedCheckbox.position(margin + 280, y + 2);
  showRelatedCheckbox.style('font-size', '13px');
  resetBtn.position(canvasWidth - 70, y);
}

function eventX(year) {
  let usableW = canvasWidth - margin * 2 - 40;
  return margin + 30 + ((year - yearStart) / (yearEnd - yearStart)) * usableW;
}

function trackY(track) {
  let topPad = 80;
  if (track === 'amend')   return topPad + 60;
  if (track === 'related') return topPad + 200;
  return drawHeight / 2;
}

function isFiltered(ev) {
  let f = filterSelect.value();
  if (f === 'all') return false;
  if (ev.track === 'related') {
    // related event is "filtered out" only if it does NOT link to the chosen amendment
    if (!ev.linksTo) return true;
    return !ev.linksTo.includes(f);
  }
  // amendment events
  return ev.kind !== f;
}

function isHidden(ev) {
  if (ev.track === 'related' && !showRelatedCheckbox.checked()) return true;
  return false;
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
  text('Four Progressive Era Amendments — Timeline and Context (1900–1925)', canvasWidth / 2, 10);
  textStyle(NORMAL);
  fill(90);
  textSize(12);
  text('Click any node for what it changed, the movement that drove it, and what happened next.', canvasWidth / 2, 34);

  // WWI band first (behind tracks)
  drawWWIBand();

  // Tracks
  drawTrack('amend',   'Constitutional Amendments', { r: 30, g: 50, b: 110 });
  if (showRelatedCheckbox.checked()) {
    drawTrack('related', 'Social Movements & Political Events', COLOR_RELATED);
  }

  // Year axis
  drawYearAxis();

  // Event nodes
  hoveredEvent = null;
  for (let ev of allEvents) {
    if (isHidden(ev)) continue;
    drawEventNode(ev);
  }

  // WWI hover detection — set hoveringWWI for tooltip below
  hoveringWWI = isMouseOverWWI() && !hoveredEvent;

  // Detail / hover / legend panel
  if (selectedEvent) {
    drawDetailPanel(selectedEvent);
  } else if (hoveredEvent) {
    drawHoverTooltip(hoveredEvent);
  } else if (hoveringWWI) {
    drawWWITooltip();
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

function wwiRect() {
  let x1 = eventX(1917);
  let x2 = eventX(1918.85); // armistice Nov 11, 1918
  let yTop = 70;
  let yBot = trackY('related') + 60;
  return { x: x1, y: yTop, w: x2 - x1, h: yBot - yTop };
}

function isMouseOverWWI() {
  let r = wwiRect();
  return mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h;
}

function drawWWIBand() {
  let r = wwiRect();
  noStroke();
  fill(COLOR_WWI.r, COLOR_WWI.g, COLOR_WWI.b, 38);
  rect(r.x, r.y, r.w, r.h, 4);

  // Label
  fill(80, 80, 90);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(11);
  text('WWI', r.x + r.w / 2, r.y + 4);
  textStyle(NORMAL);
  textSize(9);
  text('1917–1918', r.x + r.w / 2, r.y + 18);
}

function drawTrack(track, label, color) {
  let y = trackY(track);
  let h = 100;
  noStroke();
  fill(TRACK_COLOR_BG.r, TRACK_COLOR_BG.g, TRACK_COLOR_BG.b, 200);
  rect(margin, y - h / 2, canvasWidth - margin * 2, h, 6);

  fill(color.r, color.g, color.b);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(12);
  text(label, margin + 8, y - h / 2 + 12);
  textStyle(NORMAL);

  // baseline
  stroke(color.r, color.g, color.b, 90);
  strokeWeight(2);
  line(margin + 30, y, canvasWidth - margin - 10, y);
  noStroke();
}

function drawYearAxis() {
  let y = trackY('related') + 70;
  if (!showRelatedCheckbox.checked()) {
    y = trackY('amend') + 80;
  }
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
    if (yr % 5 === 0 || yr === yearStart || yr === yearEnd) {
      fill(80);
      text(yr, x, y + 5);
    }
  }
}

function drawEventNode(ev) {
  let x = eventX(ev.year);
  let y = trackY(ev.track);
  let r = (ev.track === 'amend') ? 13 : 9;
  let dimmed = isFiltered(ev);
  let alpha = dimmed ? 50 : 255;

  // Hover
  let d = dist(mouseX, mouseY, x, y);
  let isHover = d < r + 4 && !dimmed;
  if (isHover) hoveredEvent = ev;
  let isSelected = selectedEvent && selectedEvent.id === ev.id;

  // Connector to label
  let stagger = (ev.labelStagger || 0);
  let baseOffset = (ev.track === 'amend') ? -32 : 26;
  let labelOffset = baseOffset + (stagger ? (ev.track === 'amend' ? -18 : 16) : 0);
  let labelDX = ev.labelDX || 0;
  stroke(ev.color.r, ev.color.g, ev.color.b, dimmed ? 40 : 180);
  strokeWeight(1);
  line(x, y, x + labelDX, y + labelOffset);

  // Node
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

  // Year inside node (only on amendments — too small on related)
  if (ev.track === 'amend') {
    fill(255, dimmed ? 80 : 255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(9);
    text(ev.year.toString().slice(2), x, y + 1);
    textStyle(NORMAL);
  }

  // Label
  fill(40, 40, 40, dimmed ? 70 : 230);
  let labelAbove = labelOffset < 0;
  textAlign(CENTER, labelAbove ? BOTTOM : TOP);
  textSize(ev.track === 'amend' ? 11 : 10);
  textStyle(isSelected ? BOLD : NORMAL);
  let labelY = y + labelOffset + (labelAbove ? -4 : 4);
  let labelW = ev.track === 'amend' ? 110 : 110;
  let labelX = constrain(x + labelDX - labelW / 2, margin + 2, canvasWidth - margin - labelW - 2);
  text(ev.label, labelX, labelY, labelW, 28);
  textStyle(NORMAL);
}

function drawHoverTooltip(ev) {
  let x = eventX(ev.year);
  let y = trackY(ev.track);
  let txt = ev.year + ' — ' + ev.label + ': ' + ev.short;

  textSize(12);
  let tw = min(textWidth(txt) + 16, canvasWidth - 40);
  let th = 36;
  let tx = constrain(x - tw / 2, margin, canvasWidth - tw - margin);
  let ty = (ev.track === 'amend') ? y + 50 : y - th - 30;

  noStroke();
  fill(30, 40, 60, 235);
  rect(tx, ty, tw, th, 6);
  fill(255);
  textAlign(LEFT, CENTER);
  text(txt, tx + 8, ty + th / 2, tw - 16, th - 8);
}

function drawWWITooltip() {
  let r = wwiRect();
  let txt = 'World War I (1917–1918): wartime nationalism accelerated both Prohibition (grain conservation, anti-German sentiment hurting brewers) and women\'s suffrage (women\'s war contributions made denial of the vote untenable).';

  textSize(12);
  let tw = min(canvasWidth - 60, 540);
  let th = 64;
  let tx = constrain(r.x + r.w / 2 - tw / 2, margin, canvasWidth - tw - margin);
  let ty = r.y + r.h + 6;

  noStroke();
  fill(30, 40, 60, 235);
  rect(tx, ty, tw, th, 6);
  fill(255);
  textAlign(LEFT, TOP);
  text(txt, tx + 10, ty + 8, tw - 20, th - 12);
}

function drawDetailPanel(ev) {
  let panelY = trackY('related') + 90;
  if (!showRelatedCheckbox.checked()) panelY = trackY('amend') + 110;
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
  yL = drawField(leftX, yL, colW, 'What it changed:', ev.what, ev.color, lineH);
  yL = drawField(leftX, yL + 4, colW, 'Movement / pressure:', ev.movement, ev.color, lineH);

  // Right column
  let yR = bodyY;
  yR = drawField(rightX, yR, colW, 'Historical context:', ev.context, ev.color, lineH);
  yR = drawField(rightX, yR + 4, colW, 'Key figures:', ev.figures, ev.color, lineH);
  yR = drawField(rightX, yR + 4, colW, 'What happened next:', ev.next, ev.color, lineH);

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
  let panelY = trackY('related') + 90;
  if (!showRelatedCheckbox.checked()) panelY = trackY('amend') + 110;
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
  text('Amendment Legend:', margin + 10, panelY + 8);
  textStyle(NORMAL);

  let legendItems = [
    { color: COLOR_16, label: '16th (1913) — Federal income tax. Populist legacy and Progressive reformers.' },
    { color: COLOR_17, label: '17th (1913) — Direct election of senators. Direct-democracy reformers.' },
    { color: COLOR_18, label: '18th (1919) — Prohibition. Temperance / WCTU / Anti-Saloon League. Repealed 1933.' },
    { color: COLOR_19, label: '19th (1920) — Women\'s suffrage. Seneca Falls legacy, NAWSA, NWP.' }
  ];

  textSize(11.5);
  for (let i = 0; i < legendItems.length; i++) {
    let it = legendItems[i];
    let y = panelY + 28 + i * 18;
    fill(it.color.r, it.color.g, it.color.b);
    ellipse(margin + 22, y + 6, 12, 12);
    fill(40);
    textAlign(LEFT, TOP);
    text(it.label, margin + 36, y, panelW - 50, 18);
  }

  // Hint
  fill(110);
  textStyle(ITALIC);
  textSize(11);
  let hintY = panelY + 28 + legendItems.length * 18 + 4;
  text('Hover the gray WWI band for a note on how the war drove ratification of the 18th and 19th.', margin + 10, hintY, panelW - 20, 32);
  textStyle(NORMAL);
}

function mousePressed() {
  for (let ev of allEvents) {
    if (isHidden(ev)) continue;
    if (isFiltered(ev)) continue;
    let x = eventX(ev.year);
    let y = trackY(ev.track);
    let r = (ev.track === 'amend') ? 14 : 11;
    if (dist(mouseX, mouseY, x, y) < r) {
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
