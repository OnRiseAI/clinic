export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          role: 'patient' | 'clinic' | 'admin'
          avatar_url: string | null
          google_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          phone?: string | null
          role?: 'patient' | 'clinic' | 'admin'
          avatar_url?: string | null
          google_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          role?: 'patient' | 'clinic' | 'admin'
          avatar_url?: string | null
          google_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      clinics: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          address: string | null
          lat: number | null
          lng: number | null
          phone: string | null
          website: string | null
          email: string | null
          country: string | null
          city: string | null
          languages: string[] | null
          accreditations: string[] | null
          certifications: string[] | null
          year_established: number | null
          pricing: Json | null
          operating_hours: Json | null
          featured: boolean
          claimed: boolean
          claim_token: string | null
          user_id: string | null
          insurance_accepted: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          address?: string | null
          lat?: number | null
          lng?: number | null
          phone?: string | null
          website?: string | null
          email?: string | null
          country?: string | null
          city?: string | null
          languages?: string[] | null
          accreditations?: string[] | null
          certifications?: string[] | null
          year_established?: number | null
          pricing?: Json | null
          operating_hours?: Json | null
          featured?: boolean
          claimed?: boolean
          claim_token?: string | null
          user_id?: string | null
          insurance_accepted?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          address?: string | null
          lat?: number | null
          lng?: number | null
          phone?: string | null
          website?: string | null
          email?: string | null
          country?: string | null
          city?: string | null
          languages?: string[] | null
          accreditations?: string[] | null
          certifications?: string[] | null
          year_established?: number | null
          pricing?: Json | null
          operating_hours?: Json | null
          featured?: boolean
          claimed?: boolean
          claim_token?: string | null
          user_id?: string | null
          insurance_accepted?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      doctors: {
        Row: {
          id: string
          name: string
          title: string | null
          specialisation: string | null
          qualifications: string[] | null
          years_experience: number | null
          languages: string[] | null
          photo_url: string | null
          bio: string | null
          clinic_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          title?: string | null
          specialisation?: string | null
          qualifications?: string[] | null
          years_experience?: number | null
          languages?: string[] | null
          photo_url?: string | null
          bio?: string | null
          clinic_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          title?: string | null
          specialisation?: string | null
          qualifications?: string[] | null
          years_experience?: number | null
          languages?: string[] | null
          photo_url?: string | null
          bio?: string | null
          clinic_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          meta_title: string | null
          meta_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      procedures: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          category_id: string | null
          avg_costs: Json | null
          meta_title: string | null
          meta_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          category_id?: string | null
          avg_costs?: Json | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          category_id?: string | null
          avg_costs?: Json | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      destinations: {
        Row: {
          id: string
          country_name: string
          country_code: string
          slug: string
          description: string | null
          meta_title: string | null
          meta_description: string | null
          hero_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          country_name: string
          country_code: string
          slug: string
          description?: string | null
          meta_title?: string | null
          meta_description?: string | null
          hero_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          country_name?: string
          country_code?: string
          slug?: string
          description?: string | null
          meta_title?: string | null
          meta_description?: string | null
          hero_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      enquiries: {
        Row: {
          id: string
          patient_user_id: string | null
          clinic_id: string
          procedure_interest: string | null
          willing_to_travel: string | null
          preferred_destinations: string[] | null
          budget_range: string | null
          timeline: string | null
          full_name: string
          email: string
          phone: string
          message: string | null
          status: 'submitted' | 'viewed' | 'responded' | 'closed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_user_id?: string | null
          clinic_id: string
          procedure_interest?: string | null
          willing_to_travel?: string | null
          preferred_destinations?: string[] | null
          budget_range?: string | null
          timeline?: string | null
          full_name: string
          email: string
          phone: string
          message?: string | null
          status?: 'submitted' | 'viewed' | 'responded' | 'closed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_user_id?: string | null
          clinic_id?: string
          procedure_interest?: string | null
          willing_to_travel?: string | null
          preferred_destinations?: string[] | null
          budget_range?: string | null
          timeline?: string | null
          full_name?: string
          email?: string
          phone?: string
          message?: string | null
          status?: 'submitted' | 'viewed' | 'responded' | 'closed'
          created_at?: string
          updated_at?: string
        }
      }
      saved_clinics: {
        Row: {
          id: string
          user_id: string
          clinic_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          clinic_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          clinic_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      clinic_procedures: {
        Row: {
          id: string
          clinic_id: string
          procedure_id: string
          price_min: number | null
          price_max: number | null
          currency: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clinic_id: string
          procedure_id: string
          price_min?: number | null
          price_max?: number | null
          currency?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clinic_id?: string
          procedure_id?: string
          price_min?: number | null
          price_max?: number | null
          currency?: string
          created_at?: string
          updated_at?: string
        }
      }
      clinic_categories: {
        Row: {
          id: string
          clinic_id: string
          category_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clinic_id: string
          category_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clinic_id?: string
          category_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      clinic_photos: {
        Row: {
          id: string
          clinic_id: string
          url: string
          alt_text: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clinic_id: string
          url: string
          alt_text?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clinic_id?: string
          url?: string
          alt_text?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      google_reviews: {
        Row: {
          id: string
          clinic_id: string
          rating: number | null
          review_count: number | null
          reviews: Json | null
          last_fetched: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clinic_id: string
          rating?: number | null
          review_count?: number | null
          reviews?: Json | null
          last_fetched?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clinic_id?: string
          rating?: number | null
          review_count?: number | null
          reviews?: Json | null
          last_fetched?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string | null
          excerpt: string | null
          category: string | null
          author: string | null
          featured_image_url: string | null
          published_at: string | null
          meta_title: string | null
          meta_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content?: string | null
          excerpt?: string | null
          category?: string | null
          author?: string | null
          featured_image_url?: string | null
          published_at?: string | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string | null
          excerpt?: string | null
          category?: string | null
          author?: string | null
          featured_image_url?: string | null
          published_at?: string | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'patient' | 'clinic' | 'admin'
      enquiry_status: 'submitted' | 'viewed' | 'responded' | 'closed'
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
