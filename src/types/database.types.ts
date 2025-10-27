export interface Project {
  id: string
  created_at: string
  updated_at: string
  title: string
  description: string | null
  image_url: string | null
  tags: string[]
  github_url: string | null
  demo_url: string | null
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
}

export interface ContactMessage {
  id: number
  created_at: string
  name: string
  email: string
  message: string
  read: boolean
}

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: Project
        Insert: Omit<Project, 'id' | 'created_at'>
        Update: Partial<Omit<Project, 'id' | 'created_at'>>
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
    }
  }
}