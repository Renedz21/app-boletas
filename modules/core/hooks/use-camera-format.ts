import { useCameraFormat } from "react-native-vision-camera";
import type { CameraDevice } from "react-native-vision-camera";

interface UseCameraFormatForPhotosProps {
  device: CameraDevice | undefined;
}

/**
 * Hook para obtener un formato de cámara optimizado para tomar fotos de alta calidad
 */
export const useCameraFormatForPhotos = ({
  device,
}: UseCameraFormatForPhotosProps) => {
  const format = useCameraFormat(device, [
    // Priorizar máxima resolución de foto
    { photoResolution: "max" },
    // Asegurar resolución mínima decente para preview
    { videoResolution: { width: 1280, height: 720 } },
    // HDR si está disponible
    { photoHdr: true },
  ]);

  return format;
};
