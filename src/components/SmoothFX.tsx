import { useEffect } from 'react';
import Lenis from 'lenis';
import { setSmoothScroller } from '@/lib/smoothScroll';

/**
 * Two page-wide effects, no DOM output:
 * 1. Inertial ("liquid") scrolling via Lenis, on fine pointers only.
 * 2. Pointer-tracked light: sets --mx/--my on the nearest .glow-card / [data-spot]
 *    so CSS can lighten the area under the mouse.
 */
const SmoothFX = () => {
  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    let lenis: Lenis | null = null;
    let raf = 0;
    if (fine && !calm) {
      lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
      setSmoothScroller(lenis);
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const el = (e.target as Element | null)?.closest<HTMLElement>('.glow-card, [data-spot]');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      setSmoothScroller(null);
      lenis?.destroy();
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return null;
};

export default SmoothFX;
