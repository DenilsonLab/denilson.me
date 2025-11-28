import { useCallback, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { ContactMessage } from '@/types/database.types'

const MESSAGES_KEY = 'messages'

export function useMessages() {
    const queryClient = useQueryClient()
    const [error, setError] = useState<string | null>(null)

    // Obtener mensajes (solo admin)
    const { data: messages, isLoading } = useQuery({
        queryKey: [MESSAGES_KEY],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            return data as ContactMessage[]
        }
    })

    // Enviar mensaje (público)
    const { mutateAsync: sendMessage } = useMutation({
        mutationFn: async (message: Omit<ContactMessage, 'id' | 'created_at' | 'read'>) => {
            const { data, error } = await supabase
                .from('contact_messages')
                .insert(message)
                .select()
                .single()

            if (error) throw error
            return data
        },
        onError: (error: Error) => {
            setError(error.message)
        }
    })

    // Marcar como leído
    const { mutateAsync: markAsRead } = useMutation({
        mutationFn: async (id: number) => {
            const { data, error } = await supabase
                .from('contact_messages')
                .update({ read: true })
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [MESSAGES_KEY] })
            setError(null)
        },
        onError: (error: Error) => {
            setError(error.message)
        }
    })

    // Eliminar mensaje
    const { mutateAsync: deleteMessage } = useMutation({
        mutationFn: async (id: number) => {
            const { error } = await supabase
                .from('contact_messages')
                .delete()
                .eq('id', id)

            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [MESSAGES_KEY] })
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
        messages,
        isLoading,
        error,
        clearError,
        sendMessage,
        markAsRead,
        deleteMessage
    }
}
