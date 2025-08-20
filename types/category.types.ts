import { Database } from "./database.types";

export type CategoryRow = Database["public"]["Tables"]["categorias"]["Row"];
export type CategoryInsert =
  Database["public"]["Tables"]["categorias"]["Insert"];
export type CategoryUpdate =
  Database["public"]["Tables"]["categorias"]["Update"];

export interface Category extends Omit<CategoryRow, "created_at"> {
  createdAt: Date | null;
}

export interface CategoryConfig {
  id: string;
  nombre: string;
  esDeducible: boolean;
  orden: number;
  activo: boolean;
}
