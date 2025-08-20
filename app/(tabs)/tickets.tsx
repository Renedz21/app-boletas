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

  // Dummy data using correct types
  const dummyBoletas: Boleta[] = [
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
    {
      id: "4",
      user_id: "user-123",
      ruc: "20123456792",
      razon_social: "Gasolinera PetroPerú S.A.",
      fecha: new Date("2024-01-12"),
      total: 180.0,
      tipo_comprobante: "boleta" as TipoComprobante,
      serie: "B001",
      numero: "0004",
      igv: 32.4,
      subtotal: 147.6,
      moneda: "PEN" as Moneda,
      tipo_cambio: null,
      categoria_id: "cat-4",
      subcategoria: "Combustible",
      tags: ["gasolina", "transporte"],
      notas: "Llenado de tanque",
      es_gasto_deducible: false,
      ubicacion: "Lima, Perú",
      metodo_pago: "efectivo" as MetodoPago,
      imagen_url: "https://example.com/boleta4.jpg",
      imagen_thumbnail_url: "https://example.com/boleta4-thumb.jpg",
      confianza_ocr: 0.9,
      datos_ocr_raw: { confidence: 0.9, text: "PetroPerú" },
      revisado_manualmente: true,
      createdAt: new Date("2024-01-12T08:30:00Z"),
      updatedAt: new Date("2024-01-12T08:30:00Z"),
    },
    {
      id: "5",
      user_id: "user-123",
      ruc: "20123456793",
      razon_social: "Tienda de Ropa Fashion S.A.C.",
      fecha: new Date("2024-01-11"),
      total: 299.9,
      tipo_comprobante: "boleta" as TipoComprobante,
      serie: "B001",
      numero: "0005",
      igv: 53.98,
      subtotal: 245.92,
      moneda: "PEN" as Moneda,
      tipo_cambio: null,
      categoria_id: "cat-5",
      subcategoria: "Vestimenta",
      tags: ["ropa", "moda"],
      notas: "Camisa de trabajo",
      es_gasto_deducible: true,
      ubicacion: "Lima, Perú",
      metodo_pago: "tarjeta_credito" as MetodoPago,
      imagen_url: "https://example.com/boleta5.jpg",
      imagen_thumbnail_url: "https://example.com/boleta5-thumb.jpg",
      confianza_ocr: 0.87,
      datos_ocr_raw: { confidence: 0.87, text: "Fashion Store" },
      revisado_manualmente: false,
      createdAt: new Date("2024-01-11T16:20:00Z"),
      updatedAt: new Date("2024-01-11T16:20:00Z"),
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
    {
      id: "cat-4",
      nombre: "Combustible",
      es_deducible: false,
      orden: 4,
      activo: true,
      createdAt: new Date("2024-01-01T00:00:00Z"),
    },
    {
      id: "cat-5",
      nombre: "Vestimenta",
      es_deducible: true,
      orden: 5,
      activo: true,
      createdAt: new Date("2024-01-01T00:00:00Z"),
    },
  ];

  // Estados
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<boolean[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [boletas] = useState<Boleta[]>(dummyBoletas);

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
