# U.S. History — Intelligent Textbook

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/us-history/)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![Claude Skills](https://img.shields.io/badge/Uses-Claude%20Skills-DA7857?logo=anthropic)](https://github.com/dmccreary/claude-skills)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## View the Live Site

Visit the interactive textbook at: [https://dmccreary.github.io/us-history/](https://dmccreary.github.io/us-history/)

## Overview

This is an interactive, AI-assisted intelligent textbook on United States History designed for high school students — from colonial origins through the modern era, aligned to state standards and College Board frameworks. Built using MkDocs with the Material theme, it incorporates a 450-concept learning graph, 21 fully-developed chapters with quizzes, an AI mascot (Liberty the Bald Eagle), and rich interactive elements.

What sets this textbook apart is its emphasis on four transferable analytical skills woven throughout every chapter: **critical thinking**, **systems thinking**, **recognizing cognitive bias**, and **detecting misinformation**. Rather than simply presenting historical facts, each chapter asks students to examine evidence, trace feedback loops, and evaluate the reliability of sources — skills that apply far beyond U.S. History.

The textbook follows Bloom's Taxonomy (2001 revision) for learning outcomes and uses a validated concept-dependency graph to ensure proper prerequisite sequencing. All content was generated and curated using Claude AI skills, making this a Level 2+ intelligent textbook with structured interactivity throughout.

## Site Status and Metrics

| Metric | Count |
|--------|-------|
| Concepts in Learning Graph | 450 |
| Chapters | 21 |
| Markdown Files | 165 |
| Total Words | ~266,000 |
| Chapter Quizzes | 21 |
| Quiz Questions | 214 |
| Glossary Terms | ~450 |
| FAQ Questions | 89 |
| Chapter Images | 138 |
| MicroSims | 1 (Learning Graph Viewer) |

**Completion Status:** Content generation complete; interactive elements and MicroSims in active development.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/dmccreary/us-history.git
cd us-history
```

### Install Dependencies

This project uses MkDocs with the Material theme and several plugins:

```bash
pip install mkdocs mkdocs-material mkdocs-glightbox
```

### Build and Serve Locally

Serve locally with live reload:

```bash
mkdocs serve
```

Open your browser to `http://localhost:8000`

Build the static site:

```bash
mkdocs build
```

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

### Using the Textbook

- Use the left sidebar to browse chapters in chronological order
- Each chapter ends with a multi-question quiz using Bloom's Taxonomy levels
- The Learning Graph section shows concept dependencies visually
- The Glossary contains ~450 defined terms; the FAQ addresses 89 common questions

## Repository Structure

```
us-history/
├── docs/                              # MkDocs documentation source
│   ├── chapters/                      # 21 chapter directories
│   │   ├── 01-historical-methods/
│   │   │   ├── index.md              # Chapter content
│   │   │   └── quiz.md               # Chapter quiz (10 questions)
│   │   └── 21-age-of-ai/             # Final chapter
│   ├── learning-graph/                # 450-concept dependency graph
│   │   ├── concept-list.md           # Full concept enumeration
│   │   ├── learning-graph.csv        # Concept dependency edges
│   │   ├── quality-metrics.md        # Graph validation report
│   │   └── concept-taxonomy.md       # Bloom's taxonomy mapping
│   ├── sims/                          # Interactive MicroSims
│   │   └── graph-viewer/             # vis-network learning graph viewer
│   ├── img/
│   │   ├── chapter-images/           # 138 AI-generated chapter images
│   │   └── mascot/                   # Liberty the Bald Eagle poses
│   ├── glossary.md                    # ~450 defined terms
│   ├── faq.md                         # 89 frequently asked questions
│   └── license.md                     # CC BY-NC-SA 4.0
├── plugins/                           # MkDocs hook scripts
├── CLAUDE.md                          # AI collaboration instructions
├── mkdocs.yml                         # MkDocs configuration
└── README.md                          # This file
```

## Learning Mascot: Liberty the Bald Eagle

Every chapter features **Liberty**, a bald eagle mascot who guides students through difficult content, flags common misconceptions, and models the four critical-thinking skills central to the course. Liberty appears in seven distinct poses (welcome, thinking, tip, warning, encouraging, celebration, neutral) to match different pedagogical moments.

## Reporting Issues

Found a typo, factual error, or have a suggestion?

[Open an Issue on GitHub](https://github.com/dmccreary/us-history/issues)

When reporting issues, please include:

- The chapter or page where the problem occurs
- Description of the issue
- Expected vs. actual content (for errors)

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**You are free to:**

- Share — copy and redistribute the material
- Adapt — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — Give appropriate credit with a link to the original
- **NonCommercial** — No commercial use without permission
- **ShareAlike** — Distribute contributions under the same license

See [docs/license.md](docs/license.md) for full details.

## Acknowledgements

This project is built on excellent open source tools:

- **[MkDocs](https://www.mkdocs.org/)** — Static site generator for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** — Responsive, feature-rich theme
- **[mkdocs-glightbox](https://github.com/blueswen/mkdocs-glightbox)** — Image lightbox plugin
- **[vis-network](https://visjs.org/)** — Network visualization for the learning graph viewer
- **[Claude AI](https://claude.ai)** by Anthropic — AI-assisted content and skill generation
- **[GitHub Pages](https://pages.github.com/)** — Free hosting for open source projects

## Contact

**Dan McCreary**

- LinkedIn: [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- GitHub: [@dmccreary](https://github.com/dmccreary)

Questions or collaboration opportunities? Connect on LinkedIn or open an issue on GitHub.
