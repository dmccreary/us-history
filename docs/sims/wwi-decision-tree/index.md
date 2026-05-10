---
title: WWI Decision Tree — From Assassination to American Entry
description: Students trace the causal chain from the assassination of Archduke Franz Ferdinand to U.S. declaration of war, identifying which steps were contingent (could have gone otherwise) and which were highly determined by prior commitments.
status: scaffold
library: p5.js
bloom_level: Analyze (L4)
---

# WWI Decision Tree — From Assassination to American Entry

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students trace the causal chain from the assassination of Archduke Franz Ferdinand to U.S. declaration of war, identifying which steps were contingent (could have gone otherwise) and which were highly determined by prior commitments.

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Trace
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 13: U.S. Imperialism and World War I (1898–1920)](../../chapters/13-imperialism-world-war-i/index.md).

```text
Type: decision-tree
**sim-id:** wwi-decision-tree<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to trace the causal chain from the Sarajevo assassination (June 1914) through American entry (April 1917), clicking through each major decision point to understand why each step led to the next.

Bloom Level: Analyze (L4)
Bloom Verb: Trace

Learning Objective: Students trace the causal chain from the assassination of Archduke Franz Ferdinand to U.S. declaration of war, identifying which steps were contingent (could have gone otherwise) and which were highly determined by prior commitments.

Canvas layout:
- Responsive width; height approximately 480px
- Vertical timeline with branching decision nodes
- Each node shows: event, date, key decision-maker, and the choice made
- Color-coded by actor: Austria-Hungary (gold), Germany (gray), Russia (red), Britain (blue), France (teal), US (navy)

Nodes in sequence:
1. Sarajevo Assassination (June 28, 1914) → Austria issues ultimatum to Serbia
2. Serbia's partial acceptance → Austria declares war anyway (July 28)
3. Russia mobilizes → Germany declares war on Russia (Aug 1)
4. Germany declares war on France → invades Belgium (Aug 3–4)
5. Britain declares war on Germany (Aug 4) — treaty obligation to Belgium
6. US declares neutrality (Aug 4, 1914)
7. Lusitania sinking (May 1915) → Wilson protests; Germany promises Sussex Pledge
8. Germany resumes unrestricted submarine warfare (Feb 1, 1917)
9. Zimmermann Telegram revealed (March 1, 1917)
10. US declares war on Germany (April 6, 1917)

Interactivity:
- Clicking each node opens a detail panel: what happened, why, and what alternatives existed
- "Counterfactual" button on each node asks: "What if this had gone differently?" and shows a 1-sentence alternative history
- Zoom controls for the full timeline

Color scheme: Actor colors above; contingent decisions highlighted in amber.
```

## Related Resources

- [Chapter 13: U.S. Imperialism and World War I (1898–1920)](../../chapters/13-imperialism-world-war-i/index.md)
