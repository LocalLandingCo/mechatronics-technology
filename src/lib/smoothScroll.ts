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

/**
 * Scroll to a section on the current page, waiting for it if its lazy chunk is
 * still loading. Lenis caches the page height, and it can still hold the height
 * from before the lazy sections arrived, so it has to re-measure first or it
 * clamps the target to the top of the page.
 */
export const scrollToSection = (id: string) => {
  const deadline = performance.now() + 5000;

  const attempt = () => {
    const section = document.getElementById(id);
    if (!section) {
      if (performance.now() < deadline) window.setTimeout(attempt, 50);
      return;
    }
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(section);
    } else {
      // Phones skip off-screen sections and only estimate their height (see
      // content-visibility in index.css), which would put the landing spot off.
      document.querySelectorAll<HTMLElement>('section[id]').forEach((el) => {
        el.style.contentVisibility = 'visible';
      });
      section.scrollIntoView();
    }
  };

  attempt();
};
