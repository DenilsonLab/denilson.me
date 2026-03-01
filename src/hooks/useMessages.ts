import { useCallback, useState } from 'react'
import type { ContactMessage } from '@/types/database.types'

export function useMessages() {
    const [error, setError] = useState<string | null>(null)
    const [messages] = useState<ContactMessage[]>([])
    const [isLoading] = useState(false)

    // Enviar mensaje (público) de forma simulada
    const sendMessage = async (message: Omit<ContactMessage, 'id' | 'created_at' | 'read'>) => {
        try {
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Mensaje enviado (simulado):', message);
            return {
                id: Date.now(),
                created_at: new Date().toISOString(),
                read: false,
                ...message
            };
        } catch (err: any) {
            setError(err.message)
            throw err
        }
    }

    const markAsRead = async (id: number) => {
        console.log('Marcar como leido', id)
    }

    const deleteMessage = async (id: number) => {
        console.log('Eliminar mensaje', id)
    }

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
