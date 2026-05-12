# Content Generation Guide — U.S. History Intelligent Textbook

Load this file whenever generating or editing chapter content.

---
## Reading Level

The audience for this book is high school students grades 9-12.
The teacher's guide should be written for a college-graduate audience.


## Learning Mascot: Liberty the Bald Eagle

### Mascot File Index

The canonical files for this mascot. When editing any of these, update the
others in the same turn so they stay in sync.

| File | Purpose |
|------|---------|
| [`docs/img/mascot/character-sheet.md`](docs/img/mascot/character-sheet.md) | Canonical identity document (name, species, colors, voice). Source of truth. |
| [`docs/img/mascot/image-prompts.md`](docs/img/mascot/image-prompts.md) | Self-contained AI prompts for regenerating each pose. |
| [`docs/img/mascot/neutral.png`](docs/img/mascot/neutral.png) | Default / general-purpose pose. |
| [`docs/img/mascot/welcome.png`](docs/img/mascot/welcome.png) | Chapter-opening pose. |
| [`docs/img/mascot/thinking.png`](docs/img/mascot/thinking.png) | Key-concept pose. |
| [`docs/img/mascot/tip.png`](docs/img/mascot/tip.png) | Hint / helpful-guidance pose. |
| [`docs/img/mascot/warning.png`](docs/img/mascot/warning.png) | Common-mistake / pitfall pose. |
| [`docs/img/mascot/encouraging.png`](docs/img/mascot/encouraging.png) | Difficult-content / struggle pose. |
| [`docs/img/mascot/celebration.png`](docs/img/mascot/celebration.png) | End-of-chapter / achievement pose. |
| [`docs/css/mascot.css`](docs/css/mascot.css) | Custom admonition styles for the seven pose contexts. |
| [`docs/learning-graph/mascot-test.md`](docs/learning-graph/mascot-test.md) | Rendering test page that exercises every admonition style. |

### Mascot Admonition Format

Always place mascot images in the admonition body, never in the title bar:

    !!! mascot-welcome "Title Here"
        <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Liberty waving welcome">
        Admonition text goes here after the img tag.

The `src` path depth depends on the page location. For a chapter at
`chapters/01-intro/index.md` (rendered as `chapters/01-intro/`), use `../../img/mascot/`.
For a page at `learning-graph/mascot-test.md`, use `../../img/mascot/`.

### Placement Rules

| Context | Admonition Type | Frequency |
|---------|----------------|-----------|
| General note / sidebar | mascot-neutral | As needed |
| Chapter opening | mascot-welcome | Every chapter |
| Key concept | mascot-thinking | 2–3 per chapter |
| Helpful tip | mascot-tip | As needed |
| Common mistake / misconception | mascot-warning | As needed |
| Difficult content | mascot-encourage | Where students may struggle |
| Section completion | mascot-celebration | End of major sections |

### Mascot Role in Content Generation

When generating any chapter content, **always read `docs/img/mascot/character-sheet.md` first**. Liberty must appear in every chapter and must actively reinforce the four skills listed in the character sheet's "Reinforcing Critical Thinking Skills" section:

1. **Critical Thinking** — Liberty asks students to examine evidence, distinguish correlation from causation, and identify unstated assumptions.
2. **Systems Thinking** — Liberty prompts students to draw causal loops, spot feedback, and trace unintended consequences.
3. **Understanding Cognitive Bias** — Liberty names biases (confirmation bias, hindsight bias, in-group favoritism) as they appear in historical actors and historians.
4. **Detecting Misinformation** — Liberty models lateral reading, source triangulation, and fact-checking using real historical examples.

These four skills are the pedagogical core of the book. Every Liberty admonition should connect to at least one of them — not just decorate the page.

### Do's and Don'ts

**Do:**

- Use Liberty to introduce new topics warmly
- Include the catchphrase in welcome admonitions
- Keep dialogue brief (1–3 sentences)
- Match the pose/image to the content type
- Connect Liberty's voice to critical thinking and source evaluation

**Don't:**

- Use Liberty more than 5–6 times per chapter
- Put mascot admonitions back-to-back
- Use Liberty for purely decorative purposes
- Change Liberty's personality or speech patterns
- Use gendered pronouns for Liberty — always use "Liberty" by name or "they/them"

---

## Markdown Formatting Rules

### Currency / Dollar Signs

This site uses `pymdownx.arithmatex`, which treats `$...$` as inline LaTeX math. Always escape dollar signs used as currency with a backslash so they render as text:

- **Correct:** `\$500–\$3,000` or `\$150 million`
- **Wrong:** `$500–$3,000` (renders as broken math expression)

Apply this to every dollar amount in every chapter.
