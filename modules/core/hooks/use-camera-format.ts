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
    { photoResolution: "max" },
    { photoHdr: true },
  ]);

  return format;
};
