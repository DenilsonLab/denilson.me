import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { useActiveSection } from '@/hooks/useActiveSection';
import type { Page } from '@/utils/routes';
import { translations } from '@/utils/translations';
import { site } from '@/config/site';
export function LayoutWithSidebar({ children, page }: { children: ReactNode; page: Page }) {
  const observed = useActiveSection(page.kind === 'home');
  const active =
    page.kind === 'home'
      ? observed
      : page.kind === 'profile'
        ? 'sobre-mi'
        : page.kind === 'notFound'
          ? ''
          : 'proyectos';
  const t = translations[page.language];
  return (
    <>
      <a className="skip-link" href="#contenido">
        {t.skip}
      </a>
      <div className="site-layout">
        <Sidebar page={page} activeSection={active} />
        <div className="site-body">
          <MobileNav page={page} activeSection={active} />
          <main id="contenido" tabIndex={-1}>
            {children}
          </main>
          <footer className="site-footer">
            <p>
              {site.name} · {t.footer}
            </p>
            <a href={'mailto:' + site.email}>{site.email}</a>
          </footer>
        </div>
      </div>
    </>
  );
}
