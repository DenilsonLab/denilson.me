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
 * Sección del home: showcase editorial de destacados. Cuando hay más
 * proyectos que los destacados, agrega una grilla breve del resto y un
 * CTA a la página completa. Con pocos proyectos, se mantiene compacta.
 */
export function ProjectsSection({ t, language }: ProjectsSectionProps) {
  const { projects, featured } = useProjects();

  // El resto (no destacados), limitado a 3 para no alargar el home.
  const secondary = projects.filter((project) => !project.featured).slice(0, 3);

  // Sólo mostramos grilla y CTA a /proyectos si hay más que los destacados.
  const hasMore = projects.length > featured.length;

  return (
    <section id="proyectos" className="relative overflow-hidden bg-canvas px-8 py-24">
      {/* Fondo editorial: brillo de marca sutil que diferencia esta sección */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#1f6feb]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 translate-x-1/2 rounded-full bg-[#238636]/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl space-y-20">
        <SectionHeader
          badge={t.projects.badge}
          badgeIcon={Sparkles}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />

        {/* Destacados: filas editoriales alternadas y numeradas */}
        <div className="space-y-20 lg:space-y-28">
          {featured.map((project, index) => (
            <ProjectShowcaseRow
              key={project.id}
              project={project}
              language={language}
              t={t.projects}
              index={index}
              total={featured.length}
            />
          ))}
        </div>

        {/* Grilla breve del resto (sólo si hay más proyectos) */}
        {hasMore && secondary.length > 0 && (
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

        {/* CTA a la página completa (sólo si hay más para ver) */}
        {hasMore && (
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
        )}
      </div>
    </section>
  );
}
