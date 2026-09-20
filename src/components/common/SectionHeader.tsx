import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  /** Texto del badge superior (opcional) */
  badge?: string;
  /** Icono del badge (opcional) */
  badgeIcon?: LucideIcon;
  title: string;
  subtitle?: string;
  /** Alineación del contenido */
  align?: "center" | "left";
  className?: string;
}

/**
 * Encabezado de sección reutilizable (badge + título + subtítulo).
 * Reemplaza el bloque que estaba copiado en Services/Skills/Projects/Contact.
 */
export function SectionHeader({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`space-y-4 ${isCenter ? "text-center" : "text-left"} ${className}`}
    >
      {badge && (
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {BadgeIcon && <BadgeIcon className="h-4 w-4 text-accent" />}
          <span className="text-sm text-fg-muted">{badge}</span>
        </div>
      )}

      <h2 className="text-3xl md:text-4xl text-fg-default tracking-tight">{title}</h2>

      {subtitle && (
        <p className={`text-fg-muted ${isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
