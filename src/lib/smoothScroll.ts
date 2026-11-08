import type Lenis from 'lenis';

let lenis: Lenis | null = null;

export const setSmoothScroller = (instance: Lenis | null) => {
  lenis = instance;
};

/**
 * Jump to the top of the page. Lenis ignores native scroll events while it is
 * animating, so window.scrollTo alone is undone by any momentum still running.
 */
export const resetScroll = () => {
  lenis?.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
};
