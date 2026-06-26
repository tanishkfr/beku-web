# 05 — WEB SYSTEM
## Layout · Density · Discovery · Components · Spacing · Interaction

---

## The Fundamental Layout Rule

**Beku is a book, not a dashboard.**

Books have: a reading margin, a content column, and occasional objects that interrupt the column (images, pull quotes, found items tucked between pages).

Dashboards have: 12-column grids, symmetric layouts, component libraries.

Every layout decision is made from the book model, not the dashboard model.

---

## Three Zones

The page is divided into three horizontal zones. These are not CSS grid columns. They are spatial territories.

**Zone 1 — The Margin**
`left: 0` to `clamp(2rem, 8vw, 7rem)`

Where: small annotations, Register 3 labels, the Kannada mark, tiny botanical illustrations, footnotes.

Rule: Content in Zone 1 is always supplementary, never primary. A visitor who misses Zone 1 content has not missed the section.

**Zone 2 — The Content Column**
`clamp(2rem, 8vw, 7rem)` inward, width `clamp(30ch, 52%, 60ch)` for body text.

Where: All primary text. Register 1, 2, and 3. The main flow of every section.

Rule: Typography max-width is controlled by `ch` units, not `px` or `%`. This ensures line length is always reading-appropriate regardless of font size.

**Zone 3 — The Artifact Zone**
Beyond the content column to the right edge.

Where: Artifacts may begin inside Zone 2 and extend into Zone 3. Images may be full-bleed (touching both edges). Nothing else belongs here.

Rule: The artifact zone is not for text. Text that drifts into Zone 3 is not layout — it is a mistake.

---

## Density Principle

**Every viewport should contain:**

1. **One primary anchor** — the element the eye goes to first. Typography, image, or artifact. One only.
2. **One supporting element** — context for the anchor. A label, a subtitle, a secondary image detail.
3. **One subtle discovery** — something small that rewards a closer look. A Register 3 label. The Kannada annotation. A botanical illustration on a card. A shelf marker. An event detail.

**Nothing should feel empty. Nothing should feel crowded.**

Empty means: a viewport with only one type of element and no discovery moment.
Crowded means: multiple anchors competing for attention.

**Test:** Hold your hand over each element. If removing it leaves the viewport feeling noticeably sparse, it was doing density work. Keep it.

---

## Discovery Principle

Beku reveals itself slowly. The upstairs library, the handmade bookmarks, the events calendar, the specific staff names — visitors discover these things.

The website rewards the same curiosity.

**Rules:**

1. **Every 2–3 scroll sections, there is something unexpected.** A shelf marker the visitor did not expect. An event fragment. A recommendation card. The Kannada annotation. A botanical illustration. These are not decorative — they are discoveries.

2. **Discoveries are never announced.** No heading that says "Look at this." The discovery element is simply there, in the right place, at the right size.

3. **Discoveries are never the primary anchor.** They live in Zone 1 or at the edge of an artifact. The visitor who reads quickly will not see them. The visitor who lingers will.

4. **The discovery schedule for the homepage:**
   - Arrival: ಬೇಕು annotation (very small, below the tagline or in the far margin)
   - Food: The bake card (already implemented) + the Mysore Pak Croissant name (which is itself a discovery for anyone who reads it)
   - Books: The shelf marker ("BORROWED TWELVE TIMES")
   - Reviews: The third fragment's position (pushed so far right it almost escapes the page)
   - Visit: The Kannada annotation in the footer

---

## Grid Philosophy

**No 12-column grid.** A 12-column grid implies all content slots are interchangeable. At Beku, no two rooms are the same.

**No CSS Grid for page layout.** CSS Grid for alignment within a section (like the WHERE/WHEN two-column card) is fine. CSS Grid as the page structure is not.

**Vertical rhythm over horizontal alignment.** The page flows top to bottom. Sections do not mirror each other. Each section has its own spatial logic, derived from the room it represents.

---

## Spacing Philosophy

Spacing communicates hierarchy. Tight spacing says "these things are related." Generous spacing says "something new is beginning."

| Context | Rule |
|---|---|
| Between section title and opening line | `clamp(0.5rem, 1.5vh, 1rem)` — they belong to each other |
| Between opening line and image | `clamp(2rem, 5vh, 3.25rem)` — a breath before the photograph |
| Between image and fragment content | `clamp(3rem, 7vh, 5rem)` — the image should land before the text arrives |
| Between artifact and the text before it | `clamp(2.5rem, 6vh, 4rem)` — an artifact needs air |
| Between sections | `clamp(7rem, 16vh, 12rem)` at the top of each section — turning a page |
| Inside an artifact card | `clamp(1.25rem, 3vh, 1.75rem)` — tighter, the object is small |

**Whitespace is inhabited, not empty.** If a large area has no text, image, or discovery element, add one or reduce the spacing. Beku's spaces are always partly full.

---

## Shadow Philosophy

