import type { Language } from "@/utils/translations";

/**
 * Texto localizado. Usa las mismas claves que translations (es | en).
 */
export type LocalizedText = Record<Language, string>;

export type ProjectCategory = "web" | "plugin" | "app" | "ai" | "api";

export type ProjectStatus = "production" | "active" | "in_progress" | "archived";

export interface Project {
  /** Identificador estable */
  id: string;
  /** Slug para rutas y anclas (ej. /proyectos#slug o futuros detalles) */
  slug: string;
  /** Nombre del proyecto (marca, no se traduce) */
  name: string;
  /** Frase corta que lo describe */
  tagline: LocalizedText;
  /** Descripción de 1-2 líneas */
  description: LocalizedText;
  /** Qué hiciste vos en el proyecto */
  role: LocalizedText;
  /** Opcional: el problema que resolvía (se muestra en el showcase) */
  problem?: LocalizedText;
  /** Tecnologías, usadas también para los filtros */
  stack: string[];
  category: ProjectCategory;
  /** Entra al showcase editorial del home */
  featured: boolean;
  status: ProjectStatus;
  year: number;
  /**
   * Par de colores/tokens para el arte de la tarjeta (sin screenshots).
   * Se usa como `bg-gradient-to-br ${gradient}`.
   */
  gradient: string;
  /** Emoji o inicial que hace de "logo" en el arte */
  logo?: string;
  links: {
    demo?: string;
    repo?: string;
  };
  /**
   * "owner/name" del repo en GitHub. Si está presente, useProjects
   * enriquece la tarjeta con stars/forks/lenguaje reales vía la API.
   */
  githubRepo?: string;
}

/**
 * TODO(denilson): Reemplazar estos proyectos de ejemplo por los reales.
 * - Completá `links.demo` / `links.repo` con URLs verdaderas.
 * - Poné `githubRepo` como "DenilsonLab/nombre-del-repo" para que se
 *   enriquezca con stars/forks/lenguaje desde GitHub automáticamente.
 * - Ajustá `featured: true` en los 2-3 que quieras destacar en el home.
 */
