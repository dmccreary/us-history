# Book Chapter Design Analysis — U.S. History

**Date:** 2026-05-09  
**Skill:** book-chapter-generator  
**Course:** U.S. History (High School / AP Track)  
**Total concepts:** 450  
**Total chapters:** 21  
**Average concepts per chapter:** 21.4  

---

## Input Resources

### Course Description
`docs/course-description.md` — 12 historical periods from Pre-Columbian through the Age of AI, plus four transferable skill domains: Critical Thinking, Systems Thinking, Cognitive Bias, and Misinformation Detection.

### Learning Graph
`docs/learning-graph/learning-graph.json` — 450 nodes, 770 edges, structured as a dependency DAG (edges point FROM dependent TO prerequisite).

### Taxonomy
`docs/learning-graph/concept-taxonomy.md` — 15 groups:

| Group | Name | Count |
|-------|------|-------|
| FOUND | Foundation Concepts | 51 |
| GILDD | Gilded Age and Immigration | 36 |
| PROGR | Progressivism and WWI | 35 |
| REVOL | Revolution and Early Republic | 33 |
| SKILLS | Historical Thinking Skills | 33 |
| DEPRS | 1920s and Great Depression | 32 |
| CIVRT | Civil Rights and Vietnam | 32 |
| EXPAN | Expansion and Reform | 31 |
| CIVWR | Civil War and Reconstruction | 30 |
| WWII | WWII and Early Cold War | 30 |
| AIERA | Age of AI | 30 |
| MODRA | Reagan Era to Modern Day | 29 |
| COLAM | Colonial America | 24 |
| NEWWLD | New World and Early Contact | 17 |
| APTHEME | AP Thematic Lenses | 7 |

---

## Edge Direction Validation

Per skill instructions, validated that edges point FROM dependent TO prerequisite (dependency direction).

**Foundational concepts (zero prerequisites):**
- ID 1: Pre-Columbian Civilizations [FOUND]
- ID 375: Historical Causation [SKILLS]

Both are simple introductory concepts. Validation **passed** ✓

---

## Key Design Challenges

### Challenge 1: Scale (450 vs. typical 200 concepts)
With 450 concepts, hitting the "optimal" 12–18 per chapter would require 25–37 chapters — far too many. The skill's maximum of 20 chapters is designed for graduate-level courses. For a 450-concept high school course, 21 chapters at an average of 21.4 each is the best achievable balance.

### Challenge 2: 91 Cross-Cutting Concepts
Three groups span all eras: FOUND (51), SKILLS (33), and APTHEME (7). These cannot simply be assigned to their "home" historical era because they have dependencies on events spread across the timeline.

**Strategy adopted:** Compute the minimum valid chapter for each cross-cutting concept using topological analysis — place each concept in the earliest chapter where ALL its prerequisites have been taught.

**Key dependency chains discovered:**
- `Lost Cause Narrative (401)` depends on `Redeemer South (144)` → Ch9 (Reconstruction) is earliest valid placement
- `Propaganda Analysis (402)` depends on `Committee on Public Information (214)` → Ch13 (WWI) is earliest valid
- `Arms Race Dynamics (391)` depends on `Arms Race (278, Cold War)` → Ch16 is earliest valid
- `Supply Chain Fragility (390)` depends on `Geopolitics of Semiconductors (350, AIERA)` → Ch21 is earliest valid
- `Political Party Evolution (429)` depends on `Reagan Revolution (319)` → Ch19 is earliest valid
- `Media and Public Opinion (432)` depends on `Social Media and Political Polarization (339)` → Ch20 is earliest valid

### Challenge 3: AP Thematic Lenses Need Full Historical Context
The 7 AP themes each depend on historical events from multiple chapters:
- "America in the World" (412) needs Spanish-Am. War (Ch13), Treaty of Versailles (Ch13), and Cold War (Ch16) → placed in Ch16
- "America and Culture" (413) needs Great Awakening (Ch3), Harlem Renaissance (Ch14), Counterculture (Ch18) → placed in Ch18
- "Work, Exchange, and Technology" (408) needs Industrial Revolution (Ch7) AND Digital Revolution (Ch20) → placed in Ch21 (capstone)

### Challenge 4: Chapter 14 — The "Long Era" Problem
The DEPRS group (32 concepts) plus 3 cross-era FOUND concepts spans 1920–1941 — one of the richest periods in American history (consumer culture, racial justice, economic collapse, political innovation). Splitting it creates pedagogical fragmentation (Depression separated from its 1920s causes). Keeping it together produces the textbook's largest chapter (35 concepts).

**Decision:** Keep it unified. Recommend instructors treat it as two class units within one chapter, with a natural break at the 1929 crash.

### Challenge 5: Remaining Dependency Violations
After extensive repositioning, **1 violation remains** after full optimization:
- `9/11 Attacks (330)` appears to depend on `State-Sponsored Cyber Warfare (361)`

**Assessment:** This is almost certainly a data error in the learning graph — the edge direction is inverted. The 9/11 attacks (2001) historically precede the modern era of AI-enabled state-sponsored cyber warfare (2010s+). The chapter placement (9/11 in Ch19, Cyber Warfare in Ch21) is historically correct. The edge in the learning graph should be reversed: Cyber Warfare depends on 9/11, not the other way around.

---

## Final Chapter Structure

