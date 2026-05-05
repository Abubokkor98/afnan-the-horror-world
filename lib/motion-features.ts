/**
 * Async loader for Motion's domAnimation feature bundle (~15kb).
 * Passed to <LazyMotion features={loadFeatures}> in the root layout.
 * Loading asynchronously defers the animation JS until after hydration,
 * keeping the initial page load as fast as possible.
 */
export const loadFeatures = () =>
  import("motion/react").then((mod) => mod.domAnimation)
