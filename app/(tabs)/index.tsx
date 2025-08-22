import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import {
  FileTextIcon,
  CameraIcon,
  FolderIcon,
  TrendingUpIcon,
  UploadIcon,
  CalendarIcon,
  TagIcon,
  DownloadIcon,
  BellIcon,
  Image,
  User,
} from "lucide-react-native";
import { Container } from "@/modules/core/components/ui/container";
import { Header } from "@/modules/core/components/navigation/header";
import { Text } from "@/modules/core/components/ui/text";
import { IconButton } from "@/modules/core/components/ui/icon-button";
import { SummaryCard } from "@/modules/dashboard/components/summary-card";
import { StatsGrid } from "@/modules/dashboard/components/stats-grid";
import { RecentActivity } from "@/modules/dashboard/components/recent-activity";
import { QuickActions } from "@/modules/dashboard/components/quick-actions";
import { Card, CardContent } from "@/modules/core/components/ui/card";
import {
  Boleta,
  TipoComprobante,
  Moneda,
  MetodoPago,
} from "@/types/boleta.types";
import { Category } from "@/types/category.types";
import { UserProfile } from "@/types/user.types";
import { FloatingActionButton } from "@/modules/core/components/ui/floating-action-button";
import { SafeAreaView } from "react-native-safe-area-context";
import { scanBoleta } from "@/modules/services/ai/scan-boleta";

// Dummy data using correct types
const recentBoletas: Boleta[] = [
  {
    id: "1",
    user_id: "user-123",
    ruc: "20123456789",
    razon_social: "Supermercado XYZ S.A.C.",
    fecha: new Date("2024-01-15"),
    total: 156.8,
    tipo_comprobante: "boleta" as TipoComprobante,
    serie: "B001",
    numero: "0001",
    igv: 28.22,
    subtotal: 128.58,
    moneda: "PEN" as Moneda,
    tipo_cambio: null,
    categoria_id: "cat-1",
    subcategoria: "Compras del mes",
    tags: ["supermercado", "alimentación"],
    notas: "Compras semanales",
    es_gasto_deducible: false,
    ubicacion: "Lima, Perú",
    metodo_pago: "tarjeta_debito" as MetodoPago,
    imagen_url: "https://example.com/boleta1.jpg",
    imagen_thumbnail_url: "https://example.com/boleta1-thumb.jpg",
    confianza_ocr: 0.95,
    datos_ocr_raw: { confidence: 0.95, text: "Supermercado XYZ" },
    revisado_manualmente: true,
    createdAt: new Date("2024-01-15T10:30:00Z"),
    updatedAt: new Date("2024-01-15T10:30:00Z"),
  },
  {
    id: "2",
    user_id: "user-123",
    ruc: "20123456790",
    razon_social: "Farmacia ABC S.A.C.",
    fecha: new Date("2024-01-14"),
    total: 89.5,
    tipo_comprobante: "boleta" as TipoComprobante,
    serie: "B001",
    numero: "0002",
    igv: 16.11,
    subtotal: 73.39,
    moneda: "PEN" as Moneda,
    tipo_cambio: null,
    categoria_id: "cat-2",
    subcategoria: "Medicamentos",
    tags: ["farmacia", "salud"],
    notas: "Medicamentos recetados",
    es_gasto_deducible: true,
    ubicacion: "Lima, Perú",
    metodo_pago: "efectivo" as MetodoPago,
    imagen_url: "https://example.com/boleta2.jpg",
    imagen_thumbnail_url: "https://example.com/boleta2-thumb.jpg",
    confianza_ocr: 0.92,
    datos_ocr_raw: { confidence: 0.92, text: "Farmacia ABC" },
    revisado_manualmente: false,
    createdAt: new Date("2024-01-14T15:45:00Z"),
    updatedAt: new Date("2024-01-14T15:45:00Z"),
  },
  {
    id: "3",
    user_id: "user-123",
    ruc: "20123456791",
    razon_social: "Restaurant La Buena Mesa S.A.C.",
    fecha: new Date("2024-01-13"),
    total: 125.0,
    tipo_comprobante: "boleta" as TipoComprobante,
    serie: "B001",
    numero: "0003",
    igv: 22.5,
    subtotal: 102.5,
    moneda: "PEN" as Moneda,
    tipo_cambio: null,
    categoria_id: "cat-3",
    subcategoria: "Alimentación",
    tags: ["restaurant", "comida"],
    notas: "Cena con clientes",
    es_gasto_deducible: true,
    ubicacion: "Lima, Perú",
    metodo_pago: "tarjeta_credito" as MetodoPago,
    imagen_url: "https://example.com/boleta3.jpg",
    imagen_thumbnail_url: "https://example.com/boleta3-thumb.jpg",
    confianza_ocr: 0.88,
    datos_ocr_raw: { confidence: 0.88, text: "Restaurant La Buena Mesa" },
    revisado_manualmente: false,
    createdAt: new Date("2024-01-13T20:15:00Z"),
    updatedAt: new Date("2024-01-13T20:15:00Z"),
  },
];

