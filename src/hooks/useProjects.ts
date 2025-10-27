import { useCallback, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Project } from '@/types/database.types'

const PROJECTS_KEY = 'projects'

export function useProjects() {
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)

  // Obtener todos los proyectos
  const { data: projects, isLoading } = useQuery({
    queryKey: [PROJECTS_KEY],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as Project[]
    }
  })

  // Subir una imagen
  const { mutateAsync: uploadImage } = useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `projects/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      return publicUrl
    },
    onError: (error: Error) => {
      setError(error.message)
    }
  })

  // Crear un nuevo proyecto
  const { mutateAsync: createProject } = useMutation({
    mutationFn: async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] })
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
    }
  })

  // Actualizar un proyecto
  const { mutateAsync: updateProject } = useMutation({
    mutationFn: async ({ id, ...project }: Partial<Project> & { id: string }) => {
      const { data, error } = await supabase
        .from('projects')
        .update(project)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] })
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
    }
  })

  // Eliminar un proyecto
  const { mutateAsync: deleteProject } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] })
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
    }
  })

  // Limpiar error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    projects,
    isLoading,
    error,
    clearError,
    createProject,
    updateProject,
    deleteProject,
    uploadImage
  }
}