// Primary Source Analysis — HAPP Framework Step-Through
// CANVAS_HEIGHT: 540
// Chapter 1: Historical Methods and Analytical Frameworks
// Bloom Level: Apply (L3) — guided step-through with model analysis

let canvasWidth = 700;
let drawHeight = 480;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 14;
let defaultTextSize = 14;

let sourceIdx = 0;
let happStep = 0;   // 0=H, 1=A, 2=P1, 3=P2, 4=Claim
let revealed = false;

let prevSrcBtn, nextSrcBtn, prevStepBtn, nextStepBtn, revealBtn, resetBtn;

const sources = [
  {
    title: 'Frederick Douglass, "What to the Slave is the Fourth of July?" (1852)',
    excerpt: '"What, to the American slave, is your 4th of July? I answer: a day that reveals to him, more than all other days in the year, the gross injustice and cruelty to which he is the constant victim. To him, your celebration is a sham; your boasted liberty, an unholy license; your national greatness, swelling vanity."',
    happ: [
      { label:'H — Historical Situation', prompt:'When was this written? What was happening in the United States at this moment?',
        analysis:'1852 — just two years after the Fugitive Slave Act of 1850, which required Northern citizens to return escaped enslaved people. Abolition debates were intensifying; Douglass himself had escaped slavery in 1838.' },
      { label:'A — Audience', prompt:'Who was Douglass speaking to? How does that shape the message?',
        analysis:'Predominantly white abolitionists and citizens of Rochester, NY. Douglass challenges his audience directly — people who celebrate independence while tolerating slavery — making the contradiction impossible to ignore.' },
      { label:'P — Purpose', prompt:'What was Douglass trying to accomplish with this speech?',
        analysis:'To persuade white Northern audiences that independence celebrations were morally hollow while slavery existed. He wanted to shock listeners into recognizing their complicity and demand abolition.' },
      { label:'P — Point of View', prompt:'How does Douglass\'s own experience shape what he says and how?',
        analysis:'As a formerly enslaved person, Douglass speaks from direct experience of slavery\'s brutality. This gives him moral authority but also means his perspective represents the enslaved — not a neutral outside observer.' },
      { label:'Sourcing Claim', prompt:'Write a claim that connects all four elements (H, A, P, P).',
        analysis:'Because Douglass wrote this in 1852 — when the Fugitive Slave Act made Northern complicity undeniable (H) — and addressed it to white abolitionists (A) to demand action (P), his own experience of enslavement (P) makes this source a powerful and credible challenge to American hypocrisy, though it reflects the perspective of those most directly harmed by slavery.' }
    ]
  },
  {
    title: 'Abigail Adams, "Remember the Ladies" Letter to John Adams (1776)',
    excerpt: '"I desire you would remember the ladies and be more generous and favorable to them than your ancestors. Do not put such unlimited power into the hands of the husbands. Remember all men would be tyrants if they could. If particular care and attention is not paid to the ladies, we are determined to foment a rebellion."',
    happ: [
      { label:'H — Historical Situation', prompt:'When was this written? What events were happening?',
        analysis:'March 1776 — the Continental Congress was actively debating independence. Colonial women had no legal rights to property, contract, or voting. The language of liberty and natural rights was in the air.' },
      { label:'A — Audience', prompt:'Who was the intended audience for this letter?',
        analysis:'John Adams, Abigail\'s husband and a delegate to Congress. The private relationship makes this more candid than a public petition — she expects her husband to take her seriously even if he ultimately won\'t act.' },
      { label:'P — Purpose', prompt:'What was Adams trying to accomplish?',
        analysis:'To persuade the Congress to include legal protections for women in the new American legal code. She uses both moral argument and a veiled threat of "rebellion" to make her case.' },
      { label:'P — Point of View', prompt:'How does Adams\'s social position shape this source?',
        analysis:'Adams was an educated, elite colonial woman — unusual. Her access to political conversation through her husband meant she could speak to power. Her view represents literate, elite women, not the experiences of enslaved or poor women.' },
      { label:'Sourcing Claim', prompt:'Write a claim connecting H, A, P, and P.',
        analysis:'Written during the debates over independence in 1776 (H) to her husband John Adams (A), Adams\'s purpose was to lobby for legal rights for women (P), but her elite status as a congressmen\'s wife (P) meant she could raise this demand — unlike most women — making this source a unique window into elite women\'s political aspirations during the founding era.' }
    ]
  },
  {
    title: 'James Monroe, The Monroe Doctrine (1823)',
    excerpt: '"The American continents… are henceforth not to be considered as subjects for future colonization by any European powers… We should consider any attempt on their part to extend their system to any portion of this hemisphere as dangerous to our peace and safety."',
    happ: [
      { label:'H — Historical Situation', prompt:'What was happening in the Americas and Europe in 1823?',
        analysis:'Spain\'s Latin American colonies were winning independence (1810–1825). The Holy Alliance (Russia, Austria, Prussia) discussed restoring Spanish control. Britain, wanting trade access, informally supported U.S. resistance to European intervention.' },
      { label:'A — Audience', prompt:'Who was Monroe\'s actual audience?',
        analysis:'Formally, the U.S. Congress; but the real audience was European monarchies — especially Russia, Austria, and France — being warned against intervention in the Western Hemisphere. Britain was an implicit partner.' },
      { label:'P — Purpose', prompt:'What was Monroe trying to accomplish?',
        analysis:'To warn European powers against reconolizing the Western Hemisphere and to position the U.S. as the dominant power in the Americas — asserting regional leadership beyond what U.S. military power could actually enforce in 1823.' },
      { label:'P — Point of View', prompt:'How does the U.S. position in 1823 shape this document?',
        analysis:'The U.S. was a relatively young, militarily weak nation issuing bold warnings it couldn\'t enforce alone. The Doctrine reflects ambitious nationalism — the belief that the U.S. was destined to lead the hemisphere — more than actual power.' },
      { label:'Sourcing Claim', prompt:'Write a claim connecting H, A, P, and P.',
        analysis:'Written in 1823, when European powers threatened to reverse Latin American independence (H), Monroe\'s Doctrine addressed both Congress and European monarchies (A) to assert U.S. hemispheric leadership (P) — but the young nation\'s limited military power (P) reveals that this was as much aspirational nationalism as genuine deterrence.' }
    ]
  }
];

