import { Home, Briefcase, Code2, FolderGit2, BookOpen, Mail, Download, Github, Linkedin, MessageSquare, Terminal, MapPin, Briefcase as BriefcaseIcon, Coffee, Bug, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { motion } from "framer-motion";
import { Language, translations } from "../utils/translations";
import ProfilePicture from '../assets/profile.png';
import { useSettings } from "../hooks/useSettings";
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  language: Language;
  onLanguageToggle: () => void;
  t: typeof translations.es;
}

export function Sidebar({
  activeSection,
  onNavigate,
  language,
  onLanguageToggle,
  t
}: SidebarProps) {
  const { settings } = useSettings();
  const githubUrl = settings?.social_links?.github || "https://github.com/denilsonpy";
  const linkedinUrl = settings?.social_links?.linkedin || "https://www.linkedin.com/in/denilson-arguello/";
  const discordUrl = settings?.social_links?.discord || "https://discord.com/users/711334090246324324";

  const menuItems = [
    { id: "inicio", label: t.nav.home, icon: Home },
    { id: "servicios", label: t.nav.services, icon: Briefcase },
    { id: "habilidades", label: t.nav.skills, icon: Code2 },
    { id: "proyectos", label: t.nav.projects, icon: FolderGit2 },
    { id: "blog", label: t.nav.blog, icon: BookOpen },
    { id: "contacto", label: t.nav.contact, icon: Mail },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    if (id === 'blog') {
      navigate('/blog');
      return;
    }

    if (location.pathname !== '/') {
      // Navigate to home with hash
      // The useEffect in App.tsx will handle scrolling to the section
      navigate(`/#${id}`);
      return;
    }

    // We're already on home page, use the scroll function directly
    onNavigate(id);
  };

  return (
    <aside className="w-80 h-screen bg-[#0d1117] border-r border-[#21262d] overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center space-y-4"
        >
          <div className="relative inline-block">
            <Avatar className="w-28 h-28 border-4 border-[#21262d] shadow-xl ring-2 ring-[#238636]">
              <AvatarImage src={ProfilePicture} />
              <AvatarFallback className="bg-[#161b22] text-gray-300">DW</AvatarFallback>
            </Avatar>
            <motion.div


              className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-[#238636] to-[#1f6feb] rounded-full flex items-center justify-center shadow-lg"
            >
              <Terminal className="w-5 h-5 text-white" />
            </motion.div>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl text-gray-100">
              Denilson Arguello
            </h2>
            <p className="text-sm text-gray-400">Full Stack Developer</p>
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              <span>{t.sidebar.locationValue}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <Badge className="bg-[#1f6feb]/10 text-[#58a6ff] border border-[#1f6feb]/30 hover:bg-[#1f6feb]/20 text-xs">
              PHP
            </Badge>
            <Badge className="bg-[#1f6feb]/10 text-[#58a6ff] border border-[#1f6feb]/30 hover:bg-[#1f6feb]/20 text-xs">
              WordPress
            </Badge>
            <Badge className="bg-[#238636]/10 text-[#3fb950] border border-[#238636]/30 hover:bg-[#238636]/20 text-xs">
              React
            </Badge>
            <Badge className="bg-[#238636]/10 text-[#3fb950] border border-[#238636]/30 hover:bg-[#238636]/20 text-xs">
              Node.js
            </Badge>
          </div>
        </motion.div>

        <Separator className="bg-[#21262d]" />

        {/* Navigation */}
        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all text-sm ${
                  (item.id === 'blog' && location.pathname.startsWith('/blog')) ||
                  (item.id !== 'blog' && activeSection === item.id && location.pathname === '/')
                    ? "bg-[#238636] text-white shadow-md shadow-[#238636]/20"
                    : "hover:bg-[#161b22] text-gray-400 hover:text-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        <Separator className="bg-[#21262d]" />

        {/* CV Download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <Button className="w-full bg-[#238636] hover:bg-[#2ea043] text-white border-0 shadow-md shadow-[#238636]/20 text-sm">
            <Download className="w-4 h-4 mr-2" />
            {t.sidebar.downloadCV}
          </Button>

          {/* Social Links */}
          <div className="flex gap-2 justify-center">
            <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline" className="border-[#21262d] bg-[#161b22] hover:bg-[#21262d] hover:border-[#58a6ff] text-gray-400 hover:text-[#58a6ff] rounded-md h-9 w-9 cursor-pointer">
                  <Github className="w-4 h-4" />
                </Button>
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline" className="border-[#21262d] bg-[#161b22] hover:bg-[#21262d] hover:border-[#0A66C2] text-gray-400 hover:text-[#0A66C2] rounded-md h-9 w-9 cursor-pointer">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
              <a href={discordUrl} target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline" className="border-[#21262d] bg-[#161b22] hover:bg-[#21262d] hover:border-[#5865F2] text-gray-400 hover:text-[#5865F2] rounded-md h-9 w-9 cursor-pointer">
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* CV Summary - Modernized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-[#21262d] rounded-xl p-4 space-y-4"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1f6feb]/10 border border-[#1f6feb]/30 rounded-lg flex items-center justify-center">
              <Terminal className="w-4 h-4 text-[#58a6ff]" />
            </div>
            <h3 className="text-sm text-[#58a6ff]">
              {t.sidebar.cvOnline}
            </h3>
          </div>

          {/* Modern Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-[#0d1117] border border-[#21262d] rounded-lg p-3 space-y-1"
            >
              <div className="flex items-center gap-1.5 text-gray-400">
                <BriefcaseIcon className="w-3.5 h-3.5" />
                <p className="text-xs">{t.sidebar.experience}</p>
              </div>
              <p className="text-lg text-gray-100">5+</p>
              <p className="text-xs text-gray-500">años</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-[#0d1117] border border-[#21262d] rounded-lg p-3 space-y-1"
            >
              <div className="flex items-center gap-1.5 text-gray-400">
                <FolderGit2 className="w-3.5 h-3.5" />
                <p className="text-xs">{t.sidebar.projects}</p>
              </div>
              <p className="text-lg text-gray-100">50+</p>
              <p className="text-xs text-gray-500">completados</p>
            </motion.div>
          </div>

          <Separator className="bg-[#21262d]" />

          {/* Availability Status */}
          <div className="bg-[#238636]/5 border border-[#238636]/20 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">{t.sidebar.availability}</span>
              <Badge className="bg-[#238636]/20 text-[#3fb950] border-0 text-xs px-2 py-0">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-[#3fb950] rounded-full mr-1.5"
                />
                {t.sidebar.availabilityStatus}
              </Badge>
            </div>
          </div>

          {/* Fun Stats */}
          <div className="flex items-center justify-between pt-2 border-t border-[#21262d]">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-1"
            >
              <Coffee className="w-4 h-4 text-[#ffa657]" />
              <span className="text-xs text-gray-500">∞ ☕</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-1"
            >
              <Bug className="w-4 h-4 text-[#3fb950]" />
              <span className="text-xs text-gray-500">0 🐛</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-1"
            >
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-gray-500">100%</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
