export interface Project {
  id: string
  created_at: string
  updated_at: string
  name: string
  tagline: string | null
  description: string | null
  image: string | null
  tags: string[]
  github_url: string | null
  demo_url: string | null
  language: string | null
  language_color: string | null
  stars: number
  forks: number
  views: string | null
  logo: string | null
  gradient: string | null
  status: string | null
  is_ai: boolean
}

export interface Post {
  id: number
  created_at: string
  title: string
  content: string
  slug: string
  published: boolean
  image_url?: string
  excerpt?: string
  category?: string
  category_color?: string
  tags?: string[]
}

export interface ContactMessage {
  id: number
  created_at: string
  name: string
  email: string
  message: string
  read: boolean
}

export interface Settings {
  id: number
  created_at: string
  site_title: string
  site_description: string
  contact_email: string
  social_links: {
    github?: string
    linkedin?: string
    discord?: string
  }
}

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: Project
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>
      }
      posts: {
        Row: Post
        Insert: Omit<Post, 'id' | 'created_at'>
        Update: Partial<Omit<Post, 'id' | 'created_at'>>
      }
      contact_messages: {
        Row: ContactMessage
        Insert: Omit<ContactMessage, 'id' | 'created_at' | 'read'>
        Update: Partial<Omit<ContactMessage, 'id' | 'created_at'>>
      }
      settings: {
        Row: Settings
        Insert: Omit<Settings, 'id' | 'created_at'>
        Update: Partial<Omit<Settings, 'id' | 'created_at'>>
      }
    }
  }
}