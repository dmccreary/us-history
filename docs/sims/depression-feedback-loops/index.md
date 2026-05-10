---
title: Depression Causes — Interacting Feedback Loops
description: Students diagram the reinforcing feedback loops that amplified the 1929 crash into a decade-long depression, identifying which loops the New Deal attempted to break and how.
status: built
library: p5.js
bloom_level: Analyze (L4)
---

# Depression Causes — Interacting Feedback Loops

## Learning Objective

Students diagram the reinforcing feedback loops that amplified the 1929 crash into a decade-long depression, identifying which loops the New Deal attempted to break and how.

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Diagram
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="722"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 14: The Roaring Twenties, Depression, and New Deal (1920–1941)](../../chapters/14-twenties-depression-new-deal/index.md).

```text
Type: causal-loop
**sim-id:** depression-feedback-loops<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to visualize the interlocking feedback loops that turned a stock market crash into a decade-long depression, building systems thinking skills by tracing causal connections across economic sectors.

Bloom Level: Analyze (L4)
Bloom Verb: Diagram

Learning Objective: Students diagram the reinforcing feedback loops that amplified the 1929 crash into a decade-long depression, identifying which loops the New Deal attempted to break and how.

Canvas layout:
- Responsive width; height approximately 480px
- Circular causal loop diagram with 8 nodes connected by labeled arrows
- Color-coded: red arrows = reinforcing (R, makes things worse); blue arrows = balancing (B, correction)
- Nodes: Stock Market, Consumer Spending, Business Production, Employment, Bank Deposits, Bank Loans, Agricultural Prices, International Trade

Key loops to show:
- R1 (Deflationary Spiral): Employment ↓ → Consumer Spending ↓ → Business Production ↓ → Employment ↓
- R2 (Banking Panic): Bank Deposits ↓ → Bank Loans ↓ → Business Investment ↓ → Employment ↓ → Bank Deposits ↓
- R3 (Trade Collapse): Tariffs ↑ → Imports ↓ → Foreign retaliation → U.S. Exports ↓ → Business ↓
- B1 (New Deal Intervention): Federal Spending ↑ → Consumer Demand ↑ → Production ↑ (attempts to break R1)

Interactivity:
- Clicking a loop highlights all arrows in that loop and opens a panel explaining how the loop worked
- "New Deal Response" button shows which loops each major program targeted
- Slider: "Shock Size" (1929–1932) shows how feedback loops amplified a 40% market drop into 25% unemployment

Color scheme: Red for reinforcing loops; blue for balancing; green for New Deal interventions.
```

## Related Resources

- [Chapter 14: The Roaring Twenties, Depression, and New Deal (1920–1941)](../../chapters/14-twenties-depression-new-deal/index.md)
