# MicroSim Generation Log — Chapters 1–3

**Date:** 2026-05-10  
**Model:** Claude Sonnet 4.6  
**Session type:** `/microsim-utils` + `/microsim-generator` batch run

---

## What Was Done

### Step 1 — Extract TODO JSON specs

Ran `create-microsim-todo-json-files.py` across all 21 chapter files.

```
Chapters scanned:     21
Total diagram specs:  34
Already implemented:   0
TODO JSON files:      34  →  docs/sims/TODO/
```

### Step 2 — Scaffold all 34 sims

Ran `scaffold-microsims-from-todo.py`.

```
Scaffolded: 34
Skipped:     0
```

Each sim directory at `docs/sims/<sim-id>/` received stub `main.html`, `index.md`, and `metadata.json`.

### Step 3 — Generate MicroSim index page

Wrote `docs/sims/index.md` with a full grid of 35 MicroSims (34 new + existing graph-viewer), sorted alphabetically by title, using MkDocs Material `<div class="grid cards">` format.

### Step 4 — Update mkdocs.yml navigation

Added all 35 sims to the `- MicroSims:` section of `mkdocs.yml`, alphabetically sorted.

---

## MicroSims Implemented — Chapters 1–3

All 9 sims used p5.js. All received:
- Full JS implementation
- Corrected `main.html` (p5.js CDN, `<main>` tag, schema meta tag)
- Updated `index.md` (frontmatter, iframe, About, Embed, Lesson Plan, References)
- Iframe height synced via `fix-iframe-heights.py`
- Screenshot captured via `bk-capture-screenshot`
- Final validation score ≥ 83 (B or A grade)

### Chapter 1 — Historical Methods and Analytical Frameworks

| Sim ID | Title | Bloom | Score |
|--------|-------|-------|-------|
| `four-historical-thinking-skills` | Four Historical Thinking Skills Explorer | Understand L2 | **83 B** |
| `primary-source-analyzer` | Primary Source Analysis — HAPP Framework | Apply L3 | **88 A** |
| `cognitive-bias-identifier` | Cognitive Bias Identifier | Apply L3 | **88 A** |
| `causal-loop-diagram-builder` | Causal Loop Diagram — Gilded Age Industrial Economy | Analyze L4 | **88 A** |

**four-historical-thinking-skills**
- 2×2 clickable quadrant grid: Causation, Continuity & Change, Comparison, Contextualization
- Central "Historical Analysis" hub with spoke lines
- Click quadrant → infobox overlay with definition + U.S. history example
- Gold hover highlight; native Reset button in control area
- `drawHeight=460, controlHeight=50, CANVAS_HEIGHT=510`

**primary-source-analyzer**
- Step-through HAPP scaffold (5 steps: H, A, P, P, Claim)
- 3 source excerpts: Douglass (1852), Abigail Adams (1776), Monroe Doctrine (1823)
- Step indicator tabs; Show/Hide Analysis toggle; Prev/Next source and step buttons
- Model analysis revealed on demand — preserves productive struggle
- `drawHeight=480, controlHeight=60, CANVAS_HEIGHT=540`

**cognitive-bias-identifier**
- 8 shuffled historical scenarios; 5 bias answer cards
- Biases: Confirmation Bias, Hindsight Bias, Availability Heuristic, In-Group Favoritism, Presentism
- Submit → immediate specific feedback with explanation; score tracker
- "Try Again" flow: select → submit → see result → Next Scenario
- `drawHeight=440, controlHeight=60, CANVAS_HEIGHT=500`

**causal-loop-diagram-builder**
- 7 nodes (Industrial Output, Worker Wages, Consumer Demand, Corporate Profits, Capital Investment, Labor Unrest, Government Regulation)
- 9 directed edges with polarity labels (+/−)
- 3 identified loops: R1 (Consumer Demand), R2 (Investment Engine), B1 (Regulatory Brake)
- Click node → historical context panel; click edge → polarity + historical explanation
- "Find Loops" button highlights all loops by color; "Trace a Loop" mode steps through each loop
- `drawHeight=500, controlHeight=60, CANVAS_HEIGHT=560`

---

### Chapter 2 — Pre-Columbian Americas and European Contact

| Sim ID | Title | Bloom | Score |
|--------|-------|-------|-------|
| `european-exploration-timeline` | European Exploration Timeline (1450–1620) | Remember L1 | **88 A** |
| `pre-columbian-americas-map` | Pre-Columbian Americas Interactive Map | Remember L1 | **88 A** |
| `columbian-exchange-web` | The Columbian Exchange Interactive Web | Understand L2 | **88 A** |

**european-exploration-timeline**
- Horizontal timeline 1450–1620 with 13 events as clickable markers
- Color-coded by nation: Portugal, Spain, England, France, Netherlands
- Nation filter buttons (All / Portugal / Spain / England / France / Netherlands)
- Click marker → detail panel with significance note and connection to later history
- `drawHeight=440, controlHeight=60, CANVAS_HEIGHT=500`

**pre-columbian-americas-map**
- Simplified polygon map of the Americas with 6 clickable civilization regions
- Regions: Iroquois Confederacy, Mississippian Culture, Aztec Empire, Inca Empire, Pueblo Cultures, Pacific Northwest Peoples
- Ray-casting hit detection on polygon regions
- Click region → side panel: dates, population, defining feature, European contact consequence
- `drawHeight=470, controlHeight=60, CANVAS_HEIGHT=530`

