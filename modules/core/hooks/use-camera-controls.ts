import { useState, useCallback, useRef } from "react";
import { Alert } from "react-native";
import type { Camera as CameraType } from "react-native-vision-camera";

export const useCameraControls = () => {
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const camera = useRef<CameraType>(null);

  const toggleFlash = useCallback(() => {
    setFlashEnabled((prev) => !prev);
  }, []);

  const stopCamera = useCallback(() => {
    setIsCameraActive(false);
  }, []);

  const startCamera = useCallback(() => {
    setIsCameraActive(true);
  }, []);

  const capturePhoto = useCallback(async () => {
    if (camera.current == null) {
      Alert.alert("Error", "Cámara no disponible");
      return null;
    }

    try {
      const photo = await camera.current.takePhoto({
        flash: flashEnabled ? "on" : "off",
      });

      return photo;
    } catch (error) {
      console.error("Error al tomar foto:", error);
      Alert.alert("Error", "No se pudo tomar la foto");
      return null;
    }
  }, [flashEnabled]);

  return {
    flashEnabled,
    isCameraActive,
    camera,
    toggleFlash,
    stopCamera,
    startCamera,
    capturePhoto,
  };
};
