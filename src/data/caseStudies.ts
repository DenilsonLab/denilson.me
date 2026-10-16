import type { Language } from '@/utils/translations';

type Step = { title: string; body: string };
/** Product flows derived from confirmed features, without unverified ownership or metrics. */
const journeys: Record<string, Record<Language, Step[]>> = {
  karuplan: {
    es: [
      {
        title: 'Encontrar una receta',
        body: 'Explorar el recetario y las propuestas compartidas por la comunidad para decidir qué cocinar.',
      },
      {
        title: 'Organizar la semana',
        body: 'Conectar las recetas con un menú semanal, reuniendo las decisiones de varios días en un mismo lugar.',
      },
      {
        title: 'Preparar la compra',
        body: 'Pasar de las comidas elegidas a una lista de compras descargable para reunir los ingredientes.',
      },
    ],
    en: [
      {
        title: 'Find a recipe',
        body: 'Explore the recipe collection and community contributions to decide what to cook.',
      },
      {
        title: 'Organize the week',
        body: 'Connect recipes to a weekly menu, bringing several days of meal decisions into one place.',
      },
      {
        title: 'Prepare the shopping',
        body: 'Move from selected meals to a downloadable shopping list to gather the ingredients.',
      },
    ],
  },
  qlinnt: {
    es: [
      {
        title: 'Revisar una página pública',
        body: 'El punto de partida es un sitio accesible públicamente que necesita una revisión de calidad.',
      },
      {
        title: 'Entender los hallazgos',
        body: 'Organizar las comprobaciones técnicas, de SEO, accesibilidad y rendimiento, distinguiendo lo detectado de lo no verificado.',
      },
      {
        title: 'Priorizar la corrección',
        body: 'Usar los hallazgos y las indicaciones para abordar los problemas con herramientas de desarrollo asistido por IA.',
      },
    ],
    en: [
      {
        title: 'Review a public page',
        body: 'Start with a publicly accessible website that needs a quality review.',
      },
      {
        title: 'Understand the findings',
        body: 'Organize technical, SEO, accessibility and performance checks, separating detected issues from unverified checks.',
      },
      {
        title: 'Prioritize fixes',
        body: 'Use the findings and guidance to address problems with AI-assisted development tools.',
      },
    ],
  },
  accounty: {
    es: [
      {
        title: 'Registrar donde resulta cómodo',
        body: 'Reunir las entradas desde la aplicación web y el bot de Telegram en una herramienta para el hogar.',
      },
      {
        title: 'Leer un comprobante',
        body: 'Incorporar fotografías de comprobantes mediante OCR para reducir la transcripción manual de gastos.',
      },
      {
        title: 'Organizar el presupuesto',
        body: 'Conectar el registro de gastos con los presupuestos del hogar, manteniendo los datos y el acceso en privado.',
      },
    ],
    en: [
      {
        title: 'Record where it is convenient',
        body: 'Bring web application and Telegram bot entries together in one household tool.',
      },
      {
        title: 'Read a receipt',
        body: 'Use OCR with receipt photographs to reduce manual expense transcription.',
      },
      {
        title: 'Organize the budget',
        body: 'Connect expense tracking with household budgets, keeping data and access private.',
      },
    ],
  },
  'invoicegen-pro': {
    es: [
      {
        title: 'Partir de una plantilla',
        body: 'Preparar el documento sobre una base reutilizable, sin rehacer el diseño para cada trabajo.',
      },
      {
        title: 'Adaptar el contenido',
        body: 'Usar el editor visual de arrastrar y soltar para organizar campos e imágenes según la factura.',
      },
      {
        title: 'Reutilizar los datos',
        body: 'Guardar los campos recurrentes para preparar el siguiente documento con menos tareas repetidas.',
      },
    ],
    en: [
      {
        title: 'Start from a template',
        body: 'Prepare a document from a reusable foundation instead of rebuilding the layout for every job.',
      },
      {
        title: 'Adapt the content',
        body: 'Use the visual drag-and-drop editor to arrange fields and images for each invoice.',
      },
      {
        title: 'Reuse the information',
        body: 'Save recurring fields to prepare the next document with fewer repetitive tasks.',
      },
    ],
  },
};
export const caseJourney = (id: string, language: Language) => journeys[id]?.[language] ?? [];

const challenges: Record<string, Record<Language, string>> = {
  karuplan: {
    es: 'El reto principal fue combinar una dinámica de red social con una web de recetas: conectar la participación de la comunidad con la utilidad cotidiana de descubrir platos y planificar las comidas. Cloudinary forma parte de la gestión de imágenes del proyecto.',
    en: 'The main challenge was combining social-network dynamics with a recipe website: connecting community participation with the everyday usefulness of discovering dishes and planning meals. Cloudinary is part of the project’s image management.',
  },
  qlinnt: {
    es: 'El escaneo de páginas web fue el principal reto técnico del proyecto. La revisión reúne distintas comprobaciones y necesita presentar sus hallazgos de una forma que permita entender qué se detectó, qué quedó sin verificar y por dónde empezar a corregir.',
    en: 'Scanning websites was the project’s main technical challenge. The review combines different checks and needs to present findings so people can understand what was detected, what remained unverified and where to begin fixing issues.',
  },
};
export const caseChallenge = (id: string, language: Language) => challenges[id]?.[language];
