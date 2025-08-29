import React from "react";
import { View, StyleSheet } from "react-native";
import { Camera as VisionCamera } from "react-native-vision-camera";
import { GestureDetector } from "react-native-gesture-handler";
import Reanimated, { useAnimatedProps } from "react-native-reanimated";
import type {
  Camera as CameraType,
  CameraProps,
} from "react-native-vision-camera";
import type { ScanMode } from "@/modules/core/hooks/use-scan-mode";
import { ZoomControls } from "./zoom-controls";

// Make Camera animatable
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});
const ReanimatedCamera = Reanimated.createAnimatedComponent(VisionCamera);

interface CameraPreviewProps {
  device: any;
  camera: React.RefObject<CameraType | null>;
  flashEnabled: boolean;
  activeMode?: ScanMode;
  isActive: boolean;
  onSetZoom: (zoom: number) => void;
  gesture: any;
  format?: any; // Formato optimizado para la cámara
  currentZoom: number;
  zoomSharedValue?: any; // SharedValue para zoom animado
}

export const CameraPreview = ({
  device,
  camera,
  flashEnabled,
  activeMode = "boleta",
  isActive,
  onSetZoom,
  gesture,
  format,
  currentZoom,
  zoomSharedValue,
}: CameraPreviewProps) => {
  // Animated props for zoom
  const animatedProps = useAnimatedProps<CameraProps>(
    () => ({
      zoom: zoomSharedValue?.value || currentZoom,
    }),
    [zoomSharedValue, currentZoom],
  );

  if (!device || !isActive) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <View className="h-72 w-72 items-center justify-center bg-gray-800" />
      </View>
    );
  }

  return (
    <GestureDetector gesture={gesture}>
      <View className="flex-1 items-center justify-center">
        <ReanimatedCamera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          format={format}
          isActive={true}
          photo={true}
          video={false}
          audio={false}
          torch={flashEnabled ? "on" : "off"}
          enableZoomGesture={false}
          photoQualityBalance="quality"
          photoHdr={format?.supportsPhotoHdr}
          animatedProps={animatedProps}
        />

        <View className="absolute z-10">
          <View className="absolute -left-3 -top-20 h-10 w-10 rounded-tl-xl border-l-4 border-t-4 border-white" />
          <View className="absolute -right-3 -top-20 h-10 w-10 rounded-tr-xl border-r-4 border-t-4 border-white" />
          <View className="absolute -bottom-10 -left-3 h-10 w-10 rounded-bl-xl border-b-4 border-l-4 border-white" />
          <View className="absolute -bottom-10 -right-3 h-10 w-10 rounded-br-xl border-b-4 border-r-4 border-white" />
          <View className="h-80 w-80 items-center justify-center bg-transparent" />
        </View>
        <ZoomControls
          minZoom={device?.minZoom || 1}
          maxZoom={device?.maxZoom || 10}
          currentZoom={currentZoom}
          onSetZoom={onSetZoom}
        />
      </View>
    </GestureDetector>
  );
};
