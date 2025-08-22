import { useState, useCallback, useRef } from "react";
import { Alert } from "react-native";
import type {
  CameraDevice,
  Camera as CameraType,
} from "react-native-vision-camera";
import { useCameraFocusZoom } from "./use-camera-focus-zoom";

export const useCameraControls = (device: CameraDevice) => {
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const camera = useRef<CameraType>(null);

  const { currentZoom, setZoom, resetZoom, zoomGesture } = useCameraFocusZoom({
    device,
  });

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
    if (!camera.current) {
      Alert.alert("Error", "Cámara no disponible");
      return null;
    }

    try {
      const photo = await camera.current.takePhoto();
      return photo;
    } catch (error) {
      Alert.alert("Error", "No se pudo tomar la foto");
      return null;
    }
  }, []);

  const zoomIn = useCallback(() => {
    setZoom(currentZoom * 1.2);
  }, [currentZoom, setZoom]);

  const zoomOut = useCallback(() => {
    setZoom(currentZoom / 1.2);
  }, [currentZoom, setZoom]);

  return {
    flashEnabled,
    isCameraActive,
    camera,
    toggleFlash,
    stopCamera,
    startCamera,
    capturePhoto,
    // Zoom controls
    currentZoom,
    zoomIn,
    zoomOut,
    resetZoom,
    zoomGesture,
  };
};
