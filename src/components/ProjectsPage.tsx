import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, FolderGit2 } from "lucide-react";
import { LayoutWithSidebar } from "./LayoutWithSidebar";
import { SectionHeader } from "./common/SectionHeader";
import { ProjectCard } from "./projects/ProjectCard";
import { ProjectFilters, type CategoryFilter } from "./projects/ProjectFilters";
import { useProjects } from "@/hooks/useProjects";
import { useLanguagePreference } from "@/hooks/useLanguagePreference";
import { useSettings } from "@/hooks/useSettings";
import { translations } from "@/utils/translations";
import { getAllStacks, type ProjectCategory } from "@/data/projects";

export default function ProjectsPage() {
  const { projects } = useProjects();
  const { language, toggleLanguage } = useLanguagePreference();
  const { settings } = useSettings();
  const t = translations[language];
  const projectsT = t.projects;

  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [selectedStack, setSelectedStack] = useState<string | "all">("all");

  // Categorías presentes en los datos (orden estable).
  const categories = useMemo<ProjectCategory[]>(() => {
    const order: ProjectCategory[] = ["web", "app", "plugin", "ai", "api"];
    const present = new Set(projects.map((project) => project.category));
    return order.filter((category) => present.has(category));
  }, [projects]);

  const stacks = useMemo(() => getAllStacks(projects), [projects]);

  const filtered = useMemo(
    () =>
      projects.filter((project) => {
        const matchesCategory =
          selectedCategory === "all" || project.category === selectedCategory;
        const matchesStack =
          selectedStack === "all" || project.stack.includes(selectedStack);
        return matchesCategory && matchesStack;
      }),
    [projects, selectedCategory, selectedStack],
  );

  return (
    <LayoutWithSidebar
      activeSection="proyectos"
      language={language}
      onLanguageToggle={toggleLanguage}
    >
      <Helmet>
        <title>{`${projectsT.pageTitle} | ${settings?.site_title || "Denilson Arguello"}`}</title>
        <meta name="description" content={projectsT.pageSubtitle} />
        <meta property="og:title" content={`${projectsT.pageTitle} | Denilson Arguello`} />
        <meta property="og:description" content={projectsT.pageSubtitle} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://denilson.me/proyectos" />
        <html lang={language} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl space-y-10 px-6 py-12 md:px-10 md:py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            {projectsT.backHome}
          </Link>

          <SectionHeader
            align="left"
            badge={projectsT.badge}
            badgeIcon={FolderGit2}
            title={projectsT.pageTitle}
            subtitle={projectsT.pageSubtitle}
          />

          <ProjectFilters
            categories={categories}
            stacks={stacks}
            selectedCategory={selectedCategory}
            selectedStack={selectedStack}
            onCategoryChange={setSelectedCategory}
            onStackChange={setSelectedStack}
            t={projectsT}
          />

          <p className="text-sm text-fg-subtle" aria-live="polite">
            {filtered.length} {projectsT.resultsCount}
          </p>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border-strong bg-surface/60 px-6 py-16 text-center">
              <FolderGit2 className="mx-auto mb-4 h-10 w-10 text-fg-subtle" aria-hidden="true" />
              <p className="text-fg-muted">{projectsT.empty}</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {filtered.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  language={language}
                  t={projectsT}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </LayoutWithSidebar>
  );
}
