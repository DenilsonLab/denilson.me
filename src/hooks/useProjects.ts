import { useEffect, useMemo, useRef, useState } from "react";
import { projects as staticProjects, type Project } from "@/data/projects";

/**
 * Métricas reales traídas desde la API pública de GitHub para los
 * proyectos que declaran `githubRepo`.
 */
export interface GithubStats {
  stars: number;
  forks: number;
  language: string | null;
}

/** Proyecto enriquecido con métricas de GitHub (si están disponibles). */
export interface EnrichedProject extends Project {
  github?: GithubStats;
}

// Cache en memoria por sesión: evita re-fetchear al navegar home <-> /proyectos.
const statsCache = new Map<string, GithubStats>();

async function fetchGithubStats(repo: string): Promise<GithubStats | null> {
  if (statsCache.has(repo)) {
    return statsCache.get(repo) ?? null;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
    });

    // Rate limit (403), repo inexistente (404) u otro error -> fallback silencioso.
    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      stargazers_count?: number;
      forks_count?: number;
      language?: string | null;
    };

    const stats: GithubStats = {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      language: data.language ?? null,
    };

    statsCache.set(repo, stats);
    return stats;
  } catch {
    // Sin red / CORS / abort -> se ignora y se usa solo la data estática.
    return null;
  }
}

/**
 * Devuelve los proyectos (data estática curada) y, de forma progresiva,
 * los enriquece con métricas de GitHub para los que tengan `githubRepo`.
 *
 * La UI puede renderizar de inmediato con `projects`; `isEnriching` indica
 * que aún llegan métricas. Nunca bloquea el render ni lanza errores hacia arriba.
 */
export function useProjects() {
  const [enrichedById, setEnrichedById] = useState<Record<string, GithubStats>>({});
  const [isEnriching, setIsEnriching] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const reposToFetch = staticProjects.filter((project) => Boolean(project.githubRepo));

    if (reposToFetch.length === 0) {
      return;
    }

    setIsEnriching(true);

    Promise.all(
      reposToFetch.map(async (project) => {
        const stats = await fetchGithubStats(project.githubRepo as string);
        return stats ? ([project.id, stats] as const) : null;
      }),
    )
      .then((results) => {
        if (!isMounted.current) {
          return;
        }

        const next: Record<string, GithubStats> = {};
        for (const entry of results) {
          if (entry) {
            next[entry[0]] = entry[1];
          }
        }
        setEnrichedById(next);
      })
      .finally(() => {
        if (isMounted.current) {
          setIsEnriching(false);
        }
      });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const projects = useMemo<EnrichedProject[]>(
    () =>
      staticProjects.map((project) => ({
        ...project,
        github: enrichedById[project.id],
      })),
    [enrichedById],
  );

  const featured = useMemo(
    () => projects.filter((project) => project.featured),
    [projects],
  );

  return { projects, featured, isEnriching };
}
