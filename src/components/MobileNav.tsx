import { useEffect, useRef } from 'react';
import { Menu, Languages } from 'lucide-react';
import { Navigation } from './Sidebar';
import { ProfilePhoto } from './common/ProfilePhoto';
import { homePath, type Page } from '@/utils/routes';
import { translations } from '@/utils/translations';
export function MobileNav({ page, activeSection }: { page: Page; activeSection: string }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const t = translations[page.language];
  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && ref.current?.open) {
        ref.current.open = false;
        ref.current.querySelector('summary')?.focus();
      }
    }
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);
  return (
    <header className="mobile-header">
      <div className="mobile-header-row">
        <a className="mobile-identity" href={homePath(page.language)}>
          <ProfilePhoto />
          <span>
            Denilson Arguello<small>{t.profession}</small>
          </span>
        </a>
        {page.alternate && (
          <a
            className="mobile-language"
            href={page.alternate}
            hrefLang={page.language === 'es' ? 'en' : 'es'}
          >
            <Languages size={16} aria-hidden="true" />
            {t.language}
          </a>
        )}
        <details ref={ref} className="mobile-disclosure">
          <summary aria-label={t.menu}>
            <Menu aria-hidden="true" />
          </summary>
          <div className="mobile-menu">
            <Navigation
              page={page}
              activeSection={activeSection}
              onNavigate={() => {
                if (ref.current) ref.current.open = false;
              }}
            />
          </div>
        </details>
      </div>
    </header>
  );
}
