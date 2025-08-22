import { View } from "react-native";
import { ImageIcon } from "lucide-react-native";
import { IconButton } from "@/modules/core/components/ui/icon-button";
import { CaptureButton } from "./capture-button";

interface ScannerControlsProps {
  onCapture: () => void;
  onGalleryPick: () => void;
  isCapturing: boolean;
}

export const ScannerControls = ({
  onCapture,
  onGalleryPick,
  isCapturing,
}: ScannerControlsProps) => {
  return (
    <View className="px-6 pb-8">
      <View className="flex-row items-center justify-around">
        {/* Left Spacer */}
        <View className="w-20" />

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
    </View>
  );
};
