# 02 — BRAND LANGUAGE
## Materials · Colour · Typography · Motifs · Personality

---

## Materials

Materials are not aesthetic choices. They are the literal surfaces of the bungalow, the shelves, the kitchen, the rain tree. Every material in the design system must exist in the physical space.

| Material | Rule |
|---|---|
| **Aged plaster** | Background surfaces. Never pure white, never warm grey. The cream of a wall that has absorbed years of conversation. |
| **Uncoated paper** | Cards, labels, artifacts. Slightly rough, slightly absorbent. Ink bleeds at the edges. Never coated, never glossy. |
| **Rain tree shadow** | Ambient lighting in images and section gradients. Dappled, green-cast, never direct. |
| **Terracotta** | Signal colour for food artifacts. The clay cup filter coffee arrives in. |
| **Old teak** | Dark accents, bookshelves, the footer. Dense, South Indian, dark-grained. Not Scandinavian pine. |
| **Milo tin** | Nostalgia as material. Not visual — conceptual. Remind: this is a place that chose to serve Milo. |

**When a design decision is unclear, ask:** which of these materials does this decision feel like?

---

## Colour System

### Semantic Roles

Colours are not decorative. Each colour has an emotional job. Never use a colour outside its job.

| Colour | Name | Hex | Semantic Role | When It Appears |
|---|---|---|---|---|
| `#F2E8D5` | Manuscript | Foundation | The paper everything rests on. Every section background. | Always present |
| `#EDE3CC` | Old Plaster | Foundation (variant) | Card backgrounds on top of Manuscript. The bungalow wall. | Cards, artifacts |
| `#F8F2E4` | Bungalow Cream | Foundation (lightest) | Interior of artifact cards. The freshest paper. | Inside cards only |
| `#C8892A` | Mysore Pak | Appetite | Marks something edible, specific, local. The Mysore Pak croissant. Indian-Bangalore fusion. | Food labels, one accent per food section |
| `#A85438` | Terracotta | Warmth | Dividers, small accents. The clay cup, the chipped bungalow wall. Familiar. | One accent per section max |
| `#4A5C38` | Moss | Nature | Book-related elements. The rain tree canopy. Aged, not bright. | Books section, shelf markers |
| `#B87068` | Blush | Discovery | Used once on the entire homepage. The White Chocolate and Rose Latte. Surprising, soft. | One moment only |
| `#7A5030` | Chai | Warmth (type) | Secondary accent for card typography. Filter coffee in steel tumbler. | Type on light cards |
| `#1A1510` | Night Wood | Closure | Footer background only. Closing time. The depth of the shelves at 11pm. | Footer only |
| `#1C1510` | Ink | — | All body type. A well-inked pen on old Kannada paper. Not pure black. | Type everywhere |
| `#5A4A3A` | Faded Ink | — | Secondary type. Old text on old paper. | Supporting text |
| `#9A8A78` | Ghost Ink | — | Tertiary type. Dates, metadata, captions. | Labels, dates |

### Colour Rules

1. **Foundation colours are always present. Signal colours earn their appearance.**
2. **One signal colour per section maximum.** Two signal colours in the same area cancel each other.
3. **Desaturate the real swatch.** Every colour has been in afternoon sun. Nothing is fresh from a design tool.
4. **Blush appears once on the homepage.** Once. Not once per section. Once total.
5. **Night Wood is for the footer only.** Dark mid-page means something has gone wrong.
6. **Colour comes from food or place, never from design trends.** If you cannot name what at Beku the colour comes from, remove it.

---

## Typography

### Three Registers

#### Register 1 — Literary
*Cormorant Garamond Italic, weight 300–400*

- Used for: Opening lines. Emotional statements. The moment a visitor pauses.
- Size: `clamp(1rem, 1.8vw, 1.5rem)` minimum at body; `clamp(2.5rem, 6vw, 5rem)` at display.
- Leading: 1.25–1.4.
- Never: bold, uppercase, used as a label or button.
- Rule: If the sentence could appear in a book, it is Register 1.

#### Register 2 — Practical
*DM Sans, weight 300*

- Used for: Addresses, hours, menu body, recommendation notes, body of artifact text.
- Size: `clamp(0.875rem, 1.05vw, 1rem)`.
- Leading: 1.65–1.75.
- Never: bold on the homepage, uppercase, used for display.
- Rule: If the sentence is something staff would tell you, it is Register 2.

#### Register 3 — Label
*DM Sans, weight 400–500, uppercase, letter-spacing 0.09–0.12em*

- Used for: Artifact labels. "TODAY." "ISHITA RECOMMENDS." "WHERE." "FICTION." Shelf markers.
- Size: Maximum 0.6875rem (11px). Never larger.
- Feels like: A Dymo label, a stamp, a typed card. Found, not designed.
- Never: Used for decorative uppercase headings. It is functional, not expressive.
- Rule: If someone printed this on a label maker, it is Register 3.

#### Register 4 — Event (artifacts only)
*Mixed weights, mixed sizes, assembled rather than designed.*

