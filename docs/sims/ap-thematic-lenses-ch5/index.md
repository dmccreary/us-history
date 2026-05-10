---
title: AP Thematic Lens — American Identity and Politics and Power
description: Students classify events from the founding era under the appropriate AP thematic lens and explain why each event illustrates that theme.
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# AP Thematic Lens — American Identity and Politics and Power

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students classify events from the founding era under the appropriate AP thematic lens and explain why each event illustrates that theme.

- **Bloom Level:** Apply (L3)
- **Bloom Verb:** Classify
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: Founding the Republic (1783–1800)](../../chapters/05-founding-the-republic/index.md).

```text
Type: infographic
**sim-id:** ap-thematic-lenses-ch5<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Introduce two AP U.S. History thematic lenses — American and National Identity, and Politics and Power — and allow students to connect events from this chapter to each lens through an interactive mapping exercise.

Bloom Level: Apply (L3)
Bloom Verb: Classify

Learning Objective: Students classify events from the founding era under the appropriate AP thematic lens and explain why each event illustrates that theme.

Canvas layout:
- Responsive width; height approximately 480px
- Two large columns: "American and National Identity" (left) and "Politics and Power" (right)
- Each column has a brief definition at the top and an event-drop zone below
- A pool of draggable event chips at the bottom: Washington's Farewell Address, Alien and Sedition Acts, Bill of Rights, Virginia and Kentucky Resolutions, Three-Fifths Compromise, Electoral College, First Amendment, National Bank Debate

Each event chip can be dragged into either (or both) columns. On release:
- If placed correctly (pre-defined correct answers allow for multiple valid placements): green confirmation with a 1-sentence explanation of why this event fits the theme
- If placed in a plausible but less obvious category: amber message explaining the connection
- "Show all connections" button reveals the full mapping with explanations

Lens definitions shown at column tops:
- American and National Identity: How Americans have defined national identity, debated who belongs, and constructed narratives about what America means
- Politics and Power: How political institutions, parties, and actors have competed for power, shaped policy, and responded to crises

Color scheme:
- American Identity column: gold/amber tones
- Politics and Power column: indigo tones
- Event chips: white cards with dark text
- Correct placement: green border confirmation
- Plausible alternative: amber border

Responsive behavior: Below 600px, columns stack; drag-and-drop still works.

Implementation: p5.js with drag-and-drop interaction
```

## Related Resources

- [Chapter 5: Founding the Republic (1783–1800)](../../chapters/05-founding-the-republic/index.md)
