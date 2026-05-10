---
title: Vertical vs. Horizontal Integration — Interactive Diagram
description: Students explain the difference between vertical and horizontal integration and give a historical example of each strategy.
status: built
library: p5.js
bloom_level: Understand (L2)
---

# Vertical vs. Horizontal Integration — Interactive Diagram

## Learning Objective

Students explain the difference between vertical and horizontal integration and give a historical example of each strategy.

- **Bloom Level:** Understand (L2)
- **Bloom Verb:** Explain
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="722"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 10: The Gilded Age: Industrialization and Labor (1865–1890)](../../chapters/10-gilded-age-industry/index.md).

```text
Type: infographic
**sim-id:** integration-strategies<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Help students understand and distinguish between vertical and horizontal integration through interactive diagrams that use Carnegie Steel and Standard Oil as concrete examples.

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students explain the difference between vertical and horizontal integration and give a historical example of each strategy.

Canvas layout:
- Responsive width; height approximately 480px
- Two panels side by side: left = Vertical Integration (Carnegie Steel), right = Horizontal Integration (Standard Oil)
- Each panel shows a diagram of the business structure with clickable stages/nodes

Left panel — Vertical Integration (Carnegie Steel):
- Chain of nodes from top to bottom: Iron Ore Mines → Great Lakes Ships → Railroad Lines → Coal Fields → Steel Mills → Distribution Network
- Arrows pointing downward showing the production flow
- Each node labeled with the business unit and approximate percentage of total cost it represented

Right panel — Horizontal Integration (Standard Oil):
- Web of nodes: Standard Oil center → multiple refineries radiating outward, some shown in gold (acquired) and some in red (eliminated competitors)
- Percentage of market share shown increasing as more nodes are acquired

Interactivity:
- Clicking any node in either panel shows: what this stage/unit does, why controlling it gave competitive advantage, and one historical detail from Carnegie or Rockefeller
- A "Compare" button at bottom highlights the key difference: vertical controls the supply chain (independence from suppliers/distributors); horizontal controls market share (pricing power)
- "Advantages" and "Risks" buttons toggle annotation text on each diagram

Color scheme:
- Vertical integration chain: shades of blue (deeper = closer to finished product)
- Horizontal integration web: gold = Standard Oil controlled; gray = independent competitor; red = eliminated
- Background: white

Responsive behavior: Below 650px canvas width, panels stack vertically.

Implementation: p5.js
```

## Related Resources

- [Chapter 10: The Gilded Age: Industrialization and Labor (1865–1890)](../../chapters/10-gilded-age-industry/index.md)
