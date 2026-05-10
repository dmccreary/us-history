---
title: Four Historical Thinking Skills Explorer
description: Interactive four-quadrant diagram exploring Causation, Continuity and Change, Comparison, and Contextualization — with definitions and U.S. history examples for each skill.
image: /sims/four-historical-thinking-skills/four-historical-thinking-skills.png
og:image: /sims/four-historical-thinking-skills/four-historical-thinking-skills.png
status: built
library: p5.js
bloom_level: Understand (L2)
quality_score: 68
---

# Four Historical Thinking Skills Explorer

## Learning Objective

Students can explain what each of the four historical thinking skills means and give an example of how each applies to a historical scenario.

- **Bloom Level:** Understand (L2) — Explain
- **Library:** p5.js | **Chapter:** 1 — Historical Methods and Analytical Frameworks

## Interactive Sim

<iframe src="main.html" width="100%" height="512px" scrolling="no"></iframe>

[Run Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive diagram presents the four historical thinking skills — Causation, Continuity & Change, Comparison, and Contextualization — as clickable quadrants connected by a central "Historical Analysis" hub. Clicking any quadrant reveals a definition and a concrete U.S. history example for that skill. Hover highlights guide students to explore all four skills before attempting the chapter quiz.

## Specification

The full specification below is extracted from
[Chapter 1: Historical Methods and Analytical Frameworks](../../chapters/01-historical-methods/index.md).

```text
Type: infographic
**sim-id:** four-historical-thinking-skills<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to explore the four historical thinking skills — Causation, Continuity and Change, Comparison, and Contextualization — through an interactive diagram that reinforces both their definitions and their relationships to each other.

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students can explain what each of the four historical thinking skills means and give an example of how each applies to a historical scenario.

Layout:
- Canvas is fully responsive to container width; height approximately 500px
- Four quadrants, each representing one skill, arranged in a 2×2 grid
- A central circle labeled "Historical Analysis" connects all four quadrants with spoke lines

Quadrant contents:
1. Top-left — Causation: chain-link icon; key question "Why did it happen?"
2. Top-right — Continuity and Change: overlapping arrows icon (one curved, one straight); key question "What stayed the same? What shifted?"
3. Bottom-left — Comparison: Venn diagram icon (two overlapping circles); key question "How are cases similar or different?"
4. Bottom-right — Contextualization: frame-around-scene icon; key question "What was the broader setting?"

Interactivity:
- Clicking any quadrant opens an infobox that overlays the right half of the canvas
- Infobox contains: skill name (bold, large), one-sentence definition, and one concrete U.S. history example
- Infobox has an ✕ close button in the top-right corner
- Hovering a quadrant highlights its border in gold (#f9a825) to signal it is clickable

Color scheme:
- Canvas background: dark navy (#1a237e)
- Quadrant borders: indigo (#3949ab)
- Active/hovered quadrant: gold border highlight
- Central circle: gold (#f9a825) with navy text
- Infobox background: white with dark text

Responsive behavior: On window resize, redraw all elements proportionally. Infobox width adjusts to ~45% of canvas width.

Implementation: p5.js; no external libraries needed
```

## Embed This MicroSim

```html
<iframe src="https://dmccreary.github.io/us-history/sims/four-historical-thinking-skills/main.html" height="512px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

**Duration:** 10–15 minutes | **Grade Level:** High School | **Subject:** U.S. History / Historical Methods

**Before using:** Ask students: "What questions do historians ask when studying the past?" Collect answers on the board.

**During:** Have students click each quadrant, read the definition, and identify one additional example from prior knowledge.

**After:** Students write one paragraph explaining which skill they think is most important for studying the causes of the Civil War, citing evidence from the sim.

**Extension:** Ask students to apply all four skills to a single event (e.g., the American Revolution) and discuss how the skills work together.

## References

- College Board AP U.S. History Curriculum Framework — Historical Thinking Skills (Causation, Continuity and Change Over Time, Comparison, Contextualization)
- Sam Wineburg, *Historical Thinking and Other Unnatural Acts* (2001)
- Lendol Calder, "Uncoverage: Toward a Signature Pedagogy for the History Survey," *Journal of American History* 92(4), 2006

## Related Resources

- [Chapter 1: Historical Methods and Analytical Frameworks](../../chapters/01-historical-methods/index.md)