**columbian-exchange-web**
- Three-zone layout: Americas | Atlantic Ocean | Old World
- 12 clickable item cards: 6 flowing East (maize, potato, tomato, cacao, tobacco, sweet potato), 6 flowing West (smallpox, horse, cattle, wheat, sugarcane, measles)
- Impact ratings: Medium / High / Catastrophic
- Arrow animations into ocean zone; click card → detail panel with impact rating + historical significance
- "Show High/Catastrophic Only" toggle filter
- `drawHeight=460, controlHeight=60, CANVAS_HEIGHT=520`

---

### Chapter 3 — Colonial America (1607–1754)

| Sim ID | Title | Bloom | Score |
|--------|-------|-------|-------|
| `colonial-society-structure` | Colonial Society Structure | Understand L2 | **88 A** |
| `colonial-regions-comparison` | Three Colonial Regions Comparison | Analyze L4 | **88 A** |

**colonial-society-structure**
- Triangular social pyramid with 5 layers (elite → enslaved)
- Region toggle: New England / Middle Colonies / Southern Colonies
- Pyramid proportions change by region — enslaved layer grows from ~2% (NE) to 40–50% (South)
- Click layer → info panel: legal rights, occupations, population %, regional differences
- Trapezoid hit-detection with linear interpolation
- `drawHeight=470, controlHeight=60, CANVAS_HEIGHT=530`

**colonial-regions-comparison**
- Three equal-width panels: New England | Middle Colonies | Southern Colonies
- 5 analytical dimensions: economy, religion, labor, governance, tensions with Britain
- Click one region → reveals full profile; click second → Compare mode activated
- Compare mode: red cells = different, green cells = similar across that dimension
- DIFF/SAME badges on first selected panel
- `drawHeight=480, controlHeight=60, CANVAS_HEIGHT=540`

---

## Files Created or Modified

### New files (per sim × 9)
```
docs/sims/<sim-id>/main.html        — p5.js HTML shell (replaced scaffold)
docs/sims/<sim-id>/<sim-id>.js      — Full p5.js implementation
docs/sims/<sim-id>/index.md         — Updated with About, Lesson Plan, References
docs/sims/<sim-id>/<sim-id>.png     — Screenshot (800px wide, height = CANVAS_HEIGHT)
```

### Updated files
```
docs/sims/index.md                  — Full grid of 35 MicroSims
mkdocs.yml                          — 35 sims added to MicroSims nav section
docs/sims/TODO/<sim-id>.json        — 34 TODO JSON specs (extracted from chapters)
docs/sims/<unimplemented-sim>/...   — 25 remaining scaffold dirs (main.html stub only)
```

---

## Validation Summary (9 implemented sims)

```
Validator: microsim-utils/validate-sims.py
Scoring rubric: main.html (10) + metadata.json (30) + index.md (35) + screenshot (5) + lesson plan (10) + references (5) + p5 conventions (5) = 100 pts

four-historical-thinking-skills    83  B
primary-source-analyzer            88  A
cognitive-bias-identifier          88  A
causal-loop-diagram-builder        88  A
european-exploration-timeline      88  A
pre-columbian-americas-map         88  A
columbian-exchange-web             88  A
colonial-society-structure         88  A
colonial-regions-comparison        88  A

Average: 87.2  —  8 of 9 grade A, 1 grade B
```

---

## Remaining Work (25 unimplemented sims)

The following sims are scaffolded (stub main.html + index.md) but have no JS implementation yet. They are organized here by chapter for easy batch processing in future sessions.

| Chapter | Sim ID |
|---------|--------|
| 4 | `colonial-resistance-timeline`, `revolutionary-war-battles` |
| 5 | `ap-thematic-lenses-ch5`, `checks-and-balances-explorer` |
| 6 | `judicial-review-explainer` |
| 7 | `reform-movement-network`, `transportation-revolution-map` |
| 8 | `civil-war-strategy-map` |
| 9 | `misinformation-detector` |
| 10 | `gilded-age-inequality`, `integration-strategies` |
| 11 | `populist-platform-tracker` |
| 12 | `progressive-amendments-timeline` |
| 13 | `versailles-comparison`, `wwi-decision-tree` |
| 14 | `depression-feedback-loops`, `new-deal-programs` |
| 15 | `wwii-timeline` |
| 16 | `arms-race-dynamics` |
| 17 | `civil-rights-timeline` |
| 18 | `social-movements-comparison` |
| 19 | `party-realignment` |
| 20 | `polarization-index` |
| 21 | `ai-warfare-spectrum`, `tech-power-shifts` |

**Suggested next session:** Run `/microsim-generator` on chapters 4–6 (5 sims).

---

## Tools Used

| Tool | Purpose |
|------|---------|
| `/microsim-utils` → `create-microsim-todo-json-files.py` | Extract specs from all 21 chapters |
| `/microsim-utils` → `scaffold-microsims-from-todo.py` | Create stub directories |
| `/microsim-utils` → `fix-iframe-heights.py` | Sync iframe heights from CANVAS_HEIGHT comments |
| `/microsim-utils` → `validate-sims.py` | Quality scoring |
| `bk-capture-screenshot` | Headless Chrome screenshots |
| `/microsim-generator` skill | p5.js implementation guide and workflow |
