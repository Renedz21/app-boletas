import { View } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { IconButton } from "@/modules/core/components/ui/icon-button";

interface ScannerHeaderProps {
  onBack: () => void;
}

export const ScannerHeader = ({ onBack }: ScannerHeaderProps) => {
  return (
    <View className="flex-row items-center justify-between p-6">
      <IconButton
        variant="ghost"
        size="lg"
        className="bg-gray-800/50"
        onPress={onBack}
      >
        <ArrowLeft size={24} color="#FFFFFF" />
      </IconButton>
    </View>
  );
};
