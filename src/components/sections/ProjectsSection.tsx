import { Star, GitFork, ExternalLink, Brain, Sparkles, TrendingUp, Eye, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { translations } from "../../utils/translations";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { useProjects } from "../../hooks/useProjects";
import { useSettings } from "../../hooks/useSettings";

interface ProjectsSectionProps {
  t: typeof translations.es;
  activeSection: string;
}

export function ProjectsSection({ activeSection, t }: ProjectsSectionProps) {
  const { projects, isLoading } = useProjects();
  const { settings } = useSettings();
  const githubUrl = settings?.social_links?.github || "https://github.com/denilsonpy";

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

  if (isLoading) {
    return (
      <section id="proyectos" className="py-20 px-8 bg-[#010409]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center text-gray-400">Cargando proyectos...</div>
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <section id="proyectos" className="py-20 px-8 bg-[#010409]">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h2 className="text-gray-100">{t.projects.title}</h2>
            <p className="text-gray-400">No hay proyectos disponibles en este momento.</p>
          </motion.div>
        </div>
      </section>
    );
  }

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
            <span className="text-sm text-gray-400">Proyectos destacados y en desarrollo</span>
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
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-[#0d1117] border-[#21262d] hover:border-[#30363d] transition-all h-full group overflow-hidden relative">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient || 'from-[#1f6feb] to-[#3fb950]'} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />

                {/* AI Badge */}
                {project.is_ai && (
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
                    src={project.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800"}
                    alt={project.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />

                  {/* Logo Overlay */}
                  {project.logo && (
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="absolute bottom-4 right-4 w-16 h-16 bg-[#161b22] border-2 border-[#21262d] rounded-2xl flex items-center justify-center shadow-xl text-3xl"
                    >
                      {project.logo}
                    </motion.div>
                  )}
                </div>

                <CardHeader className="space-y-3 relative z-10">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-gray-100 group-hover:text-[#58a6ff] transition-colors line-clamp-1">
                          {project.name}
                        </h3>
                      </div>
                      {project.tagline && (
                        <p className="text-sm text-gray-500">{project.tagline}</p>
                      )}
                    </div>
                    {project.status && (
                      <Badge className={`${getStatusColor(project.status)} border shrink-0`}>
                        {project.status}
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-gray-400 line-clamp-2 text-sm">
                    {project.description || "Sin descripción"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 relative z-10">
                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
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
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-1 text-gray-400 hover:text-yellow-500 transition-colors"
                      >
                        <Star className="w-4 h-4" />
                        <span>{project.stars || 0}</span>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-1 text-gray-400 hover:text-[#58a6ff] transition-colors"
                      >
                        <GitFork className="w-4 h-4" />
                        <span>{project.forks || 0}</span>
                      </motion.div>
                      {project.views && (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex items-center gap-1 text-gray-400 hover:text-[#3fb950] transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span>{project.views}</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t border-[#21262d] pt-4 gap-2 relative z-10">
                  {project.language && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className={`w-3 h-3 ${project.language_color || 'bg-gray-500'} rounded-full`} />
                      <span>{project.language}</span>
                    </div>
                  )}
                  <div className="flex gap-2 ml-auto">
                    {project.demo_url && (
                      <Button
                        asChild
                        size="sm"
                        variant="ghost"
                        className="text-[#58a6ff] hover:text-[#58a6ff] hover:bg-[#1f6feb]/10 cursor-pointer"
                      >
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Demo
                        </a>
                      </Button>
                    )}
                    {project.github_url && (
                      <Button
                        asChild
                        size="sm"
                        variant="ghost"
                        className="text-gray-400 hover:text-gray-100 hover:bg-[#30363d] cursor-pointer"
                      >
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          GitHub
                        </a>
                      </Button>
                    )}
                  </div>
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
            asChild
            size="lg"
            className="bg-[#238636] hover:bg-[#2ea043] text-white border-0 shadow-lg shadow-[#238636]/20 group cursor-pointer"
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              {t.projects.viewMore}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ExternalLink className="w-4 h-4 ml-2" />
              </motion.div>
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
