export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: number
          metadata: Json | null
          resource_id: string | null
          resource_type: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: number
          metadata?: Json | null
          resource_id?: string | null
          resource_type: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: number
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      boosts: {
        Row: {
          amount_paid: number
          created_at: string | null
          end_at: string
          id: string
          start_at: string
          status: string | null
          target_id: string | null
          target_type: string | null
          user_id: string | null
        }
        Insert: {
          amount_paid: number
          created_at?: string | null
          end_at: string
          id?: string
          start_at: string
          status?: string | null
          target_id?: string | null
          target_type?: string | null
          user_id?: string | null
        }
        Update: {
          amount_paid?: number
          created_at?: string | null
          end_at?: string
          id?: string
          start_at?: string
          status?: string | null
          target_id?: string | null
          target_type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "boosts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      download_logs: {
        Row: {
          created_at: string | null
          file_key: string
          id: number
          ip: string
          token: string | null
          tx_id: string | null
          ua: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          file_key: string
          id?: number
          ip: string
          token?: string | null
          tx_id?: string | null
          ua: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          file_key?: string
          id?: number
          ip?: string
          token?: string | null
          tx_id?: string | null
          ua?: string
          user_id?: string | null
        }
        Relationships: []
      }
      download_tokens: {
        Row: {
          created_at: string | null
          downloads: number | null
          expires_at: string
          file_key: string
          max_downloads: number | null
          revoked: boolean | null
          token: string
          tx_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          downloads?: number | null
          expires_at: string
          file_key: string
          max_downloads?: number | null
          revoked?: boolean | null
          token: string
          tx_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          downloads?: number | null
          expires_at?: string
          file_key?: string
          max_downloads?: number | null
          revoked?: boolean | null
          token?: string
          tx_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "download_tokens_tx_id_fkey"
            columns: ["tx_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "download_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      kv_store_9eb1163b: {
        Row: {
          key: string
          value: Json
        }
        Insert: {
          key: string
          value: Json
        }
        Update: {
          key?: string
          value?: Json
        }
        Relationships: []
      }
      platform_earnings: {
        Row: {
          amount: number
          created_at: string | null
          id: number
          tx_id: string | null
          type: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: number
          tx_id?: string | null
          type?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: number
          tx_id?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "platform_earnings_tx_id_fkey"
            columns: ["tx_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          file_key: string | null
          id: string
          license: string | null
          metadata: Json | null
          preview_key: string | null
          price: number
          status: string | null
          title: string
          type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          file_key?: string | null
          id?: string
          license?: string | null
          metadata?: Json | null
          preview_key?: string | null
          price: number
          status?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          file_key?: string | null
          id?: string
          license?: string | null
          metadata?: Json | null
          preview_key?: string | null
          price?: number
          status?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ratings: {
        Row: {
          comment: string | null
          created_at: string | null
          id: number
          score: number | null
          status: string | null
          target_id: string
          target_type: string | null
          tx_id: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: number
          score?: number | null
          status?: string | null
          target_id: string
          target_type?: string | null
          tx_id?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: number
          score?: number | null
          status?: string | null
          target_id?: string
          target_type?: string | null
          tx_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ratings_tx_id_fkey"
            columns: ["tx_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          buyer_id: string | null
          commission_amount: number
          contract_url: string | null
          created_at: string | null
          gross_amount: number
          id: string
          net_amount: number
          product_id: string | null
          provider_payload: Json | null
          seller_id: string | null
          status: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          buyer_id?: string | null
          commission_amount: number
          contract_url?: string | null
          created_at?: string | null
          gross_amount: number
          id?: string
          net_amount: number
          product_id?: string | null
          provider_payload?: Json | null
          seller_id?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          buyer_id?: string | null
          commission_amount?: number
          contract_url?: string | null
          created_at?: string | null
          gross_amount?: number
          id?: string
          net_amount?: number
          product_id?: string | null
          provider_payload?: Json | null
          seller_id?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          bio: string | null
          capabilities: Json | null
          created_at: string | null
          deleted_at: string | null
          email: string | null
          id: string
          location: string | null
          name: string
          phone: string | null
          updated_at: string | null
          verified: boolean | null
          wallet_balance: number | null
        }
        Insert: {
          bio?: string | null
          capabilities?: Json | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          id?: string
          location?: string | null
          name: string
          phone?: string | null
          updated_at?: string | null
          verified?: boolean | null
          wallet_balance?: number | null
        }
        Update: {
          bio?: string | null
          capabilities?: Json | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          id?: string
          location?: string | null
          name?: string
          phone?: string | null
          updated_at?: string | null
          verified?: boolean | null
          wallet_balance?: number | null
        }
        Relationships: []
      }
      withdrawals: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          provider_ref: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          provider_ref?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          provider_ref?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "withdrawals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_commission: { Args: { gross_amount: number }; Returns: number }
      calculate_net_amount: { Args: { gross_amount: number }; Returns: number }
      cleanup_expired_tokens: { Args: never; Returns: undefined }
      expire_boosts: { Args: never; Returns: undefined }
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
