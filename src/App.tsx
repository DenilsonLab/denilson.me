import { HeroSection } from './components/sections/HeroSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { translations, type Language } from './utils/translations';
export default function App({ language }: { language: Language }) {
  const t = translations[language];
  return (
    <>
      <HeroSection t={t} />
      <ProjectsSection language={language} t={t} />
      <ServicesSection t={t} />
      <SkillsSection t={t} />
      <AboutSection language={language} t={t} />
      <ContactSection t={t} />
    </>
  );
}
