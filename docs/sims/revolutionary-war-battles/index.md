---
title: Revolutionary War Battles Map
description: Students explain the strategic significance of at least three major Revolutionary War battles and describe how geography influenced the war's outcome.
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# Revolutionary War Battles Map

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students explain the strategic significance of at least three major Revolutionary War battles and describe how geography influenced the war's outcome.

- **Bloom Level:** Understand (L2)
- **Bloom Verb:** Explain
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: The American Revolution (1754–1783)](../../chapters/04-american-revolution/index.md).

```text
Type: map
**sim-id:** revolutionary-war-battles<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to explore the geographic distribution of major Revolutionary War battles, understand the strategic logic of each campaign, and identify how the war's geography shaped its outcome.

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students explain the strategic significance of at least three major Revolutionary War battles and describe how geography influenced the war's outcome.

Canvas layout:
- Responsive width; height approximately 520px
- Simplified map of the eastern seaboard from Maine to Georgia
- Battle sites marked with clickable star icons
- British-controlled territory shaded light red; American/contested territory light blue

Battle sites to include (with years):
- Bunker Hill, MA (1775) — British victory, high British casualties
- Trenton, NJ (1776) — American surprise victory
- Philadelphia, PA (1777) — British occupation
- Saratoga, NY (1777) — American decisive victory; key to French alliance
- Valley Forge, PA (1777–78) — Winter encampment (not a battle; marked differently)
- Charleston, SC (1780) — British victory; beginning of Southern campaign
- Cowpens, SC (1781) — American victory in the South
- Yorktown, VA (1781) — Final British surrender

Clicking a battle site opens a panel showing:
- Battle name, date, and outcome (American win / British win / Draw)
- A 2-sentence strategic significance note
- A "Why it mattered" line connecting to the war's overall arc

Visual treatment:
- American victory stars: blue/gold
- British victory stars: red
- Valley Forge: brown tent icon (not a battle)
- Arrows showing the movement of British Southern campaign (1780–81)

Interactivity:
- Click site for detail panel
- "Show campaign" toggle draws a strategic overview arrow for the Northern (1775–76) and Southern (1780–81) campaigns

Responsive behavior: Map scales with canvas width; clickable areas scale proportionally.

Implementation: p5.js; map as simplified polygon coastline
```

## Related Resources

- [Chapter 4: The American Revolution (1754–1783)](../../chapters/04-american-revolution/index.md)
