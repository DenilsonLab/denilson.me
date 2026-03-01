import { useCallback, useState } from 'react'
import type { Post } from '@/types/database.types'

const defaultPosts: Post[] = [
    {
        id: 1,
        created_at: new Date().toISOString(),
        title: 'Introducción a React 19',
        content: 'Explorando las nuevas características de React 19...',
        slug: 'introduccion-a-react-19',
        published: true,
        image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
        excerpt: 'Un resumen completo de lo que trae la nueva versión de React y cómo nos afectará.',
        category: 'Desarrollo Web',
        category_color: '#61dafb',
        tags: ['React', 'Frontend', 'JavaScript']
    },
    {
        id: 2,
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        title: 'El futuro del Full Stack con Next.js',
        content: 'Cómo Server Actions y RSC están cambiando el panorama...',
        slug: 'futuro-full-stack-nextjs',
        published: true,
        image_url: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800',
        excerpt: 'Next.js difumina la línea entre cliente y servidor. ¿Es este el modo definitivo de hacer web?',
        category: 'Arquitectura',
        category_color: '#000000',
        tags: ['Next.js', 'React', 'Full Stack']
    }
]

export function usePosts() {
    const [posts] = useState<Post[]>(defaultPosts)
    const [isLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const getPostBySlug = useCallback(async (slug: string) => {
        const post = defaultPosts.find(p => p.slug === slug)
        if (!post) throw new Error('Post not found')
        return post
    }, [])

    const uploadImage = async (file: File) => {
        console.log('Mock upload image', file.name)
        return URL.createObjectURL(file)
    }

    const createPost = async (post: any) => {
        console.log('Mock create post', post)
        return post
    }

    const updatePost = async (post: any) => {
        console.log('Mock update post', post)
        return post
    }

    const deletePost = async (id: number) => {
        console.log('Mock delete post', id)
    }

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    return {
        posts,
        isLoading,
        error,
        clearError,
        getPostBySlug,
        createPost,
        updatePost,
        deletePost,
        uploadImage
    }
}
