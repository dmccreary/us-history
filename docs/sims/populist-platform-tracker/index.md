---
title: Populist Policy Platform — Then and Now
description: Students examine how political demands that seem radical in one era become mainstream in another, and identify the political conditions that enabled or blocked the adoption of Populist demands.
status: built
library: p5.js
bloom_level: Analyze (L4)
---

# Populist Policy Platform — Then and Now

## Learning Objective

Students examine how political demands that seem radical in one era become mainstream in another, and identify the political conditions that enabled or blocked the adoption of Populist demands.

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Examine
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="640" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 11: Populism and the Closing of the Frontier (1880–1900)](../../chapters/11-populism-frontier/index.md).

```text
Type: infographic
**sim-id:** populist-platform-tracker<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to explore the 1892 People's Party platform demands and track which were eventually enacted into law, when, and under what political conditions — illustrating how "radical" reform ideas move from the margins to the mainstream.

Bloom Level: Analyze (L4)
Bloom Verb: Examine

Learning Objective: Students examine how political demands that seem radical in one era become mainstream in another, and identify the political conditions that enabled or blocked the adoption of Populist demands.

Canvas layout:
- Responsive width; height approximately 480px
- Left column: eight Populist platform demands from the 1892 Omaha Platform, each as a clickable card
- Right side: when a card is clicked, a detail panel shows: the specific demand, whether it was enacted, when, and under what president/law — or why it was not enacted

Platform demand cards:
1. Government ownership of railroads → Partly enacted (ICC strengthened; railroads nationalized briefly in WWI) 
2. Graduated income tax → Enacted: 16th Amendment (1913)
3. Direct election of senators → Enacted: 17th Amendment (1913)
4. Secret ballot → Enacted: widely adopted by states 1890s–1910s
5. Flexible currency (silver) → Modified: gold standard abandoned 1933; Federal Reserve (1913) added flexibility
6. Subtreasury system for farm loans → Partly enacted: Farm Credit Act (1933), Agricultural Adjustment Act
7. Eight-hour workday → Enacted: Fair Labor Standards Act (1938)
8. Postal savings banks → Enacted: Postal Savings System (1910, abolished 1967)

Each card shows a color-coded status badge: green = fully enacted, amber = partially enacted, red = not enacted.

Interactivity:
- Clicking a card shows the full detail panel with enactment year, the law/amendment name, and a 1-sentence note on why it took as long as it did
- "Timeline" button shows a simplified timeline of when each demand was enacted relative to 1892
- Filter buttons: "Enacted," "Partial," "Not Enacted"

Color scheme: Green/amber/red status badges; gold card borders; white panels.

Responsive behavior: Cards stack in 2 columns on narrow canvas.

Implementation: p5.js
```

## Related Resources

- [Chapter 11: Populism and the Closing of the Frontier (1880–1900)](../../chapters/11-populism-frontier/index.md)
