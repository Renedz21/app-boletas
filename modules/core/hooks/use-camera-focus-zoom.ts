import { useCallback, useState, useEffect, useRef } from "react";
import { Gesture } from "react-native-gesture-handler";
import { useSharedValue, runOnJS, interpolate, Extrapolation } from "react-native-reanimated";
import type { CameraDevice } from "react-native-vision-camera";

interface UseCameraFocusZoomProps {
  device: CameraDevice;
}

export const useCameraFocusZoom = ({ device }: UseCameraFocusZoomProps) => {
  const [currentZoom, setCurrentZoom] = useState(device?.neutralZoom || 1);
  const zoom = useSharedValue(device?.neutralZoom || 1);
  const zoomOffset = useSharedValue(0);

  // Sincronizar zoom inicial cuando el device cambie
  useEffect(() => {
    if (device?.neutralZoom) {
      setCurrentZoom(device.neutralZoom);
      zoom.value = device.neutralZoom;
      zoomOffset.value = 0;
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
      zoom.value = clampedZoom;
    },
    [device, zoom],
  );

  const resetZoom = useCallback(() => {
    if (!device) return;
    const neutralZoom = device.neutralZoom || 1;
    setCurrentZoom(neutralZoom);
    zoom.value = neutralZoom;
    zoomOffset.value = 0;
  }, [device, zoom, zoomOffset]);

  const zoomGesture = Gesture.Pinch()
    .onBegin(() => {
      zoomOffset.value = zoom.value;
    })
    .onUpdate((event) => {
      if (!device) return;
      
      // Apply logarithmic scale conversion for better UX
      const baseZoom = zoomOffset.value;
      const linearScale = baseZoom ** 2;
      const newLinearScale = linearScale * event.scale;
      const newZoom = Math.sqrt(Math.max(0.1, newLinearScale));
      
      // Use interpolate to clamp and smooth the zoom
      const clampedZoom = interpolate(
        newZoom,
        [device.minZoom, device.maxZoom],
        [device.minZoom, device.maxZoom],
        Extrapolation.CLAMP,
      );
      
      zoom.value = clampedZoom;
      runOnJS(setCurrentZoom)(clampedZoom);
    });

  return {
    currentZoom,
    setZoom,
    resetZoom,
    zoomGesture,
    zoom, // SharedValue para usar con useAnimatedProps
  };
};
