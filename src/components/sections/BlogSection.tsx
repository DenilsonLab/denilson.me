import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { translations } from "../../utils/translations";
import ProfilePicture from '../../assets/profile.png';
import { usePosts } from "../../hooks/usePosts";
import { Link } from "react-router-dom";
import { BlogCard } from "../BlogCard";

interface BlogSectionProps {
  t: typeof translations.es;
}

export function BlogSection({ t }: BlogSectionProps) {
  const { posts } = usePosts();
  const publishedPosts = posts?.filter(post => post.published) || [];

  return (
    <section id="blog" className="py-20 px-8 bg-[#0d1117]">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#161b22] border border-[#21262d] rounded-full px-4 py-2 mb-4">
            <Tag className="w-4 h-4 text-[#58a6ff]" />
            <span className="text-sm text-gray-400">Artículos y Tutoriales</span>
          </div>
          <h2 className="text-gray-100">
            {t.blog.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.blog.subtitle}
          </p>
        </motion.div>

        {publishedPosts.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p>No hay artículos publicados en este momento.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
