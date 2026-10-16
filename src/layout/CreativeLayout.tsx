import { useEffect, useRef, type ReactNode } from 'react';
import { ArrowUpRight, ArrowUp, Github, Linkedin, Menu } from 'lucide-react';
import { homePath, profilePath, projectsPath, type Page } from '@/utils/routes';
import { site } from '@/config/site';
import { translations } from '@/utils/translations';
import { MakerMark } from '@/concepts/MakerMark';
import { conceptCopy } from '@/concepts/content';
import '@/concepts/concepts.css';
import '@/concepts/artwork.css';
import '@/concepts/devplay.css';
import './portfolio.css';
import './evolution.css';

export function CreativeLayout({ page, children }: { page: Page; children: ReactNode }) {
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector('summary')?.focus();
      }
    }
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);
  const t = translations[page.language];
  const copy = conceptCopy(page.language);
  const home = homePath(page.language);
  const links = [
    {
      href: projectsPath(page.language),
      label: t.nav.projects,
      current: page.kind === 'projects' || page.kind === 'project',
    },
    {
      href: profilePath(page.language),
      label: t.about.profileTitle,
      current: page.kind === 'profile',
    },
    { href: home + '#contacto', label: copy.contact, current: false },
  ];
  const navigation = links.map((link) => (
    <a
      key={link.href}
      href={link.href}
      aria-current={link.current ? 'page' : undefined}
      onClick={() => menu.current?.removeAttribute('open')}
    >
      {link.label}
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  ));
  return (
    <div className="concept-site workshop-world devplay-world portfolio-site" data-remix="cobalt">
      <a className="skip-link" href="#concept-main">
        {t.skip}
      </a>
      <header className="concept-header creative-header">
        <a className="concept-brand" href={home} aria-label="Denilson Arguello">
          <MakerMark />
          <span className="brand-wordmark">
            denilson<span className="brand-dot">.</span>
          </span>
        </a>
        <nav
          className="creative-desktop-nav"
          aria-label={page.language === 'es' ? 'Navegación principal' : 'Main navigation'}
        >
          {navigation}
        </nav>
        <div className="creative-header-tools">
          {page.alternate ? (
            <a
              className="header-language"
              href={page.alternate}
              hrefLang={page.language === 'es' ? 'en' : 'es'}
              lang={page.language === 'es' ? 'en' : 'es'}
              aria-label={t.language}
            >
              {t.language}
            </a>
          ) : null}
          <details className="creative-mobile-menu" ref={menu}>
            <summary aria-label={page.language === 'es' ? 'Abrir navegación' : 'Open navigation'}>
              <Menu size={22} aria-hidden="true" />
            </summary>
            <nav
              className="mobile-menu"
              aria-label={page.language === 'es' ? 'Navegación móvil' : 'Mobile navigation'}
            >
              {navigation}
            </nav>
          </details>
        </div>
      </header>
      <main id="concept-main" tabIndex={-1}>
        {children}
      </main>
      <footer className="concept-footer creative-footer">
        <div>
          <MakerMark />
          <p>
            {copy.footer}
            <br />
            <span>PHP / WORDPRESS / REACT / NODE.JS</span>
          </p>
        </div>
        <div className="concept-socials">
          <a href={site.github} aria-label="GitHub">
            <Github size={19} aria-hidden="true" />
          </a>
          <a href={site.linkedin} aria-label="LinkedIn">
            <Linkedin size={19} aria-hidden="true" />
          </a>
          <a
            href="#concept-main"
            aria-label={page.language === 'es' ? 'Volver arriba' : 'Back to top'}
          >
            <ArrowUp size={20} aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  );
}
