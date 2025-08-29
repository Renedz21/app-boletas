import React from "react";
import { View, Modal, TouchableOpacity } from "react-native";
import { Text } from "@/modules/core/components/ui/text";
import { Button } from "@/modules/core/components/ui/button";
import { ActivityIndicator } from "react-native";

interface ConfirmationModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isProcessing: boolean;
}

export const ConfirmationModal = ({
  visible,
  onCancel,
  onConfirm,
  isProcessing,
}: ConfirmationModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="mx-6 w-full max-w-sm rounded-2xl bg-gray-800 p-6">
          <Text className="mb-2 text-center text-xl font-bold text-white">
            Captura Confirmada
          </Text>
          <Text className="mb-6 text-center text-gray-400">
            ¿Deseas procesar esta imagen con IA para extraer la información?
          </Text>

          <View className="flex-row justify-center gap-3">
            <Button
              variant="secondary"
              size="default"
              className="flex-1"
              onPress={onCancel}
              disabled={isProcessing}
            >
              Cancelar
            </Button>

            <Button
              variant="primary"
              size="default"
              className="flex-1"
              onPress={onConfirm}
              disabled={isProcessing}
              loading={isProcessing}
            >
              {isProcessing ? "Espera..." : "Procesar"}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
