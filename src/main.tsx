import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App";
import BlogPost from "./components/BlogPost";
import BlogList from "./components/BlogList";
import NotFound from "./components/NotFound";
import Login from "./components/admin/Login";
import AuthGuard from "./components/admin/AuthGuard";
import AdminLayout from "./components/admin/AdminLayout";
import ProjectsAdmin from "./components/admin/ProjectsAdmin";
import BlogAdmin from "./components/admin/BlogAdmin";
import MessagesAdmin from "./components/admin/MessagesAdmin";
import SettingsAdmin from "./components/admin/SettingsAdmin";
import Dashboard from "./components/admin/Dashboard";
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
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin/login" element={<Login />} />
            <Route element={<AuthGuard />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/projects" element={<ProjectsAdmin />} />
                <Route path="/admin/blog" element={<BlogAdmin />} />
                <Route path="/admin/messages" element={<MessagesAdmin />} />
                <Route path="/admin/settings" element={<SettingsAdmin />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </QueryClientProvider>
);