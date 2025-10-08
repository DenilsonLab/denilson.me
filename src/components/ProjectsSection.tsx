import { Star, GitFork, ExternalLink, Brain, Sparkles, TrendingUp, Eye, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { translations } from "../utils/translations";
import { ImageWithFallback } from "./common/ImageWithFallback";

interface ProjectsSectionProps {
  t: typeof translations.es;
}

export function ProjectsSection({ t }: ProjectsSectionProps) {
  const projects = [
    {
      name: "ShopFlow Pro",
      tagline: "E-Commerce Platform",
      description: "Plataforma completa de comercio electrónico con WooCommerce, sistema de pagos integrado y panel de administración personalizado.",
      language: "PHP",
      languageColor: "bg-[#8957e5]",
      stars: 247,
      forks: 82,
      views: "15.2k",
      tags: ["WordPress", "WooCommerce", "PHP", "MySQL"],
      updated: "2 días",
      isAI: false,
      image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?w=800",
      logo: "🛒",
      gradient: "from-[#8957e5] to-[#1f6feb]",
      status: "Production",
    },
    {
      name: "AdminPro Dashboard",
      tagline: "React Admin Panel",
      description: "Dashboard administrativo moderno con React, gráficos interactivos en tiempo real, gestión de usuarios y autenticación JWT segura.",
      language: "JavaScript",
      languageColor: "bg-[#f1e05a]",
      stars: 389,
      forks: 123,
      views: "28.4k",
      tags: ["React", "Node.js", "Chart.js", "Tailwind"],
      updated: "5 días",
      isAI: false,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      logo: "📊",
      gradient: "from-[#f1e05a] to-[#3fb950]",
      status: "Active",
    },
    {
      name: "AI ContentGen",
      tagline: "AI-Powered Content Platform",
      description: "Generador de contenido impulsado por IA usando GPT-4. Crea artículos, descripciones de productos y contenido SEO optimizado automáticamente.",
      language: "TypeScript",
      languageColor: "bg-[#3178c6]",
      stars: 1284,
      forks: 345,
      views: "67.8k",
      tags: ["AI", "GPT-4", "React", "Node.js"],
      updated: "1 día",
      isAI: true,
      image: "https://images.unsplash.com/photo-1745674684468-b9fc392fda3f?w=800",
      logo: "🤖",
      gradient: "from-[#1f6feb] to-[#3fb950]",
      status: "Featured",
    },
    {
      name: "PluginForge Suite",
      tagline: "WordPress Development Kit",
      description: "Colección de plugins premium para WordPress: SEO tools avanzadas, cache optimization, security enhancements y analytics dashboard.",
      language: "PHP",
      languageColor: "bg-[#8957e5]",
      stars: 524,
      forks: 167,
      views: "34.1k",
      tags: ["WordPress", "PHP", "Plugin Dev", "Security"],
      updated: "1 semana",
      isAI: false,
      image: "https://images.unsplash.com/photo-1560472354-0088b5dc9d8d?w=800",
      logo: "🔌",
      gradient: "from-[#8957e5] to-[#d2a8ff]",
      status: "Stable",
    },
    {
      name: "SmartAPI Engine",
      tagline: "Intelligent API Platform",
      description: "API RESTful con IA integrada. Incluye análisis predictivo, auto-optimización de queries y documentación generada automáticamente con Swagger.",
      language: "TypeScript",
      languageColor: "bg-[#3178c6]",
      stars: 765,
      forks: 218,
      views: "42.5k",
      tags: ["AI", "Node.js", "Express", "MongoDB"],
      updated: "3 días",
      isAI: true,
      image: "https://images.unsplash.com/photo-1623282033815-40b05d96c903?w=800",
      logo: "⚡",
      gradient: "from-[#3fb950] to-[#58a6ff]",
      status: "Beta",
    },
    {
      name: "AI ChatBot Pro",
      tagline: "Conversational AI Solution",
      description: "Sistema de chatbot inteligente multilenguaje con procesamiento de lenguaje natural, integración con múltiples plataformas y analytics avanzados.",
      language: "Python",
      languageColor: "bg-[#3572A5]",
      stars: 892,
      forks: 267,
      views: "51.3k",
      tags: ["AI", "NLP", "ChatGPT", "Python"],
      updated: "2 días",
      isAI: true,
      image: "https://images.unsplash.com/photo-1745674684468-b9fc392fda3f?w=800",
      logo: "💬",
      gradient: "from-[#58a6ff] to-[#8957e5]",
      status: "Featured",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Featured":
        return "bg-[#238636]/20 text-[#3fb950] border-[#238636]/40";
      case "Production":
      case "Active":
        return "bg-[#1f6feb]/20 text-[#58a6ff] border-[#1f6feb]/40";
      case "Beta":
        return "bg-[#ffa657]/20 text-[#ffa657] border-[#db6d28]/40";
      default:
        return "bg-[#8957e5]/20 text-[#d2a8ff] border-[#8957e5]/40";
    }
  };

  return (
    <section id="proyectos" className="py-20 px-8 bg-[#010409]">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#161b22] border border-[#21262d] rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#58a6ff]" />
            <span className="text-sm text-gray-400">Proyectos destacados con IA integrada</span>
          </div>
          <h2 className="text-gray-100">
            {t.projects.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-[#0d1117] border-[#21262d] hover:border-[#30363d] transition-all h-full group overflow-hidden relative">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* AI Badge */}
                {project.isAI && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-[#1f6feb] text-white border-0 shadow-lg shadow-[#1f6feb]/30">
                      <Brain className="w-3 h-3 mr-1" />
                      AI Powered
                    </Badge>
                  </div>
                )}

                {/* Project Image */}
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-[#161b22] to-[#0d1117]">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />
                  
                  {/* Logo Overlay */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute bottom-4 right-4 w-16 h-16 bg-[#161b22] border-2 border-[#21262d] rounded-2xl flex items-center justify-center shadow-xl text-3xl"
                  >
                    {project.logo}
                  </motion.div>
                </div>

                <CardHeader className="space-y-3 relative">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-gray-100 group-hover:text-[#58a6ff] transition-colors line-clamp-1">
                          {project.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500">{project.tagline}</p>
                    </div>
                    <Badge className={`${getStatusColor(project.status)} border shrink-0`}>
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400 line-clamp-2 text-sm">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="border-[#21262d] text-gray-400 hover:text-[#58a6ff] hover:border-[#1f6feb]/50 transition-colors text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-1 text-gray-400 hover:text-yellow-500 transition-colors"
                      >
                        <Star className="w-4 h-4" />
                        <span>{project.stars}</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-1 text-gray-400 hover:text-[#58a6ff] transition-colors"
                      >
                        <GitFork className="w-4 h-4" />
                        <span>{project.forks}</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-1 text-gray-400 hover:text-[#3fb950] transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>{project.views}</span>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t border-[#21262d] pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className={`w-3 h-3 ${project.languageColor} rounded-full`} />
                    <span>{project.language}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-[#58a6ff] hover:text-[#58a6ff] hover:bg-[#1f6feb]/10 group/btn"
                  >
                    Ver detalles
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.div>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-[#238636] hover:bg-[#2ea043] text-white border-0 shadow-lg shadow-[#238636]/20 group"
          >
            {t.projects.viewMore}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ExternalLink className="w-4 h-4 ml-2" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
