import { Language } from "@/utils/translations";

type ResourceCategory = "development" | "design" | "productivity" | "ai";

type ResourceTag =
  | "react"
  | "typescript"
  | "tailwind"
  | "ux"
  | "icons"
  | "automation"
  | "focus"
  | "llm"
  | "docs"
  | "performance";

type LocalizedText = Record<Language, string>;

export interface ResourceItem {
  id: string;
  category: ResourceCategory;
  tags: ResourceTag[];
  href: string;
  image: string;
  title: LocalizedText;
  summary: LocalizedText;
  details: LocalizedText;
  highlight: LocalizedText;
}

function createResourceImage(
  eyebrow: string,
  title: string,
  accentStart: string,
  accentEnd: string,
) {
  const svg = `
    <svg width="1200" height="720" viewBox="0 0 1200 720" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="720" rx="36" fill="#0D1117"/>
      <rect x="32" y="32" width="1136" height="656" rx="28" fill="#161B22" stroke="#30363D"/>
      <circle cx="1010" cy="132" r="180" fill="${accentStart}" fill-opacity="0.18"/>
      <circle cx="214" cy="594" r="220" fill="${accentEnd}" fill-opacity="0.15"/>
      <rect x="104" y="126" width="188" height="40" rx="20" fill="#0D1117" stroke="#30363D"/>
      <text x="132" y="152" fill="#58A6FF" font-family="Arial, sans-serif" font-size="22" font-weight="700">${eyebrow}</text>
      <text x="104" y="272" fill="#F0F6FC" font-family="Arial, sans-serif" font-size="64" font-weight="700">${title}</text>
      <rect x="104" y="332" width="420" height="16" rx="8" fill="#21262D"/>
      <rect x="104" y="366" width="520" height="16" rx="8" fill="#21262D"/>
      <rect x="104" y="400" width="360" height="16" rx="8" fill="#21262D"/>
      <rect x="780" y="216" width="228" height="228" rx="32" fill="#0D1117" stroke="#30363D"/>
      <rect x="824" y="260" width="140" height="140" rx="28" fill="url(#gradient)" fill-opacity="0.9"/>
      <rect x="742" y="500" width="336" height="22" rx="11" fill="#21262D"/>
      <rect x="742" y="544" width="262" height="22" rx="11" fill="#21262D"/>
      <defs>
        <linearGradient id="gradient" x1="824" y1="260" x2="964" y2="400" gradientUnits="userSpaceOnUse">
          <stop stop-color="${accentStart}"/>
          <stop offset="1" stop-color="${accentEnd}"/>
        </linearGradient>
      </defs>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const resources: ResourceItem[] = [
  {
    id: "react-patterns",
    category: "development",
    tags: ["react", "typescript", "performance"],
    href: "https://react.dev/learn",
    image: createResourceImage("React", "Modern patterns", "#58A6FF", "#1F6FEB"),
    title: {
      es: "Patrones modernos de React",
      en: "Modern React patterns",
    },
    summary: {
      es: "La documentación que más consulto para estructurar componentes limpios, legibles y escalables.",
      en: "The documentation I consult most to structure clean, readable, and scalable components.",
    },
    details: {
      es: "Lo uso para validar decisiones de arquitectura, composición de componentes y manejo de estado sin caer en sobreingeniería.",
      en: "I use it to validate architecture decisions, component composition, and state handling without overengineering.",
    },
    highlight: {
      es: "Ideal para revisar fundamentos y patrones actuales del ecosistema React.",
      en: "Great for revisiting fundamentals and current React ecosystem patterns.",
    },
  },
  {
    id: "tailwind-ui-inspiration",
    category: "design",
    tags: ["tailwind", "ux", "icons"],
    href: "https://www.tailwindcss.com/plus/ui-blocks",
    image: createResourceImage("UI", "System inspiration", "#3FB950", "#58A6FF"),
    title: {
      es: "Inspiracion visual para interfaces",
      en: "Visual inspiration for interfaces",
    },
    summary: {
      es: "Un punto de referencia rapido cuando necesito ideas de layout, ritmo visual y bloques reutilizables.",
      en: "A fast reference point when I need layout ideas, visual rhythm, and reusable blocks.",
    },
    details: {
      es: "Me ayuda a comparar jerarquias, espacios y patrones de componentes antes de aterrizar una version propia.",
      en: "It helps me compare hierarchy, spacing, and component patterns before landing on a custom version.",
    },
    highlight: {
      es: "Muy util para mantener una UI consistente y moderna.",
      en: "Very useful to keep UI consistent and modern.",
    },
  },
  {
    id: "raycast-workflow",
    category: "productivity",
    tags: ["automation", "focus", "docs"],
    href: "https://www.raycast.com/",
    image: createResourceImage("Workflow", "Speed without noise", "#FFA657", "#F778BA"),
    title: {
      es: "Flujo de trabajo rapido con Raycast",
      en: "Fast workflow with Raycast",
    },
    summary: {
      es: "Acelera tareas repetitivas, busquedas, snippets y accesos rapidos sin romper el foco.",
      en: "Speeds up repetitive tasks, searches, snippets, and quick access without breaking focus.",
    },
    details: {
      es: "Lo aprovecho para comandos, accesos a proyectos y pequenas automatizaciones del dia a dia.",
      en: "I use it for commands, project shortcuts, and small day-to-day automations.",
    },
    highlight: {
      es: "Productividad real para sesiones largas de desarrollo.",
      en: "Real productivity for long development sessions.",
    },
  },
  {
    id: "llm-playbook",
    category: "ai",
    tags: ["llm", "automation", "docs"],
    href: "https://platform.openai.com/docs/guides/prompt-engineering",
    image: createResourceImage("AI", "Sharper prompting", "#A371F7", "#58A6FF"),
    title: {
      es: "Guia practica para trabajar con IA",
      en: "Practical guide for working with AI",
    },
    summary: {
      es: "Una base clara para escribir mejores prompts, iterar rapido y aterrizar ideas tecnicas con contexto.",
      en: "A clear base for writing better prompts, iterating fast, and grounding technical ideas with context.",
    },
    details: {
      es: "La uso para refinar prompts, documentar flujos y sacar mas valor de herramientas asistidas por IA.",
      en: "I use it to refine prompts, document workflows, and get more value from AI-assisted tools.",
    },
    highlight: {
      es: "Clave para integrar IA de forma practica en el trabajo diario.",
      en: "Key to integrating AI practically into daily work.",
    },
  },
];
