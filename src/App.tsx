import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { BlogSection } from "./components/BlogSection";
import { ContactSection } from "./components/ContactSection";
import { Language, translations } from "./utils/translations";

export default function App() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [language, setLanguage] = useState<Language>('es');

  const t = translations[language];

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "servicios", "habilidades", "proyectos", "blog", "contacto"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen dark bg-[#0d1117] text-gray-100">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        onNavigate={handleNavigate}
        language={language}
        onLanguageToggle={toggleLanguage}
        t={t}
      />

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection t={t} />
        <ServicesSection t={t} />
        <SkillsSection t={t} />
        <ProjectsSection t={t} />
        <BlogSection t={t} />
        <ContactSection t={t} />

        {/* Footer */}
        <footer className="bg-[#161b22] border-t border-[#21262d] text-gray-400 py-8 px-8">
          <div className="container mx-auto max-w-6xl text-center">
            <p>© 2025 Tu Nombre - {t.footer.rights}</p>
            <p className="text-[#58a6ff] mt-2">{t.footer.madeWith}</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
