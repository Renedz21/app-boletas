export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      boletas: {
        Row: {
          id: string;
          user_id: string;
          ruc: string;
          razon_social: string;
          fecha: string;
          total: number;
          tipo_comprobante: string;
          serie: string | null;
          numero: string | null;
          igv: number | null;
          subtotal: number;
          moneda: string;
          tipo_cambio: number | null;
          categoria_id: string | null;
          subcategoria: string | null;
          tags: string[] | null;
          notas: string | null;
          es_gasto_deducible: boolean;
          ubicacion: string | null;
          metodo_pago: string | null;
          imagen_url: string | null;
          imagen_thumbnail_url: string | null;
          confianza_ocr: number | null;
          datos_ocr_raw: Json | null;
          revisado_manualmente: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          ruc: string;
          razon_social: string;
          fecha: string;
          total: number;
          tipo_comprobante?: string;
          serie?: string | null;
          numero?: string | null;
          igv?: number | null;
          subtotal: number;
          moneda?: string;
          tipo_cambio?: number | null;
          categoria_id?: string | null;
          subcategoria?: string | null;
          tags?: string[] | null;
          notas?: string | null;
          es_gasto_deducible?: boolean;
          ubicacion?: string | null;
          metodo_pago?: string | null;
          imagen_url?: string | null;
          imagen_thumbnail_url?: string | null;
          confianza_ocr?: number | null;
          datos_ocr_raw?: Json | null;
          revisado_manualmente?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          ruc?: string;
          razon_social?: string;
          fecha?: string;
          total?: number;
          tipo_comprobante?: string;
          serie?: string | null;
          numero?: string | null;
          igv?: number | null;
          subtotal?: number;
          moneda?: string;
          tipo_cambio?: number | null;
          categoria_id?: string | null;
          subcategoria?: string | null;
          tags?: string[] | null;
          notas?: string | null;
          es_gasto_deducible?: boolean;
          ubicacion?: string | null;
          metodo_pago?: string | null;
          imagen_url?: string | null;
          imagen_thumbnail_url?: string | null;
          confianza_ocr?: number | null;
          datos_ocr_raw?: Json | null;
          revisado_manualmente?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      categorias: {
        Row: {
          id: string;
          nombre: string;
          es_deducible: boolean | null;
          orden: number | null;
          activo: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          nombre: string;
          es_deducible?: boolean | null;
          orden?: number | null;
          activo?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          nombre?: string;
          es_deducible?: boolean | null;
          orden?: number | null;
          activo?: boolean | null;
          created_at?: string | null;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          full_name: string | null;
          plan_type: string | null;
          scans_used: number | null;
          scans_limit: number | null;
          subscription_ends_at: string | null;
          created_at: string | null;
          updated_at: string | null;
          phone_number: string | null;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          plan_type?: string | null;
          scans_used?: number | null;
          scans_limit?: number | null;
          subscription_ends_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          phone_number?: string | null;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          plan_type?: string | null;
          scans_used?: number | null;
          scans_limit?: number | null;
          subscription_ends_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          phone_number?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      items_boleta: {
        Row: {
          id: string;
          boleta_id: string;
          codigo: string | null;
          descripcion: string;
          cantidad: number | null;
          unidad: string | null;
          precio_unitario: number;
          subtotal: number;
          igv_item: number | null;
          descuento: number | null;
          codigo_sunat: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          boleta_id: string;
          codigo?: string | null;
          descripcion: string;
          cantidad?: number | null;
          unidad?: string | null;
          precio_unitario: number;
          subtotal: number;
          igv_item?: number | null;
          descuento?: number | null;
          codigo_sunat?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          boleta_id?: string;
          codigo?: string | null;
          descripcion?: string;
          cantidad?: number | null;
          unidad?: string | null;
          precio_unitario?: number;
          subtotal?: number;
          igv_item?: number | null;
          descuento?: number | null;
          codigo_sunat?: string | null;
          created_at?: string | null;
        };
      };
      subscription_history: {
        Row: {
          id: string;
          user_id: string;
          plan_type: string;
          amount: number;
          currency: string;
          payment_provider: string | null;
          payment_id: string | null;
          transaction_id: string | null;
          status: string;
          starts_at: string | null;
          ends_at: string | null;
          metadata: Json | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          plan_type: string;
          amount: number;
          currency?: string;
          payment_provider?: string | null;
          payment_id?: string | null;
          transaction_id?: string | null;
          status?: string;
          starts_at?: string | null;
          ends_at?: string | null;
          metadata?: Json | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          plan_type?: string;
          amount?: number;
          currency?: string;
          payment_provider?: string | null;
          payment_id?: string | null;
          transaction_id?: string | null;
          status?: string;
          starts_at?: string | null;
          ends_at?: string | null;
          metadata?: Json | null;
          created_at?: string | null;
        };
      };
      usage_stats: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          metadata: Json | null;
          ip_address: string | null;
          user_agent: string | null;
          platform: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action: string;
          metadata?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
          platform?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          action?: string;
          metadata?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
          platform?: string | null;
          created_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      tipo_comprobante: "boleta" | "factura" | "nota_credito" | "recibo";
      moneda: "PEN" | "USD" | "EUR";
      metodo_pago:
        | "efectivo"
        | "tarjeta_debito"
        | "tarjeta_credito"
        | "transferencia"
        | "yape"
        | "plin"
        | "otro";
      plan_type: "free" | "premium";
      subscription_plan_type: "premium_monthly" | "premium_yearly";
      subscription_status: "pending" | "completed" | "failed" | "refunded";
      usage_action:
        | "scan"
        | "export"
        | "search"
        | "login"
        | "upgrade"
        | "downgrade";
      payment_provider: "culqi" | "mercadopago" | "stripe" | "otros";
    };
  };
}
