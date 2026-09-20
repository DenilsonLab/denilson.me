import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { StatusBadge, GithubMetrics, StackChips } from "./ProjectBadges";
import type { EnrichedProject } from "@/hooks/useProjects";
import type { Language, translations } from "@/utils/translations";

interface ProjectCardProps {
  project: EnrichedProject;
  language: Language;
  t: typeof translations.es.projects;
  index?: number;
}

/** Tarjeta compacta para la grilla (home secundarios y página /proyectos). */
export function ProjectCard({ project, language, t, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="h-full"
    >
      <Card className="group h-full overflow-hidden border-border bg-surface transition-colors hover:border-border-strong">
        {/* Arte compacto */}
        <div className="relative">
          <div className={`aspect-[16/9] w-full bg-gradient-to-br ${project.gradient}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          {project.logo && (
            <span className="absolute bottom-3 right-4 text-3xl drop-shadow-lg">
              {project.logo}
            </span>
          )}
          <div className="absolute left-4 top-4">
            <StatusBadge status={project.status} t={t} />
          </div>
        </div>

        <CardHeader className="gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg text-fg-default transition-colors group-hover:text-accent">
              {project.name}
            </h3>
            <span className="shrink-0 text-xs text-fg-subtle">{project.year}</span>
          </div>
          <p className="text-sm text-accent">{project.tagline[language]}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="line-clamp-2 text-sm text-fg-muted">{project.description[language]}</p>
          <StackChips stack={project.stack} />
          <GithubMetrics github={project.github} />
        </CardContent>

        <CardFooter className="mt-auto gap-2 border-t border-border pt-4">
          {project.links.demo && (
            <Button
              asChild
              size="sm"
              className="bg-primary text-white hover:bg-primary-hover"
            >
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                {t.demo}
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          )}
          {project.links.repo && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-border bg-transparent text-fg-muted hover:bg-surface-hover hover:text-fg-default"
            >
              <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1 h-4 w-4" />
                {t.repo}
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
