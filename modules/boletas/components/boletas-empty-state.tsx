import React from "react";
import { View } from "react-native";
import { FileTextIcon, PlusIcon, SparklesIcon } from "lucide-react-native";
import { Text } from "@/modules/core/components/ui/text";
import { Button } from "@/modules/core/components/ui/button";

interface BoletasEmptyStateProps {
  onAddPress?: () => void;
}

export const BoletasEmptyState = ({ onAddPress }: BoletasEmptyStateProps) => {
  return (
    <View className="flex-1 items-center justify-center px-8 py-16">
      {/* Icono principal con fondo degradado */}
      <View className="mb-8 h-28 w-28 items-center justify-center rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-sm">
        <FileTextIcon size={48} color="#3B82F6" strokeWidth={1.5} />
      </View>

      {/* Mensajes principales */}
      <Text className="mb-3 text-center text-xl font-bold text-gray-900">
        Sin boletas aún
      </Text>
      <Text
        size="default"
        color="secondary"
        className="mb-8 max-w-sm text-center leading-6 text-gray-600"
      >
        Comienza agregando tu primera boleta para llevar un control detallado de
        tus gastos y compras
      </Text>

      {/* Botón de acción principal */}
      {onAddPress && (
        <Button
          variant="primary"
          onPress={onAddPress}
          title="Agregar Primera Boleta"
        />
      )}

      {/* Información adicional */}
      <View className="mt-8 max-w-sm rounded-xl border border-gray-200 bg-gray-50 p-4">
        <View className="mb-2 flex-row items-center gap-2">
          <SparklesIcon size={16} color="#6B7280" className="mr-2" />
          <Text
            size="default"
            className="text-xs font-medium uppercase tracking-wide text-gray-600"
          >
            Consejo
          </Text>
        </View>
        <Text size="default" className="text-xs leading-5 text-gray-600">
          Escanea tus comprobantes físicos o súbelos desde tu galería para
          comenzar a organizar tus finanzas
        </Text>
      </View>

      {/* Elementos decorativos sutiles */}
      <View className="absolute -z-10">
        <View className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-blue-100 opacity-20" />
        <View className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-purple-100 opacity-20" />
        <View className="absolute right-16 top-32 h-20 w-20 rounded-full bg-indigo-100 opacity-20" />
      </View>
    </View>
  );
};
