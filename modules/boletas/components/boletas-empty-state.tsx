import React from "react";
import { View } from "react-native";
import { FileTextIcon, PlusIcon } from "lucide-react-native";
import { Text } from "@/modules/core/components/ui/text";
import { Button } from "@/modules/core/components/ui/button";

interface BoletasEmptyStateProps {
  onAddPress?: () => void;
}

export const BoletasEmptyState = ({ onAddPress }: BoletasEmptyStateProps) => {
  return (
    <View className="flex-1 items-center justify-center px-6 py-12">
      {/* Icono grande con fondo pastel */}
      <View className="w-32 h-32 bg-primary-50 rounded-full items-center justify-center mb-6">
        <FileTextIcon size={64} color="#3B82F6" strokeWidth={1.5} />
      </View>

      {/* Mensajes */}
      <Text variant="h3" className="text-center mb-2">
        Sin boletas aún
      </Text>
      <Text variant="body" color="secondary" className="text-center mb-8 max-w-xs">
        Comienza agregando tu primera boleta para llevar un control de tus gastos
      </Text>

      {/* Botón de acción */}
      {onAddPress && (
        <Button
          variant="primary"
          size="lg"
          onPress={onAddPress}
          className="flex-row items-center px-6"
        >
          <PlusIcon size={20} color="#FFFFFF" className="mr-2" />
          <Text variant="body" className="text-white font-medium">Agregar Boleta</Text>
        </Button>
      )}

      {/* Ilustración decorativa con círculos pastel */}
      <View className="absolute -z-10">
        <View className="absolute -top-20 -left-20 w-40 h-40 bg-purple-100 rounded-full opacity-30" />
        <View className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-30" />
        <View className="absolute top-40 right-20 w-24 h-24 bg-teal-100 rounded-full opacity-30" />
      </View>
    </View>
  );
};
