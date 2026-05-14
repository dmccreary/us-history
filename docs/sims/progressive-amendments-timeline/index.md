---
title: Four Progressive Era Amendments — Timeline and Context
description: Students explain the purpose of each Progressive Era amendment and the social movement or political pressure that produced it.
status: built
library: p5.js
bloom_level: Understand (L2)
---

# Four Progressive Era Amendments — Timeline and Context

## Learning Objective

Students explain the purpose of each Progressive Era amendment and the social movement or political pressure that produced it.

- **Bloom Level:** Understand (L2)
- **Bloom Verb:** Explain
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="562px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 12: The Progressive Era (1890–1914)](../../chapters/12-progressive-era/index.md).

```text
Type: timeline
**sim-id:** progressive-amendments-timeline<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to explore the four Progressive Era constitutional amendments (16th–19th), the social movements that produced them, and the political context in which each was ratified.

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students explain the purpose of each Progressive Era amendment and the social movement or political pressure that produced it.

Canvas layout:
- Responsive width; height approximately 480px
- Horizontal timeline from 1890 to 1925
- Four clickable markers, one per amendment: 16th (1913), 17th (1913), 18th (1919), 19th (1920)
- Background shows key political events: McKinley assassination (1901), TR presidency, WWI shading (1917–1918)

Each marker, when clicked, opens a detail panel:
- Amendment number and ratification year
- What it changed (one sentence)
- The movement that drove it (Populists, direct democracy reformers, temperance, women's suffrage)
- One historical context note explaining the timing
- A "What happened next?" line showing the amendment's legacy or unintended consequences

Additional clickable elements:
- Hovering the WWI band shows: "Wartime nationalism accelerated both Prohibition (grain conservation) and women's suffrage (women's war contributions)"
- A "Populating over time" mode shows state ratification maps for the 18th and 19th amendments

Color scheme: Each amendment has a distinct color (gold = 16th, indigo = 17th, red = 18th, teal = 19th); WWI period shaded in gray.

Responsive behavior: Timeline scrolls horizontally on narrow canvas.

Implementation: p5.js
```

## Related Resources

- [Chapter 12: The Progressive Era (1890–1914)](../../chapters/12-progressive-era/index.md)
