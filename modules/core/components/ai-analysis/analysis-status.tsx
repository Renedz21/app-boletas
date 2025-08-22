import { View } from "react-native";
import { Text } from "@/modules/core/components/ui/text";
import { Button } from "@/modules/core/components/ui/button";
import { CheckCircle, AlertCircle } from "lucide-react-native";
import { AnimatedLoader } from "./animated-loader";
import type { AnalysisStatus as AnalysisStatusType } from "@/modules/core/hooks/use-ai-analysis";

interface AnalysisStatusProps {
  status: AnalysisStatusType;
  onRetry?: () => void;
}

export const AnalysisStatus = ({ status, onRetry }: AnalysisStatusProps) => {
  switch (status) {
    case "analyzing":
      return (
        <View className="items-center justify-center py-12">
          <AnimatedLoader />
          <Text className="mb-3 text-center text-xl font-bold text-white">
            Analizando Imagen con IA
          </Text>
          <Text className="text-center text-gray-400">
            Estamos extrayendo la información del documento...
          </Text>
        </View>
      );

    case "saving":
      return (
        <View className="items-center justify-center py-12">
          <AnimatedLoader />
          <Text className="mb-3 text-center text-xl font-bold text-white">
            Guardando en Base de Datos
          </Text>
          <Text className="text-center text-gray-400">
            Estamos guardando la información extraída...
          </Text>
        </View>
      );

    case "error":
      return (
        <View className="items-center justify-center py-12">
          <View className="mb-6 h-24 w-24 items-center justify-center rounded-full bg-red-500/20">
            <AlertCircle size={48} color="#EF4444" />
          </View>
          <Text className="mb-3 text-center text-xl font-bold text-white">
            Error en el Análisis
          </Text>
          <Text className="mb-6 text-center text-gray-400">
            No se pudo procesar la imagen. Intenta con una imagen más clara.
          </Text>
          {onRetry && (
            <Button
              title="Reintentar"
              variant="primary"
              size="default"
              onPress={onRetry}
            >
              Reintentar
            </Button>
          )}
        </View>
      );

    default:
      return null;
  }
};
