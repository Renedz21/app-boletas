import { useState, useCallback } from "react";
import { Alert } from "react-native";

interface CapturedPhoto {
  path: string;
  width: number;
  height: number;
}

export const useImagePreview = () => {
  const [capturedPhoto, setCapturedPhoto] = useState<CapturedPhoto | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const showImagePreview = useCallback((photo: CapturedPhoto) => {
    setCapturedPhoto(photo);
    setShowPreview(true);
  }, []);

  const hideImagePreview = useCallback(() => {
    setShowPreview(false);
    setCapturedPhoto(null);
  }, []);

  const retakePhoto = useCallback(() => {
    hideImagePreview();
  }, [hideImagePreview]);

  const confirmPhoto = useCallback((onNavigateToAnalysis: (imagePath: string) => void) => {
    if (!capturedPhoto) return;

    Alert.alert(
      "Captura Confirmada",
      "¿Deseas procesar esta imagen con IA para extraer la información?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Procesar",
          onPress: () => {
            console.log("🤖 Procesando con IA...", capturedPhoto.path);
            // Navigate to AI analysis screen
            onNavigateToAnalysis(capturedPhoto.path);
            hideImagePreview();
          },
        },
      ]
    );
  }, [capturedPhoto, hideImagePreview]);

  return {
    capturedPhoto,
    showPreview,
    showImagePreview,
    hideImagePreview,
    retakePhoto,
    confirmPhoto,
  };
};
