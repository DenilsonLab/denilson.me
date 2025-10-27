import { useState } from "react"
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Mail,
  Settings,
  LogOut
} from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: FolderKanban, label: "Proyectos", path: "/admin/projects" },
  { icon: FileText, label: "Blog", path: "/admin/blog" },
  { icon: Mail, label: "Mensajes", path: "/admin/messages" },
  { icon: Settings, label: "Configuración", path: "/admin/settings" },
]

export default function AdminLayout() {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await signOut()
      navigate("/admin/login")
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  return (
    <div className="flex h-screen bg-[#0d1117]">
      {/* Sidebar */}
      <aside
        className="w-64 bg-[#161b22] border-r border-[#30363d]"
      >
        <div className="flex h-16 items-center px-4 border-b border-[#30363d]">
          <Link to="/admin/dashboard" className="text-xl font-bold text-gray-100">
            Admin Panel
          </Link>
        </div>

        <nav className="space-y-1 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-[#58a6ff]/10 text-[#58a6ff]"
                  : "text-gray-400 hover:bg-[#30363d] hover:text-gray-100"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
          
          <button
            onClick={handleLogout}
            className="flex w-full items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-400 hover:bg-[#30363d] hover:text-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Cerrar sesión</span>
          </button>
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="h-16 border-b border-[#30363d] bg-[#161b22]">
          <div className="flex h-full items-center px-4">
            <div className="text-gray-100 font-medium">
              {menuItems.find(item => item.path === location.pathname)?.label || 'Admin Panel'}
            </div>
          </div>
        </header>

        {/* Contenido */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}