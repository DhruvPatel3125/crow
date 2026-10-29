/* ─── Shared motion language ─────────────────────────────────────
   One easing curve + the variant vocabulary every section speaks.
   All animations use transform + opacity only, fire once, and are
   softened globally for reduced-motion users via
   <MotionConfig reducedMotion="user"> in App.jsx.
   (Constants live here, components in Reveal.jsx, so fast-refresh
   stays happy.) */

export const EASE = [0.22, 1, 0.36, 1];

/* Parent/child variant pair for staggered groups (grids, columns,
   lists). Parent orchestrates; children just declare the variant. */
export const staggerParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

export const staggerChild = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

export const staggerChildScale = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: EASE },
  },
};
