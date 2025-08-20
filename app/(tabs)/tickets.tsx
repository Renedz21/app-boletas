import React, { useState, useMemo, useCallback } from "react";
import { View, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Header } from "@/modules/core/components/navigation/header";
import { Container } from "@/modules/core/components/ui/container";
import { FloatingActionButton } from "@/modules/core/components/ui/floating-action-button";
import { BoletasHeader } from "@/modules/boletas/components/boletas-header";
import { BoletasFilter } from "@/modules/boletas/components/boletas-filter";
import { BoletasStats } from "@/modules/boletas/components/boletas-stats";
import { BoletasList } from "@/modules/boletas/components/boletas-list";
import {
  Boleta,
  BoletaCategory,
  BoletaStatus,
} from "@/modules/boletas/types/boleta.types";
import { MOCK_BOLETAS } from "@/modules/boletas/constants/mock-data";

export default function TicketsScreen() {
  const router = useRouter();

  // Estados
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<
    BoletaCategory[]
  >([]);
  const [selectedStatus, setSelectedStatus] = useState<BoletaStatus[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [boletas] = useState<Boleta[]>(MOCK_BOLETAS);

  // Filtrar boletas
  const filteredBoletas = useMemo(() => {
    let filtered = [...boletas];

    // Filtro por búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (boleta) =>
          boleta.title.toLowerCase().includes(query) ||
          boleta.merchant.toLowerCase().includes(query) ||
          boleta.description?.toLowerCase().includes(query),
      );
    }

    // Filtro por categorías
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((boleta) =>
        selectedCategories.includes(boleta.category),
      );
    }

    // Filtro por estado
    if (selectedStatus.length > 0) {
      filtered = filtered.filter((boleta) =>
        selectedStatus.includes(boleta.status),
      );
    }

    return filtered;
  }, [boletas, searchQuery, selectedCategories, selectedStatus]);

  // Calcular estadísticas
  const stats = useMemo(() => {
    const totalAmount = filteredBoletas.reduce((sum, b) => sum + b.amount, 0);
    const totalCount = filteredBoletas.length;
    const averageAmount = totalCount > 0 ? totalAmount / totalCount : 0;
    const monthlyCount = filteredBoletas.filter((b) => {
      const now = new Date();
      const boletaDate = new Date(b.date);
      return (
        boletaDate.getMonth() === now.getMonth() &&
        boletaDate.getFullYear() === now.getFullYear()
      );
    }).length;

    return {
      totalAmount,
      totalCount,
      averageAmount,
      monthlyCount,
      trends: {
        amount: { value: 12, isPositive: true },
        count: { value: 8, isPositive: false },
      },
    };
  }, [filteredBoletas]);

  // Contar filtros activos
  const activeFiltersCount =
    selectedCategories.length + selectedStatus.length + (searchQuery ? 1 : 0);

  // Handlers
  const handleCategoryToggle = useCallback((category: BoletaCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  }, []);

  const handleStatusToggle = useCallback((status: BoletaStatus) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedStatus([]);
  }, []);

  const handleBoletaPress = useCallback((boleta: Boleta) => {
    // Navegar a detalle de boleta
    Alert.alert("Boleta", `Ver detalles de: ${boleta.title}`);
  }, []);

  const handleBoletaMenuPress = useCallback((boleta: Boleta) => {
    Alert.alert("Opciones", "¿Qué deseas hacer?", [
      { text: "Editar", onPress: () => {} },
      { text: "Eliminar", onPress: () => {}, style: "destructive" },
      { text: "Cancelar", style: "cancel" },
    ]);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Simular recarga de datos
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleAddPress = useCallback(() => {
    // Navegar a pantalla de agregar boleta
    router.push("/scanner");
  }, [router]);

  return (
    <>
      <Header title="Mis Boletas" subtitle="Gestiona tus comprobantes" />

      <View className="flex-1 bg-gray-50">
        {/* Header con búsqueda y filtros */}
        <BoletasHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFilterPress={() => setShowFilters(!showFilters)}
          totalCount={boletas.length}
          filteredCount={filteredBoletas.length}
          activeFiltersCount={activeFiltersCount}
        />

        {/* Filtros expandibles */}
        {showFilters && (
          <BoletasFilter
            selectedCategories={selectedCategories}
            selectedStatus={selectedStatus}
            onCategoryToggle={handleCategoryToggle}
            onStatusToggle={handleStatusToggle}
            onClearFilters={handleClearFilters}
            showAdvancedFilters={showAdvancedFilters}
            onToggleAdvancedFilters={() =>
              setShowAdvancedFilters(!showAdvancedFilters)
            }
            activeFiltersCount={activeFiltersCount}
          />
        )}

        {/* Estadísticas */}
        <BoletasStats stats={stats} />

        {/* Lista de boletas */}
        <View className="flex-1">
          <BoletasList
            boletas={filteredBoletas}
            onBoletaPress={handleBoletaPress}
            onBoletaMenuPress={handleBoletaMenuPress}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            emptyStateProps={{
              onAddPress: handleAddPress,
            }}
          />
        </View>

        {/* Botón flotante */}
        {filteredBoletas.length > 0 && (
          <FloatingActionButton
            onPress={handleAddPress}
            position="bottom-right"
          />
        )}
      </View>
    </>
  );
}
