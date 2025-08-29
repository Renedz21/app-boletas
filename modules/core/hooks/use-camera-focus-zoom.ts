import { useCallback, useState, useEffect } from "react";
import { Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import type { CameraDevice } from "react-native-vision-camera";

interface UseCameraFocusZoomProps {
  device: CameraDevice;
}

export const useCameraFocusZoom = ({ device }: UseCameraFocusZoomProps) => {
  const [currentZoom, setCurrentZoom] = useState(device?.neutralZoom || 1);

  // Sincronizar zoom inicial cuando el device cambie
  useEffect(() => {
    if (device?.neutralZoom) {
      setCurrentZoom(device.neutralZoom);
    }
  }, [device]);

  const setZoom = useCallback(
    (zoomLevel: number) => {
      if (!device) return;
      const clampedZoom = Math.max(
        device.minZoom,
        Math.min(device.maxZoom, zoomLevel),
      );
      setCurrentZoom(clampedZoom);
    },
    [device],
  );

  const resetZoom = useCallback(() => {
    if (!device) return;
    setCurrentZoom(device.neutralZoom || 1);
  }, [device]);

  const zoomGesture = Gesture.Pinch().onUpdate((event) => {
    const newZoom = currentZoom * event.scale;
    runOnJS(setZoom)(newZoom);
  });

  return {
    currentZoom,
    setZoom,
    resetZoom,
    zoomGesture,
  };
};
