import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useCameraPermission as useVisionCameraPermission } from "react-native-vision-camera";

export const useCameraPermission = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const { hasPermission: hasCameraPermission, requestPermission } =
    useVisionCameraPermission();

  const requestCameraAccess = useCallback(async () => {
    if (!hasCameraPermission) {
      const permission = await requestPermission();
      if (!permission) {
        Alert.alert(
          "Permiso Requerido",
          "Se necesita acceso a la cámara para escanear documentos",
        );
        return false;
      }
      setHasPermission(true);
      return true;
    }
    setHasPermission(true);
    return true;
  }, [hasCameraPermission, requestPermission]);

  return {
    hasPermission: hasPermission || hasCameraPermission,
    requestCameraAccess,
  };
};
