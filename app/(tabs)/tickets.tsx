import React, { useState, useMemo, useCallback, useRef } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { Header } from "@/modules/core/components/navigation/header";
import { BoletasHeader } from "@/modules/boletas/components/boletas-header";
import { BoletasFilter } from "@/modules/boletas/components/boletas-filter";
import { BoletasStats } from "@/modules/boletas/components/boletas-stats";
import { BoletaCard } from "@/modules/boletas/components/boleta-card";
import { BoletasEmptyState } from "@/modules/boletas/components/boletas-empty-state";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import {
  Boleta,
  TipoComprobante,
  Moneda,
  MetodoPago,
} from "@/types/boleta.types";
import { Category } from "@/types/category.types";

export default function TicketsScreen() {
  const router = useRouter();

  // Bottom sheet (filtros)
  const filterSheetRef = useRef<BottomSheetModal>(null);
  const filterSnapPoints = useMemo(() => ["50%", "85%"], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
        opacity={0.5}
      />
    ),
    [],
  );
  const handleOpenFilters = useCallback(() => {
    filterSheetRef.current?.present();
  }, []);
  const handleApplyFilters = useCallback(() => {
    filterSheetRef.current?.dismiss();
  }, []);

  // Dummy data for categories
  const categories: Omit<Category, "createdAt">[] = [
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

  // Dummy data for boletas
  const boletas: Boleta[] = [
    {
      id: "1",
      user_id: "user-1",
      ruc: "20123456789",
      razon_social: "Restaurante El Buen Sabor",
      fecha: new Date("2024-01-15"),
      total: 45.5,
      tipo_comprobante: "boleta",
      serie: "B001",
      numero: "0001",
      igv: 8.19,
      subtotal: 37.31,
      moneda: "PEN",
      tipo_cambio: null,
      categoria_id: "1",
      subcategoria: "Comida rápida",
      tags: ["restaurante", "comida"],
      notas: "Almuerzo de trabajo",
      es_gasto_deducible: false,
      ubicacion: "Lima",
      metodo_pago: "efectivo",
      imagen_url: null,
      imagen_thumbnail_url: null,
      confianza_ocr: 0.95,
      datos_ocr_raw: null,
      revisado_manualmente: true,
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      user_id: "user-1",
      ruc: "20123456790",
      razon_social: "Farmacia San José",
      fecha: new Date("2024-01-14"),
      total: 120.0,
      tipo_comprobante: "boleta",
      serie: "B001",
      numero: "0002",
      igv: 21.6,
      subtotal: 98.4,
      moneda: "PEN",
      tipo_cambio: null,
      categoria_id: "4",
      subcategoria: "Medicamentos",
      tags: ["farmacia", "salud"],
      notas: "Medicinas para la gripe",
      es_gasto_deducible: true,
      ubicacion: "Lima",
      metodo_pago: "tarjeta_debito",
      imagen_url: null,
      imagen_thumbnail_url: null,
      confianza_ocr: 0.88,
      datos_ocr_raw: null,
      revisado_manualmente: false,
      createdAt: new Date("2024-01-14"),
      updatedAt: new Date("2024-01-14"),
    },
    {
      id: "3",
      user_id: "user-1",
      ruc: "20123456791",
      razon_social: "Gasolinera PetroPerú",
      fecha: new Date("2024-01-13"),
      total: 180.0,
      tipo_comprobante: "boleta",
      serie: "B001",
      numero: "0003",
      igv: 32.4,
      subtotal: 147.6,
      moneda: "PEN",
      tipo_cambio: null,
      categoria_id: "2",
      subcategoria: "Combustible",
      tags: ["gasolina", "transporte"],
      notas: "Llenado de tanque",
      es_gasto_deducible: true,
      ubicacion: "Lima",
      metodo_pago: "efectivo",
      imagen_url: null,
      imagen_thumbnail_url: null,
      confianza_ocr: 0.92,
      datos_ocr_raw: null,
      revisado_manualmente: true,
      createdAt: new Date("2024-01-13"),
      updatedAt: new Date("2024-01-13"),
    },
  ];

  // Estados
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<boolean[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Filtrar boletas
  const filteredBoletas = useMemo(() => {
    let filtered = [...boletas];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (boleta) =>
          boleta.razon_social.toLowerCase().includes(query) ||
          boleta.subcategoria?.toLowerCase().includes(query) ||
          boleta.notas?.toLowerCase().includes(query) ||
          boleta.ruc.includes(query),
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((boleta) =>
        selectedCategories.includes(boleta.categoria_id || ""),
      );
    }

    if (selectedStatus.length > 0) {
      filtered = filtered.filter((boleta) =>
        selectedStatus.includes(boleta.revisado_manualmente),
      );
    }

    return filtered;
  }, [boletas, searchQuery, selectedCategories, selectedStatus]);

  // Calcular estadísticas
  const stats = useMemo(() => {
    const totalAmount = filteredBoletas.reduce((sum, b) => sum + b.total, 0);
    const totalCount = filteredBoletas.length;
    const averageAmount = totalCount > 0 ? totalAmount / totalCount : 0;
    const monthlyCount = filteredBoletas.filter((b) => {
      const now = new Date();
      const boletaDate = new Date(b.fecha);
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

  const activeFiltersCount = useMemo(() => {
    return (
      selectedCategories.length + selectedStatus.length + (searchQuery ? 1 : 0)
    );
  }, [selectedCategories, selectedStatus, searchQuery]);
  // Handlers
  const handleCategoryToggle = useCallback((categoryId: string) => {
    console.log("categoryId", categoryId);
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId],
    );
  }, []);

  const handleStatusToggle = useCallback((status: boolean) => {
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
    console.log("Ver detalles de:", boleta.razon_social);
  }, []);

  const handleBoletaMenuPress = useCallback((boleta: Boleta) => {
    console.log("Opciones para:", boleta.razon_social);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleAddPress = useCallback(() => {
    router.push("/scanner");
  }, [router]);

  // Render principal
  const renderContent = () => {
    if (filteredBoletas.length === 0) {
      return <BoletasEmptyState onAddPress={handleAddPress} />;
    }

    return (
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#3B82F6"]}
            tintColor="#3B82F6"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 py-4">
          {filteredBoletas.map((boleta, index) => (
            <View key={boleta.id}>
              <BoletaCard
                boleta={boleta}
                onPress={() => handleBoletaPress(boleta)}
                onMenuPress={() => handleBoletaMenuPress(boleta)}
              />
              {index < filteredBoletas.length - 1 && <View className="h-4" />}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <BottomSheetModalProvider>
      <View className="flex-1 bg-gray-50">
        <Header title="Mis Boletas" subtitle="Gestiona tus comprobantes" />

        <View className="flex-1">
          <View className="border-b border-gray-100 bg-white">
            <BoletasHeader
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onFilterPress={handleOpenFilters}
              totalCount={boletas.length}
              filteredCount={filteredBoletas.length}
              activeFiltersCount={activeFiltersCount}
            />
          </View>

          <View className="border-b border-gray-100 bg-white">
            <BoletasStats stats={stats} />
          </View>

          <View className="flex-1">{renderContent()}</View>
        </View>

        {/* Bottom Sheet de Filtros */}
        <BottomSheetModal
          ref={filterSheetRef}
          snapPoints={filterSnapPoints}
          enableDynamicSizing={false}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{ backgroundColor: "#E5E7EB" }}
          backgroundStyle={{ backgroundColor: "#FFFFFF" }}
          enablePanDownToClose={true}
          enableContentPanningGesture={false} // ⭐ CLAVE: Deshabilitar pan en contenido
        >
          <BottomSheetScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <BoletasFilter
              categories={categories}
              selectedCategories={selectedCategories}
              selectedStatus={selectedStatus}
              onCategoryToggle={handleCategoryToggle}
              onStatusToggle={handleStatusToggle}
              onClearFilters={handleClearFilters}
              onApplyFilters={handleApplyFilters}
              showAdvancedFilters={showAdvancedFilters}
              onToggleAdvancedFilters={() =>
                setShowAdvancedFilters((prev) => !prev)
              }
              activeFiltersCount={activeFiltersCount}
            />
          </BottomSheetScrollView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}
