import { Star, GitFork } from "lucide-react";
import { Badge } from "../ui/badge";
import type { ProjectStatus } from "@/data/projects";
import type { GithubStats } from "@/hooks/useProjects";
import type { translations } from "@/utils/translations";

type ProjectsT = typeof translations.es.projects;

const STATUS_STYLES: Record<ProjectStatus, string> = {
  production: "bg-[#238636]/15 text-[#3fb950] border-[#238636]/40",
  active: "bg-[#1f6feb]/15 text-[#58a6ff] border-[#1f6feb]/40",
  in_progress: "bg-[#ffa657]/15 text-[#ffa657] border-[#db6d28]/40",
  archived: "bg-[#8957e5]/15 text-[#d2a8ff] border-[#8957e5]/40",
};

export function StatusBadge({ status, t }: { status: ProjectStatus; t: ProjectsT }) {
  return (
    <Badge className={`${STATUS_STYLES[status]} border shrink-0`}>
      {t.status[status]}
    </Badge>
  );
}

/**
 * Métricas de GitHub. Sólo se renderiza si hay datos reales, así no se
 * muestran ceros falsos mientras cargan o cuando el proyecto no tiene repo.
 */
export function GithubMetrics({
  github,
  className = "",
}: {
  github?: GithubStats;
  className?: string;
}) {
  if (!github) {
    return null;
  }

  return (
    <div className={`flex items-center gap-4 text-sm text-fg-muted ${className}`}>
      <span className="flex items-center gap-1">
        <Star className="h-4 w-4" aria-hidden="true" />
        <span>{github.stars}</span>
        <span className="sr-only">stars en GitHub</span>
      </span>
      <span className="flex items-center gap-1">
        <GitFork className="h-4 w-4" aria-hidden="true" />
        <span>{github.forks}</span>
        <span className="sr-only">forks en GitHub</span>
      </span>
      {github.language && (
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
          <span>{github.language}</span>
        </span>
      )}
    </div>
  );
}

export function StackChips({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <Badge
          key={tech}
          variant="outline"
          className="border-border text-fg-muted text-xs"
        >
          {tech}
        </Badge>
      ))}
    </div>
  );
}
