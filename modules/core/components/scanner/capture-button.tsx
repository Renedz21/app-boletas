import { View, TouchableOpacity } from "react-native";
import { Camera, Dot } from "lucide-react-native";

interface CaptureButtonProps {
  onCapture: () => void;
  isCapturing: boolean;
}

export const CaptureButton = ({
  onCapture,
  isCapturing,
}: CaptureButtonProps) => {
  return (
    <View className="relative">
      <TouchableOpacity
        className="h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg active:scale-95 active:bg-white"
        disabled={isCapturing}
        onPress={onCapture}
        style={{ elevation: 8 }}
      />
    </View>
  );
};
