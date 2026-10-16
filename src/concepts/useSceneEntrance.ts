import { useEffect, useRef } from 'react';

/** Content stays visible in server HTML, without JS, and when motion is reduced. */
export function useSceneEntrance() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!root.current || !('IntersectionObserver' in window)) return;
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (media.matches) continue;
          const animation = entry.target.animate(
            [
              { opacity: 0.55, transform: 'translateY(24px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 300, easing: 'cubic-bezier(.2,.7,.2,1)' },
          );
          animations.add(animation);
          animation.finished.then(() => animations.delete(animation)).catch(() => {});
        }
      },
      { threshold: 0.12 },
    );
    root.current
      .querySelectorAll('.editorial-projects [data-entrance]')
      .forEach((element) => observer.observe(element));
    const stop = () => {
      if (media.matches) animations.forEach((animation) => animation.cancel());
    };
    media.addEventListener('change', stop);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      media.removeEventListener('change', stop);
    };
  }, []);
  return root;
}
