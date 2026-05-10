---
title: Judicial Review — How It Works
description: Students explain the process of judicial review using Marbury v. Madison and describe why the power is significant for the balance of power among branches.
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# Judicial Review — How It Works

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students explain the process of judicial review using Marbury v. Madison and describe why the power is significant for the balance of power among branches.

- **Bloom Level:** Understand (L2)
- **Bloom Verb:** Explain
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 6: The Jeffersonian Era and Early Expansion (1800–1828)](../../chapters/06-jeffersonian-era/index.md).

```text
Type: infographic
**sim-id:** judicial-review-explainer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Help students understand how judicial review works by tracing the path of a law from Congress through a constitutional challenge to a Supreme Court ruling, with a step-by-step interactive walkthrough using Marbury v. Madison as the anchor case.

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students explain the process of judicial review using Marbury v. Madison and describe why the power is significant for the balance of power among branches.

Canvas layout:
- Responsive width; height approximately 480px
- Vertical flow diagram with 6 steps from top to bottom, each as a clickable node
- Left side: the general process; right side: the Marbury v. Madison specific example at each step

Step nodes:
1. Congress passes a law / President takes executive action
2. Someone claims the law violates the Constitution
3. Case works through federal court system (District → Circuit → Supreme Court)
4. Supreme Court decides to hear the case (certiorari)
5. Court rules: constitutional (law stands) OR unconstitutional (law struck down)
6. Ruling becomes precedent for future cases

For Marbury v. Madison, the right side shows:
1. Judiciary Act of 1789 grants Supreme Court certain jurisdiction
2. Marbury argues the Act entitles him to his commission
3. Case goes directly to Supreme Court (original jurisdiction claimed)
4. Marshall's Court takes the case
5. Court rules: part of Judiciary Act is unconstitutional; Marbury loses on procedure; Court gains judicial review
6. Marbury v. Madison becomes foundational precedent cited in nearly every major constitutional case

Interactivity:
- Clicking each step node shows the detail panel with: process explanation + Marbury-specific example
- "Animate" button runs through all 6 steps in sequence with explanations appearing automatically
- "Test your knowledge" mode hides the Marbury examples and asks students to fill them in from a word bank

Color scheme:
- Step nodes: alternating indigo and gold
- Constitutional outcome path: green
- Unconstitutional outcome path: red
- Marbury panel: white background with dark text

Responsive behavior: On narrow canvas, left and right columns stack; flow becomes single column.

Implementation: p5.js
```

## Related Resources

- [Chapter 6: The Jeffersonian Era and Early Expansion (1800–1828)](../../chapters/06-jeffersonian-era/index.md)
