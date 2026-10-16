import { ArrowRight, Mail, Code2 } from 'lucide-react';
import type { Translations } from '@/utils/translations';
export function HeroSection({ t }: { t: Translations }) {
  return (
    <section id="inicio" className="hero section">
      <div className="content hero-grid">
        <div>
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>
            {t.hero.title} <span className="accent">{t.hero.highlight}</span>
          </h1>
          <p className="hero-description">{t.hero.description}</p>
          <div className="actions">
            <a className="button" href="#proyectos">
              {t.hero.projects}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button button-secondary" href="#contacto">
              <Mail size={18} aria-hidden="true" />
              {t.hero.contact}
            </a>
          </div>
        </div>
        <figure className="code-card" aria-label={t.hero.code}>
          <div className="code-card-header">
            <Code2 size={18} aria-hidden="true" />
            <span>developer.php</span>
          </div>
          <pre>
            <code>
              {
                '<?php\n\nclass Developer\n{\n    public string $name = "Denilson Arguello";\n\n    public array $tools = [\n        "PHP", "WordPress",\n        "React", "Node.js",\n    ];\n}\n'
              }
            </code>
          </pre>
          <figcaption>{t.hero.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
