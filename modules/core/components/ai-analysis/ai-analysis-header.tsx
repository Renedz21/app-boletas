import { View } from "react-native";
import { ArrowLeft, Brain } from "lucide-react-native";
import { IconButton } from "@/modules/core/components/ui/icon-button";
import { Text } from "@/modules/core/components/ui/text";

interface AIAnalysisHeaderProps {
  onBack: () => void;
}

export const AIAnalysisHeader = ({ onBack }: AIAnalysisHeaderProps) => {
  return (
    <View className="flex-row items-center justify-between px-6 pb-4">
      <IconButton
        variant="ghost"
        size="md"
        className="bg-gray-800/50"
        onPress={onBack}
      >
        <ArrowLeft size={24} color="#FFFFFF" />
      </IconButton>
      
      <View className="flex-row items-center gap-2">
        <Brain size={20} color="#3B82F6" />
        <Text className="text-lg font-semibold text-white">
          Análisis IA
        </Text>
      </View>
      
      <View className="w-10" /> {/* Spacer for centering */}
    </View>
  );
};
