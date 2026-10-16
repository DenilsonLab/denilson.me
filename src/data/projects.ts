import type { Language } from '@/utils/translations';
export type LocalizedText = Record<Language, string>;
export interface Project {
  id: string;
  slug: string;
  name: string;
  visibility: 'public' | 'private';
  featured: boolean;
  tagline: LocalizedText;
  description: LocalizedText;
  role: LocalizedText;
  problem?: LocalizedText;
  solution?: LocalizedText;
  stack: string[];
  image?: string;
  url?: string;
}
export const projects: Project[] = [
  {
    id: 'karuplan',
    slug: 'karuplan',
    name: 'Karuplan',
    visibility: 'public',
    featured: true,
    tagline: {
      es: 'Recetas y menús para organizar la semana',
      en: 'Recipes and menus to organize your week',
    },
    description: {
      es: 'Plataforma para descubrir recetas, organizar menús semanales y preparar una lista de compras. Incluye un recetario de la comunidad y opciones para planificar las comidas.',
      en: 'A platform for discovering recipes, organizing weekly menus and preparing a shopping list, with community recipes and meal-planning options.',
    },
    role: {
      es: 'Desarrollé el proyecto completo: una web de recetas y planificación de comidas con una dimensión social para la comunidad.',
      en: 'I developed the entire project: a recipe and meal-planning website with a social dimension for its community.',
    },
    problem: {
      es: 'Decidir qué cocinar y reunir los ingredientes puede convertirse en una tarea repetitiva.',
      en: 'Deciding what to cook and gathering ingredients can become a repetitive task.',
    },
    solution: {
      es: 'Un recetario conectado con menús semanales y una lista de compras descargable.',
      en: 'A recipe collection connected to weekly menus and a downloadable shopping list.',
    },
    stack: ['React', 'Tailwind CSS', 'Cloudinary'],
    image: '/projects/karuplan-cover.webp',
    url: 'https://www.karuplan.com/',
  },
  {
    id: 'qlinnt',
    slug: 'qlinnt',
    name: 'Qlinnt',
    visibility: 'public',
    featured: true,
    tagline: {
      es: 'Revisión de calidad para sitios creados con IA',
      en: 'Quality checks for AI-built websites',
    },
    description: {
      es: 'Herramienta que revisa páginas públicas para identificar problemas técnicos, de SEO, accesibilidad y rendimiento. Organiza hallazgos y ofrece indicaciones para corregirlos con herramientas de desarrollo asistido por IA.',
      en: 'A tool that reviews public pages for technical, SEO, accessibility and performance issues. It organizes findings and provides guidance for addressing them with AI coding tools.',
    },
    role: {
      es: 'Desarrollé el proyecto completo, incluida la experiencia de revisión y el escaneo de páginas web.',
      en: 'I developed the entire project, including the review experience and website scanning.',
    },
    problem: {
      es: 'Un sitio puede verse terminado y conservar errores técnicos que pasan desapercibidos.',
      en: 'A website can look finished while retaining overlooked technical issues.',
    },
    solution: {
      es: 'Un diagnóstico que distingue problemas detectados de comprobaciones no verificadas y ayuda a priorizar las correcciones.',
      en: 'A diagnosis that distinguishes detected issues from unverified checks and helps prioritize fixes.',
    },
    stack: ['React', 'Tailwind CSS'],
    image: '/projects/qlinnt-cover.webp',
    url: 'https://qlinnt.com/',
  },
  {
    id: 'accounty',
    slug: 'accounty',
    name: 'Accounty',
    visibility: 'private',
    featured: true,
    tagline: {
      es: 'Finanzas del hogar desde la web y Telegram',
      en: 'Household finances on the web and Telegram',
    },
    description: {
      es: 'Herramienta personal para organizar gastos y presupuestos del hogar. Un bot de Telegram permite registrar gastos y leer comprobantes por foto.',
      en: 'A personal tool to organize household expenses and budgets. A Telegram bot records expenses and reads receipt photos.',
    },
    role: {
      es: 'Desarrollo de la aplicación, la lógica de presupuestos y el bot con lectura de comprobantes.',
      en: 'Development of the application, budgeting logic and receipt-reading bot.',
    },
    problem: {
      es: 'Anotar cada gasto manualmente añade fricción al seguimiento de las finanzas del hogar.',
      en: 'Manually entering every expense adds friction to tracking household finances.',
    },
    solution: {
      es: 'Unificar el registro y los presupuestos, con entradas desde Telegram y fotografías de comprobantes.',
      en: 'Bring expense tracking and budgets together, with input through Telegram and receipt photos.',
    },
    stack: ['React', 'Node.js', 'Telegram Bot API', 'OCR', 'PostgreSQL'],
  },
  {
    id: 'invoicegen-pro',
    slug: 'invoicegen-pro',
    name: 'InvoiceGen Pro',
    visibility: 'private',
    featured: false,
    tagline: {
      es: 'Plantillas de facturas que se adaptan a cada trabajo',
      en: 'Invoice templates tailored to each job',
    },
    description: {
      es: 'Herramienta de uso personal para preparar facturas con un editor visual, imágenes y datos recurrentes reutilizables.',
      en: 'A personal tool for preparing invoices with a visual editor, images and reusable recurring information.',
    },
    role: {
      es: 'Diseño e implementación del editor visual y del sistema de plantillas con datos reutilizables.',
      en: 'Design and implementation of the visual editor and reusable-data template system.',
    },
    problem: {
      es: 'Repetir datos y rehacer el diseño de cada factura consume tiempo.',
      en: 'Repeating information and rebuilding invoice layouts takes time.',
    },
    solution: {
      es: 'Un editor de arrastrar y soltar con plantillas y campos que se guardan para el siguiente documento.',
      en: 'A drag-and-drop editor with templates and fields saved for the next document.',
    },
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
  },
];
export function getAllStacks(items: Project[] = projects): string[] {
  return [...new Set(items.flatMap((project) => project.stack))].sort();
}
