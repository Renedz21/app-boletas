import React, { useState, useMemo, useCallback, useRef } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Header } from "@/modules/core/components/navigation/header";
import { BoletaCard } from "@/modules/boletas/components/boleta-card";
import { BoletasEmptyState } from "@/modules/boletas/components/boletas-empty-state";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Download, Eye, Trash2 } from "lucide-react-native";
import { Text } from "@/modules/core/components/ui/text";
import { Boleta } from "@/types/boleta.types";
import colors from "@/modules/core/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

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

export default function TicketsScreen() {
  const router = useRouter();

  // Bottom sheet para acciones de boleta
  const actionSheetRef = useRef<BottomSheetModal>(null);
  const [selectedBoleta, setSelectedBoleta] = useState<Boleta | null>(null);
  const actionSnapPoints = useMemo(() => ["35%"], []);

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

  const handleOpenActionSheet = useCallback((boleta: Boleta) => {
    setSelectedBoleta(boleta);

    setTimeout(() => {
      actionSheetRef.current?.present();
    }, 100);
  }, []);

  const handleCloseActionSheet = useCallback(() => {
    actionSheetRef.current?.dismiss();
    setSelectedBoleta(null);
  }, []);

  // Estados
  const [refreshing, setRefreshing] = useState(false);

  // Handlers
  const handleBoletaPress = useCallback((boleta: Boleta) => {
    // TODOs: mantener en caso de cambios en el flujo de navegación.
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

  const handleActionPress = useCallback(
    (action: string) => {
      if (!selectedBoleta) return;

      switch (action) {
        case "view":
          // Ver detalles
          break;
        case "download":
          // Descargar
          break;
        case "edit":
          // Editar
          break;
        case "delete":
          // Eliminar
          break;
      }

      handleCloseActionSheet();
    },
    [selectedBoleta, handleCloseActionSheet],
  );

  // Render principal
  const renderContent = () => {
    if (boletas.length === 0) {
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
          {boletas.map((boleta, index) => (
            <View key={boleta.id}>
              <BoletaCard
                boleta={boleta}
                onPress={() => handleBoletaPress(boleta)}
                onMenuPress={() => handleOpenActionSheet(boleta)}
              />
              {index < boletas.length - 1 && <View className="h-4" />}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="border-b border-gray-100 bg-white px-4 py-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-gray-900">
            Total: {boletas.length} documentos
          </Text>
          <TouchableOpacity
            onPress={handleAddPress}
            className="rounded-lg bg-blue-600 px-4 py-2"
            activeOpacity={0.7}
          >
            <Text className="font-medium text-white">Agregar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1">{renderContent()}</View>

      {/* Bottom Sheet de Acciones */}
      <BottomSheetModal
        ref={actionSheetRef}
        snapPoints={actionSnapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        enableContentPanningGesture={false}
        enableDynamicSizing={false}
        enableHandlePanningGesture={false}
        onDismiss={handleCloseActionSheet}
      >
        <BottomSheetView className="flex-1 px-6">
          {/* Header */}
          <View className="flex-row items-center justify-center pb-6 pt-4">
            <Text className="text-center text-xl font-bold text-gray-900">
              {selectedBoleta?.razon_social}
            </Text>
          </View>

          {/* Action Options */}
          <View className="gap-2">
            <TouchableOpacity
              onPress={() => handleActionPress("view")}
              className="flex-row items-center rounded-xl py-4"
              activeOpacity={0.7}
            >
              <View className="mr-4">
                <Eye size={24} color={colors.neutral.strong} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-900">
                  Ver detalles
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleActionPress("download")}
              className="flex-row items-center rounded-xl py-4"
              activeOpacity={0.7}
            >
              <View className="mr-4">
                <Download size={24} color={colors.neutral.strong} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-900">
                  Descargar imagen
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleActionPress("delete")}
              className="flex-row items-center rounded-xl py-4"
              activeOpacity={0.7}
            >
              <View className="mr-4">
                <Trash2 size={24} color={colors.neutral.strong} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-900">
                  Eliminar
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  );
}
