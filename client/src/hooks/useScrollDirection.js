import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState('up');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;
      setIsScrolled(scrollY > 40);

      if (Math.abs(scrollY - lastScrollY) < 10) {
        return;
      }
      setScrollDir(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDir, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollDir);
  }, []);

  return { scrollDir, isScrolled };
}