All shadows use warm brown cast. The light source is rain tree afternoon sun — warm, from above and slightly to the side, never frontal or cool.

```css
/* Pressed — stamp, label, light sticker */
box-shadow: 0 1px 3px rgba(40, 20, 8, 0.12);

/* Placed — card sitting on paper */
box-shadow: 2px 4px 18px rgba(40, 20, 8, 0.08), 0 1px 3px rgba(40, 20, 8, 0.04);

/* Floating — artifact above background */
box-shadow: 0 8px 32px rgba(40, 20, 8, 0.14), 0 2px 6px rgba(40, 20, 8, 0.06);
```

**Never:** `rgba(0, 0, 0, X)`. Cool shadows belong to offices with fluorescent light, not bungalows with rain trees.

---

## Border Philosophy

Borders confirm material. They do not decorate.

```css
/* Card edge — where paper ends */
border: 1px solid rgba(175, 150, 115, 0.55);

/* Inner hairline — inside a card */
border: 1px solid rgba(175, 150, 115, 0.35);

/* Label edge — cut paper */
border: 1px solid rgba(175, 150, 115, 0.45);
```

**Prohibited:** Double borders. Dashed decorative borders. Frame boxes around headings. Coloured borders (border colour never uses a signal colour).

---

## Component Rules

### Images

- Border radius: 4–8px. Never 0 (too clinical), never 12px+ (too UI).
- Images are either full-bleed (touching horizontal edges) or fully contained in a named frame.
- No 70%, 80%, or 90%-width images with undefined reason. If it does not bleed, it is contained in a specific, reasoned frame.
- Images never have decorative overlays, colour tints, or gradients applied in CSS. The photograph is the photograph.

### Cards and Artifacts

- Border radius: 2–4px.
- Paper background: `var(--color-offwhite)` or `var(--color-paper)` depending on depth.
- Shadow: "Placed" shadow as above.
- Rotation: 1–3° for hand-placed artifacts. 0° for formal documents (address card).
- Never: scale transform on hover, opacity on hover (cards are physical objects — they don't dim when touched).

### Navigation

- The navbar is thin, transparent, and confident.
- Links use Register 2 (DM Sans 300) at small size.
- No active state animation. Active = current page = underline, static.
- Mobile: the navigation collapses. What replaces it should feel like Beku, not like a hamburger menu template.

### Dividers

- 1px height.
- Colour: either ghost ink (rgba(175, 150, 115, 0.35)) or a single signal colour at rgba(signal, 0.28–0.32).
- Maximum width: `clamp(120px, 30%, 280px)`. A divider that spans the full content column is too assertive.
- Never: thick rules, decorative rules, ornamental dividers.

---

## Layering Principles

Objects at Beku overlap. A cup on a book. A bookmark above a stack. An event poster half-covered by a newer one.

**Layer stack (bottom to top):**
- **L0:** Section paper background + atmospheric gradient
- **L1:** Primary content text
- **L2:** Ghost cards, resting shadows
- **L3:** Physical artifacts (cards, labels, event fragments)
- **L4:** Hover states only (nothing lives at L4 at rest)

**The overlap rule:** When an artifact overlaps content, the artifact wins. The text layout creates space for the artifact; the artifact does not adapt to the text.

**The z-depth colour rule:** Deeper in z-space = more aged = warmer and slightly darker. Background (L0) = Manuscript. Cards on background (L3) = Old Plaster or Bungalow Cream. Labels on cards = Bungalow Cream (freshest).

---

## Section Identity

Each section is a room. Different rooms, same house.

| Section | Room | Key spatial quality | Primary anchor | Discovery |
|---|---|---|---|---|
| Arrival | The gate / approach | Open, anticipatory | Display headline | ಬೇಕು annotation |
| Story | The owner's story | Intimate, specific | The bungalow/rain tree image | The exact phrase about the trees |
| Space | The outdoor area | Natural, dappled | Rain tree / verandah image | A found detail in the image |
| Food | The counter | Dense, appetitive | Real menu items | Mysore Pak Croissant (the name itself) |
| Books | The upstairs library | Still, discovering | The recommendation card | "BORROWED TWELVE TIMES" shelf marker |
| Reviews | The outdoor tables | Communal, unhurried | Full-width interior image | The third fragment's extreme position |
| Visit | The address | Clear, final | The printed card | ಬೇಕು in the footer |

**Rule:** When redesigning a section, name the room first. Then ask what someone notices when they walk into that room. That is the anchor.

---

## The Final Test

Before any component, section, or layout decision ships, ask:

1. **Does this feel collected, or does it feel designed?**
2. **Could a designer who has never seen Beku have produced this without the system?** If yes, it is not specific enough.
3. **Is there a discovery moment in this viewport?**
4. **Does the light source feel consistent with 03_PHOTOGRAPHY.md?**
5. **Does the colour earn its appearance?**

If any answer is no, revise before shipping.
