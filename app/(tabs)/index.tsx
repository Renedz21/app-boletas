import React from "react";
import { View, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
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

const categories: Category[] = [
  {
    id: "cat-1",
    nombre: "Alimentación",
    es_deducible: false,
    orden: 1,
    activo: true,
    createdAt: new Date("2024-01-01T00:00:00Z"),
  },
  {
    id: "cat-2",
    nombre: "Salud",
    es_deducible: true,
    orden: 2,
    activo: true,
    createdAt: new Date("2024-01-01T00:00:00Z"),
  },
  {
    id: "cat-3",
    nombre: "Transporte",
    es_deducible: false,
    orden: 3,
    activo: true,
    createdAt: new Date("2024-01-01T00:00:00Z"),
  },
];

const userProfile: UserProfile = {
  id: "user-123",
  fullName: "Juan Pérez",
  planType: "premium",
  scansUsed: 45,
  scansLimit: 100,
  subscriptionEndsAt: new Date("2024-12-31T23:59:59Z"),
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
  timestamp: formatTimestamp(boleta.createdAt),
  status: boleta.revisado_manualmente
    ? ("completed" as const)
    : ("pending" as const),
  type: boleta.subcategoria || "Sin categoría",
}));

export default function DashboardScreen() {
  const router = useRouter();

  const quickActions = [
    {
      id: "1",
      label: "Escanear",
      icon: <CameraIcon size={24} color="#3B82F6" />,
      color: "primary" as const,
      onPress: () => router.push("/scanner"),
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

  return (
    <>
      <Header
        title="Dashboard"
        subtitle="Bienvenido de vuelta"
        rightAction={
          <IconButton variant="ghost" size="md">
            <BellIcon size={24} color="#64748B" />
          </IconButton>
        }
      />

      <Container scrollable safe={false}>
        {/* Mensaje de bienvenida */}
        <Card className="mb-4 border-primary-100 bg-primary-50">
          <CardContent className="pt-4">
            <Text variant="h3" className="mb-1">
              Hola, {userProfile.fullName || "Usuario"}!
            </Text>
            <Text variant="body-secondary">
              Plan {userProfile.planType} • {userProfile.scansUsed}/
              {userProfile.scansLimit} escaneos usados
            </Text>
          </CardContent>
        </Card>

        {/* Estadísticas */}
        <StatsGrid columns={2} className="mb-4">
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
            title="Categorías"
            value={categories.filter((cat) => cat.activo).length.toString()}
            subtitle="Activas"
            icon={<FolderIcon size={24} color="#14B8A6" />}
            color="accent"
          />
          <SummaryCard
            title="Deducibles"
            value={recentBoletas
              .filter((boleta) => boleta.es_gasto_deducible)
              .length.toString()}
            subtitle="Gastos deducibles"
            icon={<CalendarIcon size={24} color="#F59E0B" />}
            color="warning"
          />
        </StatsGrid>

        {/* Acciones rápidas */}
        <Card className="mb-4">
          <CardContent className="pt-4">
            <Text variant="h4" className="mb-4">
              Acciones Rápidas
            </Text>
            <QuickActions actions={quickActions} />
          </CardContent>
        </Card>

        {/* Actividad reciente */}
        <RecentActivity
          activities={activities}
          onActivityPress={(activity) => console.log(activity)}
          onViewAllPress={() => router.push("/tickets")}
        />

        {/* Espacio extra al final */}
        <View className="h-4" />
      </Container>
    </>
  );
}
