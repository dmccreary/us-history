// WWI Decision Tree — From Assassination to American Entry
// CANVAS_HEIGHT: 800
// Chapter 13: U.S. Imperialism and World War I (1898-1920)
// Bloom Level: Analyze (L4) — Trace the causal chain from Sarajevo to U.S. entry
//
// Layout: drawHeight (740) + controlHeight (60) = 800
// Vertical decision tree of 10 nodes connected by arrows top-to-bottom.
// Color-coded by primary actor. Contingent decisions are bordered in amber;
// pre-determined (treaty-bound) decisions get a darker border.
// Click a node for a detail panel; toggle counterfactual to see an alternate history.

let canvasWidth = 900;
let drawHeight = 740;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 16;

let resetBtn;
let counterfactualBtn;

let selectedNode = null;
let hoveredNode = null;
let showCounterfactual = false;

// Actor color palette
const COLOR_AUSTRIA = { r: 212, g: 175, b:  55 }; // gold
const COLOR_GERMANY = { r: 110, g: 115, b: 125 }; // gray
const COLOR_RUSSIA  = { r: 190, g:  45, b:  45 }; // red
const COLOR_BRITAIN = { r:  35, g:  85, b: 180 }; // blue
const COLOR_FRANCE  = { r:  35, g: 140, b: 140 }; // teal
const COLOR_SERBIA  = { r: 205, g: 105, b:  35 }; // dark orange
const COLOR_USA     = { r:  20, g:  35, b:  90 }; // navy

const AMBER  = { r: 245, g: 170, b:  40 };  // contingent border
const SLATE  = { r:  55, g:  65, b:  85 };  // pre-determined (treaty-bound) border

