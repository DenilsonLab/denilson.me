import { useState } from "react"
import { Plus, Pencil, Trash2, Loader2, ImagePlus, Star, GitFork, Eye } from "lucide-react"
import { useProjects } from "../../hooks/useProjects"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Card } from "../ui/card"
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
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Switch } from "../ui/switch"
import type { Project } from "../../types/database.types"

const LANGUAGE_COLORS = {
  TypeScript: { value: "bg-[#3178c6]", label: "TypeScript" },
  JavaScript: { value: "bg-[#f1e05a]", label: "JavaScript" },
  Python: { value: "bg-[#3572A5]", label: "Python" },
  Java: { value: "bg-[#b07219]", label: "Java" },
  Go: { value: "bg-[#00ADD8]", label: "Go" },
  Rust: { value: "bg-[#dea584]", label: "Rust" },
  PHP: { value: "bg-[#4F5D95]", label: "PHP" },
  HTML: { value: "bg-[#e34c26]", label: "HTML" },
  CSS: { value: "bg-[#563d7c]", label: "CSS" },
  Vue: { value: "bg-[#41b883]", label: "Vue" },
  React: { value: "bg-[#61dafb]", label: "React" },
  Svelte: { value: "bg-[#ff3e00]", label: "Svelte" },
}

const GRADIENTS = [
  { name: "Blue", value: "from-[#1f6feb]/40 to-[#1f6feb]/10" },
  { name: "Green", value: "from-[#238636]/40 to-[#238636]/10" },
  { name: "Purple", value: "from-[#8957e5]/40 to-[#8957e5]/10" },
  { name: "Orange", value: "from-[#d29922]/40 to-[#d29922]/10" },
  { name: "Red", value: "from-[#da3633]/40 to-[#da3633]/10" },
  { name: "Pink", value: "from-[#db61a2]/40 to-[#db61a2]/10" },
]

