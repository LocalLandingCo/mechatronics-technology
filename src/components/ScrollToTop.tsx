import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { resetScroll } from '@/lib/smoothScroll';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) return;
    resetScroll();
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
