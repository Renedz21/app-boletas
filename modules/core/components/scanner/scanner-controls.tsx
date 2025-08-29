import { View } from "react-native";
import { Flashlight, FlashlightOff, ImageIcon } from "lucide-react-native";
import { IconButton } from "@/modules/core/components/ui/icon-button";
import { CaptureButton } from "./capture-button";

interface ScannerControlsProps {
  onCapture: () => void;
  onGalleryPick: () => void;
  isCapturing: boolean;
  flashEnabled: boolean;
  onToggleFlash: () => void;
}

export const ScannerControls = ({
  onCapture,
  onGalleryPick,
  isCapturing,
  flashEnabled,
  onToggleFlash,
}: ScannerControlsProps) => {
  return (
    <View className="absolute inset-x-0 bottom-0 flex-row items-center justify-around py-6">
      {/* Left Spacer */}
      <IconButton
        variant="ghost"
        size="xl"
        className={`${flashEnabled ? "bg-blue-500" : "bg-gray-800/50"}`}
        onPress={onToggleFlash}
      >
        {flashEnabled ? (
          <Flashlight size={24} color="#FFFFFF" />
        ) : (
          <FlashlightOff size={24} color="#FFFFFF" />
        )}
      </IconButton>

      {/* Capture Button - Centered */}
      <CaptureButton onCapture={onCapture} isCapturing={isCapturing} />

      {/* Gallery Button */}

      <IconButton
        variant="ghost"
        size="xl"
        className="bg-gray-800/50"
        onPress={onGalleryPick}
      >
        <ImageIcon size={28} color="#FFFFFF" />
      </IconButton>
    </View>
  );
};
