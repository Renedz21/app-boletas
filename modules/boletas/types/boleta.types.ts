export type BoletaStatus = "pending" | "processed" | "rejected";

export type BoletaCategory =
  | "alimentacion"
  | "transporte"
  | "salud"
  | "educacion"
  | "entretenimiento"
  | "hogar"
  | "servicios"
  | "compras"
  | "otros";

export interface Boleta {
  id: string;
  title: string;
  merchant: string;
  amount: number;
  date: Date;
  category: BoletaCategory;
  status: BoletaStatus;
  description?: string;
  imageUrl?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryConfig {
  id: BoletaCategory;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface BoletaFilter {
  searchQuery?: string;
  categories?: BoletaCategory[];
  status?: BoletaStatus[];
  dateFrom?: Date;
  dateTo?: Date;
  minAmount?: number;
  maxAmount?: number;
}

export interface BoletaStats {
  totalAmount: number;
  totalCount: number;
  averageAmount: number;
  pendingCount: number;
  processedCount: number;
  rejectedCount: number;
  categoryCounts: Record<BoletaCategory, number>;
}
