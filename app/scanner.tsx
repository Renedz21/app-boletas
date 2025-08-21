import React, { useState } from "react";
import { View, Dimensions, Alert } from "react-native";
import { Text } from "@/modules/core/components/ui/text";
import {
  Camera,
  Zap,
  ArrowLeft,
  Dot,
  ImageIcon,
  QrCode,
} from "lucide-react-native";
import { IconButton } from "@/modules/core/components/ui/icon-button";
import { SafeAreaView } from "react-native-safe-area-context";

const { height: screenHeight } = Dimensions.get("window");
const cameraHeight = screenHeight * 0.7;

type ScanMode = "qr" | "boleta" | "factura" | "nota_credito";

export default function ScannerScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [activeMode, setActiveMode] = useState<ScanMode>("qr");

  const handleStartScan = () => {
    setIsScanning(true);
  };

  const handleStopScan = () => {
    setIsScanning(false);
  };

  const handleCapture = () => {
    Alert.alert(
      "Captura de Documento",
      "¿Deseas procesar esta imagen con IA para extraer la información?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Procesar",
          onPress: () => console.log("Procesando con IA..."),
        },
      ],
    );
  };

  const handleToggleFlash = () => {
    setFlashEnabled(!flashEnabled);
  };

  const handleGalleryPick = () => {
    Alert.alert(
      "Seleccionar de Galería",
      "¿Deseas seleccionar una imagen de tu galería?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Seleccionar",
          onPress: () => console.log("Abriendo galería..."),
        },
      ],
    );
  };

  const renderCameraPreview = () => {
    if (!isScanning) {
      return (
        <View className="min-h-full items-center justify-center px-8">
          <View className="mb-6 h-24 w-24 items-center justify-center rounded-full border border-blue-500/30 bg-blue-900/20">
            <Camera size={36} color="#3B82F6" />
          </View>
          <Text className="mb-3 text-center text-lg font-semibold text-white">
            {activeMode === "qr" && "Escanea el QR Code"}
            {activeMode === "boleta" && "Escanea la Boleta"}
            {activeMode === "factura" && "Escanea la Factura"}
            {activeMode === "nota_credito" && "Escanea la Nota Crédito"}
          </Text>
          <Text className="px-4 text-center leading-5 text-gray-400">
            {activeMode === "qr" && "Por favor, apunta la cámara al QR Code"}
            {activeMode === "boleta" &&
              "Posiciona la boleta para la división automática de páginas"}
            {activeMode === "factura" && "Coloca la factura dentro del marco"}
            {activeMode === "nota_credito" &&
              "Asegura que la nota_credito esté completamente visible"}
          </Text>
        </View>
      );
    }

    return (
      <View className="h-full items-center justify-center px-6">
        {/* Scanner Overlay */}
        <View className="relative">
          {/* Corner Indicators */}
          <View className="absolute -left-3 -top-10 h-10 w-10 rounded-tl-xl border-l-4 border-t-4 border-blue-500" />
          <View className="absolute -right-3 -top-10 h-10 w-10 rounded-tr-xl border-r-4 border-t-4 border-blue-500" />
          <View className="absolute -bottom-10 -left-3 h-10 w-10 rounded-bl-xl border-b-4 border-l-4 border-blue-500" />
          <View className="absolute -bottom-10 -right-3 h-10 w-10 rounded-br-xl border-b-4 border-r-4 border-blue-500" />

          {/* Capture Area */}
          <View className="h-44 w-72 items-center justify-center bg-transparent">
            <Text className="mb-2 text-center font-semibold text-blue-400">
              {activeMode === "qr" && "Scanning Area"}
              {activeMode === "boleta" && "Boleta Frame"}
              {activeMode === "factura" && "Factura Frame"}
              {activeMode === "nota_credito" && "Nota Crédito Frame"}
            </Text>
            <Text className="text-center text-sm leading-5 text-blue-300">
              Posiciona el documento dentro del marco
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pb-4">
        <IconButton
          variant="ghost"
          size="md"
          className="bg-gray-800/50"
          onPress={() => console.log("Back")}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </IconButton>

        <View className="flex-row gap-4">
          <IconButton
            variant="ghost"
            size="lg"
            className={`${flashEnabled ? "bg-blue-500" : "bg-gray-800/50"}`}
            onPress={handleToggleFlash}
          >
            <Zap size={20} color={flashEnabled ? "#FFFFFF" : "#FFFFFF"} />
          </IconButton>
        </View>
      </View>

      {/* Camera Preview Area */}
      <View className="mb-6 px-6">
        <View className="overflow-hidden rounded-2xl border border-gray-700 bg-gray-800">
          <View
            className="items-center justify-center bg-gray-900"
            style={{ height: cameraHeight }}
          >
            {renderCameraPreview()}
          </View>
        </View>
      </View>

      {/* Bottom Controls */}
      <View className="px-6 pb-8">
        <View className="flex-row items-center justify-around">
          {/* Scanner Controls */}
          <View className="space-y-3">
            {!isScanning ? (
              <IconButton
                variant="ghost"
                size="xl"
                className="bg-gray-800/50"
                onPress={handleStartScan}
              >
                <QrCode size={28} color="#FFFFFF" />
              </IconButton>
            ) : (
              <IconButton
                variant="ghost"
                size="xl"
                className="bg-red-500"
                onPress={handleStopScan}
              >
                <Dot size={80} color="#FFFFFF" />
              </IconButton>
            )}
          </View>
          {/* Capture Button */}
          <View className="relative">
            <View className="h-24 w-24 items-center justify-center rounded-full bg-blue-500 shadow-lg">
              <View className="h-20 w-20 items-center justify-center rounded-full bg-blue-600">
                <View className="h-14 w-14 items-center justify-center rounded-full bg-blue-700">
                  <Camera size={28} color="#FFFFFF" />
                </View>
              </View>
            </View>
            {/* Progress Ring */}
            <View className="absolute inset-0 rounded-full border-4 border-blue-400/30" />
          </View>
          <IconButton
            variant="ghost"
            size="xl"
            className="bg-gray-800/50"
            onPress={handleGalleryPick}
          >
            <ImageIcon size={28} color="#FFFFFF" />
          </IconButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