const stepColors = [
  [57, 73, 171],   // H - indigo
  [0, 137, 123],   // A - teal
  [46, 125, 50],   // P1 - green
  [230, 81, 0],    // P2 - orange
  [100, 50, 150]   // Claim - purple
];

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  prevSrcBtn  = createButton('◀ Source');
  nextSrcBtn  = createButton('Source ▶');
  prevStepBtn = createButton('◀ Back');
  nextStepBtn = createButton('Next ▶');
  revealBtn   = createButton('Show Analysis');
  resetBtn    = createButton('Reset');

  prevSrcBtn.mousePressed(() => { sourceIdx = (sourceIdx + sources.length - 1) % sources.length; happStep = 0; revealed = false; });
  nextSrcBtn.mousePressed(() => { sourceIdx = (sourceIdx + 1) % sources.length; happStep = 0; revealed = false; });
  prevStepBtn.mousePressed(() => { if (happStep > 0) { happStep--; revealed = false; } });
  nextStepBtn.mousePressed(() => { if (happStep < 4) { happStep++; revealed = false; } });
  revealBtn.mousePressed(() => { revealed = !revealed; revealBtn.html(revealed ? 'Hide Analysis' : 'Show Analysis'); });
  resetBtn.mousePressed(() => { happStep = 0; revealed = false; revealBtn.html('Show Analysis'); });

  positionControls();
  describe('Step-through primary source analysis tool using the HAPP framework. Navigate through Historical Situation, Audience, Purpose, and Point of View for three primary source excerpts.', LABEL);
}

