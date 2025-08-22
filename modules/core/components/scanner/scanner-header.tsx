import { View } from "react-native";
import { ArrowLeft, Zap } from "lucide-react-native";
import { IconButton } from "@/modules/core/components/ui/icon-button";

interface ScannerHeaderProps {
  flashEnabled: boolean;
  onToggleFlash: () => void;
  onBack: () => void;
}

export const ScannerHeader = ({
  flashEnabled,
  onToggleFlash,
  onBack,
}: ScannerHeaderProps) => {
  return (
    <View className="flex-row items-center justify-between p-6">
      <IconButton
        variant="ghost"
        size="md"
        className="bg-gray-800/50"
        onPress={onBack}
      >
        <ArrowLeft size={24} color="#FFFFFF" />
      </IconButton>

      <View className="flex-row gap-4">
        <IconButton
          variant="ghost"
          size="lg"
          className={`${flashEnabled ? "bg-blue-500" : "bg-gray-800/50"}`}
          onPress={onToggleFlash}
        >
          <Zap size={20} color="#FFFFFF" />
        </IconButton>
      </View>
    </View>
  );
};
