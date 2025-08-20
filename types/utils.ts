import { Boleta, BoletaRow } from "./boleta.types";
import { Category, CategoryRow } from "./category.types";
import { User, UserRow } from "./user.types";

// Convert Supabase boleta row to app boleta
export function convertBoletaRow(row: BoletaRow): Boleta {
  return {
    ...row,
    fecha: new Date(row.fecha),
    createdAt: row.created_at ? new Date(row.created_at) : null,
    updatedAt: row.updated_at ? new Date(row.updated_at) : null,
  };
}

// Convert app boleta to Supabase insert
export function convertBoletaToInsert(
  boleta: Omit<Boleta, "id" | "createdAt" | "updatedAt">,
): Omit<BoletaRow, "id" | "created_at" | "updated_at"> {
  return {
    user_id: boleta.user_id,
    ruc: boleta.ruc,
    razon_social: boleta.razon_social,
    fecha: boleta.fecha.toISOString().split("T")[0], // Convert to YYYY-MM-DD format
    total: boleta.total,
    tipo_comprobante: boleta.tipo_comprobante,
    serie: boleta.serie,
    numero: boleta.numero,
    igv: boleta.igv,
    subtotal: boleta.subtotal,
    moneda: boleta.moneda,
    tipo_cambio: boleta.tipo_cambio,
    categoria_id: boleta.categoria_id,
    subcategoria: boleta.subcategoria,
    tags: boleta.tags,
    notas: boleta.notas,
    es_gasto_deducible: boleta.es_gasto_deducible,
    ubicacion: boleta.ubicacion,
    metodo_pago: boleta.metodo_pago,
    imagen_url: boleta.imagen_url,
    imagen_thumbnail_url: boleta.imagen_thumbnail_url,
    confianza_ocr: boleta.confianza_ocr,
    datos_ocr_raw: boleta.datos_ocr_raw,
    revisado_manualmente: boleta.revisado_manualmente,
  };
}

// Convert Supabase category row to app category
export function convertCategoryRow(row: CategoryRow): Category {
  return {
    ...row,
    createdAt: row.created_at ? new Date(row.created_at) : null,
  };
}

// Convert Supabase user row to app user
export function convertUserRow(row: UserRow): User {
  return {
    ...row,
    createdAt: row.created_at ? new Date(row.created_at) : null,
    updatedAt: row.updated_at ? new Date(row.updated_at) : null,
  };
}
