import { LayoutDashboard, FolderKanban, FileText, Mail } from "lucide-react"
import { useProjects } from "../../hooks/useProjects"
import { usePosts } from "../../hooks/usePosts"
import { useMessages } from "../../hooks/useMessages"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export default function Dashboard() {
    const { projects } = useProjects()
    const { posts } = usePosts()
    const { messages } = useMessages()

    const stats = [
        {
            title: "Total Proyectos",
            value: projects?.length || 0,
            icon: FolderKanban,
            color: "text-[#58a6ff]",
            bgColor: "bg-[#58a6ff]/10",
        },
        {
            title: "Blog Posts",
            value: posts?.length || 0,
            icon: FileText,
            color: "text-green-500",
            bgColor: "bg-green-500/10",
        },
        {
            title: "Mensajes",
            value: messages?.length || 0,
            icon: Mail,
            color: "text-yellow-500",
            bgColor: "bg-yellow-500/10",
        },
        {
            title: "Mensajes sin leer",
            value: messages?.filter(m => !m.read).length || 0,
            icon: Mail,
            color: "text-red-500",
            bgColor: "bg-red-500/10",
        },
    ]

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="bg-[#161b22] border-[#30363d]">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-full ${stat.bgColor}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-100">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-[#161b22] border-[#30363d]">
                    <CardHeader>
                        <CardTitle className="text-gray-100">Últimos Proyectos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {projects?.slice(0, 5).map((project) => (
                                <div key={project.id} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded bg-[#0d1117] overflow-hidden shrink-0">
                                        {project.image_url && (
                                            <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-100 truncate">{project.title}</p>
                                        <p className="text-xs text-gray-500 truncate">{project.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#161b22] border-[#30363d]">
                    <CardHeader>
                        <CardTitle className="text-gray-100">Últimos Mensajes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {messages?.slice(0, 5).map((message) => (
                                <div key={message.id} className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full shrink-0 ${message.read ? 'bg-gray-600' : 'bg-[#58a6ff]'}`} />
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-100 truncate">{message.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{message.message}</p>
                                    </div>
                                    <span className="text-xs text-gray-500 ml-auto shrink-0">
                                        {new Date(message.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
