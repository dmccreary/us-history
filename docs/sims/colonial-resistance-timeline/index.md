---
title: Colonial Resistance Timeline (1763–1775)
description: Students examine the escalating cycle of British action and colonial response and identify how each British measure produced colonial resistance that intensified the next British measure.
status: built
library: p5.js
bloom_level: Analyze (L4)
---

# Colonial Resistance Timeline (1763–1775)

## Learning Objective

Students examine the escalating cycle of British action and colonial response and identify how each British measure produced colonial resistance that intensified the next British measure.

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Examine
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="602"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: The American Revolution (1754–1783)](../../chapters/04-american-revolution/index.md).

```text
Type: timeline
**sim-id:** colonial-resistance-timeline<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to trace the escalating cycle of British taxation and colonial resistance between 1763 and 1775, identifying the reinforcing feedback loops that drove both sides toward open conflict.

Bloom Level: Analyze (L4)
Bloom Verb: Examine

Learning Objective: Students examine the escalating cycle of British action and colonial response and identify how each British measure produced colonial resistance that intensified the next British measure.

Canvas layout:
- Responsive width; height approximately 480px
- Horizontal timeline with two tracks: top track = British actions (red/gold), bottom track = Colonial responses (blue)
- Each event is a clickable circle; connected events (action → response) are linked by curved arrows

Events to include (paired action-response):
1. Proclamation of 1763 → Colonial land speculation in violation of the law
2. Stamp Act 1765 → Stamp Act Congress; Sons of Liberty formed; boycott
3. Townshend Acts 1767 → Non-importation agreements; spinning bees
4. British troops sent to Boston 1768 → Increased colonial anger
5. Boston Massacre 1770 → Revere engraving; radicalization
6. Tea Act 1773 → Boston Tea Party
7. Intolerable Acts 1774 → First Continental Congress; intercolonial unity
8. Lexington and Concord 1775 → Second Continental Congress; war begins

Clicking any event shows a panel with:
- Event name and date
- Who initiated it (British or colonial)
- A 2-sentence description
- A "Systems thinking" note identifying whether this was a reinforcing or balancing loop moment

Color scheme:
- British actions: gold (#f9a825) circles
- Colonial responses: indigo (#3949ab) circles
- Connecting arrows: gray with directional arrowheads
- Selected event: highlighted in bright white border

Responsive behavior: Timeline scrolls horizontally on narrow canvases; all events remain clickable.

Implementation: p5.js
```

## Related Resources

- [Chapter 4: The American Revolution (1754–1783)](../../chapters/04-american-revolution/index.md)
