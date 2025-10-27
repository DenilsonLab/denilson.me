import { useState } from "react"
import { Plus, Pencil, Trash2, Loader2, ImagePlus, UploadIcon } from "lucide-react"
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
import type { Project } from "../../types/database.types"

export default function ProjectsAdmin() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    github_url: "",
    demo_url: "",
    tags: [] as string[],
  })
  const [newTag, setNewTag] = useState("")
  const { projects, isLoading, error, createProject, updateProject, deleteProject, uploadImage } = useProjects()

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = await uploadImage(file)
    if (url) {
      setFormData(prev => ({ ...prev, image_url: url }))
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
      title: project.title,
      description: project.description ?? "",
      image_url: project.image_url ?? "",
      github_url: project.github_url ?? "",
      demo_url: project.demo_url ?? "",
      tags: project.tags,
    })
    setIsFormDialogOpen(true)
  }

  const handleDelete = (project: Project) => {
    setSelectedProject(project)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (selectedProject) {
      await deleteProject(selectedProject.id)
      setIsDeleteDialogOpen(false)
    }
  }

  const resetForm = () => {
    setSelectedProject(null)
    setFormData({
      title: "",
      description: "",
      image_url: "",
      github_url: "",
      demo_url: "",
      tags: [],
    })
    setNewTag("")
  }

  const addTag = () => {
    if (!newTag.trim()) return
    
    // Separar por comas y limpiar espacios
    const tagsToAdd = newTag
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag !== "")
    
    // Añadir solo tags únicos que no existan ya
    setFormData(prev => ({
      ...prev,
      tags: [...new Set([...prev.tags, ...tagsToAdd])]
    }))
    setNewTag("")
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }))
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
            resetForm();
            setIsFormDialogOpen(true);
          }}
          className="bg-[#238636] hover:bg-[#2ea043] text-gray-100 border-transparent"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Proyecto
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <Card key={project.id} className="bg-[#161b22] border-[#30363d]">
            <div className="relative aspect-video">
              {project.image_url ? (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-[#0d1117] rounded-t-lg">
                  <ImagePlus className="w-8 h-8 text-gray-600" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-100 mb-2">
                {project.title}
              </h2>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
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
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(project)}
                  className="text-gray-400 hover:text-[#58a6ff] hover:bg-[#58a6ff]/10"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(project)}
                  className="text-gray-400 hover:text-red-500 hover:bg-red-500/10"
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
        <DialogContent className="bg-[#161b22] border-[#30363d] text-gray-100">
          <DialogHeader>
            <DialogTitle>
              {selectedProject ? "Editar Proyecto" : "Nuevo Proyecto"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedProject 
                ? "Modifica los detalles del proyecto según sea necesario."
                : "Completa el formulario para crear un nuevo proyecto."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Título"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="bg-[#0d1117] border-[#30363d]"
              />
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder="Descripción"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="bg-[#0d1117] border-[#30363d]"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="url"
                placeholder="URL de GitHub"
                value={formData.github_url}
                onChange={(e) =>
                  setFormData({ ...formData, github_url: e.target.value })
                }
                className="bg-[#0d1117] border-[#30363d]"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="url"
                placeholder="URL de Demo"
                value={formData.demo_url}
                onChange={(e) =>
                  setFormData({ ...formData, demo_url: e.target.value })
                }
                className="bg-[#0d1117] border-[#30363d]"
              />
            </div>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  aria-label="Adjuntar imagen"
                />
                <div className="w-full h-32 border-2 border-dashed border-[#30363d] rounded-lg flex flex-col items-center justify-center bg-[#0d1117] hover:border-[#58a6ff] transition-colors">
                  {formData.image_url ? (
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

              {formData.image_url && (
                <div className="relative w-full max-w-[240px] mx-auto">
                  <div className="aspect-video">
                    <img
                      src={formData.image_url}
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
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Agregar tags (separados por comas)"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="bg-[#0d1117] border-[#30363d]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <p className="text-xs text-gray-400 mt-1">
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
                    className="px-2 py-1 text-sm rounded-full bg-[#58a6ff]/10 text-[#58a6ff] flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2">
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
            <AlertDialogTitle>¿Eliminar proyecto?</AlertDialogTitle>
            <AlertDialogDescription>
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