// Decision nodes — top to bottom causal chain
const nodes = [
  {
    id: 'sarajevo',
    title: 'Sarajevo Assassination',
    date: 'June 28, 1914',
    actor: 'Austria-Hungary',
    color: COLOR_AUSTRIA,
    decisionMaker: 'Gavrilo Princip (Black Hand)',
    choice: 'Assassinates Archduke Franz Ferdinand',
    contingent: true,
    what: 'In Sarajevo, 19-year-old Bosnian Serb nationalist Gavrilo Princip shot Archduke Franz Ferdinand, heir to the Austro-Hungarian throne, and his wife Sophie. An earlier bomb attempt that morning had failed; Princip succeeded only because the Archduke\'s driver took a wrong turn.',
    why: 'Bosnian Serb nationalists wanted Bosnia freed from Austrian rule and unified with Serbia. The Black Hand secret society armed and trained the assassins.',
    alternatives: 'The first attempt failed; without the driver\'s wrong turn, Princip would never have had his shot. The Archduke could easily have survived the day.',
    counterfactual: 'If the driver had not made the wrong turn, the assassination fails and Austria has no pretext for an ultimatum in 1914.'
  },
  {
    id: 'ultimatum',
    title: 'Austria issues ultimatum to Serbia',
    date: 'July 23, 1914',
    actor: 'Austria-Hungary',
    color: COLOR_AUSTRIA,
    decisionMaker: 'Foreign Minister Berchtold; Emperor Franz Joseph',
    choice: 'Deliberately harsh 10-point ultimatum',
    contingent: true,
    what: 'After nearly a month of delay, Austria issued Serbia a 48-hour ultimatum with ten demands so severe they were designed to be rejected, including allowing Austrian police to operate inside Serbia.',
    why: 'Austria wanted a localized war to crush Serbian nationalism. Germany had given the "blank check" promise of unconditional support on July 5.',
    alternatives: 'Austria could have accepted mediation by Britain, used the crisis diplomatically, or limited demands to ones Serbia could accept. Several Austrian leaders urged restraint.',
    counterfactual: 'If Austria had accepted British-proposed mediation, the crisis could have been contained through diplomacy as in earlier Balkan disputes.'
  },
  {
    id: 'declare-serbia',
    title: 'Austria declares war on Serbia',
    date: 'July 28, 1914',
    actor: 'Austria-Hungary',
    color: COLOR_AUSTRIA,
    decisionMaker: 'Emperor Franz Joseph',
    choice: 'Rejects Serbia\'s partial acceptance; declares war',
    contingent: true,
    what: 'Serbia accepted nine of the ten demands and offered international arbitration on the tenth. Austria rejected the response and declared war anyway, beginning the bombardment of Belgrade the next day.',
    why: 'Austrian hawks, especially Conrad von Hotzendorf, believed only war would settle the South Slav problem. The German "blank check" emboldened them.',
    alternatives: 'Even Kaiser Wilhelm, reading Serbia\'s reply, said it removed "every reason for war." Austria could have accepted the partial yes.',
    counterfactual: 'If Austria had accepted Serbia\'s reply, no general European war begins; the crisis ends as a diplomatic victory for the Central Powers.'
  },
  {
    id: 'russia-mobilize',
    title: 'Russia mobilizes to defend Serbia',
    date: 'July 30, 1914',
    actor: 'Russia',
    color: COLOR_RUSSIA,
    decisionMaker: 'Tsar Nicholas II',
    choice: 'Orders full mobilization',
    contingent: true,
    what: 'After agonizing back-and-forth, Tsar Nicholas II ordered full Russian mobilization. Russian military doctrine made partial mobilization technically impossible, so a limited response against Austria alone could not be ordered.',
    why: 'Russia saw itself as protector of Slavic peoples and could not let Austria crush Serbia without losing prestige and influence in the Balkans.',
    alternatives: 'Nicholas had hesitated for days and twice changed his order. He could have refused mobilization and accepted diplomatic humiliation.',
    counterfactual: 'If Russia had not mobilized, Germany might have waited; the war could have stayed a local Austria-Serbia conflict.'
  },
  {
    id: 'germany-war',
    title: 'Germany declares war and invades Belgium',
    date: 'August 1-4, 1914',
    actor: 'Germany',
    color: COLOR_GERMANY,
    decisionMaker: 'Kaiser Wilhelm II; General Moltke',
    choice: 'Executes Schlieffen Plan: war on Russia, France, and Belgium',
    contingent: false,
    what: 'Germany declared war on Russia on August 1, on France on August 3, and invaded neutral Belgium on August 3-4 to outflank French defenses. The Schlieffen Plan required striking France first and fast before Russia could fully mobilize.',
    why: 'German war planning had committed for over a decade to a two-front war fought by knocking out France in six weeks via Belgium, then turning east. The plan made political flexibility nearly impossible once mobilization began.',
    alternatives: 'Moltke briefly suggested attacking only Russia; Wilhelm asked if Germany could face east alone. Moltke said the rigid mobilization timetable made it impossible. The plan owned the planners.',
    counterfactual: 'If Germany had attacked only Russia and respected Belgium, Britain almost certainly stays out and the war remains a continental Eastern conflict.'
  },
  {
    id: 'britain-war',
    title: 'Britain declares war on Germany',
    date: 'August 4, 1914',
    actor: 'Britain',
    color: COLOR_BRITAIN,
    decisionMaker: 'Prime Minister Asquith; Foreign Secretary Grey',
    choice: 'Honors 1839 Treaty of London guaranteeing Belgian neutrality',
    contingent: false,
    what: 'When Germany ignored Britain\'s ultimatum to withdraw from Belgium, Britain declared war on Germany at 11 PM on August 4. The Cabinet, which had been split on intervention, unified behind defending Belgium.',
    why: 'The 1839 Treaty of London bound Britain to defend Belgian neutrality. Beyond treaty, a German-dominated Channel coast was a strategic nightmare. Public opinion shifted overnight when Belgium was invaded.',
    alternatives: 'Britain could in theory have abandoned Belgium, but Liberal Cabinet ministers like Lloyd George said the treaty made neutrality politically impossible. Two ministers resigned regardless.',
    counterfactual: 'If Germany had not invaded Belgium, Britain likely stays neutral, and Germany may have defeated France within months.'
  },
  {
    id: 'us-neutral',
    title: 'U.S. declares neutrality',
    date: 'August 4, 1914',
    actor: 'USA',
    color: COLOR_USA,
    decisionMaker: 'President Woodrow Wilson',
    choice: 'Declares neutrality "in thought as well as in action"',
    contingent: true,
    what: 'President Wilson issued a proclamation of neutrality on the same day Britain entered the war. He asked Americans to be "impartial in thought as well as action," reflecting the deep ethnic divisions of an immigrant nation.',
    why: 'The U.S. had a long isolationist tradition, no formal European alliances, and an electorate that included millions of German-Americans and Irish-Americans hostile to Britain.',
    alternatives: 'Wilson could have tilted publicly toward the Allies from the start. Instead he sought to be honest broker and to keep America out.',
    counterfactual: 'If Wilson had openly aligned with Britain in 1914, U.S. entry might have come years earlier, possibly shortening the war.'
  },
  {
    id: 'lusitania',
    title: 'Lusitania sinking and Sussex Pledge',
    date: 'May 7, 1915 - May 1916',
    actor: 'Germany',
    color: COLOR_GERMANY,
    decisionMaker: 'Kaiser Wilhelm II; Chancellor Bethmann-Hollweg',
    choice: 'Backs off unrestricted submarine warfare (for now)',
    contingent: true,
    what: 'A German U-boat sank the British liner Lusitania off Ireland, killing 1,198 people including 128 Americans. After American protests and the sinking of the Sussex (1916), Germany issued the Sussex Pledge, promising to warn merchant ships before sinking them.',
    why: 'Germany did not want to provoke U.S. entry while still hoping to defeat Britain through unrestricted submarine warfare later. The Sussex Pledge bought time.',
    alternatives: 'Germany could have escalated immediately in 1915. Or it could have committed permanently to restricted submarine warfare, keeping the U.S. neutral indefinitely.',
    counterfactual: 'If Germany had honored the Sussex Pledge permanently, the U.S. would likely have stayed out of the war entirely.'
  },
  {
    id: 'unrestricted-zimmermann',
    title: 'Unrestricted U-boats and Zimmermann Telegram',
    date: 'Feb 1 - Mar 1, 1917',
    actor: 'Germany',
    color: COLOR_GERMANY,
    decisionMaker: 'German High Command (Hindenburg, Ludendorff)',
    choice: 'Resumes unrestricted submarine warfare; offers Mexico alliance',
    contingent: true,
    what: 'On Feb 1, 1917, Germany resumed sinking all ships, including neutral American ones, bound for Allied ports. Weeks later, British intelligence revealed the Zimmermann Telegram in which Germany offered Mexico the return of Texas, New Mexico, and Arizona if Mexico would attack the U.S.',
    why: 'German generals calculated they could starve Britain into surrender in six months — before the U.S. could mobilize meaningfully. They knowingly accepted American entry as the price.',
    alternatives: 'Germany could have continued restricted warfare and kept the U.S. neutral. Civilian Chancellor Bethmann-Hollweg argued against the gamble and lost.',
    counterfactual: 'If Germany had kept restricted U-boat rules and never sent the Zimmermann Telegram, the U.S. likely never enters the war.'
  },
  {
    id: 'us-war',
    title: 'U.S. declares war on Germany',
    date: 'April 6, 1917',
    actor: 'USA',
    color: COLOR_USA,
    decisionMaker: 'President Wilson; Congress',
    choice: 'Asks Congress for war "to make the world safe for democracy"',
    contingent: false,
    what: 'After American ships were sunk and the Zimmermann Telegram was published, Wilson asked Congress for a declaration of war on April 2. Congress declared war on Germany on April 6, 1917 with 50 No votes in the House and 6 in the Senate.',
    why: 'Unrestricted submarine warfare attacked U.S. shipping directly; the Zimmermann Telegram showed Germany plotting against the United States itself. Neutrality had become untenable.',
    alternatives: 'Wilson could have tried armed neutrality (arming merchant ships only). He briefly attempted this in March 1917, but a Senate filibuster and continued sinkings made it inadequate.',
    counterfactual: 'If the U.S. had stayed out, Germany\'s 1918 Spring Offensive might have defeated Britain and France before they could recover.'
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

  counterfactualBtn = createButton('Show Counterfactual');
  counterfactualBtn.mousePressed(() => {
    if (selectedNode) showCounterfactual = !showCounterfactual;
  });

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => {
    selectedNode = null;
    showCounterfactual = false;
  });

  positionControls();
  describe('WWI Decision Tree from Sarajevo Assassination (June 1914) to U.S. declaration of war (April 1917). Ten nodes connected top-to-bottom by arrows, color-coded by actor. Click a node to see what happened, why, and alternatives, then toggle Counterfactual to see how history could have differed.', LABEL);
}

