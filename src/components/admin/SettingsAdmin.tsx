import { useState, useEffect } from "react"
import { Save, Loader2, Github, Linkedin, MessageSquare } from "lucide-react"
import { useSettings } from "../../hooks/useSettings"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { Label } from "../ui/label"
import { toast } from "sonner"

export default function SettingsAdmin() {
    const { settings, isLoading, updateSettings } = useSettings()
    const [formData, setFormData] = useState({
        site_title: "",
        site_description: "",
        contact_email: "",
        social_links: {
            github: "",
            linkedin: "",
            discord: "",
        }
    })
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (settings) {
            setFormData({
                site_title: settings.site_title || "",
                site_description: settings.site_description || "",
                contact_email: settings.contact_email || "",
                social_links: {
                    github: settings.social_links?.github || "",
                    linkedin: settings.social_links?.linkedin || "",
                    discord: settings.social_links?.discord || "",
                }
            })
        }
    }, [settings])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        try {
            await updateSettings(formData)
            toast.success("Configuración guardada correctamente")
        } catch (error) {
            toast.error("Error al guardar la configuración")
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="w-6 h-6 animate-spin text-[#58a6ff]" />
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-100">Configuración del Sitio</h1>
                    <p className="text-sm text-gray-400 mt-1">Gestiona la información de tu portafolio</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card className="bg-[#161b22] border-[#30363d]">
                    <CardHeader>
                        <CardTitle className="text-gray-100">Información General</CardTitle>
                        <CardDescription className="text-gray-400">
                            Detalles básicos de tu portafolio y SEO.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-gray-300">Título del Sitio</Label>
                            <Input
                                value={formData.site_title}
                                onChange={(e) => setFormData({ ...formData, site_title: e.target.value })}
                                className="bg-[#0d1117] border-[#30363d] text-gray-100"
                                placeholder="Mi Portafolio"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-300">Descripción (SEO)</Label>
                            <Textarea
                                value={formData.site_description}
                                onChange={(e) => setFormData({ ...formData, site_description: e.target.value })}
                                className="bg-[#0d1117] border-[#30363d] text-gray-100"
                                placeholder="Desarrollador Full Stack especializado en..."
                                rows={3}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-300">Email de Contacto</Label>
                            <Input
                                type="email"
                                value={formData.contact_email}
                                onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                                className="bg-[#0d1117] border-[#30363d] text-gray-100"
                                placeholder="hello@ejemplo.com"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#161b22] border-[#30363d]">
                    <CardHeader>
                        <CardTitle className="text-gray-100">Redes Sociales</CardTitle>
                        <CardDescription className="text-gray-400">
                            Enlaces a tus perfiles profesionales (GitHub, LinkedIn, Discord).
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-gray-300 flex items-center gap-2">
                                    <Github className="w-4 h-4" />
                                    GitHub URL
                                </Label>
                                <Input
                                    value={formData.social_links.github}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        social_links: { ...formData.social_links, github: e.target.value }
                                    })}
                                    className="bg-[#0d1117] border-[#30363d] text-gray-100"
                                    placeholder="https://github.com/usuario"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-300 flex items-center gap-2">
                                    <Linkedin className="w-4 h-4" />
                                    LinkedIn URL
                                </Label>
                                <Input
                                    value={formData.social_links.linkedin}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        social_links: { ...formData.social_links, linkedin: e.target.value }
                                    })}
                                    className="bg-[#0d1117] border-[#30363d] text-gray-100"
                                    placeholder="https://www.linkedin.com/in/usuario"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-300 flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    Discord URL
                                </Label>
                                <Input
                                    value={formData.social_links.discord}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        social_links: { ...formData.social_links, discord: e.target.value }
                                    })}
                                    className="bg-[#0d1117] border-[#30363d] text-gray-100"
                                    placeholder="https://discord.com/users/ID"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={isSaving}
                        className="bg-[#238636] hover:bg-[#2ea043] text-white border-transparent min-w-[150px]"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Guardar Cambios
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
