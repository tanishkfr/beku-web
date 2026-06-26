# 04 — MOTION
## Motion Language

---

## The Principle

**Things arrive at Beku. They do not perform.**

Motion at Beku reflects the pace of the space: unhurried, calm, already in progress. A visitor entering the bungalow does not see things appear dramatically. They see a room that was already there.

---

## Entry Motion

**How elements appear as the visitor scrolls:**

- **Type:** Opacity 0 → 1, with a vertical drift of 6–8px (upward). Duration 0.85–1.0s. Not scale. Not slide. Not bounce.
- **Images:** Opacity 0 → 1 only. No movement. An image revealing itself like eyes adjusting to the room.
- **Artifacts:** Do not animate. They are already placed when the viewport arrives. If scroll reveals an artifact, it appears at opacity 0 → 1 at full position with no drift. Duration 0.7s.
- **Lists (menu items, fragments):** Staggered entry, 0.08–0.12s between items.

**Rule:** No element should draw attention to its own arrival. If the animation is noticeable, it is too much.

---

## Easing

Single easing curve for all motion at Beku:

```
cubic-bezier(0.25, 0.1, 0.25, 1)
```

This is `ease` in CSS. Not `ease-in-out`. Not spring physics. Not bounce. The curve of a door swinging gently open.

**Prohibited easings:** Spring physics, bounce, elastic, dramatic ease-in, dramatic ease-out. These belong to products that want to impress. Beku does not.

---

## Duration Rules

| Element type | Duration |
|---|---|
| Body text, labels | 0.85s |
| Display / heading text | 0.95s |
| Images | 1.0s |
| Artifacts | 0.7s (opacity only) |
| Stagger offset between list items | 0.08–0.12s |

**Minimum duration:** 0.7s. Faster than this and the animation is UI, not atmosphere.

**Maximum duration:** 1.0s for content. Beyond this, the visitor is waiting.

---

## What Never Animates

- Artifacts. They are placed objects.
- The page grain texture. It does not pulse or shift.
- Section backgrounds. The atmospheric gradients are static.
- Navigation. The navbar does not animate on scroll.
- The Kannada annotation. It is already there when found.

---

## Scroll-Linked Motion

**No parallax.** Parallax creates a sense of depth that is theatrical and composed. Beku is neither.

**No sticky reveals or pin-based animations.** These are editorial techniques from design magazines.

**Viewport entry only.** Elements animate when they enter the viewport. Once entered, they stay. No exit animations.

---

## Reduced Motion

When `prefers-reduced-motion: reduce` is true:

- All opacity values are instant (duration: 0ms or minimal).
- No vertical drift.
- No stagger.
- Elements are present from the start.

This is not a degraded experience. For many users this is the correct experience.

---

## Hover States

Hover states exist for interactive elements only (navigation links, artifact cards that link somewhere).

**Rule for hover on text links:** opacity change only (1.0 → 0.72). No colour change. No underline animation. No translate.

**Rule for hover on artifact cards (if interactive):** box-shadow deepens slightly (increase blur radius by 4–6px). No scale. No lift animation.

**Nothing hovers to signal that it is interesting.** At Beku, interesting things do not wave at you. You notice them.

---

## The One Exception

Event fragment artifacts may have a very subtle page-curl shadow on hover — a 2D shadow suggestion that one corner is slightly lifted. This is an artifact behaviour, not a component behaviour. It applies only to event fragments.

Implementation: On hover, add `box-shadow: 3px 6px 24px rgba(40, 20, 8, 0.13)` (slightly deeper than resting state). No transform.
