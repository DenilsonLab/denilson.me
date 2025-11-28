-- Add new columns for blog badge system
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS category text DEFAULT 'General',
ADD COLUMN IF NOT EXISTS category_color text DEFAULT 'bg-[#238636]',
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- Update existing posts to have default values if needed (optional, handled by DEFAULT above)
-- UPDATE public.posts SET category = 'General' WHERE category IS NULL;
-- UPDATE public.posts SET category_color = 'bg-[#238636]' WHERE category_color IS NULL;
-- UPDATE public.posts SET tags = '{}' WHERE tags IS NULL;