function positionControls() {
  let y = drawHeight + 12;
  prevSrcBtn.position(10, y);
  nextSrcBtn.position(90, y);
  prevStepBtn.position(200, y);
  nextStepBtn.position(275, y);
  revealBtn.position(360, y);
  resetBtn.position(canvasWidth - 70, y);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let src = sources[sourceIdx];
  let step = src.happ[happStep];
  let col = stepColors[happStep];

  // Title bar
  noStroke();
  fill(col[0], col[1], col[2]);
  rect(0, 0, canvasWidth, 36);
  fill(255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(15);
  text('Primary Source Analysis — HAPP Framework', canvasWidth/2, 18);
  textStyle(NORMAL);

  // Source counter + title
  let sy = 44;
  noStroke();
  fill(50);
  textAlign(LEFT, TOP);
  textSize(12);
  text('Source ' + (sourceIdx+1) + ' of ' + sources.length + ':', margin, sy);
  textStyle(BOLD);
  fill(30);
  textSize(13);
  text(src.title, margin + 85, sy, canvasWidth - margin*2 - 85, 30);
  textStyle(NORMAL);

  // Excerpt box
  let ey = 76, eh = 120;
  fill(240, 244, 255);
  stroke(col[0], col[1], col[2], 100);
  strokeWeight(1);
  rect(margin, ey, canvasWidth - margin*2, eh, 6);
  noStroke();
  fill(40);
  textStyle(ITALIC);
  textSize(13);
  textAlign(LEFT, TOP);
  text(src.excerpt, margin+10, ey+8, canvasWidth - margin*2 - 20, eh - 16);
  textStyle(NORMAL);

  // HAPP step indicator
  let stepNames = ['H', 'A', 'P', 'P', 'Claim'];
  let bw = (canvasWidth - margin*2) / 5;
  for (let i = 0; i < 5; i++) {
    let c = stepColors[i];
    let bx = margin + i * bw;
    if (i === happStep) {
      fill(c[0], c[1], c[2]);
      stroke('white');
    } else {
      fill(c[0], c[1], c[2], 70);
      stroke(c[0], c[1], c[2], 100);
    }
    strokeWeight(1);
    rect(bx, 202, bw - 4, 28, 4);
    noStroke();
    fill(i === happStep ? 255 : 80);
    textAlign(CENTER, CENTER);
    textStyle(i === happStep ? BOLD : NORMAL);
    textSize(13);
    text(stepNames[i], bx + bw/2 - 2, 216);
  }
  textStyle(NORMAL);

  // Step label
  noStroke();
  fill(col[0], col[1], col[2]);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(16);
  text(step.label, margin, 240);
  textStyle(NORMAL);

  // Prompt
  fill(50);
  textSize(14);
  textAlign(LEFT, TOP);
  text('→ ' + step.prompt, margin, 264, canvasWidth - margin*2, 50);

  // Revealed analysis
  if (revealed) {
    let ay = 322, ah = 140;
    fill(col[0], col[1], col[2], 18);
    stroke(col[0], col[1], col[2], 180);
    strokeWeight(1.5);
    rect(margin, ay, canvasWidth - margin*2, ah, 8);
    noStroke();
    fill(col[0], col[1], col[2]);
    textStyle(BOLD);
    textSize(13);
    textAlign(LEFT, TOP);
    text('Model Analysis:', margin+10, ay+8);
    fill(30);
    textStyle(NORMAL);
    textSize(13);
    text(step.analysis, margin+10, ay+26, canvasWidth - margin*2 - 20, ah - 34);
  } else {
    let ay = 322;
    fill(200);
    stroke(220);
    strokeWeight(1);
    rect(margin, ay, canvasWidth - margin*2, 50, 8);
    noStroke();
    fill(130);
    textAlign(CENTER, CENTER);
    textStyle(ITALIC);
    textSize(14);
    text('Think about the prompt above, then click "Show Analysis" to see a model response.', canvasWidth/2, ay+25);
    textStyle(NORMAL);
  }

  // Progress note
  noStroke();
  fill(100);
  textAlign(RIGHT, BOTTOM);
  textSize(12);
  text('Step ' + (happStep+1) + ' of 5', canvasWidth - margin, drawHeight - 8);

  positionControls();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}
