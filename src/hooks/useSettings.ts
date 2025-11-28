import { useCallback, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Settings } from '@/types/database.types'

const SETTINGS_KEY = 'settings'

export function useSettings() {
    const queryClient = useQueryClient()
    const [error, setError] = useState<string | null>(null)

    // Obtener configuración
    const { data: settings, isLoading } = useQuery({
        queryKey: [SETTINGS_KEY],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('settings')
                .select('*')
                .maybeSingle()

            // Si no hay error o el error es que no hay filas, retornamos data (puede ser null)
            if (error && error.code !== 'PGRST116') throw error
            return data as Settings | null
        }
    })

    // Actualizar configuración
    const { mutateAsync: updateSettings } = useMutation({
        mutationFn: async (newSettings: Partial<Settings>) => {
            // Primero verificamos si existe configuración
            const { data: existing } = await supabase
                .from('settings')
                .select('id')
                .maybeSingle()

            let result
            if (existing) {
                result = await supabase
                    .from('settings')
                    .update(newSettings)
                    .eq('id', existing.id)
                    .select()
                    .single()
            } else {
                result = await supabase
                    .from('settings')
                    .insert(newSettings)
                    .select()
                    .single()
            }

            if (result.error) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [SETTINGS_KEY] })
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
        settings,
        isLoading,
        error,
        clearError,
        updateSettings
    }
}
