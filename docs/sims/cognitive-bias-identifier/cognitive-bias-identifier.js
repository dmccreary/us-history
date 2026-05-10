// Cognitive Bias Identifier — Historical Scenario Quiz
// CANVAS_HEIGHT: 500
// Chapter 1: Historical Methods and Analytical Frameworks
// Bloom Level: Apply (L3) — identify bias in varied historical scenarios

let canvasWidth = 700;
let drawHeight = 440;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 14;

let scenarioOrder = [];
let scenarioIdx = 0;
let selectedBias = null;   // null = no answer yet
let answered = false;
let score = 0;
let total = 0;
let nextBtn, resetBtn;

const biases = [
  { name: 'Confirmation\nBias',    short: 'Confirmation Bias',    r:57,  g:73,  b:171 },
  { name: 'Hindsight\nBias',       short: 'Hindsight Bias',       r:0,   g:137, b:123 },
  { name: 'Availability\nHeuristic', short: 'Availability Heuristic', r:46, g:125, b:50 },
  { name: 'In-Group\nFavoritism',  short: 'In-Group Favoritism',  r:230, g:81,  b:0   },
  { name: 'Presentism',            short: 'Presentism',           r:123, g:31,  b:162 }
];

const scenarios = [
  { text: 'A senator in 1915 reads only pro-war newspapers and dismisses every anti-war argument as "naive pacifism," never seriously engaging with the evidence against entering World War I.',
    correct: 0,
    explanation: 'Confirmation bias — the senator seeks out information that supports his existing pro-war view and ignores or dismisses contradicting evidence.' },
  { text: 'A student says, "It was obvious the 1929 stock market would crash — everyone was over-speculating. Any reasonable person could have seen it coming." But no widespread alarm existed before October 1929.',
    correct: 1,
    explanation: 'Hindsight bias — knowing the outcome (the crash) makes the student believe it was predictable, when it actually caught most observers by surprise.' },
  { text: 'A historian concludes that most 19th-century American families were preoccupied with westward expansion, based mainly on the diaries of settlers she found in the archive.',
    correct: 2,
    explanation: 'Availability heuristic — the historian over-generalizes from the most available sources (settler diaries) rather than recognizing they represent a small, self-selected group.' },
  { text: 'A Loyalist in 1775 describes the Sons of Liberty as "dangerous mobs threatening social order," while describing British soldiers quartered in Boston as "peacekeepers restoring law."',
    correct: 3,
    explanation: 'In-group favoritism — the Loyalist portrays his own group (British Crown supporters) positively and the opposition negatively, based on group identity rather than evidence.' },
  { text: 'A student argues that Thomas Jefferson was a hypocrite who should have immediately freed all enslaved people in 1776, judging him entirely by 21st-century moral standards.',
    correct: 4,
    explanation: 'Presentism — judging historical actors by today\'s moral standards, without accounting for the very different social, legal, and economic context they inhabited.' },
  { text: 'A war correspondent covers only the most dramatic battles and concludes that most soldiers experienced constant, intense combat throughout the war.',
    correct: 2,
    explanation: 'Availability heuristic — the most dramatic events are most memorable and available to the journalist, leading to an over-estimate of how common intense combat actually was.' },
  { text: 'A historian who already believes Reconstruction failed closely reads evidence of federal corruption, while consistently minimizing or glossing over evidence of freedpeople\'s political achievements.',
    correct: 0,
    explanation: 'Confirmation bias — the historian unconsciously emphasizes evidence that supports the "Reconstruction failed" thesis and downplays contradicting evidence.' },
  { text: 'An 1890 textbook praises westward expansion as civilizing "empty" lands, never acknowledging the Native nations who had lived there for centuries.',
    correct: 3,
    explanation: 'In-group favoritism — the textbook reflects Euro-American in-group perspective, erasing or minimizing the perspective and losses of Native peoples who are framed as the out-group.' }
];

