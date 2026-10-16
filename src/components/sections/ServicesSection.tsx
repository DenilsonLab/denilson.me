import { Globe, Code2, Workflow, Wrench } from 'lucide-react';
import type { Translations } from '@/utils/translations';
import { SectionHeader } from '../common/SectionHeader';
const icons = [Globe, Code2, Workflow, Wrench];
export function ServicesSection({ t }: { t: Translations }) {
  return (
    <section id="servicios" className="section">
      <div className="content">
        <SectionHeader title={t.services.title} subtitle={t.services.subtitle} />
        <div className="services-grid">
          {t.services.items.map((service, index) => {
            const Icon = icons[index];
            return (
              <article className="panel" key={service.title}>
                <Icon className="service-icon" aria-hidden="true" />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            );
          })}
        </div>
        <h3 className="process-title">{t.services.processTitle}</h3>
        <ol className="process-grid">
          {t.services.process.map((step, index) => (
            <li key={step.title}>
              <span className="step-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
