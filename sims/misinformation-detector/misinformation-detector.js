// Misinformation Detection MicroSim — Lost Cause Claims
// CANVAS_HEIGHT: 620
// Chapter 9: Reconstruction and Its Aftermath (1865–1877)
// Bloom Level: Evaluate (L5) — assess historical claims using a four-step
// misinformation detection framework (Source / Lateral Reading /
// Triangulation / Fact Check) anchored in primary-source evidence.

let canvasWidth = 800;
let drawHeight = 560;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 14;

let claimOrder = [];
let claimIdx = 0;
let activeStep = -1;        // which evidence step is currently revealed (-1 = none)
let stepsViewed = [false, false, false, false];
let selectedVerdict = null; // 0,1,2 -> Supported / Contradicted / Mixed
let answered = false;
let score = 0;
let total = 0;
let nextBtn, resetBtn;

const verdictLabels = [
  'Supported by evidence',
  'Contradicted by evidence',
  'Partially supported / context needed'
];

// 0 = Supported, 1 = Contradicted, 2 = Mixed
const claims = [
  {
    text: 'Southern states seceded over states\' rights, not slavery.',
    correct: 1,
    steps: [
      'This claim was popularized in the 1890s–1910s by the United Daughters of the Confederacy and Lost Cause writers — decades after the war, by people invested in defending the Confederacy\'s reputation and justifying Jim Crow.',
      'Modern historians working from primary sources (James McPherson, Eric Foner, David Blight) overwhelmingly conclude the seceding states themselves named slavery as the central cause. The "states\' rights" framing is a postwar reinterpretation.',
      'Three sources agree: (1) the secession declarations of Mississippi, South Carolina, Georgia, and Texas explicitly cite slavery; (2) the Confederate Constitution (1861) protects slavery by name; (3) Confederate VP Alexander Stephens\'s "Cornerstone Speech" calls slavery the Confederacy\'s "foundation."',
      'Mississippi\'s 1861 declaration: "Our position is thoroughly identified with the institution of slavery — the greatest material interest of the world." The primary documents directly contradict the claim.'
    ],
    explanation: 'CONTRADICTED. Primary sources from the seceding states themselves name slavery as the central cause. The "states\' rights" framing was constructed decades later by Lost Cause writers.'
  },
  {
    text: 'Reconstruction governments were uniquely corrupt and incompetent.',
    correct: 1,
    steps: [
      'This claim was advanced by the Dunning School of historians (c. 1900–1930) — white historians sympathetic to the South who portrayed Reconstruction as a failure to justify its overthrow and the disenfranchisement of Black voters.',
      'Since the 1960s, historians like Eric Foner ("Reconstruction: America\'s Unfinished Revolution") have shown Reconstruction governments built public schools, expanded suffrage, and were no more corrupt than Northern Gilded Age governments (e.g., Tweed\'s NYC ring).',
      'Three sources contradict the claim: (1) state legislative records show passage of public education laws; (2) federal corruption indices show similar levels in non-Reconstruction states; (3) Black officeholders\' records show competent governance, e.g., Sen. Hiram Revels and Rep. Robert Smalls.',
      'W. E. B. Du Bois\'s "Black Reconstruction in America" (1935) used legislative records and Freedmen\'s Bureau archives to document the construction of the South\'s first public school systems by Reconstruction governments.'
    ],
    explanation: 'CONTRADICTED. Reconstruction governments were comparable to other Gilded Age governments in corruption and exceeded them in achievements like public education. The "uniquely corrupt" claim served to justify their overthrow.'
  },
  {
    text: 'The Freedmen\'s Bureau helped millions transition from slavery to freedom.',
    correct: 0,
    steps: [
      'This claim originates with the Bureau\'s own records and is corroborated by 20th- and 21st-century historians (Foner, Du Bois, Downs) using primary archival sources rather than partisan postwar narratives.',
      'Historians of Reconstruction agree the Bureau (1865–1872) provided food, medical care, labor contracts, schools, and legal aid to roughly four million formerly enslaved people, while also being underfunded and resisted by white Southerners.',
      'Three sources confirm: (1) Bureau quarterly reports document millions of rations distributed; (2) the American Missionary Association records 4,000+ Bureau-supported schools; (3) labor contract records show hundreds of thousands of negotiated agreements.',
      'Bureau records held at the National Archives document over 21 million rations issued, 4,000+ schools established, and labor mediation for hundreds of thousands of freed people — directly supporting the claim.'
    ],
    explanation: 'SUPPORTED. Bureau archival records, school registries, and historian consensus all confirm the Bureau served millions during the transition out of slavery, despite being short-lived and underfunded.'
  },
  {
    text: 'Black voters were largely prevented from voting through violence and intimidation after 1877.',
    correct: 0,
    steps: [
      'The claim is grounded in primary-source documentation collected by Black journalists (Ida B. Wells), congressional investigators, and the NAACP from 1877 onward — sources with direct contemporary access to the events.',
      'Historians (Rayford Logan, C. Vann Woodward, Eric Foner) describe the post-1877 period as the "Nadir of American Race Relations," documenting systematic disenfranchisement through violence, poll taxes, literacy tests, and grandfather clauses.',
      'Three sources confirm: (1) Mississippi voter rolls show Black registration falling from 130,000+ in 1876 to under 1,500 by 1900; (2) lynching records (Tuskegee Institute) document 3,400+ Black victims 1882–1968; (3) state constitutional conventions explicitly stated disenfranchisement intent.',
      'The 1890 Mississippi Constitution and South Carolina\'s 1895 convention records explicitly state the goal of removing Black voters, and Census voter-registration data documents the collapse — directly supporting the claim.'
    ],
    explanation: 'SUPPORTED. Voter registration data, state constitutional records, and lynching documentation all confirm systematic violent disenfranchisement after Reconstruction ended.'
  },
  {
    text: 'Sharecropping gave freed people economic independence.',
    correct: 1,
    steps: [
      'The "economic independence" framing appeared in some postwar Southern almanacs and planter writings — sources with an interest in portraying the new labor system as voluntary and fair to freed people.',
      'Historians (Foner, Ransom & Sutch, Hahn) using plantation account books and Bureau records show sharecropping created cycles of debt peonage that trapped freed people in conditions approaching renewed bondage.',
      'Three sources contradict: (1) plantation ledgers show year-end debts owed to landowners; (2) crop-lien laws (e.g., Georgia 1872) gave merchants legal claim to harvests; (3) Bureau complaint records document widespread fraud against tenants.',
      'Ransom & Sutch\'s "One Kind of Freedom" (1977) analyzed plantation account books and found ~70% of Black sharecroppers ended each year deeper in debt. The primary financial records contradict the "independence" claim.'
    ],
    explanation: 'CONTRADICTED. Plantation account books, crop-lien laws, and Bureau records show sharecropping produced debt peonage, not economic independence. The system was a structural successor to slavery in many ways.'
  },
  {
    text: 'The Ku Klux Klan was primarily a social fraternity that occasionally became violent.',
    correct: 1,
    steps: [
      'This minimizing framing appears in early-20th-century Klan recruitment materials and in D. W. Griffith\'s 1915 film "Birth of a Nation" — sources produced by Klan sympathizers, not neutral observers.',
      'Historians (Allen Trelease, Elaine Frantz Parsons, Eric Foner) using Klan trial records, federal investigation reports, and victim testimony document the Klan was founded and operated as a paramilitary terror organization aimed at restoring white supremacy.',
      'Three sources contradict: (1) the 1871 Congressional KKK Hearings collected thousands of pages of victim testimony of murders and assaults; (2) federal indictments under the 1871 Klan Act resulted in hundreds of prosecutions; (3) Bureau records and local newspapers document organized political assassinations.',
      'The 13-volume "Report of the Joint Select Committee" (1872) on Klan violence in the South contains victim and perpetrator testimony documenting systematic murder, whipping, and arson — directly contradicting the "social fraternity" claim.'
    ],
    explanation: 'CONTRADICTED. Congressional hearings, federal indictments, and victim testimony document the Klan as a paramilitary terror organization. The "fraternity" framing came from later Klan apologists, not the historical record.'
  }
];

