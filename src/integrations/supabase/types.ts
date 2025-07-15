export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      bracelet_products: {
        Row: {
          category: string
          color: string
          created_at: string
          description: string | null
          diamond_cut: string | null
          discount_percentage: number | null
          featured: boolean | null
          gemstone: string | null
          id: string
          image_url: string
          in_stock: boolean | null
          material: string
          name: string
          original_price: number | null
          price: number
          product_type: string
          rating: number | null
          review_count: number | null
          ships_today: boolean | null
          sizes: string[] | null
          stripe_product_id: string
          updated_at: string
        }
        Insert: {
          category: string
          color: string
          created_at?: string
          description?: string | null
          diamond_cut?: string | null
          discount_percentage?: number | null
          featured?: boolean | null
          gemstone?: string | null
          id?: string
          image_url: string
          in_stock?: boolean | null
          material: string
          name: string
          original_price?: number | null
          price: number
          product_type: string
          rating?: number | null
          review_count?: number | null
          ships_today?: boolean | null
          sizes?: string[] | null
          stripe_product_id: string
          updated_at?: string
        }
        Update: {
          category?: string
          color?: string
          created_at?: string
          description?: string | null
          diamond_cut?: string | null
          discount_percentage?: number | null
          featured?: boolean | null
          gemstone?: string | null
          id?: string
          image_url?: string
          in_stock?: boolean | null
          material?: string
          name?: string
          original_price?: number | null
          price?: number
          product_type?: string
          rating?: number | null
          review_count?: number | null
          ships_today?: boolean | null
          sizes?: string[] | null
          stripe_product_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      chain_products: {
        Row: {
          category: string
          color: string
          created_at: string
          description: string | null
          discount_percentage: number | null
          featured: boolean | null
          id: string
          image_url: string
          in_stock: boolean | null
          material: string
          name: string
          original_price: number | null
          price: number
          product_type: string
          rating: number | null
          review_count: number | null
          ships_today: boolean | null
          sizes: string[] | null
          stripe_product_id: string
          updated_at: string
        }
        Insert: {
          category: string
          color: string
          created_at?: string
          description?: string | null
          discount_percentage?: number | null
          featured?: boolean | null
          id?: string
          image_url: string
          in_stock?: boolean | null
          material: string
          name: string
          original_price?: number | null
          price: number
          product_type: string
          rating?: number | null
          review_count?: number | null
          ships_today?: boolean | null
          sizes?: string[] | null
          stripe_product_id: string
          updated_at?: string
        }
        Update: {
          category?: string
          color?: string
          created_at?: string
          description?: string | null
          discount_percentage?: number | null
          featured?: boolean | null
          id?: string
          image_url?: string
          in_stock?: boolean | null
          material?: string
          name?: string
          original_price?: number | null
          price?: number
          product_type?: string
          rating?: number | null
          review_count?: number | null
          ships_today?: boolean | null
          sizes?: string[] | null
          stripe_product_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          customer_details: Json | null
          guest_email: string | null
          id: string
          product_id: string
          selected_size: string | null
          shipping_details: Json | null
          status: string | null
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          customer_details?: Json | null
          guest_email?: string | null
          id?: string
          product_id: string
          selected_size?: string | null
          shipping_details?: Json | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          customer_details?: Json | null
          guest_email?: string | null
          id?: string
          product_id?: string
          selected_size?: string | null
          shipping_details?: Json | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "chain_products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
