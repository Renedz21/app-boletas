import { View } from "react-native";
import { Text } from "@/modules/core/components/ui/text";
import { Camera } from "lucide-react-native";
import { Button } from "@/modules/core/components/ui/button";

interface PermissionRequestProps {
  onRequestPermission: () => void;
}

export const PermissionRequest = ({
  onRequestPermission,
}: PermissionRequestProps) => {
  return (
    <View className="min-h-full items-center justify-center px-8">
      <View className="mb-6 h-24 w-24 items-center justify-center rounded-full border border-red-500/30 bg-red-900/20">
        <Camera size={36} color="#EF4444" />
      </View>
      <Text className="mb-3 text-center text-lg font-semibold text-red-400">
        Permiso de Cámara Requerido
      </Text>
      <Text className="mb-4 px-4 text-center leading-5 text-gray-400">
        Para escanear documentos, necesitamos acceso a tu cámara
      </Text>
      <Button
        title="Conceder Permiso"
        variant="primary"
        size="default"
        onPress={onRequestPermission}
      />
    </View>
  );
};
