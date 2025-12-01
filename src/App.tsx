import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { LayoutWithSidebar } from "./components/LayoutWithSidebar";
import { HeroSection } from "./components/sections/HeroSection";
import { ServicesSection } from "./components/sections/ServicesSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { BlogSection } from "./components/sections/BlogSection";
import { ContactSection } from "./components/sections/ContactSection";
import { Language, translations } from "./utils/translations";
import { useActiveSection } from "./hooks/useActiveSection";
import { Helmet } from "react-helmet-async";
import { useSettings } from "./hooks/useSettings";

export default function App() {
  const sections = ["inicio", "servicios", "habilidades", "proyectos", "blog", "contacto"];
  const { activeSection, scrollToSection } = useActiveSection(sections);
  const [language, setLanguage] = useState<Language>('es');
  const { settings } = useSettings();
  const location = useLocation();

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  // Handle hash navigation when page loads or location changes
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1); // Remove the '#'
      if (sections.includes(sectionId)) {
        // Wait for DOM to be ready, then scroll
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 100);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash]);

  return (
    <LayoutWithSidebar
      activeSection={activeSection}
      onNavigate={scrollToSection}
      language={language}
      onLanguageToggle={toggleLanguage}
    >
      <Helmet>
        <title>{settings?.site_title || `Denilson Arguello | ${t.hero.title}`}</title>
        <meta name="description" content={settings?.site_description || `${t.hero.title} - ${t.hero.description} ${t.hero.titleHighlight}. ${t.hero.descriptionEnd}`} />
        <meta name="keywords" content="Denilson Arguello, Web Developer, Full Stack, React, TypeScript, Node.js" />
        <html lang={language} />
      </Helmet>

      <HeroSection t={t} />
      <ServicesSection t={t} />
      <SkillsSection t={t} />
      <ProjectsSection t={t} activeSection={activeSection} />
      <BlogSection t={t} />
      <ContactSection t={t} />

      {/* Footer */}
      <footer className="bg-[#161b22] border-t border-[#21262d] text-gray-400 py-8 px-8">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-[#58a6ff] mt-2">{t.footer.madeWith}</p>
        </div>
      </footer>
    </LayoutWithSidebar>
  );
}
