import type { ProjectCategory } from "@/data/projects";
import type { translations } from "@/utils/translations";

type ProjectsT = typeof translations.es.projects;

export type CategoryFilter = ProjectCategory | "all";

interface ProjectFiltersProps {
  categories: ProjectCategory[];
  stacks: string[];
  selectedCategory: CategoryFilter;
  selectedStack: string | "all";
  onCategoryChange: (category: CategoryFilter) => void;
  onStackChange: (stack: string | "all") => void;
  t: ProjectsT;
}

/** Filtros por categoría y por tecnología para /proyectos. */
export function ProjectFilters({
  categories,
  stacks,
  selectedCategory,
  selectedStack,
  onCategoryChange,
  onStackChange,
  t,
}: ProjectFiltersProps) {
  return (
    <div className="space-y-5">
      {/* Categorías */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={t.filterByCategory}
      >
        <FilterChip
          active={selectedCategory === "all"}
          onClick={() => onCategoryChange("all")}
        >
          {t.filterAll}
        </FilterChip>
        {categories.map((category) => (
          <FilterChip
            key={category}
            active={selectedCategory === category}
            onClick={() => onCategoryChange(category)}
          >
            {t.categories[category]}
          </FilterChip>
        ))}
      </div>

      {/* Tecnologías */}
      <div className="flex flex-wrap gap-2" role="group" aria-label={t.filterByStack}>
        <FilterChip
          small
          active={selectedStack === "all"}
          onClick={() => onStackChange("all")}
        >
          {t.filterAll}
        </FilterChip>
        {stacks.map((stack) => (
          <FilterChip
            key={stack}
            small
            active={selectedStack === stack}
            onClick={() => onStackChange(stack)}
          >
            {stack}
          </FilterChip>
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  small,
  onClick,
  children,
}: {
  active: boolean;
  small?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-9 rounded-full border transition-colors ${
        small ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
      } ${
        active
          ? "border-accent bg-[#1f6feb]/15 text-accent"
          : "border-border bg-surface text-fg-muted hover:border-accent/40 hover:text-fg-default"
      }`}
    >
      {children}
    </button>
  );
}
