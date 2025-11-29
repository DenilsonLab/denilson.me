
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { ArrowLeft, Twitter, Linkedin, Link as LinkIcon, Heart } from "lucide-react";
import { Button } from "./ui/button";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet-async";
import type { Post } from "../types/database.types";
import { LayoutWithSidebar } from "./LayoutWithSidebar";
import { calculateReadingTime } from "../utils/readingTime";
import { motion, useScroll, useSpring } from "framer-motion";
import { BlogCard } from "./BlogCard";
import "../styles/blog-markdown.css";

export default function BlogPost() {
    const { slug } = useParams();
    const { getPostBySlug } = usePosts();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
    const [liked, setLiked] = useState(false);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        if (slug) {
            getPostBySlug(slug).then((data) => {
                setPost(data);
                setLoading(false);
            });
        }
    }, [slug, getPostBySlug]);

    // Fetch related posts logic
    const { posts: allPosts } = usePosts();

    useEffect(() => {
        if (post && allPosts) {
            const related = allPosts
                .filter(p => p.id !== post.id)
                .slice(0, 3);
            setRelatedPosts(related);
        }
    }, [post, allPosts]);

    if (loading) {
        return (
            <LayoutWithSidebar>
                <div className="min-h-screen bg-[#0d1117] flex items-center justify-center text-gray-100">
                    <div className="w-8 h-8 border-2 border-[#58a6ff] border-t-transparent rounded-full animate-spin" />
                </div>
            </LayoutWithSidebar>
        );
    }

    if (!post) {
        return (
            <LayoutWithSidebar>
                <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center text-gray-100 gap-4 p-4">
                    <h1 className="text-2xl font-bold">Post no encontrado</h1>
                    <Link to="/blog">
                        <Button variant="outline" className="border-[#30363d] text-gray-400 hover:bg-[#30363d] hover:text-gray-100">
                            Volver al blog
                        </Button>
                    </Link>
                </div>
            </LayoutWithSidebar>
        );
    }

    return (
        <LayoutWithSidebar>
            <article className="min-h-screen bg-[#0d1117] text-gray-100 font-sans selection:bg-[#58a6ff]/30 pb-20 relative overflow-hidden px-4 sm:px-6">
                <Helmet>
                    <title>{post.title} | Denilson Arguello</title>
                    <meta name="description" content={post.excerpt || post.content.substring(0, 150)} />
                </Helmet>

                {/* Scroll Progress Bar */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-[#58a6ff] origin-left z-50"
                    style={{ scaleX }}
                />

                {/* Minimalist Navigation */}
                <nav className="sticky top-0 z-40 bg-[#0d1117]/85 backdrop-blur-md border-b border-[#30363d]">
                    <div className="container mx-auto max-w-[1048px] px-6 lg:px-8 py-3 flex items-center justify-between">
                        <Link to="/blog" className="text-gray-400 hover:text-[#58a6ff] transition-colors flex items-center gap-2 text-sm font-medium group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Blog
                        </Link>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative border-b border-[#30363d] bg-[#0d1117]">
                    {/* Dot Pattern Background */}
                    <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />

                    <div className="max-w-[1048px] mx-auto px-6 lg:px-10 pt-12 md:pt-20 pb-12 relative z-10">

                        {/* Breadcrumb/Category */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6 flex flex-wrap gap-2 text-sm font-semibold"
                        >
                            <Link to="/blog" className="text-[#58a6ff] hover:underline">Blog</Link>
                            <span className="text-gray-500">/</span>
                            <span className="text-[#58a6ff]">{post.category || 'General'}</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl md:text-[56px] md:leading-[1.1] font-bold text-gray-100 mb-8 mt-12 tracking-tight"
                        >
                            {post.title}
                        </motion.h1>

                        {/* Author Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
                        >
                            <div className="flex items-center gap-4 pt-4 pb-2 bg-[#161b22]/50 border border-[#30363d] rounded-xl backdrop-blur-sm">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        
                                        <span className="font-semibold text-gray-100 text-base">Denilson Arguello</span>
                                        <span className="text-xs text-gray-500 bg-[#161b22] px-2 py-0.5 rounded-full border border-[#30363d]">Autor</span>
                                    </div>
                                    <div className="text-gray-400 text-sm flex items-center gap-3 flex-wrap">
                                        <span className="flex items-center gap-1.5">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {new Date(post.created_at).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                        <span className="flex items-center gap-1.5">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {calculateReadingTime(post.content)} min de lectura
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Social Share */}
                            <div className="flex items-center gap-2">
                                <ShareButton icon={<Twitter size={18} />} label="Twitter" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${post.title}&url=${window.location.href}`, '_blank')} />
                                <ShareButton icon={<Linkedin size={18} />} label="LinkedIn" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')} />
                                <ShareButton icon={<LinkIcon size={18} />} label="Copy link" onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }} />
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setLiked(!liked)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${liked ? 'bg-pink-500/10 text-pink-500' : 'text-gray-400 hover:bg-[#21262d] hover:text-pink-500'}`}
                                >
                                    <Heart size={18} fill={liked ? "currentColor" : "none"} />
                                </motion.button>
                            </div >
                        </motion.div >
                    </div >
                </div >

                {/* Hero Image */}
                {post.image_url && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-[1048px] mx-auto px-6 lg:px-10 -mt-8 mb-16 relative z-20"
                    >
                        <div className="relative w-full max-h-[260px] rounded-[32px] overflow-hidden border border-[#30363d] shadow-[0_35px_65px_rgba(2,6,23,0.65)] bg-[#05060a] group">
                            <img
                                src={post.image_url}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105 hero-mask-img"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1117]/30 to-[#0d1117] opacity-90" />
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="absolute inset-x-0 bottom-0 p-6 md:p-10 space-y-3 text-gray-100"
                            >
                                <p className="text-xs uppercase tracking-[0.4em] text-[#58a6ff]/70">Artículo destacado</p>
                                <h2 className="text-2xl md:text-3xl font-semibold leading-snug">{post.title}</h2>
                                {(post.excerpt || post.content) && (
                                    <p className="text-sm md:text-base text-gray-300/80 max-w-3xl">
                                        {post.excerpt || `${post.content.substring(0, 140)}...`}
                                    </p>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* Content Body */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="max-w-[720px] mx-auto p-6 md:p-10 text-lg leading-relaxed text-gray-300 bg-[#060910]/80 rounded-[28px] border border-[#161d2c] shadow-[0_35px_80px_rgba(0,0,0,0.35)]"
                >
                    {post.excerpt && (
                        <p className="mb-10 text-2xl text-gray-400 leading-relaxed font-light border-l-4 border-[#58a6ff] pl-6 py-2">
                            {post.excerpt}
                        </p>
                    )}

                    <div className="blog-markdown pb-12 border-b border-[#30363d]">
                        <ReactMarkdown
                            components={{
                                code({ node, inline, className, children, ...props }: any) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return !inline && match ? (
                                        <div className="code-block">
                                            <div className="code-block__header">
                                                <span className="code-block__language">
                                                    {match[1].toUpperCase()}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="code-block__copy"
                                                    onClick={() => navigator.clipboard.writeText(String(children))}
                                                >
                                                    Copiar
                                                </button>
                                            </div>
                                            <pre className={`${className}`} {...props}>
                                                <code>{children}</code>
                                            </pre>
                                        </div>
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {/* Tags */}
                    <div className="mt-8 mb-6 flex flex-wrap gap-3">
                        {post.tags && post.tags.map((tag, idx) => (
                            <motion.span
                                key={idx}
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(88, 166, 255, 0.2)" }}
                                className="bg-[#161b22] border border-[#30363d] text-[#58a6ff] text-sm font-medium px-4 py-1.5 rounded-full transition-colors cursor-pointer"
                            >
                                #{tag}
                            </motion.span>
                        ))}
                    </div>
                </motion.article>

                {/* Related posts section */}
                <div className="max-w-[1280px] mx-auto px-6 lg:px-10 mt-28 pb-24">
                    <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-gray-100">Lee también</h3>
                        <div className="h-px flex-1 bg-[#30363d]" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-4">
                        {relatedPosts.map((relatedPost, idx) => (
                            <motion.div
                                key={relatedPost.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <BlogCard post={relatedPost} />
                            </motion.div>
                        ))}
                        {relatedPosts.length === 0 && (
                            <p className="text-gray-500 col-span-3 text-center py-10 italic">No se encontraron artículos relacionados.</p>
                        )}
                    </div>
                </div>
            </article >
        </LayoutWithSidebar >
    );
}

const ShareButton: React.FC<{ icon: React.ReactNode; label: string; onClick?: () => void }> = ({ icon, label, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "#21262d", color: "#58a6ff" }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 transition-colors"
        aria-label={label}
    >
        {icon}
    </motion.button>
);

