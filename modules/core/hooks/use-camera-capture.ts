import { useCallback, useState } from "react";
import { Alert } from "react-native";
import type { Camera as CameraType } from "react-native-vision-camera";

interface UseCameraCaptureProps {
  camera: React.RefObject<CameraType | null>;
  flashEnabled: boolean;
}

export const useCameraCapture = ({
  camera,
  flashEnabled,
}: UseCameraCaptureProps) => {
  const [isCapturing, setIsCapturing] = useState(false);

  const capturePhoto = useCallback(async () => {
    if (!camera.current) {
      Alert.alert("Error", "Cámara no disponible");
      return null;
    }

    try {
      setIsCapturing(true);

      const photo = await camera.current.takePhoto({
        flash: flashEnabled ? "on" : "off",
        quality: 0.8, // Good quality for documents
        skipProcessing: false, // Process the image for better quality
      });

      console.log("Foto capturada exitosamente:", photo.path);
      return photo;
    } catch (error) {
      console.error("Error al tomar foto:", error);
      Alert.alert("Error", "No se pudo tomar la foto");
      return null;
    } finally {
      setIsCapturing(false);
    }
  }, [camera, flashEnabled]);

  return {
    isCapturing,
    capturePhoto,
  };
};
