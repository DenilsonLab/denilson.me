import { LockKeyhole, WalletCards, ReceiptText } from 'lucide-react';
import type { Project } from '@/data/projects';
import { translations, type Language } from '@/utils/translations';
export function ProjectArt({
  project,
  language,
  priority = false,
}: {
  project: Project;
  language: Language;
  priority?: boolean;
}) {
  if (project.image)
    return (
      <img
        className="project-image"
        style={{ viewTransitionName: 'project-' + project.slug }}
        src={project.image}
        srcSet={`/projects/${project.slug}-cover-480.webp 480w, /projects/${project.slug}-cover-800.webp 800w, ${project.image} 1200w`}
        sizes="(max-width: 760px) 90vw, 48vw"
        alt={project.name + ' — ' + project.tagline[language]}
        width="1200"
        height="700"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    );
  const Icon = project.id === 'accounty' ? WalletCards : ReceiptText;
  return (
    <div
      className={'project-art art-' + project.id}
      role="img"
      aria-label={project.name + '. ' + translations[language].projects.privacyCaption}
    >
      <Icon size={72} strokeWidth={1.2} aria-hidden="true" />
      <span>{project.name}</span>
      <small>
        <LockKeyhole size={14} aria-hidden="true" />
        {translations[language].projects.private}
      </small>
    </div>
  );
}
