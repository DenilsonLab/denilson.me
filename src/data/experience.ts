import type { LocalizedText } from "@/data/projects";

export type ExperienceKind = "work" | "education";

export interface ExperienceItem {
  id: string;
  kind: ExperienceKind;
  /** Puesto / título obtenido */
  role: LocalizedText;
  /** Empresa / institución (marca, no se traduce) */
  organization: string;
  /** Ubicación o modalidad (ej. "Remoto", "Asunción, PY") */
  location?: LocalizedText;
  /** Etiqueta de rango temporal ya formateada (ej. "2023 — Presente") */
  period: LocalizedText;
  /** Año de inicio, sólo para ordenar (desc) */
  startYear: number;
  /** true si es el puesto/estudio actual */
  current?: boolean;
  /** Descripción breve del rol */
  description: LocalizedText;
  /** Logros concretos (2-4). Lo que más pesa en un CV. */
  highlights: LocalizedText[];
  /** Tecnologías o áreas clave */
  stack?: string[];
}

/**
 * TODO(denilson): Reemplazar por tu experiencia real.
 * - Poné puestos, empresas, fechas y logros verdaderos.
 * - `highlights` es lo más importante: usá resultados medibles cuando puedas
 *   ("reduje X", "lancé Y", "mejoré Z un N%").
 * - Ordená por `startYear`; la sección los muestra del más reciente al más viejo.
 */
export const experience: ExperienceItem[] = [
  {
    id: "exp-1",
    kind: "work",
    role: {
      es: "Desarrollador Full Stack Freelance", // TODO
      en: "Freelance Full Stack Developer", // TODO
    },
    organization: "Independiente", // TODO
    location: { es: "Remoto", en: "Remote" },
    period: { es: "2022 — Presente", en: "2022 — Present" },
    startYear: 2022,
    current: true,
    description: {
      es: "Diseño y desarrollo de web apps a medida para clientes, de punta a punta.",
      en: "Design and development of custom web apps for clients, end to end.",
    },
    highlights: [
      {
        es: "Construí Accounty, una app de finanzas del hogar con bot de Telegram y lectura de facturas por foto.",
        en: "Built Accounty, a household finance app with a Telegram bot and photo receipt reading.",
      },
      {
        es: "Lancé InvoiceGen Pro, un generador de facturas con editor drag and drop.",
        en: "Shipped InvoiceGen Pro, an invoice generator with a drag-and-drop editor.",
      },
      {
        es: "TODO: agregá un logro con número (usuarios, tiempo ahorrado, ingresos).",
        en: "TODO: add a metric-driven highlight (users, time saved, revenue).",
      },
    ],
    stack: ["React", "Node.js", "TypeScript", "PostgreSQL"],
  },
  {
    id: "exp-2",
    kind: "work",
    role: {
      es: "Desarrollador Web", // TODO
      en: "Web Developer", // TODO
    },
    organization: "Empresa Anterior", // TODO
    location: { es: "Asunción, Paraguay", en: "Asunción, Paraguay" },
    period: { es: "2020 — 2022", en: "2020 — 2022" },
    startYear: 2020,
    description: {
      es: "Desarrollo y mantenimiento de sitios y plugins sobre WordPress para múltiples clientes.",
      en: "Development and maintenance of WordPress sites and plugins for multiple clients.",
    },
    highlights: [
      {
        es: "TODO: describí un proyecto o responsabilidad clave de este rol.",
        en: "TODO: describe a key project or responsibility from this role.",
      },
      {
        es: "TODO: agregá un logro medible.",
        en: "TODO: add a measurable achievement.",
      },
    ],
    stack: ["PHP", "WordPress", "JavaScript", "MySQL"],
  },
  {
    id: "edu-1",
    kind: "education",
    role: {
      es: "Ingeniería en Informática", // TODO
      en: "Computer Engineering", // TODO
    },
    organization: "Universidad", // TODO
    location: { es: "Paraguay", en: "Paraguay" },
    period: { es: "2018 — 2023", en: "2018 — 2023" },
    startYear: 2018,
    description: {
      es: "Formación en desarrollo de software, estructuras de datos y bases de datos.",
      en: "Training in software development, data structures and databases.",
    },
    highlights: [
      {
        es: "TODO: menciones, proyectos destacados o promedio si querés incluirlo.",
        en: "TODO: honors, notable projects or GPA if you want to include it.",
      },
    ],
  },
];
