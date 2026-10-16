import type { Translations } from '@/utils/translations';
import { SectionHeader } from '../common/SectionHeader';
export function SkillsSection({ t }: { t: Translations }) {
  return (
    <section id="habilidades" className="section section-alt">
      <div className="content">
        <SectionHeader title={t.skills.title} subtitle={t.skills.subtitle} />
        <div className="skills-grid">
          {t.skills.groups.map((group) => (
            <article className="panel" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <ul className="chips">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
