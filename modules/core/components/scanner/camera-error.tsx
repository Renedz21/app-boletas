import { View } from "react-native";
import { Text } from "@/modules/core/components/ui/text";

interface CameraErrorProps {
  message: string;
}

export const CameraError = ({ message }: CameraErrorProps) => {
  return (
    <View className="min-h-full items-center justify-center px-8">
      <View className="mb-6 h-24 w-24 items-center justify-center rounded-full border border-red-500/30 bg-red-900/20">
        <View className="h-12 w-12 items-center justify-center">
          <View className="h-8 w-8 rounded-full bg-red-500" />
        </View>
      </View>
      <Text className="text-center text-lg font-semibold text-red-400">
        {message}
      </Text>
    </View>
  );
};
