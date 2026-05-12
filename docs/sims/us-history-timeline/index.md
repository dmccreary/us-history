---
title: U.S. History Course Timeline (1450–Present)
description: Interactive course-spanning timeline of twenty U.S. history eras — one per chapter (2–21) — with clickable date-range bars that reveal detailed era summaries and critical-thinking prompts.
image: /sims/us-history-timeline/us-history-timeline.png
og:image: /sims/us-history-timeline/us-history-timeline.png
status: built
library: vis-timeline
bloom_level: Understand (L2)
---
# U.S. History Course Timeline (1450–Present)

## Learning Objective

Locate, sequence, and summarize the twenty major eras covered in this U.S. history course. Click any era's date-range bar to read a detailed description of that period, the major developments within it, and the critical-thinking skills Liberty wants students to apply when studying it.

- **Bloom Level:** Understand (L2) — Sequence, Summarize, Explain
- **Library:** vis-timeline | **Chapters:** 2 through 21

## Interactive Sim

<iframe src="main.html" width="100%" height="982" scrolling="no"></iframe>

[Run Fullscreen](main.html){ .md-button .md-button--primary }

## How to Use

1. **Click any era bar** on the timeline to read a detailed description of that period in the panel below.
2. **Filter by category** with the colored buttons at the top to focus on Colonial, Revolutionary, Industrial, or other groupings.
3. **Pan and zoom** with the ◀ ▶ + − buttons, or drag horizontally on the timeline itself.
4. **Hover** over any era for a short tooltip preview.

## The Twenty Eras (Chapters 2–21)

| Chapter | Era | Years |
|--------:|-----|-------|
| 2  | Pre-Columbian Americas and European Contact | 1450–1607 |
| 3  | Colonial America | 1607–1754 |
| 4  | The American Revolution | 1754–1783 |
| 5  | Founding the Republic | 1783–1800 |
| 6  | The Jeffersonian Era and Early Expansion | 1800–1828 |
| 7  | Manifest Destiny and Antebellum Reform | 1828–1848 |
| 8  | Sectionalism and the Civil War | 1844–1865 |
| 9  | Reconstruction and Its Aftermath | 1865–1877 |
| 10 | The Gilded Age: Industrialization and Labor | 1865–1890 |
| 11 | Populism and the Closing of the Frontier | 1880–1900 |
| 12 | The Progressive Era | 1890–1914 |
| 13 | U.S. Imperialism and World War I | 1898–1920 |
| 14 | The Roaring Twenties, Depression, and New Deal | 1920–1941 |
| 15 | World War II and the Home Front | 1939–1945 |
| 16 | The Early Cold War | 1945–1960 |
| 17 | Civil Rights and the Great Society | 1954–1968 |
| 18 | Vietnam, Nixon, and Social Movements | 1965–1975 |
| 19 | From Reagan to 9/11 | 1975–2001 |
| 20 | Contemporary America and the Digital Age | 2001–2010 |
| 21 | The Age of AI and Technology Power | 2010–Present |

## Categories

The twenty eras are grouped into eight color-coded categories so students can study one phase of American history at a time:

- **Colonial Foundations** (Chapters 2–3)
- **Revolutionary Era** (Chapters 4–5)
- **Antebellum America** (Chapters 6–7)
- **Civil War & Reconstruction** (Chapters 8–9)
- **Industrial America** (Chapters 10–13)
- **Modern America** (Chapters 14–16)
- **Late 20th Century** (Chapters 17–19)
- **21st Century** (Chapters 20–21)

## Embed This MicroSim

```html
<iframe src="https://dmccreary.github.io/us-history/sims/us-history-timeline/main.html"
        height="982px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

**Duration:** 15–20 minutes | **Grade:** High School | **Subject:** U.S. History

**Before:** Ask students to draw — from memory — a horizontal line representing American history and place five events on it. Don't reveal the timeline first.

**During:** Students compare their hand-drawn timeline to the interactive timeline. Have them click each of the twenty eras and write one sentence per era summarizing what happened.

**After:** Discuss which eras students knew best and which were unfamiliar. Which eras overlap on the timeline, and why? Why might one chapter (e.g., 8: Sectionalism and Civil War, 1844–1865) overlap with another (10: Gilded Age, 1865–1890)?

**Extension:** Ask students to pick two adjacent eras and explain a *cause-and-effect chain* connecting them — for example, how Reconstruction's collapse led to Jim Crow during the Gilded Age, or how Progressive-era reforms shaped the New Deal.

## Customizing the Data

The timeline reads its events from `timeline.json`. Each event has this structure:

```json
{
  "id": 14,
  "chapter": 14,
  "category": "Modern America",
  "start_date": { "year": "1920" },
  "end_date":   { "year": "1941" },
  "text": {
    "headline": "The Roaring Twenties, Depression, and New Deal (1920–1941)",
    "short":    "Boom, bust, and a redefinition of the federal government's role.",
    "long":     "A multi-sentence detailed description shown in the detail panel."
  },
  "skills": "Critical-thinking prompts shown in the highlighted box."
}
```

To add or modify eras, edit `timeline.json` and reload the page.

## Technical Details

- **Timeline Library:** vis-timeline 7.x (standalone build, CDN)
- **Data Format:** TimelineJS-compatible JSON with optional `short`, `long`, and `skills` fields
- **Range items:** Each era is a `range` item spanning its `start_date` to `end_date`
- **Browser Compatibility:** Chrome, Firefox, Safari, Edge

## References

- vis-timeline documentation: <https://visjs.github.io/vis-timeline/docs/timeline/>
- Chapter index: [U.S. History chapters](../../chapters/index.md)

## Related Resources

- [Chapter 1 — Historical Methods and Critical Thinking](../../chapters/01-historical-methods/index.md)
- [European Exploration Timeline (Chapter 2)](../european-exploration-timeline/index.md)
- [Colonial Resistance Timeline (Chapter 4)](../colonial-resistance-timeline/index.md)
- [Civil Rights Timeline (Chapter 17)](../civil-rights-timeline/index.md)
