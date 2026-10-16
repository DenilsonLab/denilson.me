import { useState } from 'react';
import { projects, getAllStacks } from '@/data/projects';
import { translations, type Language } from '@/utils/translations';
import { SectionHeader } from './common/SectionHeader';
import { ProjectCard } from './projects/ProjectCard';
const stacks = getAllStacks();
export default function ProjectsPage({ language }: { language: Language }) {
  const t = translations[language].projects;
  const [selected, setSelected] = useState('');
  const filtered = selected
    ? projects.filter((project) => project.stack.includes(selected))
    : projects;
  return (
    <section className="section">
      <div className="content">
        <SectionHeader level={1} title={t.pageTitle} subtitle={t.pageSubtitle} />
        <div className="project-filter">
          <label htmlFor="project-stack">{t.filter}</label>
          <select
            id="project-stack"
            value={selected}
            onChange={(event) => setSelected(event.target.value)}
          >
            <option value="">{t.allTech}</option>
            {stacks.map((stack) => (
              <option key={stack}>{stack}</option>
            ))}
          </select>
        </div>
        <p className="muted" role="status">
          {filtered.length} {t.results}
        </p>
        <div className="project-grid">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} language={language} />
          ))}
        </div>
        {filtered.length === 0 && <p>{t.empty}</p>}
      </div>
    </section>
  );
}
