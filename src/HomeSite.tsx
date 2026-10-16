import { ArrowUpRight } from 'lucide-react';
import { CreativeLayout } from './layout/CreativeLayout';
import { DevPlay } from './concepts/DevPlay';
import { conceptCopy } from './concepts/content';
import { ContactSection } from './components/sections/ContactSection';
import { translations } from './utils/translations';
import type { Page } from './utils/routes';

export function HomeSite({ page }: { page: Page }) {
  const copy = conceptCopy(page.language);
  return (
    <CreativeLayout page={page}>
      <noscript>
        <p className="concept-noscript">{copy.noScript}</p>
      </noscript>
      <DevPlay language={page.language} t={copy} />
      <section className="site-making" aria-labelledby="site-making-title">
        <div>
          <h2 id="site-making-title">
            {page.language === 'es'
              ? 'Este sitio también es un proyecto.'
              : 'This site is a project, too.'}
          </h2>
          <p>
            {page.language === 'es'
              ? 'Una identidad propia, construida con atención a lo que ocurre detrás de la pantalla.'
              : 'An identity of its own, built with care for what happens behind the screen.'}
          </p>
        </div>
        <dl>
          <div>
            <dt>
              {page.language === 'es'
                ? 'Contenido desde el primer momento'
                : 'Content from the first moment'}
            </dt>
            <dd>
              {page.language === 'es'
                ? 'Cada página se genera como HTML. Los proyectos, el perfil y los enlaces siguen disponibles sin JavaScript.'
                : 'Every page is generated as HTML. Projects, the profile and links remain available without JavaScript.'}
            </dd>
          </div>
          <div>
            <dt>
              {page.language === 'es'
                ? 'Una consola, sin motor 3D'
                : 'A console, without a 3D engine'}
            </dt>
            <dd>
              {page.language === 'es'
                ? 'Las capturas muestran los sitios públicos de Karuplan y Qlinnt. Cada proyecto explica el alcance, mi participación y su recorrido de uso.'
                : 'Screenshots show the public Karuplan and Qlinnt websites. Each project explains its scope, my contribution and its usage flow.'}
            </dd>
          </div>
          <div>
            <dt>
              {page.language === 'es' ? 'El detalle también se prueba' : 'Details are tested, too'}
            </dt>
            <dd>
              {page.language === 'es'
                ? 'La navegación, los idiomas, el contacto y la accesibilidad forman parte de las comprobaciones del sitio. El movimiento respeta las preferencias del dispositivo.'
                : 'Navigation, languages, contact and accessibility are included in the site checks. Motion respects device preferences.'}
            </dd>
          </div>
        </dl>
      </section>
      <div id="conversar" className="portfolio-contact">
        <div className="concept-contact contact-invitation">
          <h2>
            {copy.outro}
            <br />
            <em>{copy.outroItalic}</em>
            <ArrowUpRight aria-hidden="true" />
          </h2>
          <p>{copy.outroBody}</p>
        </div>
        <ContactSection t={translations[page.language]} />
      </div>
    </CreativeLayout>
  );
}