// Dummy data for categories
const categories: Omit<Category, "createdAt" | "updatedAt">[] = [
  {
    id: "1",
    nombre: "Alimentación",
    es_deducible: false,
    orden: 1,
    activo: true,
  },
  {
    id: "2",
    nombre: "Transporte",
    es_deducible: true,
    orden: 2,
    activo: true,
  },
  {
    id: "3",
    nombre: "Entretenimiento",
    es_deducible: false,
    orden: 3,
    activo: true,
  },
  {
    id: "4",
    nombre: "Salud",
    es_deducible: true,
    orden: 4,
    activo: true,
  },
  {
    id: "5",
    nombre: "Educación",
    es_deducible: true,
    orden: 5,
    activo: true,
  },
  {
    id: "6",
    nombre: "Vivienda",
    es_deducible: true,
    orden: 6,
    activo: true,
  },
  {
    id: "7",
    nombre: "Servicios",
    es_deducible: false,
    orden: 7,
    activo: true,
  },
  {
    id: "8",
    nombre: "Otros",
    es_deducible: false,
    orden: 8,
    activo: true,
  },
];

// Dummy data for user profile
const userProfile: UserProfile = {
  id: "user-1",
  full_name: "Juan Pérez",
  plan_type: "premium",
  scans_used: 45,
  scans_limit: 100,
  subscriptionEndsAt: new Date("2024-12-31"),
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-15"),
  birthDate: new Date("1990-05-15"),
  gender: "Masculino",
  phone_number: "+51 999 123 456",
};

// Helper function to format timestamp
function formatTimestamp(date: Date | null): string {
  if (!date) return "Fecha desconocida";

  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60),
  );

  if (diffInHours < 1) return "Hace menos de 1 hora";
  if (diffInHours < 24) return `Hace ${diffInHours} horas`;
  if (diffInHours < 48) return "Ayer";
  return `Hace ${Math.floor(diffInHours / 24)} días`;
}

// Convert boletas to activities format for RecentActivity component
const activities = recentBoletas.map((boleta) => ({
  id: boleta.id,
  title: `${boleta.tipo_comprobante.toUpperCase()} #${boleta.serie}-${boleta.numero}`,
  description: `${boleta.razon_social} - ${boleta.subcategoria || "Sin categoría"}`,
  timestamp: boleta.createdAt?.toISOString() || new Date().toISOString(),
  status: boleta.revisado_manualmente
    ? ("completed" as const)
    : ("pending" as const),
  type: boleta.tipo_comprobante || "boleta",
}));

