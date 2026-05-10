---
title: Political Polarization — A Historical and Contemporary Index
description: Students interpret data on American political polarization over time, identify the periods of greatest change, and evaluate competing explanations for increasing polarization (geographic sorting, media fragmentation, partisan gerrymandering, ideological shift).
status: scaffold
library: p5.js
bloom_level: Analyze (L4)
---

# Political Polarization — A Historical and Contemporary Index

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students interpret data on American political polarization over time, identify the periods of greatest change, and evaluate competing explanations for increasing polarization (geographic sorting, media fragmentation, partisan gerrymandering, ideological shift).

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Interpret
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 20: Contemporary America and the Digital Age (2001–Present)](../../chapters/20-contemporary-america/index.md).

```text
Type: data-visualization
**sim-id:** polarization-index<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to visualize the historical trajectory of American political polarization from 1945 to the present, using Congressional voting data and public opinion surveys, and to identify the periods and causes of increasing polarization.

Bloom Level: Analyze (L4)
Bloom Verb: Interpret

Learning Objective: Students interpret data on American political polarization over time, identify the periods of greatest change, and evaluate competing explanations for increasing polarization (geographic sorting, media fragmentation, partisan gerrymandering, ideological shift).

Canvas layout:
- Responsive width; height approximately 480px
- Main chart: line graph of party polarization index (DW-NOMINATE score distance between median Democrat and Republican in Congress), 1945–present
- Y-axis: polarization index (0 = no difference; 1 = maximum difference)
- X-axis: year
- Key events annotated: Civil Rights Act (1964), Reagan election (1980), Gingrich revolution (1994), Tea Party (2010), Trump election (2016)

Secondary panels (appear when chart section is clicked):
- Geographic sorting: maps showing partisan geographic concentration at selected years
- Media landscape: chart of news source diversity, 1970–present
- Public opinion: survey data on cross-party hostility (affective polarization)

Interactivity:
- Click any year on the chart to see: which party moved more, key legislation (or lack thereof), and events that may explain the change
- "Senate vs. House" toggle to compare polarization in both chambers
- "Causes panel": shows competing explanations and the evidence for each

Color scheme: Blue for Democrats, red for Republicans; purple for shared ground (declining over time).
```

## Related Resources

- [Chapter 20: Contemporary America and the Digital Age (2001–Present)](../../chapters/20-contemporary-america/index.md)
