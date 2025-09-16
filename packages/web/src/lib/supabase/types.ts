export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          clerk_id: string
          email: string
          first_name: string | null
          last_name: string | null
          username: string | null
          image_url: string | null
          bio: string | null
          location: string | null
          website: string | null
          github_username: string | null
          linkedin_url: string | null
          total_points: number
          streak_days: number
          last_activity_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clerk_id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          username?: string | null
          image_url?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          github_username?: string | null
          linkedin_url?: string | null
          total_points?: number
          streak_days?: number
          last_activity_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clerk_id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          username?: string | null
          image_url?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          github_username?: string | null
          linkedin_url?: string | null
          total_points?: number
          streak_days?: number
          last_activity_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      roadmaps: {
        Row: {
          id: string
          title: string
          description: string
          category: 'software-development' | 'ip-networking' | 'other'
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          estimated_hours: number
          tags: string[]
          is_public: boolean
          is_featured: boolean
          image_url: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: 'software-development' | 'ip-networking' | 'other'
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          estimated_hours?: number
          tags?: string[]
          is_public?: boolean
          is_featured?: boolean
          image_url?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: 'software-development' | 'ip-networking' | 'other'
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
          estimated_hours?: number
          tags?: string[]
          is_public?: boolean
          is_featured?: boolean
          image_url?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      roadmap_steps: {
        Row: {
          id: string
          roadmap_id: string
          title: string
          description: string
          content: string | null
          step_order: number
          type: 'reading' | 'video' | 'lab' | 'quiz' | 'project'
          estimated_minutes: number
          prerequisites: string[]
          is_optional: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          roadmap_id: string
          title: string
          description: string
          content?: string | null
          step_order: number
          type: 'reading' | 'video' | 'lab' | 'quiz' | 'project'
          estimated_minutes?: number
          prerequisites?: string[]
          is_optional?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          roadmap_id?: string
          title?: string
          description?: string
          content?: string | null
          step_order?: number
          type?: 'reading' | 'video' | 'lab' | 'quiz' | 'project'
          estimated_minutes?: number
          prerequisites?: string[]
          is_optional?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      resources: {
        Row: {
          id: string
          step_id: string | null
          title: string
          type: 'link' | 'document' | 'video' | 'book'
          url: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          step_id?: string | null
          title: string
          type: 'link' | 'document' | 'video' | 'book'
          url: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          step_id?: string | null
          title?: string
          type?: 'link' | 'document' | 'video' | 'book'
          url?: string
          description?: string | null
          created_at?: string
        }
      }
      labs: {
        Row: {
          id: string
          step_id: string | null
          title: string
          description: string
          type: 'coding' | 'networking' | 'simulation'
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          instructions: string
          initial_code: string | null
          solution_code: string | null
          validation_script: string | null
          hints: string[]
          estimated_minutes: number
          environment: Json
          tags: string[]
          is_public: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          step_id?: string | null
          title: string
          description: string
          type: 'coding' | 'networking' | 'simulation'
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          instructions: string
          initial_code?: string | null
          solution_code?: string | null
          validation_script?: string | null
          hints?: string[]
          estimated_minutes?: number
          environment?: Json
          tags?: string[]
          is_public?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          step_id?: string | null
          title?: string
          description?: string
          type?: 'coding' | 'networking' | 'simulation'
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
          instructions?: string
          initial_code?: string | null
          solution_code?: string | null
          validation_script?: string | null
          hints?: string[]
          estimated_minutes?: number
          environment?: Json
          tags?: string[]
          is_public?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          category: string
          subcategory: string | null
          difficulty: 'easy' | 'medium' | 'hard'
          type: 'multiple-choice' | 'coding' | 'system-design' | 'behavioral'
          title: string
          content: string
          options: string[] | null
          correct_answer: string | null
          explanation: string
          tags: string[]
          companies: string[]
          frequency: number
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category: string
          subcategory?: string | null
          difficulty: 'easy' | 'medium' | 'hard'
          type: 'multiple-choice' | 'coding' | 'system-design' | 'behavioral'
          title: string
          content: string
          options?: string[] | null
          correct_answer?: string | null
          explanation: string
          tags?: string[]
          companies?: string[]
          frequency?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category?: string
          subcategory?: string | null
          difficulty?: 'easy' | 'medium' | 'hard'
          type?: 'multiple-choice' | 'coding' | 'system-design' | 'behavioral'
          title?: string
          content?: string
          options?: string[] | null
          correct_answer?: string | null
          explanation?: string
          tags?: string[]
          companies?: string[]
          frequency?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          roadmap_id: string | null
          step_id: string | null
          lab_id: string | null
          question_id: string | null
          status: 'not-started' | 'in-progress' | 'completed' | 'skipped'
          score: number | null
          time_spent: number
          attempts: number
          notes: string | null
          last_accessed_at: string
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          roadmap_id?: string | null
          step_id?: string | null
          lab_id?: string | null
          question_id?: string | null
          status?: 'not-started' | 'in-progress' | 'completed' | 'skipped'
          score?: number | null
          time_spent?: number
          attempts?: number
          notes?: string | null
          last_accessed_at?: string
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          roadmap_id?: string | null
          step_id?: string | null
          lab_id?: string | null
          question_id?: string | null
          status?: 'not-started' | 'in-progress' | 'completed' | 'skipped'
          score?: number | null
          time_spent?: number
          attempts?: number
          notes?: string | null
          last_accessed_at?: string
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      ai_prompts: {
        Row: {
          id: string
          name: string
          category: string
          template: string
          variables: string[]
          description: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          template: string
          variables?: string[]
          description?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          template?: string
          variables?: string[]
          description?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      trend_analysis: {
        Row: {
          id: string
          skill: string
          category: string
          trend_score: number
          demand_growth: number
          salary_impact: number | null
          job_postings: number
          sources: string[]
          recommendations: string[]
          last_updated: string
          created_at: string
        }
        Insert: {
          id?: string
          skill: string
          category: string
          trend_score: number
          demand_growth: number
          salary_impact?: number | null
          job_postings?: number
          sources?: string[]
          recommendations?: string[]
          last_updated?: string
          created_at?: string
        }
        Update: {
          id?: string
          skill?: string
          category?: string
          trend_score?: number
          demand_growth?: number
          salary_impact?: number | null
          job_postings?: number
          sources?: string[]
          recommendations?: string[]
          last_updated?: string
          created_at?: string
        }
      }
      badges: {
        Row: {
          id: string
          name: string
          description: string
          icon: string
          criteria: string
          points: number
          rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon: string
          criteria: string
          points?: number
          rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string
          criteria?: string
          points?: number
          rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
          created_at?: string
        }
      }
      user_badges: {
        Row: {
          id: string
          user_id: string
          badge_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          badge_id: string
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          badge_id?: string
          earned_at?: string
        }
      }
      leaderboards: {
        Row: {
          id: string
          name: string
          type: 'global' | 'roadmap' | 'monthly' | 'weekly'
          criteria: Json
          entries: Json
          last_updated: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'global' | 'roadmap' | 'monthly' | 'weekly'
          criteria?: Json
          entries?: Json
          last_updated?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'global' | 'roadmap' | 'monthly' | 'weekly'
          criteria?: Json
          entries?: Json
          last_updated?: string
          created_at?: string
        }
      }
      lab_sessions: {
        Row: {
          id: string
          user_id: string
          lab_id: string
          container_id: string | null
          pod_name: string | null
          status: string
          environment: Json
          started_at: string
          stopped_at: string | null
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lab_id: string
          container_id?: string | null
          pod_name?: string | null
          status?: string
          environment?: Json
          started_at?: string
          stopped_at?: string | null
          expires_at: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lab_id?: string
          container_id?: string | null
          pod_name?: string | null
          status?: string
          environment?: Json
          started_at?: string
          stopped_at?: string | null
          expires_at?: string
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          user_id: string
          roadmap_id: string | null
          step_id: string | null
          lab_id: string | null
          parent_id: string | null
          content: string
          is_edited: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          roadmap_id?: string | null
          step_id?: string | null
          lab_id?: string | null
          parent_id?: string | null
          content: string
          is_edited?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          roadmap_id?: string | null
          step_id?: string | null
          lab_id?: string | null
          parent_id?: string | null
          content?: string
          is_edited?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      ratings: {
        Row: {
          id: string
          user_id: string
          roadmap_id: string | null
          lab_id: string | null
          rating: number
          review: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          roadmap_id?: string | null
          lab_id?: string | null
          rating: number
          review?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          roadmap_id?: string | null
          lab_id?: string | null
          rating?: number
          review?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_learning_streak: {
        Args: {
          user_uuid: string
        }
        Returns: number
      }
      calculate_user_points: {
        Args: {
          user_uuid: string
        }
        Returns: number
      }
      cleanup_expired_lab_sessions: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_current_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_roadmap_completion: {
        Args: {
          roadmap_uuid: string
          user_uuid: string
        }
        Returns: number
      }
      get_user_stats: {
        Args: {
          user_uuid: string
        }
        Returns: Json
      }
    }
    Enums: {
      badge_rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
      difficulty_level: 'beginner' | 'intermediate' | 'advanced'
      lab_environment_type: 'docker' | 'kubernetes' | 'browser'
      lab_type: 'coding' | 'networking' | 'simulation'
      leaderboard_type: 'global' | 'roadmap' | 'monthly' | 'weekly'
      progress_status: 'not-started' | 'in-progress' | 'completed' | 'skipped'
      question_difficulty: 'easy' | 'medium' | 'hard'
      question_type: 'multiple-choice' | 'coding' | 'system-design' | 'behavioral'
      resource_type: 'link' | 'document' | 'video' | 'book'
      roadmap_category: 'software-development' | 'ip-networking' | 'other'
      step_type: 'reading' | 'video' | 'lab' | 'quiz' | 'project'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}