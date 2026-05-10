---
title: Political Party Realignment — New Deal Coalition to Reagan Coalition
description: Students map the demographic and geographic components of the New Deal and Reagan coalitions, identify the key groups that switched parties, and analyze what drove the realignment.
status: built
library: p5.js
bloom_level: Analyze (L4)
---

# Political Party Realignment — New Deal Coalition to Reagan Coalition

## Learning Objective

Students map the demographic and geographic components of the New Deal and Reagan coalitions, identify the key groups that switched parties, and analyze what drove the realignment.

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Map
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="722"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 19: From Reagan to 9/11 (1975–2001)](../../chapters/19-reagan-to-9-11/index.md).

```text
Type: map-comparison
**sim-id:** party-realignment<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to visualize the dramatic realignment of American political parties from the New Deal coalition (1932–1968) to the Reagan coalition (1980–present), understanding how demographic and geographic sorting has shaped contemporary polarization.

Bloom Level: Analyze (L4)
Bloom Verb: Map

Learning Objective: Students map the demographic and geographic components of the New Deal and Reagan coalitions, identify the key groups that switched parties, and analyze what drove the realignment.

Canvas layout:
- Responsive width; height approximately 480px
- Two side-by-side U.S. maps: "New Deal Coalition (1936)" and "Reagan Coalition (1984)"
- States colored by dominant party; shade intensity = margin of victory
- Clickable demographic groups: Southern whites, urban workers, evangelicals, college-educated whites, Black voters, etc.

When a demographic group is clicked:
- Highlighted on both maps showing where they lived
- Panel shows: party affiliation 1936 vs. 1984, what drove the switch (key events: civil rights legislation, cultural change, economic issues)
- Vote percentage data for each election

Historical mode:
- Slider from 1932 to 2000 shows presidential election results
- Key realignment elections highlighted: 1948 (Dixiecrats), 1964 (LBJ landslide, South begins moving), 1968 (Nixon southern strategy), 1980 (Reagan coalition complete)

Interactivity:
- "Build a coalition" mode: select demographic groups and see if you can assemble a winning electoral majority
- "Key issues" overlay: shows which policy issues drove each group's party choice

Color scheme: Traditional blue (Democrat) and red (Republican); intensity indicates margin.
```

## Related Resources

- [Chapter 19: From Reagan to 9/11 (1975–2001)](../../chapters/19-reagan-to-9-11/index.md)
