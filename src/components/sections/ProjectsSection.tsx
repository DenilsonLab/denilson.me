import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { SectionHeader } from "../common/SectionHeader";
import { ProjectShowcaseRow } from "../projects/ProjectShowcaseRow";
import { ProjectCard } from "../projects/ProjectCard";
import { useProjects } from "../../hooks/useProjects";
import type { Language, translations } from "../../utils/translations";

interface ProjectsSectionProps {
  t: typeof translations.es;
  language: Language;
}

/**
 * Sección del home: showcase editorial de destacados + una grilla breve
 * del resto, con CTA a la página completa /proyectos.
 */
export function ProjectsSection({ t, language }: ProjectsSectionProps) {
  const { projects, featured } = useProjects();

  // El resto (no destacados), limitado a 3 para no alargar el home.
  const secondary = projects.filter((project) => !project.featured).slice(0, 3);

  return (
    <section id="proyectos" className="bg-canvas px-8 py-20">
      <div className="container mx-auto max-w-6xl space-y-16">
        <SectionHeader
          badge={t.projects.badge}
          badgeIcon={Sparkles}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />

        {/* Destacados: filas editoriales alternadas */}
        <div className="space-y-16 lg:space-y-24">
          {featured.map((project, index) => (
            <ProjectShowcaseRow
              key={project.id}
              project={project}
              language={language}
              t={t.projects}
              index={index}
            />
          ))}
        </div>

        {/* Grilla breve del resto */}
        {secondary.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {secondary.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                language={language}
                t={t.projects}
                index={index}
              />
            ))}
          </div>
        )}

        {/* CTA a la página completa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="group bg-primary text-white shadow-lg shadow-[#238636]/20 hover:bg-primary-hover"
          >
            <Link to="/proyectos">
              {t.projects.viewAll}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
