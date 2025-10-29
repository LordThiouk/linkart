// Types générés automatiquement depuis les migrations (fallback)
// Généré le: 2025-10-29
// ⚠️ Ces types peuvent ne pas être synchronisés avec la base de données distante

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string | null;
          phone: string | null;
          email: string | null;
          name: string;
          bio: string | null;
          location: string | null;
          capabilities: any | null;
          wallet_balance: number | null;
          verified: boolean | null;
          created_at: string | null;
          updated_at: string | null;
          deleted_at: string | null;
        };
        Insert: {
          // Types pour l'insertion (sans les valeurs auto-générées)
        };
        Update: {
          // Types pour la mise à jour (tous les champs optionnels)
        };
      };
      products: {
        Row: {
          id: string | null;
          user_id: string | null;
          title: string;
          type: string | null;
          price: number;
          license: string | null;
          preview_key: string | null;
          file_key: string | null;
          status: string | null;
          metadata: any | null;
          created_at: string | null;
          updated_at: string | null;
          deleted_at: string | null;
        };
        Insert: {
          // Types pour l'insertion (sans les valeurs auto-générées)
        };
        Update: {
          // Types pour la mise à jour (tous les champs optionnels)
        };
      };
      transactions: {
        Row: {
          id: string | null;
          buyer_id: string | null;
          seller_id: string | null;
          product_id: string | null;
          type: string | null;
          gross_amount: number;
          commission_amount: number;
          net_amount: number;
          status: string | null;
          contract_url: string | null;
          provider_payload: any | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          // Types pour l'insertion (sans les valeurs auto-générées)
        };
        Update: {
          // Types pour la mise à jour (tous les champs optionnels)
        };
      };
      boosts: {
        Row: {
          id: string | null;
          user_id: string | null;
          target_type: string | null;
          target_id: string | null;
          start_at: string;
          end_at: string;
          amount_paid: number;
          status: string | null;
          created_at: string | null;
        };
        Insert: {
          // Types pour l'insertion (sans les valeurs auto-générées)
        };
        Update: {
          // Types pour la mise à jour (tous les champs optionnels)
        };
      };
      ratings: {
        Row: {
          id: string | null;
          user_id: string | null;
          target_type: string | null;
          target_id: string;
          score: number | null;
          comment: string | null;
          tx_id: string | null;
          status: string | null;
          created_at: string | null;
        };
        Insert: {
          // Types pour l'insertion (sans les valeurs auto-générées)
        };
        Update: {
          // Types pour la mise à jour (tous les champs optionnels)
        };
      };
      withdrawals: {
        Row: {
          id: string | null;
          user_id: string | null;
          amount: number;
          status: string | null;
          provider_ref: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          // Types pour l'insertion (sans les valeurs auto-générées)
        };
        Update: {
          // Types pour la mise à jour (tous les champs optionnels)
        };
      };
      download_tokens: {
        Row: {
          token: string | null;
          tx_id: string | null;
          user_id: string | null;
          file_key: string;
          expires_at: string;
          max_downloads: number | null;
          downloads: number | null;
          revoked: boolean | null;
          created_at: string | null;
        };
        Insert: {
          // Types pour l'insertion (sans les valeurs auto-générées)
        };
        Update: {
          // Types pour la mise à jour (tous les champs optionnels)
        };
      };
      download_logs: {
        Row: {
          id: string | null;
          token: string | null;
          tx_id: string | null;
          user_id: string | null;
          file_key: string;
          ip: string;
          ua: string;
          created_at: string | null;
        };
        Insert: {
          // Types pour l'insertion (sans les valeurs auto-générées)
        };
        Update: {
          // Types pour la mise à jour (tous les champs optionnels)
        };
      };
      platform_earnings: {
        Row: {
          id: string | null;
          tx_id: string | null;
          type: string | null;
          amount: number;
          created_at: string | null;
        };
        Insert: {
          // Types pour l'insertion (sans les valeurs auto-générées)
        };
        Update: {
          // Types pour la mise à jour (tous les champs optionnels)
        };
      };
      audit_logs: {
        Row: {
          id: string | null;
          user_id: string | null;
          action: string;
          resource_type: string;
          resource_id: string | null;
          metadata: any | null;
          created_at: string | null;
        };
        Insert: {
          // Types pour l'insertion (sans les valeurs auto-générées)
        };
        Update: {
          // Types pour la mise à jour (tous les champs optionnels)
        };
      };
      notifications: {
        Row: {
          id: string | null;
          user_id: string | null;
          title: string;
          message: string;
          type: string | null;
          status: string | null;
          metadata: any | null;
          created_at: string | null;
        };
        Insert: {
          // Types pour l'insertion (sans les valeurs auto-générées)
        };
        Update: {
          // Types pour la mise à jour (tous les champs optionnels)
        };
      };
    };
    Views: {
      // Vues si nécessaire
    };
    Functions: {
      // Fonctions RPC si nécessaire
    };
    Enums: {
      // Enums si nécessaire
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;
