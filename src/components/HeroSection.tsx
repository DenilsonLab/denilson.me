import { ArrowRight, Star, GitFork, Code2, Sparkles, Rocket, Cpu, Database, Cloud } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { translations } from "../utils/translations";

interface HeroSectionProps {
  t: typeof translations.es;
}

export function HeroSection({ t }: HeroSectionProps) {
  return (
    <section id="inicio" className="min-h-screen flex items-center px-8 py-20 bg-[#0d1117] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-64 h-64 bg-[#238636] rounded-full opacity-5 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#1f6feb] rounded-full opacity-5 blur-3xl"
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-[#1f6feb]/10 text-[#58a6ff] border border-[#1f6feb]/30 hover:bg-[#1f6feb]/20">
                <Sparkles className="w-3 h-3 mr-1" />
                {t.hero.available}
              </Badge>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl text-gray-100"
            >
              {t.hero.title} <span className="text-[#58a6ff]">{t.hero.titleHighlight}</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400"
            >
              {t.hero.description} <span className="text-[#238636]">PHP</span>, <span className="text-[#58a6ff]">WordPress</span>, <span className="text-[#58a6ff]">React</span> y <span className="text-[#238636]">Node.js</span>. {t.hero.descriptionEnd}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button className="bg-[#238636] hover:bg-[#2ea043] text-white border-0 group">
                <Rocket className="w-4 h-4 mr-2" />
                {t.hero.viewProjects}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                className="border-[#21262d] bg-[#161b22] hover:bg-[#21262d] hover:border-[#58a6ff] text-gray-300 hover:text-[#58a6ff]"
              >
                {t.hero.contact}
              </Button>
            </motion.div>

            {/* GitHub-style Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-6 pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors"
              >
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span>50+ {t.hero.stats.projects}</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors"
              >
                <GitFork className="w-5 h-5 text-[#58a6ff]" />
                <span>100+ {t.hero.stats.commits}</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors"
              >
                <Code2 className="w-5 h-5 text-[#238636]" />
                <span>5+ {t.hero.stats.years}</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content - Code Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-[#161b22] border border-[#21262d] rounded-lg overflow-hidden shadow-2xl">
              {/* Card Header */}
              <div className="bg-[#0d1117] border-b border-[#21262d] px-4 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 rounded-full bg-[#ff5f56]"
                  />
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                    className="w-3 h-3 rounded-full bg-[#ffbd2e]"
                  />
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                    className="w-3 h-3 rounded-full bg-[#27c93f]"
                  />
                </div>
                <span className="text-gray-400 ml-2">developer.php</span>
              </div>
              
              {/* Code Content */}
              <div className="p-6 font-mono text-sm space-y-2">
                <div className="flex gap-3">
                  <span className="text-gray-600">1</span>
                  <span className="text-gray-400">{"<?php"}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-gray-600">2</span>
                  <span><span className="text-[#ff7b72]">class</span> <span className="text-[#d2a8ff]">Developer</span> {'{'}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-gray-600">3</span>
                  <span className="ml-4"><span className="text-[#ff7b72]">public</span> <span className="text-[#ffa657]">$name</span> = <span className="text-[#a5d6ff]">"Denilson Arguello"</span>;</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-gray-600">4</span>
                  <span className="ml-4"><span className="text-[#ff7b72]">public</span> <span className="text-[#ffa657]">$skills</span> = [</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-gray-600">5</span>
                  <span className="ml-8"><span className="text-[#a5d6ff]">"PHP"</span>, <span className="text-[#a5d6ff]">"WordPress"</span>,</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-gray-600">6</span>
                  <span className="ml-8"><span className="text-[#a5d6ff]">"JavaScript"</span>, <span className="text-[#a5d6ff]">"React"</span>,</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-gray-600">7</span>
                  <span className="ml-8"><span className="text-[#a5d6ff]">"Node.js"</span>, <span className="text-[#a5d6ff]">"AI"</span></span>
                </div>
                <div className="flex gap-3">
                  <span className="text-gray-600">8</span>
                  <span className="ml-4">];</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-gray-600">9</span>
                  <span className="ml-4"></span>
                </div>
                <div className="flex gap-3">
                  <span className="text-gray-600">10</span>
                  <span className="ml-4"><span className="text-[#ff7b72]">public function</span> <span className="text-[#d2a8ff]">createAwesomeStuff</span>() {'{'}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-gray-600">11</span>
                  <span className="ml-8"><span className="text-[#ff7b72]">return</span> <span className="text-[#a5d6ff]">"🚀 Magic!"</span>;</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-gray-600">12</span>
                  <span className="ml-4">{'}'}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-gray-600">13</span>
                  <span>{'}'}</span>
                </div>
              </div>
            </div>

            {/* Decorative Icons */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-8 -right-8"
            >
              <div className="bg-[#238636] p-4 rounded-lg shadow-lg">
                <Cpu className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-8 -left-8"
            >
              <div className="bg-[#1f6feb] p-4 rounded-lg shadow-lg">
                <Database className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 -right-12"
            >
              <div className="bg-[#58a6ff]/10 p-3 rounded-lg border border-[#58a6ff]/30">
                <Cloud className="w-6 h-6 text-[#58a6ff]" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
