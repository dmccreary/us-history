---
title: Misinformation Detection MicroSim — Lost Cause Claims
description: Students assess historical claims using a structured misinformation detection framework, identifying which claims are supported by primary source evidence and which are contradicted by it.
status: scaffold
library: p5.js
bloom_level: Evaluate (L5)
---

# Misinformation Detection MicroSim — Lost Cause Claims

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students assess historical claims using a structured misinformation detection framework, identifying which claims are supported by primary source evidence and which are contradicted by it.

- **Bloom Level:** Evaluate (L5)
- **Bloom Verb:** Assess
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: Reconstruction and Its Aftermath (1865–1877)](../../chapters/09-reconstruction/index.md).

```text
Type: microsim
**sim-id:** misinformation-detector<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Give students structured practice applying the four-step misinformation detection process (source the claim, lateral reading, source triangulation, fact-checking) to historical claims drawn from the Lost Cause narrative and Reconstruction historiography.

Bloom Level: Evaluate (L5)
Bloom Verb: Assess

Learning Objective: Students assess historical claims using a structured misinformation detection framework, identifying which claims are supported by primary source evidence and which are contradicted by it.

Canvas layout:
- Responsive width; height approximately 520px
- Top panel (30%): Displays a historical claim (text card)
- Middle panel (40%): Four-step investigation panel — one button per step; clicking each reveals the relevant information for that step
- Bottom panel (30%): Verdict area where student selects: "Supported by evidence," "Contradicted by evidence," or "Partially supported/context needed" — then submits and receives feedback

Step buttons reveal:
1. "Source the Claim" → Who made this claim, when, and what was their stake in the outcome?
2. "Lateral Reading" → What do historians working from primary sources say about this claim?
3. "Source Triangulation" → What do three different types of evidence show?
4. "Check the Facts" → What specific primary source contradicts or confirms this claim?

Sample claims (6 total, cycling):
1. "Southern states seceded over states' rights, not slavery" → Contradicted
2. "Reconstruction governments were uniquely corrupt and incompetent" → Contradicted
3. "The Freedmen's Bureau helped millions transition from slavery to freedom" → Supported
4. "Black voters were largely prevented from voting through violence and intimidation after 1877" → Supported
5. "Sharecropping gave freed people economic independence" → Contradicted
6. "The Ku Klux Klan was primarily a social fraternity that occasionally became violent" → Contradicted

Verdict feedback:
- Correct: green border, brief explanation of why the evidence supports this verdict
- Incorrect: amber border, redirect to which evidence step the student should revisit

Score tracker: "X / Y evaluated correctly"

Responsive behavior: Steps stack vertically on narrow canvas.

Instructional Rationale: Evaluate-level task requires students to assess quality of evidence — not just identify who made a claim. The structured four-step process prevents students from verdict-first reasoning (deciding the answer before checking evidence).
```

## Related Resources

- [Chapter 9: Reconstruction and Its Aftermath (1865–1877)](../../chapters/09-reconstruction/index.md)
