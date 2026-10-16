import { useState } from 'react';
import {
  ArrowUpRight,
  ArrowDown,
  MoveUpRight,
  CookingPot,
  ScanLine,
  Wallet,
  ReceiptText,
  Expand,
  Shrink,
  Radio,
} from 'lucide-react';
import { projects } from '@/data/projects';
import { projectPath, profilePath } from '@/utils/routes';
import type { Language } from '@/utils/translations';
import type { ConceptCopy } from './content';
import { MakerMark } from './MakerMark';
import { ConceptArtwork } from './ConceptArtwork';

const icons = [CookingPot, ScanLine, Wallet, ReceiptText];
const positions = [
  { x: 73, y: 25 },
  { x: 80, y: 73 },
  { x: 26, y: 78 },
  { x: 16, y: 30 },
];
const spreadPositions = [
  { x: 73, y: 16 },
  { x: 87, y: 77 },
  { x: 25, y: 85 },
  { x: 10, y: 26 },
];

function OrbitalMap({ t, language }: { t: ConceptCopy; language: Language }) {
  const [selected, setSelected] = useState(0);
  const [explored, setExplored] = useState([0]);
  const [spread, setSpread] = useState(false);
  const project = projects[selected];
  const Icon = icons[selected];
  return (
    <section className="orbit-explorer" id="explorar">
      <div className="orbit-explorer-heading">
        <div>
          <p className="micro-label">01 / PROJECT CONSTELLATION</p>
          <h2>{t.mapTitle}</h2>
          <p>{t.mapHint}</p>
        </div>
        <span className="signal-count">
          <Radio size={15} />
          <b>{String(explored.length).padStart(2, '0')}</b> / 04 <span>{t.explored}</span>
        </span>
      </div>
      <div className="orbital-console">
        <div className="orbit-map" role="group" aria-label={t.mapLabel}>
          <div className="orbit-map-grid" aria-hidden="true" />
          <svg className="orbital-paths" viewBox="0 0 600 600" fill="none" aria-hidden="true">
            <circle cx="300" cy="300" r="100" />
            <circle cx="300" cy="300" r="180" />
            <circle cx="300" cy="300" r="260" />
            <ellipse cx="300" cy="300" rx="270" ry="120" transform="rotate(-35 300 300)" />
            <path d="M300 10v580M10 300h580" />
            <path
              className="signal-path"
              d={`M300 300L${(spread ? spreadPositions : positions)[selected].x * 6} ${(spread ? spreadPositions : positions)[selected].y * 6}`}
            />
          </svg>
          <div className="orbit-nucleus" aria-hidden="true">
            <div className="nucleus-ring" />
            <MakerMark />
            <span>DENILSON / CORE</span>
          </div>
          {projects.map((item, index) => {
            const NodeIcon = icons[index];
            const position = (spread ? spreadPositions : positions)[index];
            return (
              <button
                className={'orbit-node node-' + index}
                style={{ left: position.x + '%', top: position.y + '%' }}
                key={item.id}
                aria-pressed={selected === index}
                aria-controls="signal-detail"
                aria-label={t.signal + ' 0' + (index + 1) + ': ' + item.name}
                onClick={() => {
                  setSelected(index);
                  setExplored((previous) =>
                    previous.includes(index) ? previous : [...previous, index],
                  );
                }}
              >
                <span className="node-icon">
                  <NodeIcon size={23} strokeWidth={1.5} />
                </span>
                <span className="node-name">
                  {item.name}
                  <small>
                    0{index + 1} / {item.visibility === 'private' ? 'PRIVATE' : 'PUBLIC'}
                  </small>
                </span>
                {explored.includes(index) ? (
                  <span className="node-explored" aria-hidden="true" />
                ) : null}
              </button>
            );
          })}
          <span className="map-coordinate map-coordinate-top" aria-hidden="true">
            PARAGUAY
            <br />
            ORIGIN / EARTH
          </span>
          <span className="map-coordinate map-coordinate-bottom" aria-hidden="true">
            VECTOR SPACE
            <br />
            DA—004
          </span>
          <button
            className="map-view-button"
            aria-pressed={spread}
            onClick={() => setSpread((previous) => !previous)}
          >
            {spread ? <Shrink size={15} /> : <Expand size={15} />}
            {spread ? t.resetView : t.focus}
          </button>
        </div>
        <div className="signal-panel" id="signal-detail" aria-live="polite" aria-atomic="true">
          <div key={project.id} className="signal-panel-content">
            <div className="signal-panel-top">
              <span className="micro-label">
                {t.signal} / 0{selected + 1}
              </span>
              <span className={'visibility-dot ' + project.visibility}>
                {project.visibility === 'public'
                  ? t.public
                  : language === 'es'
                    ? 'ACCESO PRIVADO'
                    : 'PRIVATE ACCESS'}
              </span>
            </div>
            <div className="signal-title">
              <span className="signal-title-icon">
                <Icon size={28} />
              </span>
              <h3>{project.name}</h3>
            </div>
            <p className="signal-tagline">{project.tagline[language]}</p>
            {project.image ? (
              <div className="signal-image">
                <img
                  src={project.image}
                  width="1200"
                  height="700"
                  alt={project.tagline[language]}
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="private-signal-art">
                <Icon size={68} strokeWidth={1} />
                <span>{t.private}</span>
              </div>
            )}
            <dl className="signal-info">
              <div>
                <dt>{t.mission}</dt>
                <dd>{project.problem?.[language]}</dd>
              </div>
              <div>
                <dt>{t.answer}</dt>
                <dd>{project.solution?.[language]}</dd>
              </div>
            </dl>
            <a className="orbit-button" href={projectPath(project.slug, language)}>
              {t.case}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Orbit({ t, language }: { t: ConceptCopy; language: Language }) {
  return (
    <>
      <section className="orbit-hero">
        <ConceptArtwork kind="orbit" t={t} className="orbit-hero-art" />
        <div className="orbit-hero-top">
          <p className="micro-label">
            <span className="status-led" />
            {t.orbitEyebrow}
          </p>
          <span className="orbit-location">PARAGUAY ↗ WORLD</span>
        </div>
        <div className="orbit-hero-main">
          <div>
            <h1>
              {t.orbitA}
              <br />
              <span>{t.orbitB}</span>
              <i aria-hidden="true">✦</i>
            </h1>
            <p>{t.orbitIntro}</p>
            <a className="orbit-button" href="#explorar">
              {t.explore}
              <ArrowDown size={17} />
            </a>
          </div>
          <div className="orbit-art-plaque">
            <span aria-hidden="true">✦</span>
            <p>{t.orbitArtLabel}</p>
            <small>{t.artCredit}</small>
          </div>
        </div>
        <div className="orbit-hero-bottom">
          <span>DENILSON ARGUELLO</span>
          <span>{t.small}</span>
          <MoveUpRight size={19} />
        </div>
      </section>
      <OrbitalMap t={t} language={language} />
      <section className="orbit-archive">
        <div>
          <p className="micro-label">02 / {t.registry}</p>
          <h2>
            {t.orbitArchiveHeading}
            <br />
            <em>{t.orbitArchiveItalic}</em>
          </h2>
          <p>{t.registryIntro}</p>
        </div>
        <div>
          {projects.map((project, index) => (
            <a key={project.id} href={projectPath(project.slug, language)}>
              <div className={'archive-visual archive-visual-' + index}>
                {project.image ? (
                  <img
                    src={project.image}
                    width="1200"
                    height="700"
                    alt={project.tagline[language]}
                    loading="lazy"
                  />
                ) : (
                  <div className="archive-private-object" aria-hidden="true">
                    {index === 2 ? (
                      <Wallet size={85} strokeWidth={1} />
                    ) : (
                      <ReceiptText size={85} strokeWidth={1} />
                    )}
                  </div>
                )}
                <span className="archive-visibility">
                  {project.visibility === 'public' ? t.public : t.private}
                </span>
              </div>
              <span className="archive-index">0{index + 1}</span>
              <h3>{project.name}</h3>
              <span className="archive-tagline">{project.tagline[language]}</span>
              <ArrowUpRight size={21} />
            </a>
          ))}
        </div>
      </section>
      <section className="orbit-human" id="persona">
        <div className="orbit-portrait">
          <div className="portrait-orbit" aria-hidden="true" />
          <img
            src="/profile-448.webp"
            srcSet="/profile-224.webp 224w, /profile-448.webp 448w"
            sizes="250px"
            width="448"
            height="448"
            alt="Denilson Arguello"
            loading="lazy"
          />
          <span className="micro-label">HUMAN / DEVELOPER / CURIOUS</span>
          <span className="orbit-portrait-plus" aria-hidden="true">
            +
          </span>
        </div>
        <div>
          <p className="micro-label">03 / DENILSON ARGUELLO</p>
          <h2>
            {t.humanOrbit}
            <br />
            <em>{t.humanOrbitB}</em>
          </h2>
          <p>{t.bio}</p>
          <a className="orbit-text-link" href={profilePath(language)}>
            {t.profile}
            <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
    </>
  );
}
