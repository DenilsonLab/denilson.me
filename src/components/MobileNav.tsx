import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sidebar } from "./Sidebar";
import { Language, translations } from "../utils/translations";
import ProfilePicture from '../assets/profile.png';

interface MobileNavProps {
    activeSection: string;
    onNavigate: (section: string) => void;
    language: Language;
    onLanguageToggle: () => void;
    t: typeof translations.es;
}

export function MobileNav({
    activeSection,
    onNavigate,
    language,
    onLanguageToggle,
    t
}: MobileNavProps) {
    const [open, setOpen] = useState(false);

    const handleNavigate = (section: string) => {
        onNavigate(section);
        setOpen(false);
    };

    return (
        <div className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-[#0d1117]/60 backdrop-blur-xl border-b border-[#ffffff]/5 shadow-lg shadow-black/20">
            {/* Logo/Avatar Area */}
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Avatar className="w-10 h-10 border-2 border-[#1f6feb]/50 shadow-md shadow-[#1f6feb]/20">
                        <AvatarImage src={ProfilePicture} alt="Denilson Arguello" className="object-cover" />
                        <AvatarFallback className="bg-[#161b22] text-xs text-gray-300">DA</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gradient-to-tr from-[#238636] to-[#3fb950] rounded-full border-2 border-[#0d1117]"></div>
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-100 text-sm tracking-wide">
                        Denilson <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58a6ff] to-[#1f6feb]">Arguello</span>
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono tracking-wider">FULL STACK DEV</span>
                </div>
            </div>

            {/* Hamburger Menu Container */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <button className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-300 transition-all duration-300 active:scale-95 active:bg-white/10 hover:bg-white/10 hover:text-white hover:border-[#1f6feb]/50">
                        <Menu className="w-5 h-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 bg-[#0d1117] border-r-[#21262d] w-80">
                    <Sidebar
                        activeSection={activeSection}
                        onNavigate={handleNavigate}
                        language={language}
                        onLanguageToggle={onLanguageToggle}
                        t={t}
                        isMobile={true}
                        onClose={() => setOpen(false)}
                    />
                </SheetContent>
            </Sheet>
        </div>
    );
}
