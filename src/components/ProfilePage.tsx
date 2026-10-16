import { Printer, ArrowUpRight } from 'lucide-react';
import { site } from '@/config/site';
import { projects } from '@/data/projects';
import { projectPath } from '@/utils/routes';
import { translations, type Language } from '@/utils/translations';
import { SectionHeader } from './common/SectionHeader';
export function ProfilePage({ language }: { language: Language }) {
  const t = translations[language];
  return (
    <article className="section">
      <div className="content profile-page">
        <SectionHeader level={1} title={site.name} subtitle={t.about.profileIntro} />
        <p>
          <a href={'mailto:' + site.email}>{site.email}</a> · {t.location}
        </p>
        <a className="text-link" href={site.linkedin} target="_blank" rel="noopener noreferrer">
          {t.about.linkedin}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <button
          className="button button-secondary print-button"
          type="button"
          onClick={() => window.print()}
        >
          <Printer size={18} aria-hidden="true" />
          {t.about.print}
        </button>
        <section>
          <h2>{t.nav.about}</h2>
          <p>{t.about.intro}</p>
          <p>{t.about.team}</p>
          <a className="text-link" href={site.team} target="_blank" rel="noopener noreferrer">
            {t.about.teamLink}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <p>{t.about.private}</p>
        </section>
        <section>
          <h2>{t.about.experienceTitle}</h2>
          <div className="profile-project">
            <h3>Freelance</h3>
            <p>{t.about.freelance}</p>
          </div>
          <div className="profile-project">
            <h3>OnlineHelp</h3>
            <p>{t.about.team}</p>
          </div>
        </section>
        <section>
          <h2>{t.about.educationTitle}</h2>
          <h3>SNPP</h3>
          <p>2017</p>
        </section>
        <section>
          <h2>{t.skills.title}</h2>
          {t.skills.groups.map((group) => (
            <div className="profile-skills" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.items.join(' · ')}</p>
            </div>
          ))}
          <div className="profile-skills">
            <h3>
              {language === 'es' ? 'Infraestructura y despliegue' : 'Infrastructure and deployment'}
            </h3>
            <p>Docker · Vercel · VPS · MySQL · PostgreSQL · Cloudinary</p>
            <p>
              {language === 'es'
                ? 'En mis proyectos trabajo con Vercel y un VPS propio, contenedores Docker y bases de datos SQL. Uso PHP en algunas partes y Cloudinary para las imágenes de Karuplan.'
                : 'Across my projects I work with Vercel and my own VPS, Docker containers and SQL databases. I use PHP in some parts and Cloudinary for Karuplan’s images.'}
            </p>
          </div>
        </section>
        <section>
          <h2>{t.projects.title}</h2>
          {projects.map((project) => (
            <div className="profile-project" key={project.id}>
              <h3>
                <a href={projectPath(project.slug, language)}>{project.name}</a>
              </h3>
              <p>{project.tagline[language]}</p>
              <p>{project.role[language]}</p>
              {project.visibility === 'private' && <p className="muted">{t.projects.private}</p>}
            </div>
          ))}
        </section>
        <p>
          {t.about.profileNote} <a href={'mailto:' + site.email}>{site.email}</a>
        </p>
      </div>
    </article>
  );
}