function positionControls() {
  let y = drawHeight + 18;
  counterfactualBtn.position(margin + 8, y);
  counterfactualBtn.style('font-size', '13px');
  resetBtn.position(canvasWidth - 70, y);
  resetBtn.style('font-size', '13px');
}

function nodeRect() {
  // Returns standard node width/height in pixels
  return { w: 360, h: 56 };
}

function nodeCenter(idx) {
  const r = nodeRect();
  const topPad = 60;
  const spacing = 8; // gap between nodes
  const x = canvasWidth / 2;
  const y = topPad + r.h / 2 + idx * (r.h + spacing);
  return { x, y };
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
  fill(20, 35, 90);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(17);
  text('WWI Decision Tree: From Sarajevo to American Entry (1914-1917)', canvasWidth / 2, 8);
  textStyle(NORMAL);
  fill(90);
  textSize(11);
  text('Click any node for details. Amber border = contingent decision; dark border = treaty-bound / pre-determined.', canvasWidth / 2, 30);

  // Hover detection reset
  hoveredNode = null;

  // Arrows between consecutive nodes (drawn first, beneath nodes)
  for (let i = 0; i < nodes.length - 1; i++) {
    drawArrow(i, i + 1);
  }

  // Node rectangles
  for (let i = 0; i < nodes.length; i++) {
    drawNode(nodes[i], i);
  }

  // Detail panel or legend
  if (selectedNode) {
    drawDetailPanel(selectedNode);
  }

  positionControls();
}

