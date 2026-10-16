import {
  Home,
  Briefcase,
  Code2,
  FolderGit2,
  Mail,
  Github,
  Linkedin,
  MapPin,
  UserRound,
  Languages,
  ArrowUpRight,
} from 'lucide-react';
import { ProfilePhoto } from './common/ProfilePhoto';
import { site } from '@/config/site';
import { homePath, profilePath, type Page } from '@/utils/routes';
import { translations } from '@/utils/translations';
interface Props {
  page: Page;
  activeSection: string;
  onNavigate?: () => void;
}
export function Navigation({ page, activeSection, onNavigate }: Props) {
  const t = translations[page.language];
  const home = homePath(page.language);
  const items = [
    ['inicio', t.nav.home, Home],
    ['proyectos', t.nav.projects, FolderGit2],
    ['servicios', t.nav.services, Briefcase],
    ['habilidades', t.nav.skills, Code2],
    ['sobre-mi', t.nav.about, UserRound],
    ['contacto', t.nav.contact, Mail],
  ] as const;
  return (
    <nav
      aria-label={page.language === 'es' ? 'Navegación principal' : 'Main navigation'}
      className="nav-links"
    >
      {items.map(([id, label, Icon]) => (
        <a
          key={id}
          href={home + '#' + id}
          onClick={onNavigate}
          aria-current={activeSection === id ? 'location' : undefined}
        >
          <Icon size={18} aria-hidden="true" />
          {label}
        </a>
      ))}
    </nav>
  );
}
export function Sidebar({ page, activeSection }: Props) {
  const t = translations[page.language];
  return (
    <aside className="desktop-sidebar">
      <a href={homePath(page.language)} className="identity">
        <ProfilePhoto className="profile-photo" />
        <span className="identity-name">{site.name}</span>
      </a>
      <p className="muted">{t.profession}</p>
      <p className="location">
        <MapPin size={14} aria-hidden="true" />
        {t.location}
      </p>
      <Navigation page={page} activeSection={activeSection} />
      <a className="button button-secondary" href={profilePath(page.language)}>
        <UserRound size={17} aria-hidden="true" />
        {t.about.profile}
      </a>
      {page.alternate && (
        <a
          className="language-link"
          href={page.alternate}
          hrefLang={page.language === 'es' ? 'en' : 'es'}
        >
          <Languages size={17} aria-hidden="true" />
          {t.language}
        </a>
      )}
      <div className="social-links">
        <a href={site.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
          <Github aria-hidden="true" />
        </a>
        <a href={site.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
          <Linkedin aria-hidden="true" />
        </a>
        <a href={'mailto:' + site.email} aria-label={t.contact.email}>
          <Mail aria-hidden="true" />
        </a>
      </div>
      <a href={site.team} target="_blank" rel="noopener noreferrer" className="team-link">
        OnlineHelp <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </aside>
  );
}
