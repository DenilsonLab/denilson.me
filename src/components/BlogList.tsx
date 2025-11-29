import { Link } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { Calendar, Clock, ArrowRight, Search, BookOpen, Tag } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import { LayoutWithSidebar } from "./LayoutWithSidebar";
import { Badge } from "./ui/badge";
import { BlogCard } from "./BlogCard";

export default function BlogList() {
    const { posts } = usePosts();
    const [searchQuery, setSearchQuery] = useState("");

    const publishedPosts = posts?.filter(post => post.published) || [];

    const filteredPosts = publishedPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <LayoutWithSidebar>
            <div className="min-h-screen bg-[#0d1117] text-gray-100 font-sans selection:bg-[#58a6ff]/30">
                <Helmet>
                    <title>Blog | Denilson Arguello</title>
                    <meta name="description" content="Artículos sobre desarrollo web, programación y tecnología" />
                </Helmet>

                <div className="container mx-auto max-w-7xl px-6 md:px-10 py-16 space-y-12">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-6 mb-16 mt-8"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#161b22] border border-[#21262d] rounded-full px-5 py-2.5 pl-4 pr-2 mb-8">
                            <Tag className="w-4 h-4  text-[#58a6ff]" />
                            <span className="text-sm text-gray-400 ">Blog & Tutoriales</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
                            Explora mis artículos
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
                            Descubre guías, tutoriales y opiniones sobre desarrollo web, tecnología y más.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-md mx-auto mt-12 relative">
                            <Input
                                type="text"
                                placeholder="Buscar artículos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-[#161b22] border-[#30363d] text-gray-100 placeholder:text-gray-500 px-4 h-12 rounded-xl focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff] transition-all"
                            />
                        </div>
                    </motion.div>

                    {/* All Posts Grid */}
                    <section>
                        {filteredPosts.length === 0 ? (
                            <div className="text-center py-24 border border-dashed border-[#21262d] rounded-lg bg-[#0d1117]">
                                <BookOpen className="w-14 h-14 text-gray-700 mx-auto mb-5 opacity-50" />
                                <h2 className="text-xl font-medium text-gray-400 mb-2">
                                    {searchQuery ? "No se encontraron resultados" : "No hay publicaciones"}
                                </h2>
                                <p className="text-gray-500">Intenta con otros términos de búsqueda.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPosts.map((post, index) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <BlogCard post={post} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </LayoutWithSidebar>
    );
}
