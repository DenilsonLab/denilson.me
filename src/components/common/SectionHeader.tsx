export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  level = 2,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? 'h1' : 'h2';
  return (
    <header className="section-header">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Heading>{title}</Heading>
      {subtitle && <p className="section-intro">{subtitle}</p>}
    </header>
  );
}
