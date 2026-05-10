---
title: Constitutional Structure — Checks and Balances Explorer
description: Students explain how checks and balances distribute power among the three branches and give at least two examples of checks being exercised in American history.
status: built
library: p5.js
bloom_level: Understand (L2)
---

# Constitutional Structure — Checks and Balances Explorer

## Learning Objective

Students explain how checks and balances distribute power among the three branches and give at least two examples of checks being exercised in American history.

- **Bloom Level:** Understand (L2)
- **Bloom Verb:** Explain
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="722" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: Founding the Republic (1783–1800)](../../chapters/05-founding-the-republic/index.md).

```text
Type: infographic
**sim-id:** checks-and-balances-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to explore the web of checks and balances connecting the three branches of government by clicking on any power to see which branch exercises it, which branch can check it, and a historical example of that check being used.

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students explain how checks and balances distribute power among the three branches and give at least two examples of checks being exercised in American history.

Canvas layout:
- Responsive width; height approximately 520px
- Triangle arrangement with three branch nodes: Legislative (Congress) at top-left, Executive (President) at top-right, Judicial (Supreme Court) at bottom-center
- Each branch node is a large rounded rectangle with its name and key powers listed inside
- Between each pair of branches, two curved arrows (one in each direction) represent the mutual checks

Branch contents:
- Legislative: Make laws, override vetoes, control budget, declare war, confirm appointments, impeach
- Executive: Sign or veto laws, command military, nominate judges, executive orders, pardon power
- Judicial: Declare laws unconstitutional, interpret laws, rule on executive action

Arrows between branches (12 total, two per pair per direction):
- Congress → President: Override veto, impeach, control budget
- President → Congress: Veto, call special sessions, recommend legislation
- Congress → Courts: Confirm judges, set court jurisdiction, impeach judges
- Courts → Congress: Declare laws unconstitutional
- President → Courts: Nominate judges
- Courts → President: Declare executive actions unconstitutional

Interactivity:
- Clicking any arrow opens a detail panel showing: power name, which branch exercises it, which branch it constrains, and one historical example (e.g., "Nixon's Saturday Night Massacre," "FDR's court-packing plan," "Senate filibuster of judicial nominations")
- Clicking a branch node highlights all checks that branch can exercise and all checks it faces
- A "Historical Moments" button cycles through famous check-and-balance confrontations in U.S. history with dates

Color scheme:
- Legislative: indigo (#3949ab)
- Executive: red (#c62828)
- Judicial: gold (#f9a825)
- Arrows: color of the branch exercising the check

Responsive behavior: Triangle layout adjusts to available width; on narrow canvas, branches listed vertically.

Implementation: p5.js
```

## Related Resources

- [Chapter 5: Founding the Republic (1783–1800)](../../chapters/05-founding-the-republic/index.md)