const stepLabels = [
  '1. Source the Claim',
  '2. Lateral Reading',
  '3. Triangulation',
  '4. Check the Facts'
];

const stepHints = [
  'Who made it, when, and what was their stake?',
  'What do historians from primary sources say?',
  'What do three independent evidence types show?',
  'What specific primary source confirms or refutes it?'
];

function shuffle(arr) {
  let a = [...arr.keys()];
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
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

  claimOrder = shuffle(claims);
  claimIdx = 0;

  nextBtn = createButton('Next Claim');
  resetBtn = createButton('Restart');

  nextBtn.mousePressed(() => {
    if (!answered) return;
    claimIdx++;
    if (claimIdx >= claimOrder.length) {
      claimOrder = shuffle(claims);
      claimIdx = 0;
    }
    activeStep = -1;
    stepsViewed = [false, false, false, false];
    selectedVerdict = null;
    answered = false;
  });

  resetBtn.mousePressed(() => {
    claimOrder = shuffle(claims);
    claimIdx = 0;
    activeStep = -1;
    stepsViewed = [false, false, false, false];
    selectedVerdict = null;
    answered = false;
    score = 0;
    total = 0;
  });

  positionControls();
  describe('Misinformation detection quiz on Lost Cause and Reconstruction claims. Use four evidence-investigation steps, then assess whether the claim is supported, contradicted, or mixed.', LABEL);
}

