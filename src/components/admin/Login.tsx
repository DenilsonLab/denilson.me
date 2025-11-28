import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card } from "../ui/card"
import { Label } from "../ui/label"
import { AlertCircle, Lock, Mail, Loader2, Shield } from "lucide-react"
import { Alert, AlertDescription } from "../ui/alert"
import { motion } from "framer-motion"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await signIn(email, password)
      navigate("/admin/dashboard")
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus credenciales.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d1117] p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#1f6feb]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#238636]/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-[50vw] max-w-md"
      >
        <Card className="space-y-4 p-6 bg-[#161b22] border-[#30363d] shadow-2xl">
          {/* Header */}
          <div className="text-center space-y-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#1f6feb] to-[#238636] rounded-xl mx-auto"
            >
              <Shield className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-gray-100">Panel Administrativo</h1>
              <p className="mt-1 text-sm text-gray-400">Inicia sesión para continuar</p>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Alert variant="destructive" className="bg-red-500/10 border-red-500/50 text-red-400">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-gray-300 flex items-center gap-1.5 text-sm">
                <Mail className="w-3.5 h-3.5" />
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#0d1117] border-[#30363d] text-gray-100 placeholder:text-gray-500 focus:border-[#58a6ff] focus:ring-[#58a6ff]/20 transition-all h-9 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-gray-300 flex items-center gap-1.5 text-sm">
                <Lock className="w-3.5 h-3.5" />
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#0d1117] border-[#30363d] text-gray-100 placeholder:text-gray-500 focus:border-[#58a6ff] focus:ring-[#58a6ff]/20 transition-all h-9 text-sm"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1f6feb] to-[#238636] hover:from-[#1f6feb]/90 hover:to-[#238636]/90 text-white font-medium py-5 text-sm shadow-lg shadow-[#1f6feb]/20 transition-all mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Iniciando sesión...
                </span>
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="pt-3 border-t border-[#30363d]">
            <p className="text-center text-xs text-gray-500">
              Acceso restringido solo para administradores
            </p>
          </div>
        </Card>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <p className="text-xs text-gray-500">
            ¿Problemas para acceder?{" "}
            <a href="mailto:hello@denilson.me" className="text-[#58a6ff] hover:underline">
              Contacta al soporte
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}