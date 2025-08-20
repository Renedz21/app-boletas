import { Boleta, CategoryConfig, BoletaCategory } from "../types/boleta.types";

// Configuración de categorías con colores pastel
export const CATEGORIES_CONFIG: Record<BoletaCategory, CategoryConfig> = {
  alimentacion: {
    id: "alimentacion",
    label: "Alimentación",
    icon: "🍽️",
    color: "#F97316", // orange-500
    bgColor: "bg-orange-100",
    borderColor: "border-orange-200",
  },
  transporte: {
    id: "transporte",
    label: "Transporte",
    icon: "🚗",
    color: "#3B82F6", // blue-500
    bgColor: "bg-blue-100",
    borderColor: "border-blue-200",
  },
  salud: {
    id: "salud",
    label: "Salud",
    icon: "💊",
    color: "#EF4444", // red-500
    bgColor: "bg-red-100",
    borderColor: "border-red-200",
  },
  educacion: {
    id: "educacion",
    label: "Educación",
    icon: "📚",
    color: "#8B5CF6", // violet-500
    bgColor: "bg-violet-100",
    borderColor: "border-violet-200",
  },
  entretenimiento: {
    id: "entretenimiento",
    label: "Entretenimiento",
    icon: "🎬",
    color: "#EC4899", // pink-500
    bgColor: "bg-pink-100",
    borderColor: "border-pink-200",
  },
  hogar: {
    id: "hogar",
    label: "Hogar",
    icon: "🏠",
    color: "#10B981", // emerald-500
    bgColor: "bg-emerald-100",
    borderColor: "border-emerald-200",
  },
  servicios: {
    id: "servicios",
    label: "Servicios",
    icon: "⚡",
    color: "#F59E0B", // amber-500
    bgColor: "bg-amber-100",
    borderColor: "border-amber-200",
  },
  compras: {
    id: "compras",
    label: "Compras",
    icon: "🛍️",
    color: "#14B8A6", // teal-500
    bgColor: "bg-teal-100",
    borderColor: "border-teal-200",
  },
  otros: {
    id: "otros",
    label: "Otros",
    icon: "📦",
    color: "#6B7280", // gray-500
    bgColor: "bg-gray-100",
    borderColor: "border-gray-200",
  },
};

// Datos mock de boletas
export const MOCK_BOLETAS: Boleta[] = [
  {
    id: "1",
    title: "Compra mensual",
    merchant: "Supermercado Wong",
    amount: 325.50,
    date: new Date("2024-08-19"),
    category: "alimentacion",
    status: "processed",
    description: "Compras del mes para la casa",
    tags: ["supermercado", "mensual"],
    createdAt: new Date("2024-08-19T10:00:00"),
    updatedAt: new Date("2024-08-19T10:00:00"),
  },
  {
    id: "2",
    title: "Gasolina",
    merchant: "Primax",
    amount: 150.00,
    date: new Date("2024-08-18"),
    category: "transporte",
    status: "processed",
    description: "Tanque lleno",
    tags: ["combustible"],
    createdAt: new Date("2024-08-18T08:30:00"),
    updatedAt: new Date("2024-08-18T08:30:00"),
  },
  {
    id: "3",
    title: "Consulta médica",
    merchant: "Clínica Internacional",
    amount: 180.00,
    date: new Date("2024-08-17"),
    category: "salud",
    status: "pending",
    description: "Consulta general con Dr. García",
    tags: ["médico", "consulta"],
    createdAt: new Date("2024-08-17T14:00:00"),
    updatedAt: new Date("2024-08-17T14:00:00"),
  },
  {
    id: "4",
    title: "Curso online",
    merchant: "Udemy",
    amount: 49.99,
    date: new Date("2024-08-16"),
    category: "educacion",
    status: "processed",
    description: "Curso de React Native avanzado",
    tags: ["curso", "online", "programación"],
    createdAt: new Date("2024-08-16T20:00:00"),
    updatedAt: new Date("2024-08-16T20:00:00"),
  },
  {
    id: "5",
    title: "Netflix",
    merchant: "Netflix",
    amount: 29.90,
    date: new Date("2024-08-15"),
    category: "entretenimiento",
    status: "processed",
    description: "Suscripción mensual",
    tags: ["streaming", "mensual"],
    createdAt: new Date("2024-08-15T00:00:00"),
    updatedAt: new Date("2024-08-15T00:00:00"),
  },
  {
    id: "6",
    title: "Ferretería",
    merchant: "Sodimac",
    amount: 87.30,
    date: new Date("2024-08-14"),
    category: "hogar",
    status: "processed",
    description: "Materiales para reparación",
    tags: ["reparación", "hogar"],
    createdAt: new Date("2024-08-14T11:00:00"),
    updatedAt: new Date("2024-08-14T11:00:00"),
  },
  {
    id: "7",
    title: "Internet y Cable",
    merchant: "Movistar",
    amount: 159.00,
    date: new Date("2024-08-13"),
    category: "servicios",
    status: "pending",
    description: "Factura mensual de servicios",
    tags: ["mensual", "telecomunicaciones"],
    createdAt: new Date("2024-08-13T09:00:00"),
    updatedAt: new Date("2024-08-13T09:00:00"),
  },
  {
    id: "8",
    title: "Ropa deportiva",
    merchant: "Adidas Store",
    amount: 225.00,
    date: new Date("2024-08-12"),
    category: "compras",
    status: "processed",
    description: "Zapatillas y ropa para gym",
    tags: ["ropa", "deporte"],
    createdAt: new Date("2024-08-12T16:00:00"),
    updatedAt: new Date("2024-08-12T16:00:00"),
  },
  {
    id: "9",
    title: "Almuerzo ejecutivo",
    merchant: "Restaurant Central",
    amount: 65.00,
    date: new Date("2024-08-11"),
    category: "alimentacion",
    status: "rejected",
    description: "Almuerzo de negocios",
    tags: ["restaurant", "negocios"],
    createdAt: new Date("2024-08-11T13:00:00"),
    updatedAt: new Date("2024-08-11T13:00:00"),
  },
  {
    id: "10",
    title: "Uber",
    merchant: "Uber",
    amount: 18.50,
    date: new Date("2024-08-10"),
    category: "transporte",
    status: "processed",
    description: "Viaje al aeropuerto",
    tags: ["taxi", "aeropuerto"],
    createdAt: new Date("2024-08-10T05:00:00"),
    updatedAt: new Date("2024-08-10T05:00:00"),
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

// Función helper para obtener el color del estado
export const getStatusConfig = (status: Boleta["status"]) => {
  switch (status) {
    case "processed":
      return {
        label: "Procesado",
        color: "#22C55E", // green-500
        bgColor: "bg-green-100",
        borderColor: "border-green-200",
        icon: "✅",
      };
    case "pending":
      return {
        label: "Pendiente",
        color: "#F59E0B", // amber-500
        bgColor: "bg-amber-100",
        borderColor: "border-amber-200",
        icon: "⏳",
      };
    case "rejected":
      return {
        label: "Rechazado",
        color: "#EF4444", // red-500
        bgColor: "bg-red-100",
        borderColor: "border-red-200",
        icon: "❌",
      };
  }
};
