import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { projectPath, projectsPath } from '@/utils/routes';
import type { Language, Translations } from '@/utils/translations';
import { SectionHeader } from '../common/SectionHeader';
import { ProjectArt } from '../projects/ProjectArt';
export function ProjectsSection({ language, t }: { language: Language; t: Translations }) {
  return (
    <section id="proyectos" className="section section-alt">
      <div className="content">
        <SectionHeader title={t.projects.title} subtitle={t.projects.subtitle} />
        <div className="showcase-list">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <article className="showcase-row" key={project.id}>
                <a
                  className="project-image-link"
                  href={projectPath(project.slug, language)}
                  aria-label={t.projects.detail + ': ' + project.name}
                >
                  <ProjectArt project={project} language={language} />
                </a>
                <div className="showcase-content">
                  <span className="project-status">
                    {project.visibility === 'public' ? t.projects.public : t.projects.private}
                  </span>
                  <h3>{project.name}</h3>
                  <p className="accent">{project.tagline[language]}</p>
                  <p>{project.description[language]}</p>
                  <p className="project-role">
                    <strong>{t.projects.role}:</strong> {project.role[language]}
                  </p>
                  <a className="text-link" href={projectPath(project.slug, language)}>
                    {t.projects.detail}
                    <ArrowRight size={17} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
        </div>
        <a className="button button-secondary" href={projectsPath(language)}>
          {t.projects.all}
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
