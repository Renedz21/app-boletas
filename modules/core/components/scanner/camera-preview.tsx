import { View, Dimensions, StyleSheet } from "react-native";
import { Camera as VisionCamera } from "react-native-vision-camera";
import type { Camera as CameraType } from "react-native-vision-camera";
import type { ScanMode } from "@/modules/core/hooks/use-scan-mode";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

interface CameraPreviewProps {
  device: any;
  camera: React.RefObject<CameraType | null>;
  flashEnabled: boolean;
  activeMode: ScanMode;
  isActive: boolean;
}

export const CameraPreview = ({
  device,
  camera,
  flashEnabled,
  activeMode,
  isActive,
}: CameraPreviewProps) => {
  // Don't render camera if not active
  if (!isActive) {
    return (
      <View
        style={{ height: screenHeight, width: screenWidth }}
        className="items-center justify-center bg-gray-900"
      />
    );
  }

  return (
    <View
      style={{ height: screenHeight, width: screenWidth }}
      className="items-center justify-center px-6"
    >
      {/* Real Camera Component */}
      <VisionCamera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        video={false}
        audio={false}
        torch={flashEnabled ? "on" : "off"}
      />

      {/* Scanner Overlay */}
      <View className="absolute z-10">
        {/* Corner Indicators */}
        <View className="absolute -left-3 -top-10 h-10 w-10 rounded-tl-xl border-l-4 border-t-4 border-white" />
        <View className="absolute -right-3 -top-10 h-10 w-10 rounded-tr-xl border-r-4 border-t-4 border-white" />
        <View className="absolute -bottom-10 -left-3 h-10 w-10 rounded-bl-xl border-b-4 border-l-4 border-white" />
        <View className="absolute -bottom-10 -right-3 h-10 w-10 rounded-br-xl border-b-4 border-r-4 border-white" />

        {/* Capture Area - Just the visual frame, no text */}
        <View className="h-72 w-72 items-center justify-center bg-transparent" />
      </View>
    </View>
  );
};