- Used only inside event fragment artifacts.
- Feels like: a pinned flyer assembled in a hurry.
- Never: used in the main content flow.

### Typography Rules

1. **One register per element.** Never two registers in the same line.
2. **Differentiate with size, not weight.** The only bold on the homepage is implicit in size contrast.
3. **Register 3 is the smallest thing on any surface.** If it grows, it becomes decoration and loses its function.
4. **Leading is generous or tight. Never mid-range.** Display: 1.25–1.4. Body: 1.65–1.75. Never 1.4–1.55 for body — that is UI, not reading.
5. **Cormorant never does UI work.** Not buttons, not labels, not navigation.

---

## Artifact Language

Artifacts are the evidence that Beku exists. They are collected objects, not designed components.

### What Makes Something an Artifact

1. It has an origin — someone made it for a reason outside the website.
2. It carries specific information — real items, real names, real facts.
3. It has slight imperfection — rotation, offset, the quality of something placed by hand.
4. It has material weight — shadow, border, specific paper colour.

### The Artifact Vocabulary

| Artifact | Purpose | Key Rules |
|---|---|---|
| **Bake card** | Today's specific item. Appetite. | Register 3 for "TODAY". Register 1 for item name. One sensory line in Register 2. Rotate 1–3°. |
| **Recommendation card** | A staff pick. Discovery. | Register 3 for name. Register 1 for title. Register 2 for the note. Ghost card behind. Rotate −0.5° to −1°. |
| **Printed address card** | Coordinates. Closure. | Register 3 for WHERE / WHEN. Register 2 for content. No rotation (it is a formal document). |
| **Bakery label** | Identifies a specific item. Appetite + local. | Small botanical illustration. Register 1 for item name. Contains "with Mysore Pak filling" or similar specific detail. |
| **Shelf marker** | A bookstore genre label. Discovery. | Register 3 only. "FICTION." "POETRY." Optionally: "BORROWED TWELVE TIMES." Zero border-radius — cut, not rounded. |
| **Event fragment** | Implies ongoing life. Surprise. | Register 4 typography. Torn or cut paper edge quality. Contains a real event type (film screening, craft night). |
| **Kannada annotation** | The name's true identity. Discovery. | ಬೇಕು in a small serif. Once per surface. Not translated. Not explained. |

### Artifact Rules

1. **Maximum two artifacts per viewport.**
2. **Artifacts do not animate.** They were placed before the visitor arrived.
3. **No artifact contains generic copy.** Every artifact is specific to Beku.
4. **No two adjacent artifacts rotate in the same direction.**
5. **Artifacts break the content grid.** Text respects the grid. Artifacts do not.

---

## Graphic Motifs

### The Rain Tree Leaf
A simplified Samanea saman branch: 2–3 pairs of small leaflets on a central stem. Single-weight line, slightly uneven at 1–1.5px visual weight. Appears on bakery labels, bookmarks, coffee bag, shelf markers. Never large, never isolated from a functional object.

**Rule:** The rain tree leaf is always attached to something. It does not decorate empty space.

### The Double Hairline
Two parallel 1px lines set 2–3px apart. Used before Register 3 labels inside artifacts, or as section openers where a rule is needed. Reads like the ruled margin of a manuscript.

**Rule:** Used only inside artifacts or as structural markers. Never as decorative section headers.

### "Beku." with the period
The word mark always includes the period when used at small scale. The period transforms it from a name into a declaration.

**Rule:** "Beku." in the footer. On the coffee bag. On the bookmark corner. Always with the period. The period is not optional.

### ಬೇಕು (Kannada)
Appears once per surface as a small annotation. Not translated. Not explained. Set in a serif that respects the script.

**Rule:** One instance per surface. If a designer asks whether to add a second instance, the answer is no.

---

## Shape Language

- **Cards and printed artifacts:** 2–4px border-radius. Says "printed card." Not 0px (too formal), not 8px+ (too UI).
- **Images:** 4–8px border-radius. Never circles or ovals. Photographs, not avatars.
- **Labels (Register 3 containers):** 0px border-radius. Cut with scissors, not rounded.
- **Dividers:** 1px hairlines only. No thick rules. Maximum opacity on a coloured divider: rgba(signal colour, 0.30).
- **Prohibited shapes:** Pill buttons. Circle containers. Frame boxes around typography.

---

## Personality System

These scales define Beku's position. Use them to resolve conflicts between design options.

```
Serious    ───────────┤  ●  ├──────── Playful      → 5.5 / 10
Formal     ─────────●─┤     ├──────── Casual       → 4 / 10
Cold       ───────────┼─────┤●─────── Warm         → 8.5 / 10
Quiet      ─────────●─┤     ├──────── Loud         → 4 / 10
Global     ───────────┤  ●  ├──────── Local        → 7 / 10
Editorial  ─────●─────┤     ├──────── Collected    → 3.5 / 10
```

**When two design options are in conflict:** choose the one closer to Warm, Collected, and Local.

**The current homepage sits at:** Serious 3, Formal 7, Warm 5, Editorial 8, Local 2.

**Every change moves toward the target.** No change moves away from it.
