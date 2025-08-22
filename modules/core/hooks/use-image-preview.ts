import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useImageUpload } from "./use-upload";
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { uploadToSupabase } = useImageUpload();
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
    (
      onNavigateToAnalysis: (imagePath: string, aiResponse?: string) => void,
    ) => {
      if (!capturedPhoto) return;
      setShowConfirmation(true);
    },
    [capturedPhoto],
  );

  const handleProcessImage = useCallback(
    async (
      onNavigateToAnalysis: (imagePath: string, aiResponse?: string) => void,
    ) => {
      if (!capturedPhoto || isProcessing) return;

      setIsProcessing(true);

      try {
        const { imageUrl, success } = await uploadToSupabase(
          capturedPhoto.path,
        );

        if (!success || !imageUrl) {
          Alert.alert("Error", "Error al subir la imagen");
          setIsProcessing(false);
          return;
        }

        const aiResponse = await scanBoleta({
          detailLevel: "auto",
          imageInputUrl: imageUrl,
        });


        // Navigate to AI analysis screen with the AI response
        onNavigateToAnalysis(capturedPhoto.path, aiResponse);
        hideImagePreview();
        setShowConfirmation(false);
      } catch (error) {
        console.error("Error processing image:", error);
        Alert.alert("Error", "Error al procesar la imagen");
        setIsProcessing(false);
      }
    },
    [capturedPhoto, isProcessing, hideImagePreview],
  );

  const handleCancelConfirmation = useCallback(() => {
    setShowConfirmation(false);
    setIsProcessing(false);
  }, []);

  return {
    capturedPhoto,
    showPreview,
    isProcessing,
    showConfirmation,
    showImagePreview,
    hideImagePreview,
    retakePhoto,
    confirmPhoto,
    handleProcessImage,
    handleCancelConfirmation,
  };
};
