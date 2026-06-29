// Experimental feature flags.
//
// Each swing added in the "experimental-swings" work is gated behind a flag
// here. Set any flag to `false` to instantly revert that one feature to the
// site's previous (stable-v1) behaviour — no git surgery required. The old
// code paths are kept intact alongside the new ones for exactly this reason.
//
// Full revert to the pre-experimental site: `git checkout stable-v1`.

export const EXPERIMENTS = {
  /** Global palette + open/closed state shift with the visitor's local time. */
  timeAwareLight: true,
  /** Kannada names revealed on hover/focus across menu + labels. */
  kannadaLayer: true,
  /** Build out the documented-but-missing physical artifacts. */
  artifactVocab: true,
  /** Quiet margin discovery that surfaces only after dwelling on a section. */
  slownessReward: true,
  /** Books "shelf" scrolls horizontally with snap; vertical fallback when off. */
  horizontalShelf: true,
  /** Footer audio becomes generative calming music; room-tone fallback when off. */
  generativeMusic: true,
  /** Tasteful hover micro-interactions on interactive elements and type. */
  hoverMotion: true,
  /** Books relaid out around a slow drifting shelf "ticker" (vs the list). */
  booksTicker: true,
} as const

export type ExperimentKey = keyof typeof EXPERIMENTS
