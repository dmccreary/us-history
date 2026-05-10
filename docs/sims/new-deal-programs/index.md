---
title: New Deal Programs — What They Did and What Survived
description: Students categorize New Deal programs by their purpose (relief, recovery, reform), identify the specific problem each addressed, and determine which programs still exist today.
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# New Deal Programs — What They Did and What Survived

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students categorize New Deal programs by their purpose (relief, recovery, reform), identify the specific problem each addressed, and determine which programs still exist today.

- **Bloom Level:** Understand (L2)
- **Bloom Verb:** Categorize
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 14: The Roaring Twenties, Depression, and New Deal (1920–1941)](../../chapters/14-twenties-depression-new-deal/index.md).

```text
Type: explorer
**sim-id:** new-deal-programs<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to explore the major New Deal programs, what problem each addressed, how it worked, and whether it survived to the present — building a comprehensive understanding of the New Deal's scope and lasting impact.

Bloom Level: Understand (L2)
Bloom Verb: Categorize

Learning Objective: Students categorize New Deal programs by their purpose (relief, recovery, reform), identify the specific problem each addressed, and determine which programs still exist today.

Canvas layout:
- Responsive width; height approximately 480px
- Three columns: Relief | Recovery | Reform (FDR's framework)
- Each program shown as a clickable card with its acronym (CCC, TVA, FDIC, SSA, etc.)
- Color-coded: green = still exists, amber = modified/successor exists, red = ended

Programs by category:
Relief: CCC, FERA, CWA, WPA, PWA
Recovery: AAA, NRA (struck down), RFC, TVA
Reform: FDIC, Glass-Steagall, SEC, Wagner Act, Social Security Act

Detail panel (on click):
- Full name and date
- Problem it addressed
- How it worked (2 sentences)
- Scale (how many people/dollars involved)
- Current status: exists/modified/ended and why

Summary statistics at bottom: X of Y programs (or their successors) still exist today.

Interactivity:
- Hover shows tooltip with program name and 1-sentence description
- Filter by "Still Active" or "Historical Only"

Color scheme: Blue/green for relief; gold for recovery; teal for reform.
```

## Related Resources

- [Chapter 14: The Roaring Twenties, Depression, and New Deal (1920–1941)](../../chapters/14-twenties-depression-new-deal/index.md)
