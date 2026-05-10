---
title: Arms Race Dynamics — The Security Dilemma Loop
description: Students model the security dilemma feedback loop that drives arms races, identify the reinforcing loops at work, and evaluate what conditions could break the loop (arms control agreements, mutual vulnerability, transparency).
status: built
library: p5.js
bloom_level: Analyze (L4)
---

# Arms Race Dynamics — The Security Dilemma Loop

## Learning Objective

Students model the security dilemma feedback loop that drives arms races, identify the reinforcing loops at work, and evaluate what conditions could break the loop (arms control agreements, mutual vulnerability, transparency).

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Model
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="622"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 16: The Early Cold War (1945–1960)](../../chapters/16-early-cold-war/index.md).

```text
Type: causal-loop
**sim-id:** arms-race-dynamics<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to visualize the security dilemma feedback loop that drives arms races, and to trace how the U.S.-Soviet nuclear arms race exemplified this dynamic from 1945 to 1991.

Bloom Level: Analyze (L4)
Bloom Verb: Model

Learning Objective: Students model the security dilemma feedback loop that drives arms races, identify the reinforcing loops at work, and evaluate what conditions could break the loop (arms control agreements, mutual vulnerability, transparency).

Canvas layout:
- Responsive width; height approximately 480px
- Two-nation causal loop diagram (U.S. left, USSR right)
- Each nation node shows: current nuclear arsenal size (slider-adjustable)
- Arrows between nations: "Perceived Threat" (red, bidirectional), "Weapons Development" (gold, from each nation to its arsenal)

Core loops:
- R1 (US-Soviet): US Arsenal ↑ → Soviet Perceived Threat ↑ → Soviet Arsenal ↑ → US Perceived Threat ↑ → US Arsenal ↑ (reinforcing)
- B1 (MAD): When both arsenals reach "destruction threshold," a "MAD" indicator appears — loop becomes self-limiting (neither side can use weapons)
- B2 (Arms Control): "Treaty" button introduces a balancing force — shows effect of SALT I (1972), SALT II (1979), START (1991)

Historical mode:
- Slider from 1945 to 1991 shows actual warhead counts for each side
- Key events annotated: first Soviet test (1949), H-bomb (1952/53), Sputnik (1957), Cuban Missile Crisis (1962), SALT I (1972), Reagan buildup (1981–88), START (1991)

Interactivity:
- "What-if" sliders: adjust US arsenal by ±20% and see projected Soviet response
- Toggle between "Rational Actor" and "Security Dilemma" models

Color scheme: Blue for U.S., red for USSR; gold for nuclear arsenals; green for arms control.
```

## Related Resources

- [Chapter 16: The Early Cold War (1945–1960)](../../chapters/16-early-cold-war/index.md)
