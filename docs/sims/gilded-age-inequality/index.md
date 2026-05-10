---
title: Gilded Age Inequality — Wealth Distribution Chart
description: Students compare wealth distribution across historical periods and explain how extreme inequality in the Gilded Age contributed to the rise of labor and reform movements.
status: scaffold
library: p5.js
bloom_level: Analyze (L4)
---

# Gilded Age Inequality — Wealth Distribution Chart

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students compare wealth distribution across historical periods and explain how extreme inequality in the Gilded Age contributed to the rise of labor and reform movements.

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Compare
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 10: The Gilded Age: Industrialization and Labor (1865–1890)](../../chapters/10-gilded-age-industry/index.md).

```text
Type: chart
**sim-id:** gilded-age-inequality<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to visualize wealth distribution in the Gilded Age, compare it to other historical periods, and connect it to the social conflicts of the era.

Bloom Level: Analyze (L4)
Bloom Verb: Compare

Learning Objective: Students compare wealth distribution across historical periods and explain how extreme inequality in the Gilded Age contributed to the rise of labor and reform movements.

Canvas layout:
- Responsive width; height approximately 480px
- Main chart area: bar chart showing percentage of national wealth held by top 1%, next 9%, and bottom 90%, across five time periods
- Time periods: 1870, 1900, 1929 (peak inequality), 1970 (post-New Deal low), 2020 (current)
- Each bar is divided into three segments with distinct colors

Data (approximate historical estimates):
- 1870: Top 1% = 27%, Next 9% = 38%, Bottom 90% = 35%
- 1900: Top 1% = 35%, Next 9% = 35%, Bottom 90% = 30%
- 1929: Top 1% = 44%, Next 9% = 33%, Bottom 90% = 23%
- 1970: Top 1% = 22%, Next 9% = 33%, Bottom 90% = 45%
- 2020: Top 1% = 35%, Next 9% = 37%, Bottom 90% = 28%

Interactivity:
- Hovering any bar segment shows: exact percentage, year, which economic/political events coincided
- Clicking a year opens a detail panel: key events (e.g., "1900: Robber Baron era; Sherman Antitrust Act just passed; labor unions weak"), income tax status, major policy context
- A "What happened between X and Y?" button highlights the years and shows a 2-sentence explanation of what policy changes drove the shift (e.g., "Between 1929 and 1970: New Deal labor laws, progressive income tax, GI Bill expanded the middle class")

Color scheme:
- Top 1%: dark gold (#f9a825)
- Next 9%: indigo (#3949ab)
- Bottom 90%: teal (#00897b)
- Hover highlight: brightened color with tooltip border

Responsive behavior: Chart scales with canvas width; legend moves to bottom on narrow canvas.

Implementation: p5.js; bar chart with hover-triggered tooltips
```

## Related Resources

- [Chapter 10: The Gilded Age: Industrialization and Labor (1865–1890)](../../chapters/10-gilded-age-industry/index.md)
