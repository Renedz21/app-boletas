import { View, Image, Dimensions } from "react-native";
import { Text } from "@/modules/core/components/ui/text";
import { Button } from "@/modules/core/components/ui/button";
import { RotateCcw, Check, Camera, CircleCheck } from "lucide-react-native";
import { ConfirmationModal } from "./confirmation-modal";
import colors from "../../constants/colors";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const imageWidth = screenWidth * 0.9;
const imageHeight = imageWidth * 1.4; // Aspect ratio for documents

interface ImagePreviewFullscreenProps {
  imagePath: string;
  onRetake: () => void;
  onConfirm: () => void;
  showConfirmation: boolean;
  isProcessing: boolean;
  onProcessImage: () => void;
  onCancelConfirmation: () => void;
}

export const ImagePreviewFullscreen = ({
  imagePath,
  onRetake,
  onConfirm,
  showConfirmation,
  isProcessing,
  onProcessImage,
  onCancelConfirmation,
}: ImagePreviewFullscreenProps) => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-900 px-6">
      {/* Header with title */}
      <View className="mb-8">
        <Text className="text-center text-xl font-bold text-white">
          Vista Previa
        </Text>
        <Text className="mt-2 text-center text-sm text-gray-400">
          Revisa que la imagen esté clara y completa
        </Text>
      </View>

      {/* Image Preview */}
      <View className="mb-8 overflow-hidden rounded-2xl border-2 border-gray-600 bg-gray-800">
        <Image
          source={{ uri: `file://${imagePath}` }}
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
          resizeMode="cover"
        />
      </View>

      {/* Action Buttons */}
      <View className="flex-row gap-4">
        <Button
          className="flex-row gap-2"
          variant="secondary"
          size="default"
          onPress={onRetake}
          icon={<RotateCcw size={20} color={colors.primary.default} />}
        >
          Retomar
        </Button>
        <Button
          className="flex-row gap-2"
          variant="primary"
          size="default"
          onPress={onConfirm}
          icon={<CircleCheck size={20} color={colors.neutral.default} />}
        >
          Confirmar
        </Button>
      </View>

      {/* Camera icon hint */}
      <View className="mt-8 flex-row items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2">
        <Camera size={16} color="#3B82F6" />
        <Text className="text-xs font-medium text-blue-400">
          Toca "Retomar" para volver a la cámara
        </Text>
      </View>

      {/* Confirmation Modal */}
      <ConfirmationModal
        visible={showConfirmation}
        onCancel={onCancelConfirmation}
        onConfirm={onProcessImage}
        isProcessing={isProcessing}
      />
    </View>
  );
};
