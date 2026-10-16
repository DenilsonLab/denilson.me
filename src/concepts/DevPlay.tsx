import { useState } from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  Code2,
  ReceiptText,
  Wallet,
  Wrench,
  Minus,
} from 'lucide-react';
import { projects } from '@/data/projects';
import { projectPath, profilePath } from '@/utils/routes';
import type { Language } from '@/utils/translations';
import { site } from '@/config/site';
import type { ConceptCopy } from './content';
import { playCopy } from './playCopy';
import { DevConsole } from './DevConsole';
import { useInteractive } from './useInteractive';
import type { BotReaction, ReactToScene } from './DevConsole';
import { useSceneEntrance } from './useSceneEntrance';

export function DevPlay({ t, language }: { t: ConceptCopy; language: Language }) {
  const copy = playCopy(language);
  const [peek, setPeek] = useState<string[]>([]);
  const [reaction, setReaction] = useState<BotReaction>({ mood: 'hello', text: '', revision: 0 });
  const root = useSceneEntrance();
  const react: ReactToScene = (mood, text) =>
    setReaction((previous) => ({ mood, text, revision: previous.revision + 1 }));
  const ready = useInteractive();
  return (
    <div className="devplay-scenes" ref={root}>
      <section className="devplay-hero">
        <span id="inicio" className="legacy-anchor" aria-hidden="true" />
        <div className="devplay-hero-copy">
          <h1>
            {copy.title[0]}
            <br />
            {copy.title[1]}
            <br />
            <span>{copy.title[2]}</span>
          </h1>
          <p className="hero-lead">{copy.intro}</p>
          <div className="devplay-actions">
            <a className="devplay-primary" href="#explorar">
              {copy.work}
              <ArrowDownRight size={19} aria-hidden="true" />
            </a>
            <a className="devplay-play-link" href={profilePath(language)}>
              {t.profile}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="devplay-signature">
            <img src="/profile-160.webp" width="42" height="42" alt="" />
            <span>
              Denilson Arguello<small>{copy.available}</small>
            </span>
            <Code2 size={24} aria-hidden="true" />
          </div>
        </div>
        <DevConsole t={copy} language={language} reaction={reaction} react={react} />
      </section>
      <section className="workshop-projects devplay-projects" id="explorar">
        <span id="proyectos" className="legacy-anchor" aria-hidden="true" />
        <div className="workshop-section-heading" data-entrance>
          <h2>
            {t.projectsTitle}
            <br />
            <em>{t.projectsItalic}</em>
          </h2>
          <p>{t.projectsIntro}</p>
        </div>
        <div className="editorial-projects">
          {projects.slice(0, 2).map((project, index) => (
            <article
              className={'editorial-project project-' + project.slug}
              key={project.id}
              data-entrance
            >
              <a
                className="project-stage"
                href={projectPath(project.slug, language)}
                aria-label={t.case + ': ' + project.name}
              >
                <span className="devplay-project-mark" aria-hidden="true">
                  {index === 0 ? <ArrowUpRight size={42} strokeWidth={1.4} /> : '{ }'}
                </span>
                <div className="project-window">
                  <div className="window-chrome">
                    <span />
                    <span />
                    <span />
                    <b>{project.name.toLowerCase()}</b>
                  </div>
                  <img
                    style={{ viewTransitionName: 'project-' + project.slug }}
                    src={project.image}
                    srcSet={`/projects/${project.slug}-cover-480.webp 480w, /projects/${project.slug}-cover-800.webp 800w, ${project.image} 1200w`}
                    sizes="(max-width: 760px) 88vw, 44vw"
                    width="1200"
                    height="700"
                    alt={project.tagline[language]}
                    loading="lazy"
                  />
                </div>
                <span className="stage-open">
                  <ArrowUpRight size={24} aria-hidden="true" />
                </span>
              </a>
              <div className="editorial-project-text">
                <div>
                  <h3>{project.name}</h3>
                  <span className="project-visibility">{t.public}</span>
                </div>
                <p>{project.tagline[language]}</p>
                <a className="text-link" href={projectPath(project.slug, language)}>
                  {t.case}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
              <p className="project-contribution">{project.role[language]}</p>
              <button
                className="project-peek"
                disabled={!ready}
                aria-expanded={peek.includes(project.id)}
                aria-controls={'peek-' + project.id}
                onClick={() =>
                  setPeek((previous) =>
                    previous.includes(project.id)
                      ? previous.filter((id) => id !== project.id)
                      : [...previous, project.id],
                  )
                }
              >
                {peek.includes(project.id) ? (
                  <Minus size={15} aria-hidden="true" />
                ) : (
                  <Wrench size={15} aria-hidden="true" />
                )}
                {peek.includes(project.id) ? copy.closePeek : copy.peek}
                <span aria-hidden="true">{'{ }'}</span>
              </button>
              <div
                id={'peek-' + project.id}
                className="project-under-hood"
                hidden={!peek.includes(project.id)}
              >
                <dl>
                  <div>
                    <dt>{copy.problem}</dt>
                    <dd>{project.problem?.[language]}</dd>
                  </div>
                  <div>
                    <dt>{copy.solution}</dt>
                    <dd>{project.solution?.[language]}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
        <div className="personal-intro">
          <h3>{t.personal}</h3>
          <p>{t.privacy}</p>
        </div>
        <div className="workshop-private">
          {projects.slice(2).map((project, index) => (
            <a
              className="private-project"
              href={projectPath(project.slug, language)}
              key={project.id}
            >
              <span className="private-icon">
                {index === 0 ? (
                  <Wallet size={35} aria-hidden="true" />
                ) : (
                  <ReceiptText size={35} aria-hidden="true" />
                )}
              </span>
              <div>
                <h4>{project.name}</h4>
                <span className="private-status">{t.private}</span>
                <p>{project.tagline[language]}</p>
              </div>
              <ArrowUpRight className="private-arrow" size={23} aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
      <section className="workshop-human devplay-human" id="persona" data-entrance>
        <span id="sobre-mi" className="legacy-anchor" aria-hidden="true" />
        <div className="portrait-composition">
          <div className="portrait-grid" aria-hidden="true" />
          <img
            src="/profile-448.webp"
            srcSet="/profile-224.webp 224w, /profile-448.webp 448w"
            sizes="260px"
            width="448"
            height="448"
            alt="Denilson Arguello"
            loading="lazy"
          />
          <span className="portrait-label">{t.hello}</span>
          <span className="portrait-flower" aria-hidden="true">
            {'{ }'}
          </span>
          <span className="portrait-caption">
            HUMAN / DEVELOPER
            <br />
            PARAGUAY
          </span>
        </div>
        <div>
          <h2>
            {t.humanTitle}
            <br />
            <em>{t.humanItalic}</em>
          </h2>
          <p>{t.bio}</p>
          <div className="human-links">
            <a className="text-link" href={profilePath(language)}>
              {t.profile}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className="text-link" href={site.team}>
              {t.team}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
