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

export default function DashboardScreen() {
  const router = useRouter();

  // Datos de ejemplo
  const activities = [
    {
      id: "1",
      title: "Boleta #2024-001",
      description: "Supermercado XYZ - Compras del mes",
      timestamp: "Hace 2 horas",
      status: "completed" as const,
      type: "Compra",
    },
    {
      id: "2",
      title: "Boleta #2024-002",
      description: "Farmacia ABC - Medicamentos",
      timestamp: "Hace 5 horas",
      status: "processing" as const,
      type: "Salud",
    },
    {
      id: "3",
      title: "Boleta #2024-003",
      description: "Restaurant La Buena Mesa",
      timestamp: "Ayer",
      status: "pending" as const,
      type: "Alimentación",
    },
  ];

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
              👋 Hola, Usuario!
            </Text>
            <Text variant="body-secondary">
              Tienes 3 boletas pendientes de revisar hoy.
            </Text>
          </CardContent>
        </Card>

        {/* Estadísticas */}
        <StatsGrid columns={2} className="mb-4">
          <SummaryCard
            title="Total Boletas"
            value="156"
            subtitle="Este mes"
            icon={<FileTextIcon size={24} color="#3B82F6" />}
            trend={{ value: 12, isPositive: true }}
            color="primary"
          />
          <SummaryCard
            title="Gasto Total"
            value="$45,231"
            subtitle="Últimos 30 días"
            icon={<TrendingUpIcon size={24} color="#A855F7" />}
            trend={{ value: 8, isPositive: false }}
            color="secondary"
          />
          <SummaryCard
            title="Categorías"
            value="12"
            subtitle="Activas"
            icon={<FolderIcon size={24} color="#14B8A6" />}
            color="accent"
          />
          <SummaryCard
            title="Este Mes"
            value="23"
            subtitle="Boletas nuevas"
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
