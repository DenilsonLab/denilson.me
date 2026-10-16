# denilson.me

Portafolio personal de Denilson Arguello: desarrollo web, proyectos y contacto.
React 18, TypeScript, Vite 8 y Tailwind CSS 4. El build genera HTML estático por página y React añade las interacciones; no se necesita un servidor de aplicación.

## Desarrollo

Requiere Node.js 24 y npm.

```sh
npm ci
npm run dev
```

Vite sirve el entorno local en http://localhost:3000. Para comprobar SEO, headers y respuestas 404, utiliza el build estático:

```sh
npm run build
npm run preview
```

La vista previa escucha en http://127.0.0.1:4173. El servidor de desarrollo de Vite no reproduce la generación estática ni los códigos de respuesta de producción.

La vista previa comprime los recursos de texto con Brotli o gzip para aproximar la entrega del CDN. Las capturas de proyectos tienen versiones de 480, 800 y 1200 px. La portada difiere el pintado de secciones fuera de pantalla mediante `content-visibility: auto`; los enlaces y el contenido siguen disponibles sin JavaScript.

## Validación

- `npm run lint`: TypeScript/JavaScript, hooks y accesibilidad.
- `npm run format:check`: formato Prettier.
- `npm test`: codificación segura de borradores, metadatos y restricciones de privacidad.
- `npm run typecheck`: tipos estrictos, incluyendo variables y parámetros no usados.
- `npm run build`: tipos, bundle de navegador, render de build y páginas estáticas.
- `npm run test:e2e`: rutas, SEO, axe, layouts, contacto, idiomas, filtros, funcionamiento sin JavaScript y 404.
- `npm audit`: avisos de dependencias; evaluar cada cambio antes de actualizar.

Para las pruebas de navegador: `npx playwright install chromium`. Se utiliza Chrome instalado en desarrollo local y Chromium en CI. El workflow de GitHub Actions instala el navegador y ejecuta todas las comprobaciones.

## Estructura

- `src/HomeSite.tsx`: portada dev.play y contacto.
- `src/Site.tsx` y `src/layout/CreativeLayout.tsx`: páginas interiores y navegación visual compartida.
- `src/utils/routes.ts`: rutas, idiomas y metadatos.
- `src/data/projects.ts` y `src/data/caseStudies.ts`: contenido, recorridos de uso y retos confirmados de los proyectos.
- `src/config/site.ts`: identidad, correo y perfiles.
- `src/components/`: páginas, secciones y navegación.
- `src/index.css`: estilos y reglas de impresión/movimiento reducido.
- `src/entry-server.tsx` y `scripts/prerender.mjs`: HTML, metadatos, schema y sitemap durante el build.
- `public/`: imágenes optimizadas, iconos y manifest.
- `tests/`: comprobaciones de comportamiento.

El build genera inicio, catálogo, perfil imprimible y fichas de proyectos en español e inglés. La portada dev.play está en `/` y `/en`; las páginas interiores comparten su identidad visual. Las URLs de idioma son independientes y tienen canonical/hreflang, datos estructurados de persona/sitio/página y una tarjeta social en la paleta del sitio. `404.html` lleva noindex. Vercel sirve archivos con clean URLs y errores reales; no hay una reescritura general a inicio. El prerender recorre el manifiesto de Vite para incluir los estilos de cada ruta, también sin JavaScript.

## Contenido y privacidad

El correo confirmado es **hello@denilson.me**. Denilson confirmó el desarrollo completo de Karuplan y Qlinnt; ambas fichas explican el recorrido de uso, la participación y el reto principal. React y Tailwind se muestran en ambos; Cloudinary se atribuye a Karuplan. Docker, Vercel, VPS propio, PHP y bases MySQL/PostgreSQL se describen como infraestructura del conjunto de proyectos, sin inventar su reparto. OnlineHelp aparece como colaboración de equipo, no como un proyecto de autoría exclusiva.

Accounty e InvoiceGen Pro se presentan únicamente como herramientas personales: **no añadir sus direcciones privadas, datos del hogar o capturas financieras**. Sus ilustraciones conceptuales no representan datos reales. No inventar tecnologías de proyectos públicos, resultados, clientes, fechas laborales ni formación. El perfil imprimible utiliza únicamente información confirmada, incluida la formación en SNPP en 2017. No se han añadido títulos académicos ni años de experiencia sin datos.

