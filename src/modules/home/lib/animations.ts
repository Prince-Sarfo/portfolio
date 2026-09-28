import type { Variants } from "framer-motion";

/**
 * Shared motion vocabulary for the home page.
 *
 * Motion here is functional, not decorative: variants encode the direction and
 * relationship of the content they animate (timeline items slide along the
 * timeline, columns converge from their side, grids pop in). Durations stay in
 * the 400-600ms range with an ease-out curve so entrances feel responsive.
 * Motion-reduction is handled globally by `MotionConfig reducedMotion="user"`.
 */

const easeOut = [0.22, 1, 0.36, 1] as const;

export const viewportOnce = { once: true, amount: 0.15 } as const;

/** Parent wrapper that reveals its children in sequence. */
export const staggerContainer = (
  staggerChildren = 0.12,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Rises into place. Default for headings and body copy. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

/** Opacity only. For elements that should not shift the reader's eye. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: easeOut } },
};

/** Enters from the left. Pairs with left-anchored content (timelines, columns). */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: easeOut } },
};

/** Enters from the right. Mirrors `slideInLeft` for right-anchored content. */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: easeOut } },
};

/** Scales up subtly. For cards and stats that read as discrete objects. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};
