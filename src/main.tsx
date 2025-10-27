
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App";
import NotFound from "./components/NotFound";
import Login from "./components/admin/Login";
import AuthGuard from "./components/admin/AuthGuard";
import AdminLayout from "./components/admin/AdminLayout";
import ProjectsAdmin from "./components/admin/ProjectsAdmin";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin/login" element={<Login />} />
          <Route element={<AuthGuard />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<div>Dashboard</div>} />
              <Route path="/admin/projects" element={<ProjectsAdmin />} />
              <Route path="/admin/blog" element={<div>Blog</div>} />
              <Route path="/admin/messages" element={<div>Mensajes</div>} />
              <Route path="/admin/settings" element={<div>Configuración</div>} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);