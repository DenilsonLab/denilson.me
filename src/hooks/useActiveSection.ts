import { useEffect, useState } from 'react';
export const sectionIds = [
  'inicio',
  'proyectos',
  'servicios',
  'habilidades',
  'sobre-mi',
  'contacto',
] as const;
export function useActiveSection(enabled: boolean) {
  const [activeSection, setActiveSection] = useState<string>('inicio');
  useEffect(() => {
    if (!enabled) return;
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        const current = elements.find((element) => visible.get(element.id));
        if (current) setActiveSection(current.id);
      },
      { rootMargin: '-12% 0px -45% 0px' },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [enabled]);
  return activeSection;
}
