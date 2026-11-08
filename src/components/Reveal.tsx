import type { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

/** Eases a page section in the first time it scrolls into view. */
const Reveal = ({ children }: { children: ReactNode }) => {
  const { ref, inView } = useInView<HTMLDivElement>(0.05);
  return (
    <div ref={ref} className={`reveal ${inView ? 'is-in' : ''}`}>
      {children}
    </div>
  );
};

export default Reveal;
