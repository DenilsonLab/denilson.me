import { useCallback, useState } from 'react'
import type { Project } from '@/types/database.types'

const defaultProjects: Project[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: 'VisiomixAI PageBuilder',
    tagline: 'Constructor de páginas IA para WordPress',
    description: 'Plugin de WordPress completo que utiliza IA para generar estructuras de bloques Gutenberg y diseños personalizados.',
    image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'WordPress', 'PHP', 'AI'],
    github_url: null,
    demo_url: 'https://visiomix.ai',
    language: 'TypeScript',
    language_color: '#3178c6',
    stars: 12,
    forks: 2,
    views: '1.2k',
    logo: null,
    gradient: 'from-blue-500 to-cyan-500',
    status: 'completed',
    is_ai: true
  },
  {
    id: '2',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: 'NutriApp',
    tagline: 'Plataforma para nutricionistas',
    description: 'Gestor de pacientes, recetas y consultas para profesionales de la nutrición.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
    tags: ['Next.js', 'Tailwind', 'Supabase'],
    github_url: null,
    demo_url: null,
    language: 'TypeScript',
    language_color: '#3178c6',
    stars: 5,
    forks: 0,
    views: '300',
    logo: null,
    gradient: 'from-green-500 to-emerald-500',
    status: 'in_progress',
    is_ai: false
  }
]

export function useProjects() {
  const [projects] = useState<Project[]>(defaultProjects)
  const [isLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadImage = async (file: File) => {
    console.log('Mock upload image', file.name)
    return URL.createObjectURL(file)
  }

  const createProject = async (project: any) => {
    console.log('Mock create project', project)
    return project
  }

  const updateProject = async (project: any) => {
    console.log('Mock update project', project)
    return project
  }

  const deleteProject = async (id: string) => {
    console.log('Mock delete project', id)
  }

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