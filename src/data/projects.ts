export interface Project {
    name: string;
    tagline: string;
    description: string;
    language: string;
    languageColor: string;
    stars: number;
    forks: number;
    views: string;
    tags: string[];
    updated: string;
    isAI: boolean;
    image: string;
    logo: string;
    gradient: string;
    status: string;
}

export const projects: Project[] = [
    {
        name: "ShopFlow Pro",
        tagline: "E-Commerce Platform",
        description: "Plataforma completa de comercio electrónico con WooCommerce, sistema de pagos integrado y panel de administración personalizado.",
        language: "PHP",
        languageColor: "bg-[#8957e5]",
        stars: 247,
        forks: 82,
        views: "15.2k",
        tags: ["WordPress", "WooCommerce", "PHP", "MySQL"],
        updated: "2 días",
        isAI: false,
        image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?w=800",
        logo: "🛒",
        gradient: "from-[#8957e5] to-[#1f6feb]",
        status: "Production",
    },
    {
        name: "AdminPro Dashboard",
        tagline: "React Admin Panel",
        description: "Dashboard administrativo moderno con React, gráficos interactivos en tiempo real, gestión de usuarios y autenticación JWT segura.",
        language: "JavaScript",
        languageColor: "bg-[#f1e05a]",
        stars: 389,
        forks: 123,
        views: "28.4k",
        tags: ["React", "Node.js", "Chart.js", "Tailwind"],
        updated: "5 días",
        isAI: false,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        logo: "📊",
        gradient: "from-[#f1e05a] to-[#3fb950]",
        status: "Active",
    },
    {
        name: "AI ContentGen",
        tagline: "AI-Powered Content Platform",
        description: "Generador de contenido impulsado por IA usando GPT-4. Crea artículos, descripciones de productos y contenido SEO optimizado automáticamente.",
        language: "TypeScript",
        languageColor: "bg-[#3178c6]",
        stars: 1284,
        forks: 345,
        views: "67.8k",
        tags: ["AI", "GPT-4", "React", "Node.js"],
        updated: "1 día",
        isAI: true,
        image: "https://images.unsplash.com/photo-1745674684468-b9fc392fda3f?w=800",
        logo: "🤖",
        gradient: "from-[#1f6feb] to-[#3fb950]",
        status: "Featured",
    },
    {
        name: "PluginForge Suite",
        tagline: "WordPress Development Kit",
        description: "Colección de plugins premium para WordPress: SEO tools avanzadas, cache optimization, security enhancements y analytics dashboard.",
        language: "PHP",
        languageColor: "bg-[#8957e5]",
        stars: 524,
        forks: 167,
        views: "34.1k",
        tags: ["WordPress", "PHP", "Plugin Dev", "Security"],
        updated: "1 semana",
        isAI: false,
        image: "https://images.unsplash.com/photo-1560472354-0088b5dc9d8d?w=800",
        logo: "🔌",
        gradient: "from-[#8957e5] to-[#d2a8ff]",
        status: "Stable",
    },
    {
        name: "SmartAPI Engine",
        tagline: "Intelligent API Platform",
        description: "API RESTful con IA integrada. Incluye análisis predictivo, auto-optimización de queries y documentación generada automáticamente con Swagger.",
        language: "TypeScript",
        languageColor: "bg-[#3178c6]",
        stars: 765,
        forks: 218,
        views: "42.5k",
        tags: ["AI", "Node.js", "Express", "MongoDB"],
        updated: "3 días",
        isAI: true,
        image: "https://images.unsplash.com/photo-1623282033815-40b05d96c903?w=800",
        logo: "⚡",
        gradient: "from-[#3fb950] to-[#58a6ff]",
        status: "Beta",
    },
    {
        name: "AI ChatBot Pro",
        tagline: "Conversational AI Solution",
        description: "Sistema de chatbot inteligente multilenguaje con procesamiento de lenguaje natural, integración con múltiples plataformas y analytics avanzados.",
        language: "Python",
        languageColor: "bg-[#3572A5]",
        stars: 892,
        forks: 267,
        views: "51.3k",
        tags: ["AI", "NLP", "ChatGPT", "Python"],
        updated: "2 días",
        isAI: true,
        image: "https://images.unsplash.com/photo-1745674684468-b9fc392fda3f?w=800",
        logo: "💬",
        gradient: "from-[#58a6ff] to-[#8957e5]",
        status: "Featured",
    },
];
