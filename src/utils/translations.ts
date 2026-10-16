export type Language = 'es' | 'en';
export const translations = {
  es: {
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      skills: 'Habilidades',
      projects: 'Proyectos',
      about: 'Sobre mí',
      contact: 'Contacto',
    },
    skip: 'Saltar al contenido',
    menu: 'Abrir navegación',
    close: 'Cerrar navegación',
    location: 'Paraguay',
    profession: 'Desarrollador web',
    language: 'English',
    hero: {
      eyebrow: 'PHP · WordPress · React · Node.js',
      title: 'Desarrollo web con',
      highlight: 'propósito.',
      description:
        'Soy Denilson Arguello. Creo sitios WordPress y aplicaciones a medida para simplificar procesos y convertir ideas en herramientas útiles.',
      projects: 'Conoce mi trabajo',
      contact: 'Hablemos de tu proyecto',
      caption: 'De la idea a una solución que puedes usar.',
      code: 'Una forma de presentarme',
    },
    services: {
      title: 'En qué puedo ayudarte',
      subtitle:
        'Desarrollo, integración y mantenimiento, con un alcance definido para cada proyecto.',
      items: [
        {
          title: 'Sitios y WordPress',
          description:
            'Sitios adaptables a móviles, personalización y desarrollo de plugins para las necesidades de tu negocio.',
        },
        {
          title: 'Aplicaciones a medida',
          description:
            'Interfaces y lógica de negocio con React, PHP o Node.js. Formularios, paneles e integraciones según el proyecto.',
        },
        {
          title: 'Integraciones y automatización',
          description:
            'Conexión entre servicios, APIs y bots para reducir tareas repetitivas y organizar información.',
        },
        {
          title: 'Mantenimiento y mejoras',
          description:
            'Revisión de errores, actualizaciones y mejoras de accesibilidad y rendimiento para sitios existentes.',
        },
      ],
      processTitle: 'Cómo trabajamos',
      process: [
        {
          title: 'Entender',
          description:
            'Conversamos sobre el problema, las personas que usarán la solución y las prioridades.',
        },
        {
          title: 'Definir',
          description: 'Acordamos alcance, entregables y etapas antes de comenzar.',
        },
        {
          title: 'Construir y revisar',
          description:
            'Desarrollamos, comprobamos el resultado y coordinamos la entrega y el soporte.',
        },
      ],
    },
    skills: {
      title: 'Herramientas con las que trabajo',
      subtitle: 'Capacidades concretas, sin porcentajes de autoevaluación.',
      groups: [
        {
          title: 'Backend e integraciones',
          description: 'Lógica de negocio, APIs y datos.',
          items: ['PHP', 'Node.js', 'REST APIs', 'MySQL', 'PostgreSQL', 'MongoDB'],
        },
        {
          title: 'Interfaces web',
          description: 'Experiencias adaptables y componentes reutilizables.',
          items: ['JavaScript', 'TypeScript', 'React', 'HTML', 'CSS', 'Tailwind CSS'],
        },
        {
          title: 'WordPress y herramientas',
          description: 'Personalización, plugins y control de versiones.',
          items: ['WordPress', 'Plugins', 'Git', 'Bots de Telegram'],
        },
      ],
    },
    projects: {
      title: 'Trabajo seleccionado',
      subtitle:
        'Proyectos públicos y herramientas personales. Cada ficha explica el alcance y mi participación.',
      all: 'Explorar los proyectos',
      pageTitle: 'Proyectos',
      pageSubtitle: 'Una selección de trabajo público y productos de uso personal.',
      detail: 'Ver el proyecto',
      visit: 'Visitar el sitio',
      role: 'Mi participación',
      problem: 'El problema',
      solution: 'La solución',
      features: 'Qué incluye',
      stack: 'Tecnologías',
      private: 'Uso personal · acceso privado',
      public: 'Sitio público',
      privateNote:
        'Esta herramienta se utiliza de forma privada. No se publica el acceso, el código ni información personal de sus usuarios.',
      filter: 'Filtrar por tecnología',
      allTech: 'Todas',
      results: 'proyectos',
      empty: 'No hay proyectos con esta tecnología.',
      back: 'Volver a proyectos',
      privacyCaption: 'Ilustración conceptual sin datos de la aplicación.',
    },
    about: {
      title: 'Desarrollo, colaboración y trabajo real',
      intro:
        'Mi experiencia combina trabajo freelance en Paraguay, proyectos propios y colaboración con equipos. Trabajo con PHP, WordPress, React y Node.js.',
      experienceTitle: 'Experiencia profesional',
      freelance: 'Trabajo independiente en Paraguay.',
      educationTitle: 'Formación',
      linkedin: 'Ver trayectoria en LinkedIn',
      team: 'Formo parte del equipo de OnlineHelp, que reúne servicios de desarrollo web, diseño y marketing digital.',
      teamLink: 'Conocer OnlineHelp',
      private:
        'También he participado en proyectos privados para empresas. Respeto su confidencialidad: no publico código, nombres de clientes ni materiales sin autorización.',
      profile: 'Ver perfil profesional',
      profileTitle: 'Perfil profesional',
      print: 'Guardar o imprimir como PDF',
      profileIntro:
        'Desarrollador web en Paraguay. Sitios WordPress, aplicaciones a medida e integraciones.',
      profileNote:
        'Para conversar sobre experiencia relevante para un puesto o proyecto, escríbeme.',
    },
    contact: {
      title: 'Conversemos',
      subtitle:
        'Cuéntame qué necesitas construir o mejorar. También puedes escribirme sobre una oportunidad de colaboración.',
      email: 'Correo',
      phone: 'Teléfono',
      reveal: 'Mostrar teléfono',
      formTitle: 'Prepara tu consulta',
      name: 'Tu nombre',
      reply: 'Tu correo',
      message: 'Qué necesitas',
      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'nombre@ejemplo.com',
      messagePlaceholder: 'Objetivo, alcance y contexto de tu proyecto…',
      submit: 'Abrir mi aplicación de correo',
      explanation:
        'El botón prepara un correo dirigido a hello@denilson.me. Revisa el mensaje y envíalo desde tu aplicación de correo; esta página no lo envía por ti.',
      prepared:
        'Se preparó el enlace de correo. Si tu aplicación no se abrió, copia el texto o escribe directamente a hello@denilson.me. El mensaje todavía no se ha enviado.',
      copy: 'Copiar consulta',
      copied: 'Consulta copiada.',
      copyError: 'No se pudo copiar. Selecciona el texto del mensaje y cópialo manualmente.',
      privacy:
        'El formulario no transmite ni guarda tus datos. Solo crea un borrador local; el envío se realiza con tu proveedor de correo.',
      subject: 'Consulta desde denilson.me',
    },
    footer: 'Desarrollo web desde Paraguay.',
    notFound: {
      title: 'Página no encontrada',
      description:
        'La dirección no existe o cambió. Puedes volver al inicio o explorar los proyectos.',
      home: 'Volver al inicio',
    },
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      skills: 'Skills',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
    },
    skip: 'Skip to content',
    menu: 'Open navigation',
    close: 'Close navigation',
    location: 'Paraguay',
    profession: 'Web developer',
    language: 'Español',
    hero: {
      eyebrow: 'PHP · WordPress · React · Node.js',
      title: 'Web development with',
      highlight: 'purpose.',
      description:
        'I’m Denilson Arguello. I build WordPress sites and custom applications to simplify processes and turn ideas into useful tools.',
      projects: 'Explore my work',
      contact: 'Let’s discuss your project',
      caption: 'From an idea to something you can use.',
      code: 'A way to introduce myself',
    },
    services: {
      title: 'How I can help',
      subtitle: 'Development, integrations and maintenance, with a defined scope for each project.',
      items: [
        {
          title: 'Websites and WordPress',
          description:
            'Responsive websites, customization and plugin development for your business needs.',
        },
        {
          title: 'Custom applications',
          description:
            'Interfaces and business logic with React, PHP or Node.js. Forms, dashboards and integrations tailored to the project.',
        },
        {
          title: 'Integrations and automation',
          description:
            'Connect services, APIs and bots to reduce repetitive tasks and organize information.',
        },
        {
          title: 'Maintenance and improvements',
          description:
            'Bug fixes, updates, accessibility and performance improvements for existing websites.',
        },
      ],
      processTitle: 'How we work',
      process: [
        {
          title: 'Understand',
          description:
            'We discuss the problem, the people who will use the solution and the priorities.',
        },
        {
          title: 'Define',
          description: 'We agree on scope, deliverables and milestones before starting.',
        },
        {
          title: 'Build and review',
          description: 'We develop, validate the result and arrange delivery and support.',
        },
      ],
    },
    skills: {
      title: 'Tools I work with',
      subtitle: 'Concrete capabilities, without self-rated percentages.',
      groups: [
        {
          title: 'Backend and integrations',
          description: 'Business logic, APIs and data.',
          items: ['PHP', 'Node.js', 'REST APIs', 'MySQL', 'PostgreSQL', 'MongoDB'],
        },
        {
          title: 'Web interfaces',
          description: 'Responsive experiences and reusable components.',
          items: ['JavaScript', 'TypeScript', 'React', 'HTML', 'CSS', 'Tailwind CSS'],
        },
        {
          title: 'WordPress and tools',
          description: 'Customization, plugins and version control.',
          items: ['WordPress', 'Plugins', 'Git', 'Telegram bots'],
        },
      ],
    },
    projects: {
      title: 'Selected work',
      subtitle:
        'Public projects and personal tools. Each overview explains the scope and my involvement.',
      all: 'Explore the projects',
      pageTitle: 'Projects',
      pageSubtitle: 'A selection of public work and tools for personal use.',
      detail: 'Explore the project',
      visit: 'Visit the website',
      role: 'My involvement',
      problem: 'The problem',
      solution: 'The solution',
      features: 'What it includes',
      stack: 'Technologies',
      private: 'Personal use · private access',
      public: 'Public website',
      privateNote:
        'This tool is used privately. Access, source code and users’ personal information are not published.',
      filter: 'Filter by technology',
      allTech: 'All',
      results: 'projects',
      empty: 'No projects use this technology.',
      back: 'Back to projects',
      privacyCaption: 'Conceptual illustration with no application data.',
    },
    about: {
      title: 'Development, collaboration and real work',
      intro:
        'My experience combines freelance work in Paraguay, personal projects and collaboration with teams. I work with PHP, WordPress, React and Node.js.',
      experienceTitle: 'Professional experience',
      freelance: 'Independent work in Paraguay.',
      educationTitle: 'Education and training',
      linkedin: 'View background on LinkedIn',
      team: 'I’m part of OnlineHelp, a team offering web development, design and digital marketing services.',
      teamLink: 'Meet OnlineHelp',
      private:
        'I have also contributed to private company projects. I respect their confidentiality and do not publish code, client names or materials without permission.',
      profile: 'View professional profile',
      profileTitle: 'Professional profile',
      print: 'Save or print as PDF',
      profileIntro:
        'Web developer based in Paraguay. WordPress websites, custom applications and integrations.',
      profileNote: 'Get in touch to discuss experience relevant to your role or project.',
    },
    contact: {
      title: 'Let’s talk',
      subtitle:
        'Tell me what you need to build or improve. You can also get in touch about a collaboration opportunity.',
      email: 'Email',
      phone: 'Phone',
      reveal: 'Show phone number',
      formTitle: 'Prepare your enquiry',
      name: 'Your name',
      reply: 'Your email',
      message: 'What you need',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'name@example.com',
      messagePlaceholder: 'Your project’s goals, scope and context…',
      submit: 'Open my email app',
      explanation:
        'This button prepares an email addressed to hello@denilson.me. Review and send it from your email app; this page does not send it for you.',
      prepared:
        'The email link is ready. If your app did not open, copy the text or email hello@denilson.me directly. Your message has not been sent yet.',
      copy: 'Copy enquiry',
      copied: 'Enquiry copied.',
      copyError: 'Could not copy. Select the message text and copy it manually.',
      privacy:
        'The form does not transmit or store your details. It only prepares a local draft; your email provider handles delivery.',
      subject: 'Enquiry from denilson.me',
    },
    footer: 'Web development from Paraguay.',
    notFound: {
      title: 'Page not found',
      description:
        'This address does not exist or has changed. Return home or explore the projects.',
      home: 'Back to home',
    },
  },
};
export type Translations = (typeof translations)[Language];
