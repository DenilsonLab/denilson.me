import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "../ui/button";
import { StatusBadge, GithubMetrics, StackChips } from "./ProjectBadges";
import type { EnrichedProject } from "@/hooks/useProjects";
import type { Language, translations } from "@/utils/translations";

interface ProjectShowcaseRowProps {
  project: EnrichedProject;
  language: Language;
  t: typeof translations.es.projects;
  /** Índice para alternar el lado del arte (par = arte a la izquierda) */
  index: number;
}

/**
 * Fila editorial grande y alternada para proyectos destacados.
 * Un panel de "arte" (gradiente + logo/nombre) y un panel narrativo.
 */
export function ProjectShowcaseRow({ project, language, t, index }: ProjectShowcaseRowProps) {
  const artOnLeft = index % 2 === 0;

  const art = (
    <div className="relative overflow-hidden rounded-2xl border border-border">
      <div className={`aspect-[16/10] w-full bg-gradient-to-br ${project.gradient}`} />
      {/* Oscurecido para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        {project.logo && <span className="text-6xl drop-shadow-lg">{project.logo}</span>}
        <span className="font-mono text-lg text-white/90 drop-shadow">{project.name}</span>
      </div>
    </div>
  );

  const content = (
    <div className="flex flex-col justify-center gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status={project.status} t={t} />
        <span className="text-sm text-fg-subtle">{project.year}</span>
        <GithubMetrics github={project.github} />
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl text-fg-default">{project.name}</h3>
        <p className="text-accent">{project.tagline[language]}</p>
      </div>

      <p className="text-fg-muted leading-relaxed">{project.description[language]}</p>

      {project.problem && (
        <div className="rounded-xl border border-border bg-surface/60 p-4">
          <p className="mb-1 text-xs uppercase tracking-wider text-fg-subtle">{t.problem}</p>
          <p className="text-sm text-fg-muted">{project.problem[language]}</p>
        </div>
      )}

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wider text-fg-subtle">{t.stack}</p>
        <StackChips stack={project.stack} />
      </div>

      <div className="flex flex-wrap gap-3 pt-1">
        {project.links.demo && (
          <Button
            asChild
            className="bg-primary text-white hover:bg-primary-hover"
          >
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
              {t.demo}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
        {project.links.repo && (
          <Button
            asChild
            variant="outline"
            className="border-border bg-surface text-fg-default hover:bg-surface-hover"
          >
            <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              {t.repo}
            </a>
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="grid gap-8 lg:grid-cols-2 lg:gap-12"
    >
      {/* En mobile el arte va siempre primero; en desktop se alterna */}
      <div className={artOnLeft ? "lg:order-1" : "lg:order-2"}>{art}</div>
      <div className={artOnLeft ? "lg:order-2" : "lg:order-1"}>{content}</div>
    </motion.div>
  );
}
