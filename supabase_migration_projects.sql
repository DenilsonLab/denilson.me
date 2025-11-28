-- IMPORTANTE: Ejecuta este script en tu consola SQL de Supabase
-- Este script agrega los campos adicionales a la tabla projects

-- Agregar nuevas columnas a la tabla projects
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS tagline TEXT,
ADD COLUMN IF NOT EXISTS language TEXT,
ADD COLUMN IF NOT EXISTS language_color TEXT,
ADD COLUMN IF NOT EXISTS stars INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS forks INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS views TEXT,
ADD COLUMN IF NOT EXISTS logo TEXT,
ADD COLUMN IF NOT EXISTS gradient TEXT,
ADD COLUMN IF NOT EXISTS status TEXT,
ADD COLUMN IF NOT EXISTS is_ai BOOLEAN DEFAULT false;

-- Renombrar title a name para consistencia
ALTER TABLE projects RENAME COLUMN title TO name;

-- Renombrar image_url a image para consistencia  
ALTER TABLE projects RENAME COLUMN image_url TO image;