export const projects: Project[] = [
  {
    id: "1",
    slug: "shopflow-pro",
    name: "ShopFlow Pro", // TODO: proyecto real
    tagline: {
      es: "Plataforma de e-commerce a medida",
      en: "Custom e-commerce platform",
    },
    description: {
      es: "Tienda online completa con carrito, pagos integrados y un panel de administración propio para gestionar catálogo y pedidos.",
      en: "Full online store with cart, integrated payments and a custom admin panel to manage catalog and orders.",
    },
    role: {
      es: "Diseño e implementación full stack, desde la base de datos hasta la interfaz de administración.",
      en: "Full stack design and implementation, from the database to the admin interface.",
    },
    problem: {
      es: "El cliente vendía por redes sociales y perdía pedidos. Necesitaba un flujo de compra confiable y un panel simple.",
      en: "The client was selling through social media and losing orders. They needed a reliable checkout flow and a simple panel.",
    },
    stack: ["PHP", "WordPress", "WooCommerce", "MySQL"],
    category: "web",
    featured: true,
    status: "production",
    year: 2024,
    gradient: "from-[#8957e5] to-[#1f6feb]",
    logo: "🛒",
    links: {
      demo: undefined, // TODO
      repo: undefined, // TODO
    },
    // githubRepo: "DenilsonLab/shopflow-pro", // TODO: descomentar cuando exista
  },
  {
    id: "2",
    slug: "adminpro-dashboard",
    name: "AdminPro Dashboard", // TODO: proyecto real
    tagline: {
      es: "Panel administrativo en tiempo real",
      en: "Real-time admin dashboard",
    },
    description: {
      es: "Dashboard con métricas en vivo, gestión de usuarios y autenticación segura, construido para escalar.",
      en: "Dashboard with live metrics, user management and secure authentication, built to scale.",
    },
    role: {
      es: "Frontend en React y diseño de la capa de datos con actualización en tiempo real.",
      en: "React frontend and design of the real-time data layer.",
    },
    problem: {
      es: "El equipo tomaba decisiones con datos de días atrás. Faltaba una vista única y actualizada.",
      en: "The team made decisions with days-old data. A single, up-to-date view was missing.",
    },
    stack: ["React", "Node.js", "Tailwind", "PostgreSQL"],
    category: "app",
    featured: true,
    status: "active",
    year: 2024,
    gradient: "from-[#3fb950] to-[#58a6ff]",
    logo: "📊",
    links: {
      demo: undefined, // TODO
      repo: undefined, // TODO
    },
  },
  {
    id: "3",
    slug: "contentgen-ai",
    name: "ContentGen AI", // TODO: proyecto real
    tagline: {
      es: "Generador de contenido con IA",
      en: "AI-powered content generator",
    },
    description: {
      es: "Herramienta que genera borradores de artículos y descripciones optimizadas usando modelos de lenguaje.",
      en: "Tool that generates article drafts and optimized copy using language models.",
    },
    role: {
      es: "Integración con la API del modelo, diseño de prompts y la interfaz de edición.",
      en: "Model API integration, prompt design and the editing interface.",
    },
    problem: {
      es: "Producir contenido consistente tomaba horas. La idea fue acelerar el primer borrador sin perder control editorial.",
      en: "Producing consistent content took hours. The goal was to speed up the first draft without losing editorial control.",
    },
    stack: ["TypeScript", "React", "Node.js", "OpenAI"],
    category: "ai",
    featured: true,
    status: "in_progress",
    year: 2025,
    gradient: "from-[#1f6feb] to-[#3fb950]",
    logo: "🤖",
    links: {
      demo: undefined, // TODO
      repo: undefined, // TODO
    },
  },
  {
    id: "4",
    slug: "pluginforge",
    name: "PluginForge", // TODO: proyecto real
    tagline: {
      es: "Suite de plugins para WordPress",
      en: "WordPress plugin suite",
    },
    description: {
      es: "Colección de plugins de SEO, caché y seguridad pensados para acelerar sitios WordPress.",
      en: "Collection of SEO, cache and security plugins built to speed up WordPress sites.",
    },
    role: {
      es: "Desarrollo de los plugins y del sistema de actualizaciones.",
      en: "Plugin development and the update system.",
    },
    stack: ["PHP", "WordPress", "JavaScript"],
    category: "plugin",
    featured: false,
    status: "production",
    year: 2023,
    gradient: "from-[#8957e5] to-[#d2a8ff]",
    logo: "🔌",
    links: {
      demo: undefined, // TODO
      repo: undefined, // TODO
    },
  },
  {
    id: "5",
    slug: "smartapi-engine",
    name: "SmartAPI Engine", // TODO: proyecto real
    tagline: {
      es: "API REST con documentación automática",
      en: "REST API with auto-generated docs",
    },
    description: {
      es: "Motor de API con documentación generada, validación de esquemas y autenticación por tokens.",
      en: "API engine with generated docs, schema validation and token authentication.",
    },
    role: {
      es: "Arquitectura de la API y automatización de la documentación.",
      en: "API architecture and documentation automation.",
    },
    stack: ["Node.js", "Express", "MongoDB", "TypeScript"],
    category: "api",
    featured: false,
    status: "active",
    year: 2024,
    gradient: "from-[#58a6ff] to-[#8957e5]",
    logo: "⚡",
    links: {
      demo: undefined, // TODO
      repo: undefined, // TODO
    },
  },
  {
    id: "6",
    slug: "nutriapp",
    name: "NutriApp", // TODO: proyecto real
    tagline: {
      es: "Gestión para nutricionistas",
      en: "Platform for nutritionists",
    },
    description: {
      es: "App para gestionar pacientes, planes alimenticios y consultas en un solo lugar.",
      en: "App to manage patients, meal plans and appointments in one place.",
    },
    role: {
      es: "Producto full stack, desde el modelo de datos hasta la experiencia móvil.",
      en: "Full stack product, from the data model to the mobile experience.",
    },
    stack: ["Next.js", "Tailwind", "Supabase"],
    category: "app",
    featured: false,
    status: "in_progress",
    year: 2025,
    gradient: "from-[#3fb950] to-[#238636]",
    logo: "🥗",
    links: {
      demo: undefined, // TODO
      repo: undefined, // TODO
    },
  },
];

/** Todas las tecnologías presentes, útiles para construir filtros. */
export function getAllStacks(items: Project[] = projects): string[] {
  const set = new Set<string>();
  for (const project of items) {
    for (const tech of project.stack) {
      set.add(tech);
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
