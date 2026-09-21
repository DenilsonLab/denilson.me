import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { SectionHeader } from "../common/SectionHeader";
import { Badge } from "../ui/badge";
import { experience, type ExperienceItem, type ExperienceKind } from "../../data/experience";
import type { Language, translations } from "../../utils/translations";

interface ExperienceSectionProps {
  t: typeof translations.es;
  language: Language;
}

const KIND_ICON: Record<ExperienceKind, typeof Briefcase> = {
  work: Briefcase,
  education: GraduationCap,
};

export function ExperienceSection({ t, language }: ExperienceSectionProps) {
  // Ordenado del más reciente al más antiguo.
  const items = [...experience].sort((a, b) => b.startYear - a.startYear);

  return (
    <section id="experiencia" className="bg-background px-8 py-24">
      <div className="container mx-auto max-w-4xl space-y-16">
        <SectionHeader
          badge={t.experience.badge}
          badgeIcon={Sparkles}
          title={t.experience.title}
          subtitle={t.experience.subtitle}
        />

        <ol className="relative space-y-10">
          {/* Línea vertical del timeline */}
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-2 bottom-2 w-px bg-border-strong md:left-[23px]"
          />

          {items.map((item, index) => (
            <TimelineEntry
              key={item.id}
              item={item}
              language={language}
              t={t}
              index={index}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineEntry({
  item,
  language,
  t,
  index,
}: {
  item: ExperienceItem;
  language: Language;
  t: typeof translations.es;
  index: number;
}) {
  const Icon = KIND_ICON[item.kind];

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.3) }}
      className="relative flex gap-5 md:gap-6"
    >
      {/* Nodo con icono */}
      <div className="relative z-10 shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-surface md:h-12 md:w-12">
          <Icon className="h-4 w-4 text-accent md:h-5 md:w-5" aria-hidden="true" />
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 rounded-2xl border border-border bg-surface/60 p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
          <div>
            <h3 className="text-lg text-fg-default">{item.role[language]}</h3>
            <p className="text-accent">{item.organization}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-fg-subtle">
            <span>{item.period[language]}</span>
            {item.current && (
              <Badge className="border-0 bg-[#238636]/20 text-[#3fb950]">
                {t.experience.current}
              </Badge>
            )}
          </div>
        </div>

        {item.location && (
          <p className="mt-1 text-sm text-fg-subtle">{item.location[language]}</p>
        )}

        <p className="mt-3 text-fg-muted">{item.description[language]}</p>

        {item.highlights.length > 0 && (
          <ul className="mt-4 space-y-2">
            {item.highlights.map((highlight, i) => (
              <li key={i} className="flex gap-2 text-sm text-fg-muted">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{highlight[language]}</span>
              </li>
            ))}
          </ul>
        )}

        {item.stack && item.stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.stack.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="border-border text-xs text-fg-muted"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.li>
  );
}