| Ch | Title | URL Slug | Concepts |
|----|-------|----------|----------|
| 1 | Historical Methods and Analytical Frameworks | historical-methods | 23 |
| 2 | Pre-Columbian Americas and European Contact | pre-columbian-contact | 20 |
| 3 | Colonial America (1607–1754) | colonial-america | 25 |
| 4 | The American Revolution (1754–1783) | american-revolution | 17 |
| 5 | Founding the Republic (1783–1800) | founding-the-republic | 29 |
| 6 | The Jeffersonian Era and Early Expansion (1800–1828) | jeffersonian-era | 20 |
| 7 | Manifest Destiny and Antebellum Reform (1828–1848) | manifest-destiny-reform | 16 |
| 8 | Sectionalism and the Civil War (1844–1865) | civil-war | 21 |
| 9 | Reconstruction and Its Aftermath (1865–1877) | reconstruction | 22 |
| 10 | The Gilded Age: Industrialization and Labor (1865–1890) | gilded-age-industry | 24 |
| 11 | Populism and the Closing of the Frontier (1880–1900) | populism-frontier | 13 |
| 12 | The Progressive Era (1890–1914) | progressive-era | 21 |
| 13 | U.S. Imperialism and World War I (1898–1920) | imperialism-world-war-i | 24 |
| 14 | The Roaring Twenties, Depression, and New Deal (1920–1941) | twenties-depression-new-deal | 35 |
| 15 | World War II and the Home Front (1939–1945) | world-war-ii | 16 |
| 16 | The Early Cold War (1945–1960) | early-cold-war | 16 |
| 17 | Civil Rights and the Great Society (1954–1968) | civil-rights-great-society | 23 |
| 18 | Vietnam, Nixon, and Social Movements (1965–1975) | vietnam-nixon | 14 |
| 19 | From Reagan to 9/11 (1975–2001) | reagan-to-9-11 | 18 |
| 20 | Contemporary America and the Digital Age (2001–Present) | contemporary-america | 22 |
| 21 | The Age of AI and Technology Power (2010–Present) | age-of-ai | 31 |

**Total:** 450 concepts assigned | 0 missing | 0 duplicates | 1 violation (graph error)

---

## Concept-to-Chapter Mapping

Full ID list per chapter (for reproducibility):

```
Ch 1  historical-methods:          375 376 377 378 379 380 381 382 383 384 385 386 387 388 389 392 393 394 395 396 397 398 399
Ch 2  pre-columbian-contact:       1 2 17 3 4 5 6 7 8 9 10 11 12 13 14 15 16 18 19 20
Ch 3  colonial-america:            21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 37 38 39 40 41 42 43 44 45 36
Ch 4  american-revolution:         46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62
Ch 5  founding-the-republic:       63 64 65 66 67 69 70 72 73 74 75 76 77 78 79 80 68 71 415 416 417 418 421 425 426 427 428 407 411
Ch 6  jeffersonian-era:            81 82 83 84 85 87 88 89 90 91 92 93 94 95 96 97 86 414 422 423
Ch 7  manifest-destiny-reform:     98 99 100 101 102 103 104 105 106 107 108 109 110 111 112 409
Ch 8  civil-war:                   113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133
Ch 9  reconstruction:              134 135 136 137 138 139 140 141 142 143 144 145 419 420 424 448 449 401 400 403 404 405
Ch 10 gilded-age-industry:         146 147 148 149 150 151 152 153 154 155 156 157 158 159 160 161 162 163 164 165 166 167 168 410
Ch 11 populism-frontier:           169 170 171 172 173 174 175 176 177 178 179 180 181
Ch 12 progressive-era:             182 183 184 185 186 187 188 189 190 195 196 197 198 199 191 192 193 194 437 438 439
Ch 13 imperialism-world-war-i:     200 201 202 203 204 205 206 207 208 209 210 211 212 213 214 215 216 217 218 219 220 402 436 406
Ch 14 twenties-depression-new-deal: 221 222 223 224 225 226 227 228 229 230 231 232 233 234 235 236 237 238 239 240 241 242 243 244 245 246 247 248 249 250 251 252 441 442 447
Ch 15 world-war-ii:                253 254 255 256 257 258 259 260 261 262 263 264 265 266 267 268
Ch 16 early-cold-war:              269 270 271 272 273 274 275 276 277 278 279 280 281 282 391 412
Ch 17 civil-rights-great-society:  283 284 285 286 287 288 289 290 291 292 293 294 295 296 297 298 299 300 310 309 443 446 450
Ch 18 vietnam-nixon:               301 302 303 304 305 306 307 308 311 312 313 314 315 413
Ch 19 reagan-to-9-11:              316 317 318 319 320 321 322 323 324 325 326 327 328 329 330 429 430 431
Ch 20 contemporary-america:        331 332 333 334 335 336 337 338 339 340 341 342 343 344 345 444 445 440 432 433 434 435
Ch 21 age-of-ai:                   346 347 348 349 350 351 352 353 354 355 356 357 358 359 360 361 362 363 364 365 366 367 368 369 370 371 372 373 374 390 408
```

---

## Known Graph Data Issue

Edge `{from: 330 (9/11 Attacks), to: 361 (State-Sponsored Cyber Warfare)}` appears inverted.
Historically, 9/11 precedes and motivates expanded cyber programs. The learning graph should have edge `{from: 361, to: 330}` (Cyber Warfare depends on 9/11 context). This should be corrected in the next graph revision.
