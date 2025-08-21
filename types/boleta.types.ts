import { Database } from "./database.types";

export type TipoComprobante = "boleta" | "factura" | "nota_credito" | "recibo";
export type Moneda = "PEN" | "USD" | "EUR";
export type MetodoPago =
  | "efectivo"
  | "tarjeta_debito"
  | "tarjeta_credito"
  | "transferencia"
  | "yape"
  | "plin"
  | "otro";

export type BoletaRow = Database["public"]["Tables"]["boletas"]["Row"];
export type BoletaInsert = Database["public"]["Tables"]["boletas"]["Insert"];
export type BoletaUpdate = Database["public"]["Tables"]["boletas"]["Update"];

export interface Boleta
  extends Omit<BoletaRow, "fecha" | "created_at" | "updated_at"> {
  fecha: Date;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface BoletaFilter {
  searchQuery?: string;
  categorias?: string[];
  tipoComprobante?: TipoComprobante[];
  fechaFrom?: Date;
  fechaTo?: Date;
  minTotal?: number;
  maxTotal?: number;
  esDeducible?: boolean;
}

export interface BoletaStats {
  totalAmount: number;
  totalCount: number;
  averageAmount: number;
  totalDeducible: number;
  totalNoDeducible: number;
  categoriaCounts: Record<string, number>;
}
