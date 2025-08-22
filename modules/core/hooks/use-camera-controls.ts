import { useState, useCallback, useRef } from "react";
import { Alert } from "react-native";
import type {
  CameraDevice,
  Camera as CameraType,
} from "react-native-vision-camera";
import { useCameraFocusZoom } from "./use-camera-focus-zoom";
import { useCameraCapture } from "./use-camera-capture";

export const useCameraControls = (device: CameraDevice) => {
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const camera = useRef<CameraType>(null);

  const { currentZoom, setZoom, resetZoom, zoomGesture } = useCameraFocusZoom({
    device,
  });

  const { isCapturing, capturePhoto } = useCameraCapture({
    camera,
    flashEnabled,
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
    isCapturing,
    // Zoom controls
    currentZoom,
    zoomIn,
    zoomOut,
    resetZoom,
    zoomGesture,
  };
};
