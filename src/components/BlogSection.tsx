import { Calendar, Clock, ArrowRight, Tag, BookOpen, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./common/ImageWithFallback";
import { motion } from "motion/react";
import { translations } from "../utils/translations";

interface BlogSectionProps {
  t: typeof translations.es;
}

export function BlogSection({ t }: BlogSectionProps) {
  const blogPosts = [
    {
      title: "Cómo crear plugins personalizados para WordPress",
      excerpt: "Guía completa para desarrollar tus propios plugins de WordPress desde cero. Aprende las mejores prácticas y estructura de archivos.",
      date: "15 Sep 2025",
      readTime: "8",
      category: "WordPress",
      categoryColor: "bg-[#21759b]",
      tags: ["WordPress", "PHP", "Plugins"],
      image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800",
    },
    {
      title: "React Hooks: Guía práctica y ejemplos",
      excerpt: "Domina los React Hooks con ejemplos prácticos. useState, useEffect, useContext y custom hooks explicados de forma sencilla.",
      date: "10 Sep 2025",
      readTime: "12",
      category: "React",
      categoryColor: "bg-[#61dafb]",
      tags: ["React", "JavaScript", "Frontend"],
      image: "https://images.unsplash.com/photo-1591267990439-bc68529677c3?w=800",
    },
    {
      title: "Integrando IA en tus proyectos web",
      excerpt: "Descubre cómo incorporar inteligencia artificial en tus aplicaciones web. APIs de OpenAI, casos de uso y mejores prácticas.",
      date: "8 Sep 2025",
      readTime: "15",
      category: "AI",
      categoryColor: "bg-[#ffa657]",
      tags: ["AI", "ChatGPT", "Innovation"],
      image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=800",
    },
    {
      title: "Node.js y Express: Creando APIs RESTful",
      excerpt: "Tutorial paso a paso para construir APIs escalables con Node.js y Express. Autenticación, validación y mejores prácticas.",
      date: "1 Sep 2025",
      readTime: "10",
      category: "Backend",
      categoryColor: "bg-[#3fb950]",
      tags: ["Node.js", "Express", "API"],
      image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=800",
    },
  ];

  return (
    <section id="blog" className="py-20 px-8 bg-[#0d1117]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-gray-100 flex items-center justify-center gap-2">
            <BookOpen className="w-8 h-8 text-[#58a6ff]" />
            {t.blog.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.blog.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="bg-[#161b22] border-[#21262d] overflow-hidden hover:border-[#30363d] transition-all group h-full hover:shadow-lg hover:shadow-[#238636]/10"
              >
                <div className="aspect-video overflow-hidden bg-[#0d1117] relative">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${post.categoryColor} text-white border-0`}>
                      {post.category}
                    </Badge>
                  </div>
                  {post.category === "AI" && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute top-4 right-4"
                    >
                      <div className="bg-[#ffa657]/20 backdrop-blur-sm p-2 rounded-full border border-[#ffa657]/30">
                        <TrendingUp className="w-4 h-4 text-[#ffa657]" />
                      </div>
                    </motion.div>
                  )}
                </div>
                
                <CardHeader className="space-y-3">
                  <CardTitle className="text-gray-100 group-hover:text-[#58a6ff] transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  
                  <CardDescription className="text-gray-400 line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Badge variant="outline" className="border-[#21262d] text-gray-400 hover:bg-[#238636] hover:text-white hover:border-[#238636] transition-all">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t border-[#21262d] pt-4">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} {t.blog.readTime}</span>
                    </div>
                  </div>
                  
                  <motion.div whileHover={{ x: 5 }}>
                    <Button variant="ghost" className="text-gray-400 hover:text-[#58a6ff] p-0 h-auto">
                      {t.blog.readMore}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button 
            size="lg" 
            className="bg-[#238636] hover:bg-[#2ea043] text-white border-0 group"
          >
            {t.blog.viewAll}
            <motion.div
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
