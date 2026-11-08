import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { resetScroll } from '@/lib/smoothScroll';

const ScrollToTop = () => {
  // `key` changes on every navigation, so a link to the page you are already on still scrolls up.
  const { pathname, hash, key } = useLocation();

  useLayoutEffect(() => {
    if (hash) return;
    resetScroll();
  }, [pathname, hash, key]);

  return null;
};

export default ScrollToTop;