El contacto prepara un enlace `mailto:` y permite copiar la consulta. **No envía, guarda ni confirma entrega de mensajes.** El visitante revisa y envía el borrador en su aplicación de correo. Los campos permanecen deshabilitados sin JavaScript y hay un enlace directo al correo. Para recibir mensajes directamente desde la web hace falta configurar un proveedor y un endpoint con validación, protección contra abuso y confirmación real. No poner claves privadas en variables VITE\_\*.

No se han conectado analítica, campañas publicitarias ni seguimiento de conversiones. Un borrador preparado nunca debe contabilizarse como un mensaje recibido.

## Recursos visuales

`npm run assets` regenera avatares responsive, iconos y la tarjeta social SVG/PNG. `npm run assets:brand` genera solamente la identidad: la D abierta de `src/config/brand.ts`, variantes SVG en `public/brand/`, favicons, lámina de tamaños y tarjeta social. El mismo trazado se usa en `MakerMark`; los PNG conservan su procedencia vectorial en metadatos. No depende de PNG de proyectos desaparecidos. Las capturas públicas se guardan en `public/projects/`; no contienen acceso a cuentas privadas. Las fuentes Bricolage y Space Grotesk se sirven localmente con Fontsource y licencia OFL.

## Propuestas interactivas

- `/conceptos` y `/en/concepts`: **denilson / dev.play**, un portafolio con consola CSS 3D giratoria, terminal de juguete con comandos permitidos y mascota original. La experiencia prioriza proyectos, participación, perfil y contacto. Se retiraron el juego de memoria, la búsqueda de bugs, los canales secretos, el selector de paleta y la galería de iluminación para reducir distracciones. Sustituye la propuesta llamada Taller.
- `/conceptos/orbita` y `/en/concepts/orbit`: **Órbita**, una dirección tecnológica con un mapa de proyectos, fichas dinámicas y descubrimiento por señales.

Las vistas de exploración viven en `src/concepts/` y comparten dev.play con la portada de producción. Conservan `noindex` y quedan fuera del sitemap. El código de Órbita solo se descarga al visitar una propuesta; la consola solo se descarga en la portada y las propuestas, no en las fichas ni en el perfil. Hay navegación con teclado, contenido estático y fuentes locales. Las animaciones están activas por defecto y respetan la preferencia de movimiento reducido del dispositivo, sin un interruptor en la página. Los bocetos se identifican como ejemplos, sin datos privados ni auditorías simuladas de sitios reales.

La consola muestra las capturas reales de los sitios públicos de Karuplan y Qlinnt y enlaza a sus fichas. Se retiraron los recorridos de ejemplo: no representaban las interfaces reales y duplicaban la explicación de los proyectos. Las fichas conservan capturas, alcance y recorridos de uso en texto. Órbita y Deni.bot conservan ilustraciones conceptuales originales creadas con `image_gen`; la pieza de Órbita tiene un visor ampliable mediante diálogo nativo. Los PNG originales y prompts se conservan en `src/assets/concepts/`. `npm run assets:concepts` prepara tres tamaños WebP por ilustración en `public/concepts/` y un retrato de 448 px. Las ilustraciones no representan fotografías del espacio de trabajo ni capturas de aplicaciones reales.

Los recursos y prompts originales de dev.play están en `src/assets/concepts/DEVPLAY-ART.md`. Deni.bot conserva su transparencia. La consola usa caras CSS con perspectiva; no descarga modelos ni motores 3D. El terminal no ejecuta código, accede al sistema ni envía datos. No hay juegos ni seguimiento de partidas. La mascota saluda con una animación breve y responde a acciones; no flota continuamente. Las funciones interactivas se habilitan después de la hidratación y los proyectos siguen accesibles sin JavaScript.

## Despliegue

`vercel.json` configura `dist/`, URLs limpias, headers de seguridad y caché de assets con hash. El host canónico es **https://www.denilson.me**, coherente con el destino público actual. Las redirecciones de dominio se administran en Vercel.

Los cambios locales no se publican por ejecutar un build. No se han configurado credenciales de terceros ni realizado un despliegue desde esta revisión.

## Licencias

No se ha establecido una licencia general para este repositorio. Las dependencias y fuentes conservan sus licencias propias. Las imágenes y capturas de proyectos no constituyen una licencia para reutilizar marcas o contenido de terceros.
