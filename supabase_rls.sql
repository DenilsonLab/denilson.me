-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Projects Policies
CREATE POLICY "Public projects are viewable by everyone" 
ON projects FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own projects" 
ON projects FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" 
ON projects FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" 
ON projects FOR DELETE 
USING (auth.uid() = user_id);

-- Posts Policies
CREATE POLICY "Published posts are viewable by everyone" 
ON posts FOR SELECT 
USING (published = true);

CREATE POLICY "Admins can view all posts" 
ON posts FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can insert posts" 
ON posts FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update posts" 
ON posts FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete posts" 
ON posts FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Contact Messages Policies
CREATE POLICY "Anyone can send messages" 
ON contact_messages FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view messages" 
ON contact_messages FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update messages (mark as read)" 
ON contact_messages FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete messages" 
ON contact_messages FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Settings Policies
CREATE POLICY "Settings are viewable by everyone" 
ON settings FOR SELECT 
USING (true);

CREATE POLICY "Admins can update settings" 
ON settings FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can insert settings" 
ON settings FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);
