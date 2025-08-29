import { View } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { IconButton } from "@/modules/core/components/ui/icon-button";
import { Text } from "@/modules/core/components/ui/text";

interface AIAnalysisHeaderProps {
  onBack: () => void;
}

export const AIAnalysisHeader = ({ onBack }: AIAnalysisHeaderProps) => {
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
      <View className="flex-row items-center gap-2">
        <Text className="text-lg font-semibold text-white">Análisis IA</Text>
      </View>
      <View className="w-10" /> {/* Spacer for centering */}
    </View>
  );
};
