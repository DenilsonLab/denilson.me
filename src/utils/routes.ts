import { projects, type Project } from '@/data/projects';
import { translations, type Language } from './translations';
export type PageKind = 'home' | 'projects' | 'project' | 'profile' | 'concept' | 'notFound';
export interface Page {
  kind: PageKind;
  language: Language;
  path: string;
  alternate?: string;
  project?: Project;
  title: string;
  description: string;
  concept?: 'taller' | 'orbit';
}
export const conceptPath = (concept: 'taller' | 'orbit', language: Language) =>
  (language === 'es' ? '/conceptos' : '/en/concepts') +
  (concept === 'orbit' ? (language === 'es' ? '/orbita' : '/orbit') : '');
export const conceptPaths = (['es', 'en'] as const).flatMap((language) => [
  conceptPath('taller', language),
  conceptPath('orbit', language),
]);
export const homePath = (language: Language) => (language === 'es' ? '/' : '/en');
export const projectsPath = (language: Language) =>
  language === 'es' ? '/proyectos' : '/en/projects';
export const profilePath = (language: Language) => (language === 'es' ? '/perfil' : '/en/profile');
export const projectPath = (slug: string, language: Language) =>
  projectsPath(language) + '/' + slug;
export function getPage(input: string): Page {
  const path = input.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  const language: Language = path === '/en' || path.startsWith('/en/') ? 'en' : 'es';
  const other = language === 'es' ? 'en' : 'es';
  const t = translations[language];
  const base = { language, path };
  const concept = (['taller', 'orbit'] as const).find(
    (candidate) => conceptPath(candidate, language) === path,
  );
  if (concept)
    return {
      ...base,
      kind: 'concept',
      concept,
      alternate: conceptPath(concept, other),
      title: (concept === 'taller' ? 'dev.play' : 'Órbita') + ' · Denilson Arguello',
      description:
        language === 'es'
          ? 'Dos exploraciones interactivas del universo creativo de Denilson Arguello.'
          : 'Two interactive explorations of Denilson Arguello’s creative universe.',
    };
  if (path === homePath(language))
    return {
      ...base,
      kind: 'home',
      alternate: homePath(other),
      title:
        language === 'es'
          ? 'Denilson Arguello · Desarrollo web en Paraguay'
          : 'Denilson Arguello · Web developer in Paraguay',
      description: t.hero.description,
    };
  if (path === projectsPath(language))
    return {
      ...base,
      kind: 'projects',
      alternate: projectsPath(other),
      title: t.projects.pageTitle + ' · Denilson Arguello',
      description: t.projects.pageSubtitle,
    };
  if (path === profilePath(language))
    return {
      ...base,
      kind: 'profile',
      alternate: profilePath(other),
      title: t.about.profileTitle + ' · Denilson Arguello',
      description: t.about.profileIntro,
    };
  const project = projects.find((project) => projectPath(project.slug, language) === path);
  if (project)
    return {
      ...base,
      kind: 'project',
      project,
      alternate: projectPath(project.slug, other),
      title: project.name + ' · Denilson Arguello',
      description: project.description[language],
    };
  // A single static 404 is served for all unknown URLs; keep hydration deterministic.
  return {
    kind: 'notFound',
    language: 'es',
    path: '/404',
    title: 'Página no encontrada · Denilson Arguello',
    description: translations.es.notFound.description,
  };
}
export const pagePaths = [
  '/',
  '/en',
  '/proyectos',
  '/en/projects',
  '/perfil',
  '/en/profile',
  ...projects.flatMap((project) => [
    projectPath(project.slug, 'es'),
    projectPath(project.slug, 'en'),
  ]),
];
