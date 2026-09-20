import { useCallback, useState } from 'react'
import type { Settings } from '@/types/database.types'

const defaultSettings: Settings = {
    id: 1,
    created_at: new Date().toISOString(),
    site_title: 'Denilson Arguello - Full Stack Developer',
    site_description: 'Portfolio y Blog de Denilson Arguello. Ingeniero de Software Full Stack enfocado en construir experiencias web excepcionales.',
    contact_email: 'contacto@denilson.me',
    social_links: {
        github: 'https://github.com/DenilsonLab',
        linkedin: 'https://www.linkedin.com/in/denilson-arguello/',
        discord: 'https://discord.com/users/711334090246324324',
    }
}

export function useSettings() {
    const [settings] = useState<Settings>(defaultSettings)
    const [isLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    const updateSettings = async (newSettings: Partial<Settings>) => {
        console.log('Update settings (static version)', newSettings)
        return { ...settings, ...newSettings }
    }

    return {
        settings,
        isLoading,
        error,
        clearError,
        updateSettings
    }
}
