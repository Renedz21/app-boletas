import { View } from "react-native";
import { Text } from "@/modules/core/components/ui/text";
import { CheckCircle } from "lucide-react-native";
import { ExtractedData } from "./extracted-data";
import { ActionButtons } from "./action-buttons";
import type { BoletaRow } from "@/types/boleta.types";

interface CompletedAnalysisProps {
  data: Partial<BoletaRow>;
  onSave: () => void;
  loading?: boolean;
  supabaseError?: string | null;
}

export const CompletedAnalysis = ({
  data,
  onSave,
  loading,
  supabaseError,
}: CompletedAnalysisProps) => {
  return (
    <View className="flex-col gap-8">
      <View className="items-center">
        <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
          <CheckCircle size={32} color="#10B981" />
        </View>
        <Text className="mb-3 text-center text-xl font-bold text-white">
          Análisis Completado
        </Text>
        <Text className="mb-6 text-center text-gray-400">
          Información extraída exitosamente
        </Text>
      </View>

      <View className="flex-row items-center justify-center rounded-lg bg-red-100 p-4">
        <Text className="text-sm text-red-500">
          Recuerda revisar la información extraída. La IA puede cometer errores.
        </Text>
      </View>

      {/* Show Supabase error if any */}
      {supabaseError && (
        <View className="rounded-lg bg-red-500/20 p-3">
          <Text className="text-center text-sm text-red-400">
            Error: {supabaseError}
          </Text>
        </View>
      )}

      {/* Extracted Data */}
      <ExtractedData data={data} />

      {/* Action Buttons */}
      <ActionButtons onSave={onSave} loading={loading} />
    </View>
  );
};
