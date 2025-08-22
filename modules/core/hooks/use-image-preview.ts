import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useImageUpload } from "./use-upload";
import { useImageStorage } from "./use-image-storage";
import { scanBoleta } from "@/modules/services/ai/scan-boleta";

interface CapturedPhoto {
  path: string;
  width: number;
  height: number;
}

export const useImagePreview = () => {
  const [capturedPhoto, setCapturedPhoto] = useState<CapturedPhoto | null>(
    null,
  );
  const [showPreview, setShowPreview] = useState(false);

  const { uploadToSupabase } = useImageUpload();
  const { saveImageLocally } = useImageStorage();

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

  const confirmPhoto = useCallback(
    async (
      onNavigateToAnalysis: (imagePath: string, aiResponse?: string) => void,
    ) => {
      if (!capturedPhoto) return;

      Alert.alert(
        "Captura Confirmada",
        "¿Deseas procesar esta imagen con IA para extraer la información?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Procesar",
            onPress: async () => {
              try {
                console.log("🤖 Procesando con IA...", capturedPhoto.path);

                // First, ensure the image is saved locally
                const storageResult = await saveImageLocally(
                  capturedPhoto.path,
                );
                if (!storageResult.success || !storageResult.localPath) {
                  Alert.alert(
                    "Error",
                    `No se pudo guardar la imagen: ${storageResult.error}`,
                  );
                  return;
                }

                // Upload to Supabase
                const { imageUrl, success } = await uploadToSupabase(
                  storageResult.localPath,
                );

                if (!success || !imageUrl) {
                  Alert.alert("Error", "Error al subir la imagen");
                  return;
                }

                // Process with AI
                const aiResponse = await scanBoleta({
                  detailLevel: "auto",
                  imageInputUrl: imageUrl,
                });

                console.log("🤖 AI Response received:", aiResponse);

                // Navigate to AI analysis screen with the AI response
                onNavigateToAnalysis(storageResult.localPath, aiResponse);
                hideImagePreview();
              } catch (error) {
                console.error("Error processing image:", error);
                Alert.alert("Error", "Error al procesar la imagen");
              }
            },
          },
        ],
      );
    },
    [capturedPhoto, hideImagePreview, uploadToSupabase, saveImageLocally],
  );

  return {
    capturedPhoto,
    showPreview,
    showImagePreview,
    hideImagePreview,
    retakePhoto,
    confirmPhoto,
  };
};