function drawArrow(fromIdx, toIdx) {
  const r = nodeRect();
  const a = nodeCenter(fromIdx);
  const b = nodeCenter(toIdx);
  const x = a.x;
  const y1 = a.y + r.h / 2;
  const y2 = b.y - r.h / 2;

  stroke(90, 100, 120, 200);
  strokeWeight(2);
  line(x, y1, x, y2 - 4);

  // Arrowhead
  noStroke();
  fill(90, 100, 120, 220);
  triangle(x - 6, y2 - 6, x + 6, y2 - 6, x, y2 + 1);
}

function drawNode(node, idx) {
  const r = nodeRect();
  const c = nodeCenter(idx);
  const w = r.w;
  const h = r.h;
  const x = c.x - w / 2;
  const y = c.y - h / 2;

  // Hover detection
  let isHover = (mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h);
  if (isHover) hoveredNode = node;
  let isSelected = selectedNode && selectedNode.id === node.id;

  // Fill
  noStroke();
  fill(node.color.r, node.color.g, node.color.b);
  rect(x, y, w, h, 8);

  // Border: amber for contingent, slate for pre-determined; thicker if hover/selected
  let border = node.contingent ? AMBER : SLATE;
  let bw = (isSelected || isHover) ? 4 : 3;
  stroke(border.r, border.g, border.b);
  strokeWeight(bw);
  noFill();
  rect(x, y, w, h, 8);
  noStroke();

  // Number badge
  fill(255, 255, 255, 220);
  ellipse(x + 18, y + h / 2, 26, 26);
  fill(node.color.r, node.color.g, node.color.b);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(13);
  text(idx + 1, x + 18, y + h / 2 + 1);

  // Title
  fill(255);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(13);
  text(node.title, x + 38, y + 8, w - 130, 18);

  // Date
  textStyle(NORMAL);
  textSize(11);
  fill(255, 255, 255, 210);
  text(node.date, x + 38, y + 26, w - 130, 14);

  // Choice (italic-ish via smaller weight)
  fill(255, 255, 255, 235);
  textSize(10.5);
  text('> ' + node.choice, x + 38, y + 39, w - 130, 14);

  // Actor label on right
  fill(255, 255, 255, 235);
  textAlign(RIGHT, CENTER);
  textStyle(BOLD);
  textSize(10);
  text(node.actor, x + w - 10, y + h / 2);
  textStyle(NORMAL);

  // Contingency badge bottom-right corner
  noStroke();
  let badgeColor = node.contingent ? AMBER : SLATE;
  fill(badgeColor.r, badgeColor.g, badgeColor.b);
  let badgeLabel = node.contingent ? 'CONTINGENT' : 'TREATY-BOUND';
  textAlign(RIGHT, BOTTOM);
  textStyle(BOLD);
  textSize(8);
  text(badgeLabel, x + w - 8, y + h - 4);
  textStyle(NORMAL);
}

