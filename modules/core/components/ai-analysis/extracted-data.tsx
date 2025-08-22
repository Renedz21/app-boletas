import { TouchableOpacity, View } from "react-native";
import { Text } from "@/modules/core/components/ui/text";
import type { BoletaRow } from "@/types/boleta.types";
import { Edit3 } from "lucide-react-native";

interface ExtractedDataProps {
  data: Partial<BoletaRow>;
}

export const ExtractedData = ({ data }: ExtractedDataProps) => {
  return (
    <View className="rounded-2xl bg-gray-800 p-6">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-white">
          Datos Extraídos
        </Text>
        <TouchableOpacity className="flex-row items-center gap-2 rounded-full bg-gray-700 p-3">
          <Edit3 size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View className="space-y-3">
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Tipo de Comprobante:</Text>
          <Text className="font-medium capitalize text-white">
            {data?.tipo_comprobante || 'N/A'}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400">RUC:</Text>
          <Text className="font-medium text-white">{data?.ruc || 'N/A'}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Razón Social:</Text>
          <Text className="font-medium text-white">{data?.razon_social || 'N/A'}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Serie:</Text>
          <Text className="font-medium text-white">{data?.serie || 'N/A'}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Número:</Text>
          <Text className="font-medium text-white">{data?.numero || 'N/A'}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Fecha:</Text>
          <Text className="font-medium text-white">{data?.fecha || 'N/A'}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Subtotal:</Text>
          <Text className="font-medium text-white">
            S/ {data?.subtotal?.toFixed(2) || '0.00'}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400">IGV:</Text>
          <Text className="font-medium text-white">
            S/ {data?.igv?.toFixed(2) || '0.00'}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Total:</Text>
          <Text className="text-lg font-medium text-white">
            S/ {data?.total?.toFixed(2) || '0.00'}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Moneda:</Text>
          <Text className="font-medium text-white">{data?.moneda || 'N/A'}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Método de Pago:</Text>
          <Text className="font-medium capitalize text-white">
            {data?.metodo_pago ? data.metodo_pago.replace("_", " ") : 'N/A'}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Confianza OCR:</Text>
          <Text className="font-medium text-white">
            {data?.confianza_ocr ? `${(data.confianza_ocr * 100).toFixed(1)}%` : 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  );
};
