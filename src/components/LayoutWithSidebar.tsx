import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { Language, translations } from "../utils/translations";

interface LayoutWithSidebarProps {
    children: React.ReactNode;
    activeSection?: string;
    onNavigate?: (section: string) => void;
    language?: Language;
    onLanguageToggle?: () => void;
}

export function LayoutWithSidebar({
    children,
    activeSection = "blog",
    onNavigate = () => { },
    language = "es",
    onLanguageToggle = () => { }
}: LayoutWithSidebarProps) {
    const t = translations[language];

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#0d1117]">
            {/* Mobile Navigation - Only visible on mobile */}
            <MobileNav
                activeSection={activeSection}
                onNavigate={onNavigate}
                language={language}
                onLanguageToggle={onLanguageToggle}
                t={t}
            />

            {/* Sidebar - Desktop logic handles visibility via CSS */}
            <div className="hidden md:block sticky top-0 h-screen shrink-0">
                <Sidebar
                    activeSection={activeSection}
                    onNavigate={onNavigate}
                    language={language}
                    onLanguageToggle={onLanguageToggle}
                    t={t}
                />
            </div>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
                {children}
            </main>
        </div>
    );
}
