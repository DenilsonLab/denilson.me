import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Tag, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { calculateReadingTime } from "../utils/readingTime";
import type { Post } from "../types/database.types";
import { ImageWithFallback } from "./common/ImageWithFallback";

interface BlogCardProps {
    post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
    const readingTime = calculateReadingTime(post.content);

    const category = post.category || "General";
    const categoryColor = post.category_color || "bg-[#238636]";
    const tags = post.tags || [];

    return (
        <Link to={`/blog/${post.slug}`} className="block h-full">
            <Card
                className="bg-[#161b22] border-[#21262d] overflow-hidden hover:border-[#30363d] transition-all group h-full hover:shadow-lg hover:shadow-[#238636]/10 flex flex-col"
            >
                <div className="aspect-video overflow-hidden bg-[#0d1117] relative">
                    <ImageWithFallback
                        src={post.image_url || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                        <Badge className={`${categoryColor} text-white border-0`}>
                            {category}
                        </Badge>
                    </div>
                    {category === "AI" && (
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

                <CardHeader className="space-y-3 pb-2">
                    <CardTitle className="text-gray-100 group-hover:text-[#58a6ff] transition-colors line-clamp-2 text-lg font-semibold leading-snug">
                        {post.title}
                    </CardTitle>

                    <CardDescription className="text-gray-400 line-clamp-2 text-sm">
                        {post.excerpt || post.content.substring(0, 100)}...
                    </CardDescription>
                </CardHeader>

                <CardContent className="py-4">
                    <div className="flex flex-wrap gap-2">
                        {tags.slice(0, 3).map((tag, idx) => (
                            <Badge
                                key={idx}
                                variant="secondary"
                                className="bg-[#21262d] text-[#58a6ff] hover:bg-[#30363d] border border-[#30363d] transition-colors"
                            >
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                            </Badge>
                        ))}
                        {tags.length > 3 && (
                            <span className="text-xs text-gray-500 self-center">+{tags.length - 3}</span>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t border-[#21262d] pt-4 mt-auto">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{new Date(post.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{readingTime} min</span>
                        </div>
                    </div>

                    <motion.div whileHover={{ x: 5 }}>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#58a6ff] p-0 h-auto font-normal hover:bg-transparent">
                            Leer más
                            <ArrowRight className="w-3.5 h-3.5 ml-2" />
                        </Button>
                    </motion.div>
                </CardFooter>
            </Card>
        </Link>
    );
}
