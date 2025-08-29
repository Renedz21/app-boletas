import { View, TouchableOpacity } from "react-native";

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
        className="h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg active:scale-95 active:bg-white"
        disabled={isCapturing}
        onPress={onCapture}
        style={{ elevation: 8 }}
      />
    </View>
  );
};
