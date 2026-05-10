---
title: AI in Warfare — From Semi-Autonomous to Fully Autonomous
description: Students assess the ethical and strategic implications of different levels of weapons autonomy, identify the key decision points where human judgment matters, and evaluate the arguments for and against autonomous targeting authority.
status: built
library: p5.js
bloom_level: Evaluate (L5)
---

# AI in Warfare — From Semi-Autonomous to Fully Autonomous

## Learning Objective

Students assess the ethical and strategic implications of different levels of weapons autonomy, identify the key decision points where human judgment matters, and evaluate the arguments for and against autonomous targeting authority.

- **Bloom Level:** Evaluate (L5)
- **Bloom Verb:** Assess
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="722"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 21: The Age of AI and Technology Power (2010–Present)](../../chapters/21-age-of-ai/index.md).

```text
Type: spectrum
**sim-id:** ai-warfare-spectrum<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to explore the spectrum of weapons autonomy from human-controlled to fully autonomous, examining what decision-making authority is retained by humans at each level and the ethical, legal, and strategic implications of increasing autonomy.

Bloom Level: Evaluate (L5)
Bloom Verb: Assess

Learning Objective: Students assess the ethical and strategic implications of different levels of weapons autonomy, identify the key decision points where human judgment matters, and evaluate the arguments for and against autonomous targeting authority.

Canvas layout:
- Responsive width; height approximately 480px
- Horizontal spectrum from left (Human Control) to right (Full Autonomy)
- Six labeled positions along the spectrum, from Level 1 to Level 6

Autonomy levels:
1. Human In the Loop: Human decides every targeting decision (traditional soldier/pilot)
2. Human On the Loop: System selects targets; human can override within a time window (Patriot missile defense)
3. Human Over the Loop: Human sets parameters; system operates autonomously within them (current FPV drone with limited AI)
4. Supervised Autonomy: Human can intervene; system operates autonomously unless overridden (emerging AI wingman drones)
5. Narrow Autonomy: System autonomously selects and engages specific target types (hypothetical: autonomous anti-drone system)
6. Full Autonomy: System selects and engages any target without human approval (hypothetical/banned by some proposals)

For each level (click to open panel):
- Example weapons systems (current or proposed)
- What the human decides vs. what the AI decides
- Key ethical questions this level raises
- What international law says about this level
- Strategic advantage and disadvantage

Interactivity:
- Slider to position a specific weapon system on the spectrum
- "Arguments for / against" toggle at each level
- "Legal status" overlay showing which international treaties apply

Color scheme: Green (human control) → amber (mixed) → red (full autonomy).
```

## Related Resources

- [Chapter 21: The Age of AI and Technology Power (2010–Present)](../../chapters/21-age-of-ai/index.md)