function shuffle(arr) {
  let a = [...arr.keys()];
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  scenarioOrder = shuffle(scenarios);
  scenarioIdx = 0;

  nextBtn  = createButton('Next Scenario ▶');
  resetBtn = createButton('Restart Quiz');

  nextBtn.mousePressed(() => {
    if (!answered) return;
    scenarioIdx++;
    if (scenarioIdx >= scenarioOrder.length) scenarioOrder = shuffle(scenarios), scenarioIdx = 0;
    answered = false;
    selectedBias = null;
  });

  resetBtn.mousePressed(() => {
    scenarioOrder = shuffle(scenarios);
    scenarioIdx = 0;
    answered = false;
    selectedBias = null;
    score = 0;
    total = 0;
  });

  positionControls();
  describe('Cognitive bias identification quiz with historical scenarios. Read the scenario and click the cognitive bias that best describes it.', LABEL);
}

function positionControls() {
  nextBtn.position(10, drawHeight + 12);
  resetBtn.position(canvasWidth - 110, drawHeight + 12);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let sc = scenarios[scenarioOrder[scenarioIdx % scenarioOrder.length]];

  // Header
  noStroke();
  fill(30, 30, 120);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(17);
  text('Cognitive Bias Identifier', canvasWidth/2, 10);
  textStyle(NORMAL);

  // Score
  fill(80);
  textAlign(RIGHT, TOP);
  textSize(13);
  text('Score: ' + score + ' / ' + total, canvasWidth - margin, 10);

  // Scenario box
  let sy = 40, sh = 120;
  fill(245, 247, 255);
  stroke(57, 73, 171, 150);
  strokeWeight(1.5);
  rect(margin, sy, canvasWidth - margin*2, sh, 8);
  noStroke();

  fill(57, 73, 171);
  textStyle(BOLD);
  textSize(13);
  textAlign(LEFT, TOP);
  text('Scenario ' + ((scenarioIdx % scenarioOrder.length)+1) + ':', margin+10, sy+8);
  fill(30);
  textStyle(NORMAL);
  textSize(13);
  text(sc.text, margin+10, sy+26, canvasWidth - margin*2 - 20, sh - 34);

  // Question prompt
  noStroke();
  fill(60);
  textAlign(CENTER, TOP);
  textSize(14);
  textStyle(ITALIC);
  text('Which cognitive bias is most clearly at work here?', canvasWidth/2, 168);
  textStyle(NORMAL);

  // Bias buttons (drawn as clickable cards)
  let btnW = (canvasWidth - margin*2 - 16) / 5;
  let btnH = 70;
  let btnY = 192;
  for (let i = 0; i < biases.length; i++) {
    let b = biases[i];
    let bx = margin + i * (btnW + 4);
    let isSelected = selectedBias === i;
    let isCorrect = sc.correct === i;

    if (answered) {
      if (isCorrect) { fill(46, 125, 50, 200); stroke(46, 125, 50); }
      else if (isSelected && !isCorrect) { fill(200, 60, 60, 200); stroke(200, 60, 60); }
      else { fill(b.r, b.g, b.b, 60); stroke(180); }
    } else {
      fill(b.r, b.g, b.b, isSelected ? 220 : 130);
      stroke(isSelected ? 'white' : 180);
    }
    strokeWeight(isSelected ? 2.5 : 1);
    rect(bx, btnY, btnW, btnH, 8);

    noStroke();
    fill(answered ? (isCorrect ? 255 : (isSelected ? 255 : 80)) : 255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(min(13, btnW * 0.14));
    text(b.name, bx + btnW/2, btnY + btnH/2);

    if (answered && isCorrect) {
      textSize(18);
      text('✓', bx + btnW/2, btnY + btnH - 14);
    } else if (answered && isSelected && !isCorrect) {
      textSize(18);
      text('✗', bx + btnW/2, btnY + btnH - 14);
    }
  }
  textStyle(NORMAL);

  // Feedback / explanation
  let fy = 272;
  if (answered) {
    let correct = selectedBias === sc.correct;
    fill(correct ? 46 : 180, correct ? 125 : 60, correct ? 50 : 60, 30);
    stroke(correct ? 46 : 180, correct ? 125 : 60, correct ? 50 : 60);
    strokeWeight(1.5);
    rect(margin, fy, canvasWidth - margin*2, 100, 8);
    noStroke();
    fill(correct ? 20 : 160, correct ? 100 : 30, correct ? 20 : 30);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(13);
    text(correct ? '✓ Correct!' : '✗ Not quite. The answer is: ' + biases[sc.correct].short, margin+10, fy+8);
    fill(30);
    textStyle(NORMAL);
    textSize(13);
    text(sc.explanation, margin+10, fy+26, canvasWidth - margin*2 - 20, 70);
  } else if (selectedBias !== null) {
    fill(255, 245, 200);
    stroke(200, 160, 0);
    strokeWeight(1);
    rect(margin, fy, canvasWidth - margin*2, 40, 8);
    noStroke();
    fill(120, 80, 0);
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(ITALIC);
    text('You selected: ' + biases[selectedBias].short + ' — click "Submit Answer" to check, or change your selection.', canvasWidth/2, fy+20);
    textStyle(NORMAL);
  } else {
    noStroke();
    fill(130);
    textAlign(CENTER, TOP);
    textSize(13);
    textStyle(ITALIC);
    text('Click a bias card above to select your answer.', canvasWidth/2, fy+10);
    textStyle(NORMAL);
  }

  // Submit button (drawn)
  if (!answered && selectedBias !== null) {
    let sbx = canvasWidth/2 - 60, sby = 378;
    fill(57, 73, 171);
    noStroke();
    rect(sbx, sby, 120, 32, 6);
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(14);
    text('Submit Answer', sbx+60, sby+16);
    textStyle(NORMAL);
  }

  // Bias reference legend
  let ly = 420;
  noStroke();
  fill(100);
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Bias Reference:', margin, ly);
  textStyle(NORMAL);
  let defs = ['seeks confirming info', 'outcome seems obvious in hindsight', 'overweights memorable examples', 'favors one\'s own group', 'judges past by present standards'];
  for (let i = 0; i < biases.length; i++) {
    fill(biases[i].r, biases[i].g, biases[i].b);
    text(biases[i].short + ': ', margin + 100 + i * (canvasWidth-100-margin*2)/5, ly);
    fill(80);
    text(defs[i], margin + 100 + i * (canvasWidth-100-margin*2)/5 + textWidth(biases[i].short+': '), ly, (canvasWidth-100-margin*2)/5 - 4, 25);
  }

  // Control area label
  noStroke();
  fill(80);
  textAlign(LEFT, CENTER);
  textSize(13);
  text(answered ? 'Click "Next Scenario" to continue.' : 'Select a bias, then submit.', 160, drawHeight + controlHeight/2);

  positionControls();
}

function mousePressed() {
  let sc = scenarios[scenarioOrder[scenarioIdx % scenarioOrder.length]];
  let btnW = (canvasWidth - margin*2 - 16) / 5;
  let btnH = 70, btnY = 192;

  if (!answered) {
    for (let i = 0; i < biases.length; i++) {
      let bx = margin + i * (btnW + 4);
      if (mouseX > bx && mouseX < bx+btnW && mouseY > btnY && mouseY < btnY+btnH) {
        selectedBias = i;
        return;
      }
    }
    // Submit button
    if (selectedBias !== null) {
      let sbx = canvasWidth/2 - 60, sby = 378;
      if (mouseX > sbx && mouseX < sbx+120 && mouseY > sby && mouseY < sby+32) {
        answered = true;
        total++;
        if (selectedBias === sc.correct) score++;
      }
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}
