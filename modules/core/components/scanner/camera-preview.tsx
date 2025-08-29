import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Camera as VisionCamera } from "react-native-vision-camera";
import { GestureDetector } from "react-native-gesture-handler";
import type { Camera as CameraType } from "react-native-vision-camera";
import type { ScanMode } from "@/modules/core/hooks/use-scan-mode";
import { ZoomControls } from "./zoom-controls";

interface CameraPreviewProps {
  device: any;
  camera: React.RefObject<CameraType | null>;
  flashEnabled: boolean;
  activeMode?: ScanMode;
  isActive: boolean;
  currentZoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  gesture: any;
  format?: any; // Formato optimizado para la cámara
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const CameraPreview = ({
  device,
  camera,
  flashEnabled,
  activeMode = "boleta",
  isActive,
  currentZoom = 1,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  gesture,
  format,
}: CameraPreviewProps) => {
  if (!device || !isActive) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <View className="h-72 w-72 items-center justify-center bg-gray-800" />
      </View>
    );
  }

  return (
    <GestureDetector gesture={gesture}>
      <View
        style={{ height: screenHeight, width: screenWidth }}
        className="relative items-center justify-center px-6"
      >
        <VisionCamera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          format={format}
          isActive={true}
          photo={true}
          video={false}
          audio={false}
          torch={flashEnabled ? "on" : "off"}
          zoom={currentZoom}
          enableZoomGesture={false}
          photoQualityBalance="quality"
          photoHdr={format?.supportsPhotoHdr}
        />

        <View className="absolute z-10">
          <View className="absolute -left-3 -top-10 h-10 w-10 rounded-tl-xl border-l-4 border-t-4 border-white" />
          <View className="absolute -right-3 -top-10 h-10 w-10 rounded-tr-xl border-r-4 border-t-4 border-white" />
          <View className="absolute -bottom-10 -left-3 h-10 w-10 rounded-bl-xl border-b-4 border-l-4 border-white" />
          <View className="absolute -bottom-10 -right-3 h-10 w-10 rounded-br-xl border-b-4 border-r-4 border-white" />
          <View className="h-72 w-72 items-center justify-center bg-transparent" />
        </View>
        <ZoomControls
          currentZoom={currentZoom}
          minZoom={device?.minZoom || 1}
          maxZoom={device?.maxZoom || 10}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onResetZoom={onResetZoom}
        />
      </View>
    </GestureDetector>
  );
};
