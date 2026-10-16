import { ArrowLeft, ArrowRight, ArrowUpRight, LockKeyhole } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import { caseJourney, caseChallenge } from '@/data/caseStudies';
import { translations, type Language } from '@/utils/translations';
import { homePath, projectPath, projectsPath } from '@/utils/routes';
import { ProjectArt } from './projects/ProjectArt';
import { SectionHeader } from './common/SectionHeader';
export function ProjectPage({ project, language }: { project: Project; language: Language }) {
  const t = translations[language].projects;
  const challenge = caseChallenge(project.id, language);
  const next =
    projects[(projects.findIndex((item) => item.id === project.id) + 1) % projects.length];
  return (
    <article className={'section case-' + project.slug}>
      <div className="content project-detail case-detail">
        <a className="text-link" href={projectsPath(language)}>
          <ArrowLeft size={17} aria-hidden="true" />
          {t.back}
        </a>
        <div className="case-hero">
          <div>
            <SectionHeader level={1} title={project.name} subtitle={project.tagline[language]} />
            <p>{project.description[language]}</p>
            <div className="case-facts">
              <span>{project.visibility === 'public' ? t.public : t.private}</span>
              <span>{project.stack.join(' / ')}</span>
            </div>
            {project.url ? (
              <div className="actions">
                <a className="button" href={project.url} target="_blank" rel="noopener noreferrer">
                  {t.visit}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            ) : null}
          </div>
          <ProjectArt project={project} language={language} priority />
        </div>
        <div className="case-overview">
          {project.problem && (
            <section>
              <h2>{t.problem}</h2>
              <p>{project.problem[language]}</p>
            </section>
          )}
          {project.solution && (
            <section>
              <h2>{t.solution}</h2>
              <p>{project.solution[language]}</p>
            </section>
          )}
        </div>
        <section>
          <h2>
            {language === 'es' ? 'De la necesidad al uso cotidiano' : 'From a need to everyday use'}
          </h2>
          <ol className="case-journey">
            {caseJourney(project.id, language).map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h2>{t.role}</h2>
          <p>{project.role[language]}</p>
        </section>
        {challenge ? (
          <section className="case-challenge">
            <h2>{language === 'es' ? 'El reto del proyecto' : 'The project challenge'}</h2>
            <p>{challenge}</p>
          </section>
        ) : null}
        {project.stack.length > 0 && (
          <section>
            <h2>{t.stack}</h2>
            <ul className="chips">
              {project.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </section>
        )}
        {project.visibility === 'private' && (
          <aside className="privacy-panel">
            <LockKeyhole size={20} aria-hidden="true" />
            <p>{t.privateNote}</p>
          </aside>
        )}
        <div className="actions">
          <a className="button button-secondary" href={homePath(language) + '#contacto'}>
            {translations[language].hero.contact}
          </a>
        </div>
        <nav
          className="case-next"
          aria-label={language === 'es' ? 'Siguiente proyecto' : 'Next project'}
        >
          <p>{language === 'es' ? 'SIGUE EXPLORANDO' : 'KEEP EXPLORING'}</p>
          <a href={projectPath(next.slug, language)}>
            {next.name}
            <ArrowRight size={25} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </article>
  );
}
