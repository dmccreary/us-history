---
title: Reform Movement Network — 1830–1860
description: Students differentiate the goals and methods of antebellum reform movements and identify at least three ways they were interconnected through shared participants, ideas, or organizational networks.
status: built
library: vis-network
bloom_level: Analyze (L4)
---

# Reform Movement Network — 1830–1860

## Learning Objective

Students differentiate the goals and methods of antebellum reform movements and identify at least three ways they were interconnected through shared participants, ideas, or organizational networks.

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Differentiate
- **Library:** vis-network

## Preview

<iframe src="main.html" width="100%" height="760" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: Manifest Destiny and Antebellum Reform (1828–1848)](../../chapters/07-manifest-destiny-reform/index.md).

```text
Type: graph-model
**sim-id:** reform-movement-network<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Allow students to explore the interconnections between antebellum reform movements and key individuals, seeing how shared actors, ideas, and organizational networks linked abolitionism, women's rights, temperance, and transcendentalism.

Bloom Level: Analyze (L4)
Bloom Verb: Differentiate

Learning Objective: Students differentiate the goals and methods of antebellum reform movements and identify at least three ways they were interconnected through shared participants, ideas, or organizational networks.

Node types:
1. Movement nodes (large circles, gold): Abolitionism, Women's Rights, Temperance, Transcendentalism, Second Great Awakening
2. Person nodes (medium circles, indigo): Frederick Douglass, William Lloyd Garrison, Elizabeth Cady Stanton, Lucretia Mott, Harriet Tubman, William Lloyd Garrison, Henry David Thoreau, Sojourner Truth
3. Organization nodes (small squares, teal): American Anti-Slavery Society, Seneca Falls Convention, The Liberator (newspaper), American Temperance Society
4. Idea nodes (diamonds, amber): Individual Conscience, Natural Rights, Religious Revival

Edges (with labels):
- Douglass → Abolitionism: "Leader and speaker"
- Douglass → Women's Rights: "Signed Declaration of Sentiments at Seneca Falls"
- Stanton → Women's Rights: "Primary organizer"
- Stanton → Abolitionism: "Organized through anti-slavery networks"
- Garrison → Abolitionism: "Founded The Liberator"
- Tubman → Underground Railroad: "Conductor"
- Second Great Awakening → Abolitionism, Temperance, Women's Rights: "Religious energy source"
- Individual Conscience → Transcendentalism: "Core principle"
- Individual Conscience → Civil Disobedience: "Enables"

Interactivity:
- Clicking any node shows a detail panel: name, type, 2-sentence description, connections count
- Clicking an edge shows the relationship label and a 1-sentence historical explanation
- "Show paths" mode: clicking two nodes highlights all paths connecting them
- Nodes are draggable; graph is zoomable and pannable
- Filter buttons: show only one movement's network; show only person nodes

Color scheme: as specified above. Edge thickness reflects strength of connection (strong = thick, indirect = thin dashed).

Layout: Force-directed (vis-network default) with slight center attraction to keep graph compact.

Implementation: vis-network JavaScript library
```

## Related Resources

- [Chapter 7: Manifest Destiny and Antebellum Reform (1828–1848)](../../chapters/07-manifest-destiny-reform/index.md)
