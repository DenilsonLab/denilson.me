import { ArrowUpRight } from 'lucide-react';
import type { Language, Translations } from '@/utils/translations';
import { profilePath } from '@/utils/routes';
import { site } from '@/config/site';
import { SectionHeader } from '../common/SectionHeader';
export function AboutSection({ language, t }: { language: Language; t: Translations }) {
  return (
    <section id="sobre-mi" className="section">
      <div className="content about-grid">
        <div>
          <SectionHeader title={t.about.title} subtitle={t.about.intro} />
          <p>{t.about.private}</p>
          <a className="button button-secondary" href={profilePath(language)}>
            {t.about.profile}
          </a>
        </div>
        <article className="panel team-panel">
          <img
            src="/projects/onlinehelp-cover.webp"
            alt={
              language === 'es'
                ? 'Sitio oficial del equipo OnlineHelp'
                : 'The OnlineHelp team website'
            }
            width="1200"
            height="700"
            loading="lazy"
            decoding="async"
          />
          <p className="eyebrow">OnlineHelp</p>
          <h3>{language === 'es' ? 'Trabajo en equipo' : 'Working together'}</h3>
          <p>{t.about.team}</p>
          <a href={site.team} target="_blank" rel="noopener noreferrer">
            {t.about.teamLink}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </article>
      </div>
    </section>
  );
}
