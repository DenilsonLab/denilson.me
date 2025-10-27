import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card } from "../ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "../ui/alert"

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
    <div className="flex min-h-screen items-center justify-center bg-[#0d1117] p-4">
      <Card className="w-full max-w-md space-y-6 p-6 bg-[#161b22] border-[#30363d]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-100">Panel Administrativo</h1>
          <p className="mt-2 text-gray-400">Inicia sesión para continuar</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#0d1117] border-[#30363d] text-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#0d1117] border-[#30363d] text-gray-100"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#58a6ff] hover:bg-[#58a6ff]/80"
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>
      </Card>
    </div>
  )
}