import type { Language } from "@/utils/translations";
import accountyImage from "@/assets/Accounty.png";
import invoiceGenImage from "@/assets/InvoiceGen Pro.png";

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
   * Par de colores/tokens para el arte de la tarjeta. Se usa como
   * `bg-gradient-to-br ${gradient}` y como fallback si no hay `image`.
   */
  gradient: string;
  /**
   * Mockup/captura del proyecto. Si está, se muestra en el arte de la
   * tarjeta y el showcase; si no, se usa el gradiente + logo.
   */
  image?: string;
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
 * Proyectos reales. Para cada uno:
 * - Completá `links.demo` / `links.repo` con URLs verdaderas.
 * - Poné `githubRepo` como "DenilsonLab/nombre-del-repo" para que se
 *   enriquezca con stars/forks/lenguaje desde GitHub automáticamente.
 * - `featured: true` lo destaca en el showcase del home.
 */
export const projects: Project[] = [
  {
    id: "accounty",
    slug: "accounty",
    name: "Accounty",
    tagline: {
      es: "Finanzas del hogar con bot de Telegram",
      en: "Household finances with a Telegram bot",
    },
    description: {
      es: "Web app para registrar gastos, armar presupuestos y administrar la economía de la casa. Su bot de Telegram carga gastos desde el chat y hasta lee facturas por foto: le sacás una foto al ticket y registra el gasto automáticamente.",
      en: "Web app to track expenses, build budgets and manage household finances. Its Telegram bot logs expenses from chat and even reads receipts by photo: snap a picture of the ticket and it records the expense automatically.",
    },
    role: {
      es: "Producto full stack: la web app, la lógica de presupuestos y el bot de Telegram con lectura de facturas por foto (OCR).",
      en: "Full stack product: the web app, the budgeting logic and the Telegram bot with photo-based receipt reading (OCR).",
    },
    problem: {
      es: "Registrar gastos en el momento es tedioso y por eso no se hace. El bot permite anotarlos en segundos desde el chat, o directamente sacándole una foto a la factura.",
      en: "Logging expenses on the spot is tedious, so it rarely happens. The bot lets you record them in seconds from chat, or just by taking a photo of the receipt.",
    },
    stack: ["React", "Node.js", "Telegram Bot API", "OCR", "PostgreSQL"],
    category: "app",
    featured: true,
    status: "in_progress",
    year: 2025,
    gradient: "from-[#238636] to-[#1f6feb]",
    image: accountyImage,
    logo: "💰",
    links: {
      demo: undefined, // TODO: URL de la demo
      repo: undefined, // TODO: URL del repo
    },
    // githubRepo: "DenilsonLab/accounty", // TODO: descomentar cuando el repo sea público
  },
  {
    id: "invoicegen-pro",
    slug: "invoicegen-pro",
    name: "InvoiceGen Pro",
    tagline: {
      es: "Generador de facturas con drag and drop",
      en: "Drag-and-drop invoice generator",
    },
    description: {
      es: "Web app para generar facturas personalizables con drag and drop, imágenes y datos recurrentes que se guardan una vez y no hay que volver a llenar en cada factura.",
      en: "Web app to build customizable invoices with drag and drop, images and recurring data saved once so you never re-enter it per invoice.",
    },
    role: {
      es: "Diseño e implementación del editor drag and drop y del sistema de plantillas con datos reutilizables.",
      en: "Design and implementation of the drag-and-drop editor and the template system with reusable data.",
    },
    problem: {
      es: "Rehacer los mismos datos en cada factura hace perder tiempo. La idea fue guardar lo recurrente y dejar el diseño totalmente editable.",
      en: "Re-entering the same data on every invoice wastes time. The goal was to store the recurring parts and keep the layout fully editable.",
    },
    stack: ["React", "TypeScript", "Tailwind", "Node.js"],
    category: "app",
    featured: true,
    status: "active",
    year: 2025,
    gradient: "from-[#8957e5] to-[#58a6ff]",
    image: invoiceGenImage,
    logo: "🧾",
    links: {
      demo: undefined, // TODO: URL de la demo
      repo: undefined, // TODO: URL del repo
    },
    // githubRepo: "DenilsonLab/invoicegen-pro", // TODO: descomentar cuando el repo sea público
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
