import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import App from "./App";
import BlogPost from "./components/BlogPost";
import BlogList from "./components/BlogList";
import NotFound from "./components/NotFound";
import ProjectsPage from "./components/ProjectsPage";
import { Toaster } from "./components/ui/sonner";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/proyectos" element={<ProjectsPage />} />
        {/* <Route path="/blog" element={<BlogList />} /> */}
        {/* <Route path="/blog/:slug" element={<BlogPost />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </HelmetProvider>
);
