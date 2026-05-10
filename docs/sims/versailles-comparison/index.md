---
title: Treaty of Versailles — Fourteen Points vs. Actual Outcome
description: Students evaluate the extent to which the Treaty of Versailles fulfilled Wilson's Fourteen Points, and assess what the gap between promise and outcome reveals about the constraints on idealistic diplomacy.
status: scaffold
library: p5.js
bloom_level: Evaluate (L5)
---

# Treaty of Versailles — Fourteen Points vs. Actual Outcome

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students evaluate the extent to which the Treaty of Versailles fulfilled Wilson's Fourteen Points, and assess what the gap between promise and outcome reveals about the constraints on idealistic diplomacy.

- **Bloom Level:** Evaluate (L5)
- **Bloom Verb:** Compare
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 13: U.S. Imperialism and World War I (1898–1920)](../../chapters/13-imperialism-world-war-i/index.md).

```text
Type: comparison
**sim-id:** versailles-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to compare Wilson's Fourteen Points with the actual Treaty of Versailles provisions, identifying which points were honored, which were modified, and which were abandoned.

Bloom Level: Evaluate (L5)
Bloom Verb: Compare

Learning Objective: Students evaluate the extent to which the Treaty of Versailles fulfilled Wilson's Fourteen Points, and assess what the gap between promise and outcome reveals about the constraints on idealistic diplomacy.

Canvas layout:
- Responsive width; height approximately 480px
- Two-column layout: "Fourteen Points" (left) and "Treaty of Versailles" (right)
- Each of the 14 points shown as a clickable card
- Color-coded outcome badge: green (honored), amber (modified), red (abandoned/reversed)

Point outcomes:
1. Open covenants → Partially: League of Nations exists but compromised | amber
2. Freedom of seas → Abandoned: British naval supremacy maintained | red
3. Free trade → Largely abandoned: protective tariffs retained | red
4. Arms reduction → Partially: only Germany disarmed | amber
5–13. Self-determination → Mixed: some new nations created; colonial peoples ignored | amber
14. League of Nations → Created but US never joined | amber (ironic)

War Guilt clause (not in 14 Points) → Added by France and Britain over Wilson's objection

Interactivity:
- Clicking a point shows: original text, actual treaty provision, why it was compromised (which power objected and why), and a "historical verdict" on its long-term impact
- Summary bar at bottom shows: 0 fully honored, 8 partially honored, 6 abandoned
- "What if?" mode: slider allows exploring counterfactual "what if the US had joined the League?"

Color scheme: Blue/green for Fourteen Points; gold/red for treaty provisions; amber for compromises.
```

## Related Resources

- [Chapter 13: U.S. Imperialism and World War I (1898–1920)](../../chapters/13-imperialism-world-war-i/index.md)
