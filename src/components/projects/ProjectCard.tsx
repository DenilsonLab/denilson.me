import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import type { Language } from '@/utils/translations';
import { translations } from '@/utils/translations';
import { projectPath } from '@/utils/routes';
import { ProjectArt } from './ProjectArt';
export function ProjectCard({ project, language }: { project: Project; language: Language }) {
  const t = translations[language].projects;
  return (
    <article className="project-card">
      <a
        className="project-image-link"
        href={projectPath(project.slug, language)}
        aria-label={t.detail + ': ' + project.name}
      >
        <ProjectArt project={project} language={language} />
      </a>
      <div className="project-card-body">
        <span className="project-status">
          {project.visibility === 'public' ? t.public : t.private}
        </span>
        <h2>
          <a href={projectPath(project.slug, language)}>{project.name}</a>
        </h2>
        <p className="accent">{project.tagline[language]}</p>
        <p>{project.description[language]}</p>
        {project.stack.length > 0 && (
          <ul className="chips">
            {project.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        )}
        <div className="actions">
          <a className="text-link" href={projectPath(project.slug, language)}>
            {t.detail}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          {project.url && (
            <a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">
              {t.visit}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