function positionControls() {
  nextBtn.position(10, drawHeight + 18);
  resetBtn.position(canvasWidth - 100, drawHeight + 18);
}

function draw() {
  updateCanvasSize();

  // Background regions
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let claim = claims[claimOrder[claimIdx % claimOrder.length]];

  // ---- Title ----
  noStroke();
  fill(30, 30, 120);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(18);
  text('Misinformation Detector — Lost Cause Claims', canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Score tracker
  noStroke();
  fill(80);
  textAlign(RIGHT, TOP);
  textSize(13);
  text('Score: ' + score + ' / ' + total + ' evaluated correctly', canvasWidth - margin, 10);

  // ---- Claim card (top panel) ----
  let cy = 36;
  let ch = 80;
  fill(255, 248, 220);
  stroke(200, 160, 0);
  strokeWeight(1.5);
  rect(margin, cy, canvasWidth - margin * 2, ch, 10);
  noStroke();

  fill(120, 80, 0);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(13);
  text('CLAIM TO EVALUATE:', margin + 12, cy + 8);
  fill(30);
  textStyle(NORMAL);
  textSize(15);
  text('"' + claim.text + '"', margin + 12, cy + 28, canvasWidth - margin * 2 - 24, ch - 36);

  // ---- Step buttons (middle panel) ----
  let sy = cy + ch + 12;
  let stepCount = 4;
  let gap = 8;
  let stepBtnH = 44;

  // 1 row of 4 step buttons
  let stepBtnW = (canvasWidth - margin * 2 - gap * (stepCount - 1)) / stepCount;

  noStroke();
  fill(60);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(13);
  text('Investigate before judging:', margin, sy);
  textStyle(NORMAL);

  let btnRowY = sy + 20;
  for (let i = 0; i < stepCount; i++) {
    let bx = margin + i * (stepBtnW + gap);
    let isActive = activeStep === i;
    let viewed = stepsViewed[i];

    if (isActive) {
      fill(33, 97, 140);
      stroke(20, 60, 100);
    } else if (viewed) {
      fill(180, 215, 240);
      stroke(33, 97, 140);
    } else {
      fill(230, 240, 250);
      stroke(120, 150, 180);
    }
    strokeWeight(isActive ? 2.5 : 1);
    rect(bx, btnRowY, stepBtnW, stepBtnH, 8);

    noStroke();
    fill(isActive ? 255 : 30);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(min(13, stepBtnW * 0.10));
    text(stepLabels[i], bx + stepBtnW / 2, btnRowY + 16);
    textStyle(NORMAL);
    textSize(min(11, stepBtnW * 0.085));
    fill(isActive ? 230 : 80);
    text(stepHints[i], bx + stepBtnW / 2, btnRowY + stepBtnH - 14, stepBtnW - 10);
  }

  // Step reveal panel
  let revealY = btnRowY + stepBtnH + 10;
  let revealH = 110;
  if (activeStep >= 0) {
    fill(245, 250, 255);
    stroke(33, 97, 140);
    strokeWeight(1.5);
    rect(margin, revealY, canvasWidth - margin * 2, revealH, 8);
    noStroke();
    fill(33, 97, 140);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(13);
    text(stepLabels[activeStep] + ' — ' + stepHints[activeStep], margin + 10, revealY + 8);
    fill(30);
    textStyle(NORMAL);
    textSize(13);
    text(claim.steps[activeStep], margin + 10, revealY + 28, canvasWidth - margin * 2 - 20, revealH - 36);
  } else {
    fill(248);
    stroke(220);
    strokeWeight(1);
    rect(margin, revealY, canvasWidth - margin * 2, revealH, 8);
    noStroke();
    fill(120);
    textAlign(CENTER, CENTER);
    textStyle(ITALIC);
    textSize(13);
    text('Click each numbered step above to reveal the evidence before deciding your verdict.', canvasWidth / 2, revealY + revealH / 2);
    textStyle(NORMAL);
  }

  // ---- Verdict panel (bottom) ----
  let vy = revealY + revealH + 12;
  noStroke();
  fill(60);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(13);
  text('Your verdict:', margin, vy);
  textStyle(NORMAL);

  // Verdict buttons (3 across)
  let vBtnY = vy + 20;
  let vBtnH = 40;
  let vGap = 8;
  let vBtnW = (canvasWidth - margin * 2 - vGap * 2) / 3;

  for (let i = 0; i < 3; i++) {
    let bx = margin + i * (vBtnW + vGap);
    let isSel = selectedVerdict === i;
    let isCorrect = claim.correct === i;

    let baseR = i === 0 ? 46 : (i === 1 ? 198 : 230);
    let baseG = i === 0 ? 125 : (i === 1 ? 80 : 160);
    let baseB = i === 0 ? 50 : (i === 1 ? 60 : 0);

    if (answered) {
      if (isCorrect) { fill(46, 125, 50, 220); stroke(46, 125, 50); }
      else if (isSel && !isCorrect) { fill(200, 60, 60, 200); stroke(200, 60, 60); }
      else { fill(baseR, baseG, baseB, 50); stroke(180); }
    } else {
      fill(baseR, baseG, baseB, isSel ? 220 : 130);
      stroke(isSel ? 'white' : 150);
    }
    strokeWeight(isSel ? 2.5 : 1);
    rect(bx, vBtnY, vBtnW, vBtnH, 8);

    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(min(13, vBtnW * 0.09));
    text(verdictLabels[i], bx + vBtnW / 2, vBtnY + vBtnH / 2, vBtnW - 10);
    textStyle(NORMAL);

    if (answered && isCorrect) {
      noStroke();
      fill(255);
      textSize(16);
      text('✓', bx + vBtnW - 14, vBtnY + 12);
    } else if (answered && isSel && !isCorrect) {
      noStroke();
      fill(255);
      textSize(16);
      text('✗', bx + vBtnW - 14, vBtnY + 12);
    }
  }

  // Submit button (drawn) and feedback
  let fy = vBtnY + vBtnH + 10;

  if (answered) {
    let correct = selectedVerdict === claim.correct;
    fill(correct ? 220 : 255, correct ? 245 : 235, correct ? 220 : 200);
    stroke(correct ? 46 : 200, correct ? 125 : 130, correct ? 50 : 0);
    strokeWeight(2);
    rect(margin, fy, canvasWidth - margin * 2, 84, 8);
    noStroke();
    fill(correct ? 20 : 150, correct ? 100 : 60, correct ? 30 : 0);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(13);
    text(correct
      ? '✓ Correct — verdict matches the evidence.'
      : '✗ Not quite. Revisit the evidence steps and reconsider.',
      margin + 10, fy + 8);
    fill(30);
    textStyle(NORMAL);
    textSize(13);
    text(claim.explanation, margin + 10, fy + 26, canvasWidth - margin * 2 - 20, 56);
  } else if (selectedVerdict !== null) {
    // Submit button
    let stepsDone = stepsViewed.filter(v => v).length;
    let canSubmit = stepsDone >= 2; // require at least 2 evidence steps before allowing submit

    let sbx = canvasWidth / 2 - 80, sby = fy + 6;
    fill(canSubmit ? color(33, 97, 140) : color(180));
    noStroke();
    rect(sbx, sby, 160, 34, 6);
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(14);
    text(canSubmit ? 'Submit Verdict' : 'View 2+ Steps First', sbx + 80, sby + 17);
    textStyle(NORMAL);

    noStroke();
    fill(120);
    textAlign(CENTER, TOP);
    textSize(12);
    textStyle(ITALIC);
    text('Selected: ' + verdictLabels[selectedVerdict] + '  (steps viewed: ' + stepsDone + '/4)',
      canvasWidth / 2, sby + 42);
    textStyle(NORMAL);
  } else {
    noStroke();
    fill(120);
    textAlign(CENTER, TOP);
    textSize(13);
    textStyle(ITALIC);
    text('Click a verdict above after reviewing the evidence steps.', canvasWidth / 2, fy + 10);
    textStyle(NORMAL);
  }

  // ---- Control area label ----
  noStroke();
  fill(80);
  textAlign(LEFT, CENTER);
  textSize(13);
  text(answered ? 'Click "Next Claim" to continue.' : 'Investigate the evidence, pick a verdict, then submit.',
    115, drawHeight + controlHeight / 2);

  positionControls();
}

function mousePressed() {
  let claim = claims[claimOrder[claimIdx % claimOrder.length]];

  // Geometry must mirror draw()
  let cy = 36, ch = 80;
  let sy = cy + ch + 12;
  let btnRowY = sy + 20;
  let stepBtnH = 44;
  let stepCount = 4;
  let gap = 8;
  let stepBtnW = (canvasWidth - margin * 2 - gap * (stepCount - 1)) / stepCount;

  // Step button hits
  for (let i = 0; i < stepCount; i++) {
    let bx = margin + i * (stepBtnW + gap);
    if (mouseX >= bx && mouseX <= bx + stepBtnW &&
        mouseY >= btnRowY && mouseY <= btnRowY + stepBtnH) {
      activeStep = (activeStep === i) ? -1 : i;
      stepsViewed[i] = true;
      return;
    }
  }

  if (answered) return;

  // Verdict buttons
  let revealY = btnRowY + stepBtnH + 10;
  let revealH = 110;
  let vy = revealY + revealH + 12;
  let vBtnY = vy + 20;
  let vBtnH = 40;
  let vGap = 8;
  let vBtnW = (canvasWidth - margin * 2 - vGap * 2) / 3;

  for (let i = 0; i < 3; i++) {
    let bx = margin + i * (vBtnW + vGap);
    if (mouseX >= bx && mouseX <= bx + vBtnW &&
        mouseY >= vBtnY && mouseY <= vBtnY + vBtnH) {
      selectedVerdict = i;
      return;
    }
  }

  // Submit hit
  if (selectedVerdict !== null) {
    let stepsDone = stepsViewed.filter(v => v).length;
    if (stepsDone < 2) return;
    let fy = vBtnY + vBtnH + 10;
    let sbx = canvasWidth / 2 - 80, sby = fy + 6;
    if (mouseX >= sbx && mouseX <= sbx + 160 &&
        mouseY >= sby && mouseY <= sby + 34) {
      answered = true;
      total++;
      if (selectedVerdict === claim.correct) score++;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}
