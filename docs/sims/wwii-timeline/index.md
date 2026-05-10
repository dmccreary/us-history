---
title: WWII Timeline — From Blitzkrieg to Surrender
description: Students sequence key World War II events in both theaters, identify the major turning points in each, and connect home front developments (internment, Rosie the Riveter, war production) to the military timeline.
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# WWII Timeline — From Blitzkrieg to Surrender

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students sequence key World War II events in both theaters, identify the major turning points in each, and connect home front developments (internment, Rosie the Riveter, war production) to the military timeline.

- **Bloom Level:** Understand (L2)
- **Bloom Verb:** Sequence
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 15: World War II and the Home Front (1939–1945)](../../chapters/15-world-war-ii/index.md).

```text
Type: timeline
**sim-id:** wwii-timeline<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to navigate the chronology of World War II, identifying key turning points in the European and Pacific theaters and connecting home front events to military developments.

Bloom Level: Understand (L2)
Bloom Verb: Sequence

Learning Objective: Students sequence key World War II events in both theaters, identify the major turning points in each, and connect home front developments (internment, Rosie the Riveter, war production) to the military timeline.

Canvas layout:
- Responsive width; height approximately 480px
- Dual timeline: European Theater (top) and Pacific Theater (bottom)
- Home front events shown on a center band
- Color-coded: red = Axis advances, blue = Allied advances, gray = home front
- Time axis: September 1939 to September 1945

Key events included:
European: Poland invasion (1939), Fall of France (1940), Blitz (1940–41), Barbarossa (1941), D-Day (1944), Battle of the Bulge (1944–45), Germany surrenders (May 1945)
Pacific: Pearl Harbor (Dec 1941), Midway (June 1942), Guadalcanal (1942–43), D-Day analogues (island-hopping: Saipan, Iwo Jima, Okinawa), Hiroshima/Nagasaki (Aug 1945), Japan surrenders (Sep 1945)
Home front: Executive Order 9066 (Feb 1942), War Production Board, "We Can Do It" poster (1943), War Refugee Board (Jan 1944)

Interactivity:
- Click any event to open a detail panel: what happened, why it mattered, connection to other events
- "Turning points" filter highlights only the events that fundamentally changed the war's trajectory
- Hovering shows year and brief event description

Color scheme: Red/gold for Axis; blue/teal for Allied; amber for home front.
```

## Related Resources

- [Chapter 15: World War II and the Home Front (1939–1945)](../../chapters/15-world-war-ii/index.md)
