export interface BlogPost {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    categoryColor: string;
    tags: string[];
    image: string;
}

export const blogPosts: BlogPost[] = [
    {
        title: "Cómo crear plugins personalizados para WordPress",
        excerpt: "Guía completa para desarrollar tus propios plugins de WordPress desde cero. Aprende las mejores prácticas y estructura de archivos.",
        date: "15 Sep 2025",
        readTime: "8",
        category: "WordPress",
        categoryColor: "bg-[#21759b]",
        tags: ["WordPress", "PHP", "Plugins"],
        image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800",
    },
    {
        title: "React Hooks: Guía práctica y ejemplos",
        excerpt: "Domina los React Hooks con ejemplos prácticos. useState, useEffect, useContext y custom hooks explicados de forma sencilla.",
        date: "10 Sep 2025",
        readTime: "12",
        category: "React",
        categoryColor: "bg-[#61dafb]",
        tags: ["React", "JavaScript", "Frontend"],
        image: "https://images.unsplash.com/photo-1591267990439-bc68529677c3?w=800",
    },
    {
        title: "Integrando IA en tus proyectos web",
        excerpt: "Descubre cómo incorporar inteligencia artificial en tus aplicaciones web. APIs de OpenAI, casos de uso y mejores prácticas.",
        date: "8 Sep 2025",
        readTime: "15",
        category: "AI",
        categoryColor: "bg-[#ffa657]",
        tags: ["AI", "ChatGPT", "Innovation"],
        image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=800",
    },
    {
        title: "Node.js y Express: Creando APIs RESTful",
        excerpt: "Tutorial paso a paso para construir APIs escalables con Node.js y Express. Autenticación, validación y mejores prácticas.",
        date: "1 Sep 2025",
        readTime: "10",
        category: "Backend",
        categoryColor: "bg-[#3fb950]",
        tags: ["Node.js", "Express", "API"],
        image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=800",
    },
];
