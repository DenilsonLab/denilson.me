import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { motion } from "framer-motion";
import { Brain, Sparkles, Zap, TrendingUp, Star } from "lucide-react";
import { translations } from "../utils/translations";

interface SkillsSectionProps {
  t: typeof translations.es;
}

export function SkillsSection({ t }: SkillsSectionProps) {
  const skillCategories = [
    {
      category: t.skills.backend,
      icon: "💻",
      color: "text-[#8957e5]",
      bgColor: "bg-[#8957e5]/10",
      borderColor: "border-[#8957e5]/30",
      skills: [
        { name: "PHP", level: 95, color: "bg-[#8957e5]" },
        { name: "Node.js", level: 88, color: "bg-[#3fb950]" },
        { name: "Bases de Datos (MySQL, Postgress, MongoDB)", level: 90, color: "bg-[#1f6feb]" },
      ],
    },
    {
      category: t.skills.frontend,
      icon: "🎨",
      color: "text-[#58a6ff]",
      bgColor: "bg-[#1f6feb]/10",
      borderColor: "border-[#1f6feb]/30",
      skills: [
        { name: "JavaScript", level: 92, color: "bg-[#f1e05a]" },
        { name: "React", level: 90, color: "bg-[#58a6ff]" },
        { name: "HTML/CSS", level: 95, color: "bg-[#ffa657]" },
      ],
    },
    {
      category: t.skills.cms,
      icon: "🔧",
      color: "text-[#3fb950]",
      bgColor: "bg-[#238636]/10",
      borderColor: "border-[#238636]/30",
      skills: [
        { name: "WordPress", level: 93, color: "bg-[#1f6feb]" },
        { name: "Plugin Development", level: 88, color: "bg-[#8957e5]" },
        { name: "AI Integration", level: 80, color: "bg-[#ff7b72]" },
      ],
    },
  ];


  const technologies = [
    "PHP", "WordPress", "JavaScript", "React", "Node.js", "Express",
    "MySQL", "MongoDB", "Postgress SQL", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap",
    "Git", "REST APIs", "jQuery"
  ];


  return (
    <section id="habilidades" className="py-20 px-8 bg-[#0d1117]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-gray-100">
            {t.skills.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.skills.subtitle}
          </p>
        </motion.div>


        {/* Traditional Skills */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="bg-[#161b22] border-[#21262d] hover:border-[#30363d] transition-all h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 ${category.bgColor} border ${category.borderColor} rounded-lg flex items-center justify-center text-xl`}>
                      {category.icon}
                    </div>
                    <CardTitle className={category.color}>{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skillIdx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: skillIdx * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-200 text-sm">{skill.name}</span>
                        <span className="text-gray-400 text-sm">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Technology Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-[#161b22] border-[#21262d]">
            <CardHeader>
              <CardTitle className="text-center text-[#58a6ff]">{t.skills.technologies}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 justify-center">
                {technologies.map((tech, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.02 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <Badge
                      variant="outline"
                      className="px-3 py-1 border-[#21262d] text-gray-400 hover:bg-[#238636] hover:text-white hover:border-[#238636] transition-all cursor-pointer text-xs"
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
