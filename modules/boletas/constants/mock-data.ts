import { CategoryConfig } from "@/types/category.types";

// Configuración de categorías con la nueva estructura
export const CATEGORIES_CONFIG: CategoryConfig[] = [
  {
    id: "cat-1",
    nombre: "Alimentación",
    esDeducible: false,
    orden: 1,
    activo: true,
  },
  {
    id: "cat-2",
    nombre: "Salud",
    esDeducible: true,
    orden: 2,
    activo: true,
  },
  {
    id: "cat-3",
    nombre: "Transporte",
    esDeducible: false,
    orden: 3,
    activo: true,
  },
  {
    id: "cat-4",
    nombre: "Combustible",
    esDeducible: false,
    orden: 4,
    activo: true,
  },
  {
    id: "cat-5",
    nombre: "Vestimenta",
    esDeducible: true,
    orden: 5,
    activo: true,
  },
  {
    id: "cat-6",
    nombre: "Educación",
    esDeducible: true,
    orden: 6,
    activo: true,
  },
  {
    id: "cat-7",
    nombre: "Entretenimiento",
    esDeducible: false,
    orden: 7,
    activo: true,
  },
  {
    id: "cat-8",
    nombre: "Hogar",
    esDeducible: false,
    orden: 8,
    activo: true,
  },
  {
    id: "cat-9",
    nombre: "Servicios",
    esDeducible: false,
    orden: 9,
    activo: true,
  },
  {
    id: "cat-10",
    nombre: "Otros",
    esDeducible: false,
    orden: 10,
    activo: true,
  },
];

// Función helper para formatear montos
export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

// Función helper para formatear fechas
export const formatDate = (date: Date): string => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Ayer";
  if (diffDays < 7) return `Hace ${diffDays} días`;

  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
