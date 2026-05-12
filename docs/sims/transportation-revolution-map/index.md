---
title: The Transportation Revolution — Connections Map
description: Students examine how transportation networks shaped economic geography, explaining how the Erie Canal and railroad expansion connected markets and accelerated the Market Revolution.
status: built
library: p5.js
bloom_level: Analyze (L4)
---

# The Transportation Revolution — Connections Map

## Learning Objective

Students examine how transportation networks shaped economic geography, explaining how the Erie Canal and railroad expansion connected markets and accelerated the Market Revolution.

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Examine
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="700" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: Manifest Destiny and Antebellum Reform (1828–1848)](../../chapters/07-manifest-destiny-reform/index.md).

```text
Type: map
**sim-id:** transportation-revolution-map<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to visualize how canals, roads, and early railroads progressively connected the American economy between 1800 and 1860, and understand how transportation infrastructure shaped economic growth and regional integration.

Bloom Level: Analyze (L4)
Bloom Verb: Examine

Learning Objective: Students examine how transportation networks shaped economic geography, explaining how the Erie Canal and railroad expansion connected markets and accelerated the Market Revolution.

Canvas layout:
- Responsive width; height approximately 500px
- Simplified map of the eastern United States and Midwest showing major waterways
- Time slider at the bottom: 1800 → 1820 → 1840 → 1860
- As the slider advances, new transport routes appear on the map in different colors

Transport layers:
- 1800: Major navigable rivers only (blue lines) — Ohio, Mississippi, Hudson
- 1820: National Road (tan line) and early turnpikes
- 1825: Erie Canal added (distinct canal-blue dashed line) with tooltip showing cost/time reduction
- 1840: Early railroad lines in the Northeast (red lines)
- 1860: Full railroad network east of the Mississippi (extensive red network)

Clickable elements:
- Each transport route, when clicked, shows: route name, completion date, what it connected, and estimated cost/time reduction for shipping goods

Key annotation: Erie Canal connection from Buffalo to Albany to NYC — clicking it shows the cost calculation: shipping a ton of flour from Buffalo to NYC dropped from $100 (1817) to $10 (1830).

Color scheme:
- Rivers: dark blue
- Canals: light blue dashed
- Roads/turnpikes: tan
- Railroads: red
- Major cities: gold dots

Responsive behavior: Map scales with canvas; slider remains functional on touch screens.

Implementation: p5.js; map as simplified polygon shapes; time-slider controls layer visibility.
```

## Related Resources

- [Chapter 7: Manifest Destiny and Antebellum Reform (1828–1848)](../../chapters/07-manifest-destiny-reform/index.md)
