import { useCallback } from "react";
import { Alert } from "react-native";

export const useGalleryPicker = () => {
  const handleGalleryPick = useCallback(() => {
    Alert.alert(
      "Seleccionar de Galería",
      "¿Deseas seleccionar una imagen de tu galería?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Seleccionar",
          onPress: () => {
            console.log("Abriendo galería...");
            // Aquí se implementará la lógica para abrir la galería
            // usando react-native-image-picker o similar
          },
        },
      ],
    );
  }, []);

  return {
    handleGalleryPick,
  };
};