function drawDetailPanel(node) {
  // Panel overlays the right side / bottom of the canvas
  const pw = min(420, canvasWidth - 2 * margin);
  const ph = 320;
  const px = canvasWidth - pw - margin;
  const py = drawHeight - ph - margin;

  // Card background
  noStroke();
  fill(255);
  stroke(node.color.r, node.color.g, node.color.b);
  strokeWeight(3);
  rect(px, py, pw, ph, 10);
  noStroke();

  // Header bar
  fill(node.color.r, node.color.g, node.color.b);
  rect(px, py, pw, 36, 10, 10, 0, 0);

  fill(255);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(13);
  text(node.title, px + 12, py + 18, pw - 90, 18);

  // Close hint
  textAlign(RIGHT, CENTER);
  textStyle(NORMAL);
  textSize(10);
  text('(click node again to close)', px + pw - 10, py + 18);

  // Body
  let bx = px + 14;
  let by = py + 44;
  let bw = pw - 28;

  fill(60);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(11);
  text(node.date + '  -  Decision-maker: ' + node.decisionMaker, bx, by, bw, 28);
  textStyle(NORMAL);

  by += 22;

  by = drawField(bx, by, bw, 'What happened:', node.what, node.color);
  by = drawField(bx, by + 6, bw, 'Why:', node.why, node.color);
  by = drawField(bx, by + 6, bw, 'Alternatives:', node.alternatives, node.color);

  // Counterfactual box (only when toggled)
  if (showCounterfactual) {
    by += 6;
    let cfH = textHeightWrap(node.counterfactual, bw - 18, 14) + 24;
    noStroke();
    fill(255, 245, 220);
    stroke(AMBER.r, AMBER.g, AMBER.b);
    strokeWeight(1.5);
    rect(bx, by, bw, cfH, 6);
    noStroke();
    fill(AMBER.r - 50, AMBER.g - 80, 30);
    textStyle(BOLD);
    textSize(10.5);
    textAlign(LEFT, TOP);
    text('Counterfactual:', bx + 8, by + 6);
    textStyle(NORMAL);
    fill(60, 50, 30);
    textSize(11);
    text(node.counterfactual, bx + 8, by + 22, bw - 16, cfH - 24);
  }
}

function drawField(x, y, w, label, body, color) {
  noStroke();
  fill(color.r, color.g, color.b);
  textStyle(BOLD);
  textSize(10.5);
  textAlign(LEFT, TOP);
  text(label, x, y);

  fill(45);
  textStyle(NORMAL);
  textSize(11);
  let bodyH = textHeightWrap(body, w, 14);
  text(body, x, y + 14, w, bodyH + 4);
  return y + 14 + bodyH;
}

function textHeightWrap(str, w, lineH) {
  textSize(11);
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
  // Ignore clicks in control area
  if (mouseY > drawHeight) return;

  const r = nodeRect();
  for (let i = 0; i < nodes.length; i++) {
    const c = nodeCenter(i);
    const x = c.x - r.w / 2;
    const y = c.y - r.h / 2;
    if (mouseX >= x && mouseX <= x + r.w && mouseY >= y && mouseY <= y + r.h) {
      if (selectedNode && selectedNode.id === nodes[i].id) {
        selectedNode = null;
        showCounterfactual = false;
      } else {
        selectedNode = nodes[i];
        showCounterfactual = false;
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
