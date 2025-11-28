import { useCallback, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Post } from '@/types/database.types'

const POSTS_KEY = 'posts'

export function usePosts() {
    const queryClient = useQueryClient()
    const [error, setError] = useState<string | null>(null)

    // Obtener todos los posts
    const { data: posts, isLoading } = useQuery({
        queryKey: [POSTS_KEY],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            return data as Post[]
        }
    })

    // Obtener un post por slug
    const getPostBySlug = useCallback(async (slug: string) => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('slug', slug)
            .single()

        if (error) throw error
        return data as Post
    }, [])

    // Subir imagen del post
    const { mutateAsync: uploadImage } = useMutation({
        mutationFn: async (file: File) => {
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `posts/${fileName}`

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

    // Crear post
    const { mutateAsync: createPost } = useMutation({
        mutationFn: async (post: Omit<Post, 'id' | 'created_at'>) => {
            const { data, error } = await supabase
                .from('posts')
                .insert(post)
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [POSTS_KEY] })
            setError(null)
        },
        onError: (error: Error) => {
            setError(error.message)
        }
    })

    // Actualizar post
    const { mutateAsync: updatePost } = useMutation({
        mutationFn: async ({ id, ...post }: Partial<Post> & { id: number }) => {
            const { data, error } = await supabase
                .from('posts')
                .update(post)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [POSTS_KEY] })
            setError(null)
        },
        onError: (error: Error) => {
            setError(error.message)
        }
    })

    // Eliminar post
    const { mutateAsync: deletePost } = useMutation({
        mutationFn: async (id: number) => {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', id)

            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [POSTS_KEY] })
            setError(null)
        },
        onError: (error: Error) => {
            setError(error.message)
        }
    })

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
