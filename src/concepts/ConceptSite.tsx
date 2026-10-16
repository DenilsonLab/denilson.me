import { ArrowDown, ArrowLeft, ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { conceptPath, homePath, type Page } from '@/utils/routes';
import { site } from '@/config/site';
import { conceptCopy } from './content';
import { DevPlay } from './DevPlay';
import { Orbit } from './Orbit';
import { MakerMark } from './MakerMark';
import './concepts.css';
import './artwork.css';
import './devplay.css';
import '@/layout/evolution.css';

export function ConceptSite({ page }: { page: Page }) {
  const t = conceptCopy(page.language);
  const orbit = page.concept === 'orbit';
  return (
    <div
      className={'concept-site ' + (orbit ? 'orbit-world' : 'workshop-world devplay-world')}
      data-remix="cobalt"
    >
      <a className="skip-link" href="#concept-main">
        {t.skip}
      </a>
      <aside
        className="concept-switcher"
        aria-label={page.language === 'es' ? 'Propuestas visuales' : 'Visual proposals'}
      >
        <a className="concept-return" href={homePath(page.language)} aria-label={t.current}>
          <ArrowLeft size={13} /> <span>{t.current}</span>
        </a>
        <nav aria-label={page.language === 'es' ? 'Cambiar propuesta' : 'Switch proposal'}>
          <a href={conceptPath('taller', page.language)} aria-current={!orbit ? 'page' : undefined}>
            <span>01</span> dev.play
          </a>
          <a href={conceptPath('orbit', page.language)} aria-current={orbit ? 'page' : undefined}>
            <span>02</span> Órbita
          </a>
        </nav>
        <a
          className="concept-language"
          href={page.alternate}
          lang={page.language === 'es' ? 'en' : 'es'}
          aria-label={page.language === 'es' ? 'English' : 'Español'}
        >
          {page.language === 'es' ? 'EN' : 'ES'}
        </a>
      </aside>
      <header className="concept-header">
        <a
          className="concept-brand"
          href={conceptPath(orbit ? 'orbit' : 'taller', page.language)}
          aria-label="Denilson Arguello"
        >
          <MakerMark />
          <span className="brand-wordmark">
            denilson<span className="brand-dot">.</span>
          </span>
        </a>
        <nav aria-label={page.language === 'es' ? 'Navegación principal' : 'Main navigation'}>
          <a href="#explorar">{t.work}</a>
          <a href="#persona">{t.about}</a>
          <a className="nav-contact" href="#conversar">
            {t.contact}
            <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
      <main id="concept-main" tabIndex={-1}>
        <noscript>
          <p className="concept-noscript">{t.noScript}</p>
        </noscript>
        {orbit ? (
          <Orbit language={page.language} t={t} />
        ) : (
          <DevPlay language={page.language} t={t} />
        )}
        <section className="concept-contact" id="conversar">
          <div className="micro-label">{orbit ? 'NEXT /' : '05 / NEXT COMMIT'}</div>
          <h2>
            {orbit ? t.contactOrbit : t.outro}
            <br />
            <em>{orbit ? t.contactOrbitB : t.outroItalic}</em>
            <ArrowUpRight aria-hidden="true" />
          </h2>
          <div className="contact-bottom">
            <p>{t.outroBody}</p>
            <a className="email-link" href={'mailto:' + site.email}>
              {site.email}
              <ArrowUpRight size={24} />
            </a>
          </div>
        </section>
      </main>
      <footer className="concept-footer">
        <div>
          <MakerMark />
          <p>
            {t.footer}
            <br />
            <span>{t.direction}</span>
          </p>
        </div>
        <div className="concept-socials">
          <a href={site.github} aria-label="GitHub">
            <Github size={19} />
          </a>
          <a href={site.linkedin} aria-label="LinkedIn">
            <Linkedin size={19} />
          </a>
          <a
            href="#concept-main"
            aria-label={page.language === 'es' ? 'Volver arriba' : 'Back to top'}
          >
            <ArrowDown className="arrow-up" size={20} />
          </a>
        </div>
      </footer>
    </div>
  );
}
