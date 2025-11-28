import { Sidebar } from "./Sidebar";
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
        <div className="flex min-h-screen bg-[#0d1117]">
            {/* Sidebar - Only visible on tablet and desktop */}
            <div className="hidden md:block sticky top-0 h-screen">
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