export default function DashboardScreen() {
  const router = useRouter();

  const quickActions = [
    {
      id: "1",
      label: "Escanear",
      icon: <CameraIcon size={24} color="#3B82F6" />,
      color: "primary" as const,
      onPress: () => router.push("/"),
    },
    {
      id: "2",
      label: "Subir",
      icon: <UploadIcon size={24} color="#A855F7" />,
      color: "secondary" as const,
      onPress: () => {},
    },
    {
      id: "3",
      label: "Categorías",
      icon: <TagIcon size={24} color="#14B8A6" />,
      color: "accent" as const,
      onPress: () => {},
    },
    {
      id: "4",
      label: "Exportar",
      icon: <DownloadIcon size={24} color="#22C55E" />,
      color: "success" as const,
      onPress: () => {},
    },
  ];

  const handleActivityPress = (activity: any) => {
    // TODO: Navigate to boleta detail view
    console.log("Activity pressed:", activity);
  };

  const handleViewAllActivities = () => {
    // TODO: Navigate to all activities view
    console.log("View all activities");
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-white px-6 ">
        <ScrollView
          className="flex-col gap-6"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View className="">
            <Header
              rightAction={
                <IconButton variant="ghost" size="md">
                  <BellIcon size={24} color="#64748B" />
                </IconButton>
              }
              leftComponent={
                <IconButton variant="ghost" size="md">
                  <User size={24} color="#64748B" />
                </IconButton>
              }
            />
          </View>

          {/* Welcome Message Section */}
          <View className="">
            <Text size="lg" className="mb-2 font-bold" color="primary">
              ¡Hola, {userProfile.full_name || "Usuario"}!
            </Text>
            <Text color="secondary" className="text-base">
              Plan {userProfile.plan_type} • {userProfile.scans_used}/
              {userProfile.scans_limit} escaneos usados
            </Text>
          </View>

          {/* Statistics Section */}
          <View className="">
            <Text size="lg" className="mb-6 font-bold" color="primary">
              Resumen del Mes
            </Text>
            <StatsGrid columns={2}>
              <SummaryCard
                title="Total Boletas"
                value={recentBoletas.length.toString()}
                subtitle="Este mes"
                icon={<FileTextIcon size={24} color="#3B82F6" />}
                trend={{ value: 12, isPositive: true }}
                color="primary"
              />
              <SummaryCard
                title="Gasto Total"
                value={`S/ ${recentBoletas.reduce((sum, boleta) => sum + boleta.total, 0).toFixed(2)}`}
                subtitle="Últimos 30 días"
                icon={<TrendingUpIcon size={24} color="#A855F7" />}
                trend={{ value: 8, isPositive: false }}
                color="secondary"
              />
              <SummaryCard
                title="Categorías Activas"
                value={categories.filter((cat) => cat.activo).length.toString()}
                subtitle="Activas"
                icon={<FolderIcon size={24} color="#14B8A6" />}
                color="accent"
              />
              <SummaryCard
                title="Gastos Deducibles"
                value={recentBoletas
                  .filter((boleta) => boleta.es_gasto_deducible)
                  .length.toString()}
                subtitle="Gastos deducibles"
                icon={<CalendarIcon size={24} color="#F59E0B" />}
                color="warning"
              />
            </StatsGrid>
          </View>

          {/* Quick Actions Section */}
          <View className="">
            <Text size="lg" className="mb-6 font-bold" color="primary">
              Acciones Rápidas
            </Text>
            <QuickActions actions={quickActions} />
          </View>

          <TouchableOpacity onPress={() => scanBoleta()}>
            <Text className="text-blue-500">Scan Boleta</Text>
          </TouchableOpacity>

          {/* Recent Activity Section */}
          <View className="">
            <RecentActivity
              activities={activities}
              onActivityPress={handleActivityPress}
              onViewAllPress={handleViewAllActivities}
            />
          </View>
        </ScrollView>

        {/* Floating Action Button */}
        <View className="absolute bottom-2 right-2">
          <FloatingActionButton
            size="md"
            icon={<CameraIcon size={28} color="#FFFFFF" />}
            onPress={() => router.push("/scanner")}
            position="bottom-right"
          />
        </View>
      </SafeAreaView>
    </>
  );
}