export default function ProjectsAdmin() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    github_url: "",
    demo_url: "",
    tags: [] as string[],
    tagline: "",
    language: "",
    language_color: "",
    stars: 0,
    forks: 0,
    views: "",
    logo: "",
    gradient: "",
    status: "Active",
    is_ai: false
  })

  const [newTag, setNewTag] = useState("")
  const { projects, isLoading, error, createProject, updateProject, deleteProject, uploadImage } = useProjects()

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = await uploadImage(file)
    if (url) {
      setFormData(prev => ({ ...prev, image: url }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedProject) {
      await updateProject({ id: selectedProject.id, ...formData })
    } else {
      await createProject(formData)
    }

    setIsFormDialogOpen(false)
    resetForm()
  }

  const handleEdit = (project: Project) => {
    setSelectedProject(project)
    setFormData({
      name: project.name,
      description: project.description ?? "",
      image: project.image ?? "",
      github_url: project.github_url ?? "",
      demo_url: project.demo_url ?? "",
      tags: project.tags || [],
      tagline: project.tagline ?? "",
      language: project.language ?? "",
      language_color: project.language_color ?? "",
      stars: project.stars ?? 0,
      forks: project.forks ?? 0,
      views: project.views ?? "",
      logo: project.logo ?? "",
      gradient: project.gradient ?? "",
      status: project.status ?? "Active",
      is_ai: project.is_ai ?? false
    })
    setIsFormDialogOpen(true)
  }

  const handleDelete = (project: Project) => {
    setSelectedProject(project)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (selectedProject) {
      try {
        await deleteProject(selectedProject.id)
      } catch (error) {
        console.error("Error deleting project:", error)
      } finally {
        setIsDeleteDialogOpen(false)
        setSelectedProject(null)
      }
    }
  }

  const resetForm = () => {
    setSelectedProject(null)
    setFormData({
      name: "",
      description: "",
      image: "",
      github_url: "",
      demo_url: "",
      tags: [],
      tagline: "",
      language: "",
      language_color: "",
      stars: 0,
      forks: 0,
      views: "",
      logo: "",
      gradient: "",
      status: "Active",
      is_ai: false
    })
    setNewTag("")
  }

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({ ...formData, tags: [...formData.tags, newTag] })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
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
        <h1 className="text-2xl font-bold text-gray-100">Proyectos</h1>
        <Button
          onClick={() => {
            resetForm()
            setIsFormDialogOpen(true)
          }}
          className="bg-[#238636] hover:bg-[#2ea043] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Proyecto
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <Card key={project.id} className="bg-[#161b22] border-[#30363d] overflow-hidden flex flex-col">
            <div className="aspect-video w-full relative bg-[#0d1117]">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <ImagePlus className="w-8 h-8" />
                </div>
              )}
              {project.logo && (
                <div className="absolute top-2 right-2 w-8 h-8 bg-[#161b22] rounded-full flex items-center justify-center text-lg border border-[#30363d]">
                  {project.logo}
                </div>
              )}
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-bold text-gray-100 line-clamp-1">
                  {project.name}
                </h2>
                {project.status && (
                  <span className="text-xs px-2 py-1 rounded bg-[#58a6ff]/10 text-[#58a6ff]">
                    {project.status}
                  </span>
                )}
              </div>

              {project.tagline && (
                <p className="text-sm text-gray-500 mb-2">{project.tagline}</p>
              )}

              <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                {project.description}
              </p>

              <div className="flex items-center gap-3 mb-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3" /> {project.stars || 0}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3 h-3" /> {project.forks || 0}
                </span>
                {project.views && (
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {project.views}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-full bg-[#58a6ff]/10 text-[#58a6ff]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 mt-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(project)}
                  className="text-gray-400 hover:text-[#58a6ff] hover:bg-[#58a6ff]/10 flex-1"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(project)}
                  className="text-gray-400 hover:text-red-500 hover:bg-red-500/10 flex-1"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      )}

      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="bg-[#161b22] border-[#30363d] text-gray-100 max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-gray-100">
              {selectedProject ? "Editar Proyecto" : "Nuevo Proyecto"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedProject
                ? "Modifica los detalles del proyecto según sea necesario."
                : "Completa el formulario para crear un nuevo proyecto."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Básica */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-300 border-b border-[#30363d] pb-2">Información Básica</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Nombre del Proyecto *</Label>
                  <Input
                    placeholder="Mi Proyecto Increíble"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="bg-[#0d1117] border-[#30363d] text-gray-100 placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Tagline</Label>
                  <Input
                    placeholder="Una breve descripción"
                    value={formData.tagline}
                    onChange={(e) =>
                      setFormData({ ...formData, tagline: e.target.value })
                    }
                    className="bg-[#0d1117] border-[#30363d] text-gray-100 placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Descripción</Label>
                <Textarea
                  placeholder="Descripción detallada del proyecto..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="bg-[#0d1117] border-[#30363d] text-gray-100 placeholder:text-gray-500"
                  rows={3}
                />
              </div>
            </div>

            {/* Enlaces */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-300 border-b border-[#30363d] pb-2">Enlaces</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">URL de GitHub</Label>
                  <Input
                    type="url"
                    placeholder="https://github.com/usuario/repo"
                    value={formData.github_url}
                    onChange={(e) =>
                      setFormData({ ...formData, github_url: e.target.value })
                    }
                    className="bg-[#0d1117] border-[#30363d] text-gray-100 placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">URL de Demo</Label>
                  <Input
                    type="url"
                    placeholder="https://demo.ejemplo.com"
                    value={formData.demo_url}
                    onChange={(e) =>
                      setFormData({ ...formData, demo_url: e.target.value })
                    }
                    className="bg-[#0d1117] border-[#30363d] text-gray-100 placeholder:text-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Imagen */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-300 border-b border-[#30363d] pb-2">Imagen del Proyecto</h3>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  aria-label="Adjuntar imagen"
                />
                <div className="w-full h-32 border-2 border-dashed border-[#30363d] rounded-lg flex flex-col items-center justify-center bg-[#0d1117] hover:border-[#58a6ff] transition-colors">
                  {formData.image ? (
                    <div className="text-center text-sm text-gray-400">
                      <p>Imagen seleccionada</p>
                      <p className="text-xs">Haz clic para cambiar</p>
                    </div>
                  ) : (
                    <div className="text-center text-sm text-gray-400">
                      <div className="w-10 h-10 rounded-full bg-[#30363d]/50 flex items-center justify-center mx-auto mb-2">
                        <ImagePlus className="w-5 h-5" />
                      </div>
                      <p>Arrastra una imagen o haz clic aquí</p>
                      <p className="text-xs mt-1">PNG, JPG hasta 5MB</p>
                    </div>
                  )}
                </div>
              </div>

              {formData.image && (
                <div className="relative w-full max-w-[240px] mx-auto">
                  <div className="aspect-video">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover rounded bg-[#0d1117]"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1 text-center">
                    Preview de la imagen
                  </p>
                </div>
              )}
            </div>

            {/* Estilo Visual */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-300 border-b border-[#30363d] pb-2">Estilo Visual</h3>

              <div className="space-y-2">
                <Label className="text-gray-300">Lenguaje Principal</Label>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(LANGUAGE_COLORS).map(([lang, data]) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          language: lang,
                          language_color: data.value
                        })
                      }}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${formData.language === lang
                          ? 'border-[#58a6ff] bg-[#58a6ff]/10'
                          : 'border-[#30363d] hover:border-[#58a6ff]/50 bg-[#0d1117]'
                        }`}
                      title={lang}
                    >
                      <div className={`w-8 h-8 rounded-full ${data.value} border-2 border-[#30363d]`} />
                      <span className="text-xs text-gray-300">{lang}</span>
                    </button>
                  ))}
                </div>
                {formData.language && (
                  <p className="text-xs text-gray-500">
                    Seleccionado: {formData.language}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Logo (Emoji)</Label>
                  <Input
                    placeholder="🚀"
                    value={formData.logo}
                    onChange={(e) =>
                      setFormData({ ...formData, logo: e.target.value })
                    }
                    className="bg-[#0d1117] border-[#30363d] text-gray-100 placeholder:text-gray-500 text-2xl text-center"
                    maxLength={2}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Gradiente de Fondo</Label>
                <div className="flex flex-wrap gap-3">
                  {GRADIENTS.map((grad) => (
                    <button
                      key={grad.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, gradient: grad.value })}
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${grad.value} border-2 transition-all relative ${formData.gradient === grad.value
                          ? 'border-[#58a6ff] scale-110 shadow-[0_0_10px_rgba(88,166,255,0.5)]'
                          : 'border-[#30363d] hover:border-[#58a6ff]/50 hover:scale-105'
                        }`}
                      title={grad.name}
                    >
                      {formData.gradient === grad.value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Seleccionado: {GRADIENTS.find(g => g.value === formData.gradient)?.name || 'Ninguno'}
                </p>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-300 border-b border-[#30363d] pb-2">Estadísticas</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Stars</Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.stars}
                    onChange={(e) =>
                      setFormData({ ...formData, stars: parseInt(e.target.value) || 0 })
                    }
                    className="bg-[#0d1117] border-[#30363d] text-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Forks</Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.forks}
                    onChange={(e) =>
                      setFormData({ ...formData, forks: parseInt(e.target.value) || 0 })
                    }
                    className="bg-[#0d1117] border-[#30363d] text-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Views</Label>
                  <Input
                    placeholder="15.2k"
                    value={formData.views}
                    onChange={(e) =>
                      setFormData({ ...formData, views: e.target.value })
                    }
                    className="bg-[#0d1117] border-[#30363d] text-gray-100 placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger className="bg-[#0d1117] border-[#30363d] text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#161b22] border-[#30363d]">
                      <SelectItem value="Featured" className="text-gray-100">Featured</SelectItem>
                      <SelectItem value="Production" className="text-gray-100">Production</SelectItem>
                      <SelectItem value="Active" className="text-gray-100">Active</SelectItem>
                      <SelectItem value="Beta" className="text-gray-100">Beta</SelectItem>
                      <SelectItem value="Stable" className="text-gray-100">Stable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="is_ai"
                  checked={formData.is_ai}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_ai: checked })
                  }
                />
                <Label htmlFor="is_ai" className="text-gray-300">¿Es un proyecto con IA?</Label>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-300 border-b border-[#30363d] pb-2">Tags</h3>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Agregar tags (separados por comas)"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="bg-[#0d1117] border-[#30363d] text-gray-100 placeholder:text-gray-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ejemplo: react, typescript, tailwind
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={addTag}
                  className="bg-[#238636] hover:bg-[#2ea043] text-gray-100 border-transparent"
                >
                  Agregar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-[#58a6ff]/10 text-[#58a6ff] flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-[#30363d]">
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
                disabled={isLoading}
                className="bg-[#238636] hover:bg-[#2ea043] text-gray-100 border-transparent"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : selectedProject ? (
                  "Guardar Cambios"
                ) : (
                  "Crear Proyecto"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog de Confirmación de Eliminación */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#161b22] text-gray-100 border-[#30363d]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-100">¿Eliminar proyecto?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Esta acción no se puede deshacer. El proyecto será eliminado
              permanentemente.
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
    </div>
  )
}