import { homePath } from '@/utils/routes';
import { translations } from '@/utils/translations';
export default function NotFound() {
  const t = translations.es.notFound;
  return (
    <section className="section">
      <div className="content not-found">
        <p className="eyebrow">404</p>
        <h1>{t.title}</h1>
        <p>{t.description}</p>
        <a className="button" href={homePath('es')}>
          {t.home}
        </a>
      </div>
    </section>
  );
}
