---
title: Civil War Battles and Strategy Map
description: Students examine how geography shaped Civil War military strategy, explaining the Anaconda Plan's logic and the significance of at least two major battles.
status: scaffold
library: p5.js
bloom_level: Analyze (L4)
---

# Civil War Battles and Strategy Map

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students examine how geography shaped Civil War military strategy, explaining the Anaconda Plan's logic and the significance of at least two major battles.

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Examine
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 8: Sectionalism and the Civil War (1844–1865)](../../chapters/08-civil-war/index.md).

```text
Type: map
**sim-id:** civil-war-strategy-map<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to explore the geographic logic of Civil War strategy, trace major campaigns and battles, and understand how geography shaped Union and Confederate military choices.

Bloom Level: Analyze (L4)
Bloom Verb: Examine

Learning Objective: Students examine how geography shaped Civil War military strategy, explaining the Anaconda Plan's logic and the significance of at least two major battles.

Canvas layout:
- Responsive width; height approximately 520px
- Simplified map of the eastern United States divided into Union (light blue) and Confederate (light red) regions at the war's start
- Union naval blockade shown as a dotted blue line along the Confederate coast
- Mississippi River control shown as a blue line
- Battle sites marked as clickable stars

Key battles/locations to mark:
- Fort Sumter, SC (1861) — war begins
- Bull Run, VA (1861 and 1862) — Confederate victories
- Shiloh, TN (1862) — bloody Union victory in the West
- Antietam, MD (1862) — bloodiest single day; Lincoln uses to announce Emancipation Proclamation
- Vicksburg, MS (1863) — Union controls the Mississippi
- Gettysburg, PA (1863) — turning point in the East
- Atlanta, GA (1864) — Sherman's capture; opens March to the Sea
- Appomattox, VA (1865) — Lee surrenders

Clicking a battle shows:
- Date and outcome
- Casualties (Union and Confederate)
- Strategic significance
- Connection to a key event (e.g., Antietam → Emancipation Proclamation timing)

Strategy overlays (toggleable):
- Anaconda Plan (naval blockade + Mississippi control)
- Eastern Theater campaigns (arrows showing Lee's invasion attempts north)
- Western Theater campaigns (Grant's campaign to control the Mississippi)
- Sherman's March (1864 arrow through Georgia)

Color scheme: Union blue / Confederate gray; battle stars colored by outcome (gold = Union win, red = Confederate win, white = draw).

Responsive behavior: Map scales with canvas; clickable areas scale proportionally.

Implementation: p5.js
```

## Related Resources

- [Chapter 8: Sectionalism and the Civil War (1844–1865)](../../chapters/08-civil-war/index.md)
