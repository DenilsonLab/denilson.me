import { useState, useMemo } from "react"
import { Plus, Pencil, Trash2, Loader2, ImagePlus, Eye, EyeOff, FileText, Calendar, X, ExternalLink } from "lucide-react"
import { usePosts } from "../../hooks/usePosts"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Card } from "../ui/card"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import "../../styles/markdown-editor.css"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog"
import type { Post } from "../../types/database.types"
import { slugify } from "../../utils/slugify"

const PRESET_COLORS = [
    { name: "Blue", value: "bg-[#58a6ff]" },
    { name: "Green", value: "bg-[#238636]" },
    { name: "Orange", value: "bg-[#ffa657]" },
    { name: "Red", value: "bg-[#da3633]" },
    { name: "Purple", value: "bg-[#8957e5]" },
    { name: "Pink", value: "bg-[#db61a2]" },
    { name: "Gray", value: "bg-[#30363d]" },
];

export default function BlogAdmin() {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        slug: "",
        excerpt: "",
        image_url: "",
        published: false,
        category: "",
        category_color: "",
        tags: [] as string[],
    })
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false)
    const [tagInput, setTagInput] = useState("")
    const { posts, isLoading, error, createPost, updatePost, deletePost, uploadImage } = usePosts()

    // SimpleMDE Editor Configuration
    const editorOptions = useMemo(() => ({
        spellChecker: false,
        autosave: {
            enabled: false,
            uniqueId: "blog_post_editor",
        },
        placeholder: "Escribe tu contenido aquí usando Markdown...\n\n# Título\n## Subtítulo\n**Negrita** *Cursiva*\n- Lista\n1. Lista numerada\n[Link](https://ejemplo.com)\n![Imagen](url)",
        status: ['lines', 'words', 'cursor'],
        toolbar: [
            "bold",
            "italic",
            "heading",
            "|",
            "quote",
            "unordered-list",
            "ordered-list",
            "|",
            "link",
            "image",
            "|",
            "code",
            "table",
            "|",
            "preview",
            "side-by-side",
            "fullscreen",
            "|",
            "guide"
        ],
        minHeight: "400px",
        maxHeight: "600px",
    }), [])

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const url = await uploadImage(file)
        if (url) {
            setFormData(prev => ({ ...prev, image_url: url }))
        }
    }

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            const newTag = tagInput.trim()
            if (newTag && !formData.tags.includes(newTag)) {
                setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }))
                setTagInput("")
            }
        } else if (e.key === 'Backspace' && !tagInput && formData.tags.length > 0) {
            setFormData(prev => ({ ...prev, tags: prev.tags.slice(0, -1) }))
        }
    }

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Generar slug si no existe
        const slug = formData.slug || slugify(formData.title)

        if (selectedPost) {
            await updatePost({ id: selectedPost.id, ...formData, slug })
        } else {
            await createPost({ ...formData, slug })
        }

        setIsFormDialogOpen(false)
        resetForm()
    }

    const handleEdit = (post: Post) => {
        setSelectedPost(post)
        setFormData({
            title: post.title,
            content: post.content,
            slug: post.slug,
            excerpt: post.excerpt ?? "",
            image_url: post.image_url ?? "",
            published: post.published,
            category: post.category ?? "",
            category_color: post.category_color ?? "",
            tags: post.tags ?? [],
        })
        setIsSlugManuallyEdited(true) // Al editar, asumimos que el slug ya está definido
        setIsFormDialogOpen(true)
    }

    const handleDelete = (post: Post) => {
        setSelectedPost(post)
        setIsDeleteDialogOpen(true)
    }

    const confirmDelete = async () => {
        if (selectedPost) {
            try {
                await deletePost(selectedPost.id)
            } catch (error) {
                console.error("Error deleting post:", error)
            } finally {
                setIsDeleteDialogOpen(false)
                setSelectedPost(null)
            }
        }
    }

    const resetForm = () => {
        setSelectedPost(null)
        setFormData({
            title: "",
            content: "",
            slug: "",
            excerpt: "",
            image_url: "",
            published: false,
            category: "",
            category_color: "",
            tags: [],
        })
        setIsSlugManuallyEdited(false)
    }

    if (error) {
        return (
            <div className="p-4 text-red-500">
                Error: {error}
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-100">Blog Posts</h1>
                    <p className="text-sm text-gray-400 mt-1">Gestiona los artículos de tu blog</p>
                </div>
                <Button
                    onClick={() => {
                        resetForm();
                        setIsFormDialogOpen(true);
                    }}
                    className="bg-[#238636] hover:bg-[#2ea043] text-gray-100 border-transparent"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Post
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {posts?.map((post) => (
                    <Card key={post.id} className="bg-[#161b22] border-[#30363d] overflow-hidden group hover:border-[#58a6ff]/50 transition-all">
                        <div className="relative aspect-video">
                            {post.image_url ? (
                                <img
                                    src={post.image_url}
                                    alt={post.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full bg-[#0d1117]">
                                    <ImagePlus className="w-8 h-8 text-gray-600" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] to-transparent opacity-60" />
                            <div className="absolute top-2 right-2 z-10">
                                <span className={`px-3 py-1.5 text-xs font-bold rounded-md shadow-lg border ${post.published
                                    ? "bg-[#238636] text-white border-[#3fb950]"
                                    : "bg-[#ffa657] text-[#0d1117] border-[#ffa657]"
                                    }`}>
                                    {post.published ? "Publicado" : "Borrador"}
                                </span>
                            </div>
                        </div>
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-100 mb-2 line-clamp-1 group-hover:text-[#58a6ff] transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                {post.excerpt || post.content.substring(0, 100)}...
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                                <Calendar className="w-3 h-3" />
                                {new Date(post.created_at).toLocaleDateString()}
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEdit(post)}
                                    className="flex-1 text-gray-400 hover:text-[#58a6ff] hover:bg-[#58a6ff]/10"
                                >
                                    <Pencil className="w-4 h-4 mr-2" />
                                    Editar
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    asChild
                                    className="text-gray-400 hover:text-[#238636] hover:bg-[#238636]/10"
                                >
                                    <a
                                        href={`/blog/${post.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Ver post"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(post)}
                                    className="text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {isLoading && (
                <div className="flex justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-[#58a6ff]" />
                </div>
            )}

            <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
                <DialogContent className="bg-[#161b22] border-[#30363d] text-gray-100 w-full max-w-[95vw] h-[90vh] flex flex-col p-0 overflow-hidden">
                    <DialogHeader className="p-6 border-b border-[#30363d] bg-[#0d1117]">
                        <DialogTitle className="text-gray-100 flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            {selectedPost ? "Editar Post" : "Nuevo Post"}
                        </DialogTitle>
                        <DialogDescription className="text-gray-400">
                            {selectedPost
                                ? "Modifica el contenido del post."
                                : "Crea un nuevo artículo para tu blog."}
                        </DialogDescription>
                    </DialogHeader>

                    <form id="blog-post-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto ">
                        <div className="grid-admin-layout p-6 ">

                            {/* Left Column: Content Editor */}
                            <div className="flex flex-col min-h-[500px]">
                                <Label className="text-gray-300 mb-2">Contenido</Label>
                                <div className="flex-1 border border-[#30363d] rounded-lg overflow-hidden bg-[#0d1117]">
                                    <SimpleMDE
                                        value={formData.content}
                                        onChange={(value) => setFormData({ ...formData, content: value })}
                                        options={{
                                            ...editorOptions,
                                            minHeight: "450px",
                                            maxHeight: "1120px"
                                        }}
                                        className="h-full"
                                    />
                                </div>
                            </div>

                            {/* Right Column: Metadata */}
                            <div className="space-y-6">
                                {/* Action Buttons */}
                                <div className="flex justify-end gap-2 pb-4 border-b border-[#30363d]">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsFormDialogOpen(false)}
                                        className="border-[#30363d] text-gray-400 hover:bg-[#30363d] hover:text-gray-100"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        form="blog-post-form"
                                        disabled={isLoading}
                                        className="bg-[#238636] hover:bg-[#2ea043] text-gray-100 border-transparent"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : selectedPost ? (
                                            "Guardar Cambios"
                                        ) : (
                                            "Crear Post"
                                        )}
                                    </Button>
                                </div>

                                {/* Información Básica */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-gray-300 border-b border-[#30363d] pb-2">Información Básica</h3>
                                    <div className="space-y-2">
                                        <Label className="text-gray-300">Título *</Label>
                                        <Input
                                            placeholder="Título del artículo"
                                            value={formData.title}
                                            onChange={(e) => {
                                                const newTitle = e.target.value
                                                setFormData(prev => ({
                                                    ...prev,
                                                    title: newTitle,
                                                    slug: !isSlugManuallyEdited ? slugify(newTitle) : prev.slug
                                                }))
                                            }}
                                            required
                                            className="bg-[#0d1117] border-[#30363d] text-gray-100 placeholder:text-gray-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-gray-300">Slug</Label>
                                        <Input
                                            placeholder="url-amigable"
                                            value={formData.slug}
                                            onChange={(e) => {
                                                setFormData({ ...formData, slug: e.target.value })
                                                setIsSlugManuallyEdited(true)
                                            }}
                                            className="bg-[#0d1117] border-[#30363d] text-gray-100 placeholder:text-gray-500"
                                        />
                                        <p className="text-xs text-gray-500 truncate">
                                            /blog/{formData.slug || slugify(formData.title)}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-gray-300">Extracto</Label>
                                        <Textarea
                                            placeholder="Breve descripción..."
                                            value={formData.excerpt}
                                            onChange={(e) =>
                                                setFormData({ ...formData, excerpt: e.target.value })
                                            }
                                            className="bg-[#0d1117] border-[#30363d] text-gray-100 placeholder:text-gray-500"
                                            rows={3}
                                        />
                                    </div>
                                </div>

                                {/* Estado de Publicación */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-gray-300 border-b border-[#30363d] pb-2">Estado</h3>
                                    <div className={`flex items-center justify-between p-4 rounded-lg border transition-all ${formData.published
                                        ? "bg-green-900/20 border-green-500/50"
                                        : "bg-[#0d1117] border-[#30363d]"
                                        }`}>
                                        <div className="flex items-center gap-3">
                                            {formData.published ? (
                                                <Eye className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <EyeOff className="w-5 h-5 text-gray-500" />
                                            )}
                                            <div>
                                                <Label className={`cursor-pointer ${formData.published ? "text-green-400" : "text-gray-300"}`}>
                                                    {formData.published ? "Publicado" : "Borrador"}
                                                </Label>
                                            </div>
                                        </div>
                                        <Switch
                                            checked={formData.published}
                                            onCheckedChange={(checked) =>
                                                setFormData(prev => ({ ...prev, published: checked }))
                                            }
                                            className="data-[state=checked]:bg-green-600"
                                        />
                                    </div>
                                </div>

                                {/* Imagen de Portada */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-gray-300 border-b border-[#30363d] pb-2">Imagen</h3>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="w-full h-32 border-2 border-dashed border-[#30363d] rounded-lg flex flex-col items-center justify-center bg-[#0d1117] hover:border-[#58a6ff] transition-colors">
                                            {formData.image_url ? (
                                                <div className="text-center text-sm text-gray-400">
                                                    <p>Cambiar imagen</p>
                                                </div>
                                            ) : (
                                                <div className="text-center text-sm text-gray-400">
                                                    <ImagePlus className="w-6 h-6 mx-auto mb-2" />
                                                    <p>Subir imagen</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {formData.image_url && (
                                        <div className="relative w-full">
                                            <div className="aspect-video rounded-lg overflow-hidden border border-[#30363d]">
                                                <img
                                                    src={formData.image_url}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Categoría y Tags */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-gray-300 border-b border-[#30363d] pb-2">Metadatos</h3>
                                    <div className="space-y-3">
                                        <div className="space-y-2">
                                            <Label className="text-gray-300">Categoría</Label>
                                            <Input
                                                placeholder="Ej: Tech"
                                                value={formData.category}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, category: e.target.value })
                                                }
                                                className="bg-[#0d1117] border-[#30363d] text-gray-100 placeholder:text-gray-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-gray-300">Color</Label>
                                            <div className="flex flex-wrap gap-2">
                                                {PRESET_COLORS.map((color) => (
                                                    <button
                                                        key={color.value}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, category_color: color.value })}
                                                        className={`w-6 h-6 rounded-full ${color.value} border-2 transition-all ${formData.category_color === color.value
                                                            ? "border-white scale-110"
                                                            : "border-transparent hover:scale-105"
                                                            }`}
                                                        title={color.name}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-gray-300">Tags</Label>
                                        <div className="flex flex-wrap gap-2 p-2 bg-[#0d1117] border border-[#30363d] rounded-md min-h-[42px]">
                                            {formData.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="flex items-center gap-1 px-2 py-1 text-xs bg-[#238636]/20 text-[#238636] border border-[#238636]/30 rounded-full"
                                                >
                                                    {tag}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeTag(tag)}
                                                        className="hover:text-red-400 transition-colors"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </span>
                                            ))}
                                            <input
                                                type="text"
                                                placeholder={formData.tags.length === 0 ? "Tags..." : ""}
                                                value={tagInput}
                                                onChange={(e) => setTagInput(e.target.value)}
                                                onKeyDown={handleTagKeyDown}
                                                className="flex-1 bg-transparent border-none outline-none text-gray-100 placeholder:text-gray-500 min-w-[60px] text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="bg-[#161b22] text-gray-100 border-[#30363d]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-gray-100">¿Eliminar post?</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                            Esta acción no se puede deshacer. El post será eliminado permanentemente.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setIsDeleteDialogOpen(false)}
                            className="border-[#30363d] text-gray-400 hover:bg-[#30363d] hover:text-gray-100"
                        >
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-500 hover:bg-red-600 text-white border-transparent"
                        >
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div >
    )
}
