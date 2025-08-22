import { useCallback, useState } from "react";
import { View, Dimensions, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { type CameraDevice, useCameraDevice } from "react-native-vision-camera";

// Custom hooks
import { useCameraPermission } from "@/modules/core/hooks/use-camera-permission";
import { useCameraControls } from "@/modules/core/hooks/use-camera-controls";
import { useScanMode } from "@/modules/core/hooks/use-scan-mode";
import { useImagePreview } from "@/modules/core/hooks/use-image-preview";
import { useGalleryPicker } from "@/modules/core/hooks/use-gallery-picker";
import { useNavigation } from "@/modules/core/hooks/use-navigation";

// Components
import { ScannerHeader } from "@/modules/core/components/scanner/scanner-header";
import { CameraPreview } from "@/modules/core/components/scanner/camera-preview";
import { PermissionRequest } from "@/modules/core/components/scanner/permission-request";
import { ScannerControls } from "@/modules/core/components/scanner/scanner-controls";
import { ImagePreviewFullscreen } from "@/modules/core/components/scanner/image-preview-fullscreen";
import { CameraError } from "@/modules/core/components/scanner/camera-error";
import AIAnalysisScreen from "./ai-analysis";

const { height: screenHeight } = Dimensions.get("window");
const cameraHeight = screenHeight * 0.7;

export default function ScannerScreen() {
  // Camera device - debe ir primero
  const device = useCameraDevice("back");

  // Custom hooks
  const { hasPermission, requestCameraAccess } = useCameraPermission();
  const {
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
  } = useCameraControls(device as CameraDevice);
  const { activeMode } = useScanMode();
  const {
    capturedPhoto,
    showPreview,
    showImagePreview,
    hideImagePreview,
    retakePhoto,
    confirmPhoto,
  } = useImagePreview();
  const { handleGalleryPick } = useGalleryPicker();
  const { handleBack } = useNavigation();

  const [isCapturing, setIsCapturing] = useState(false);

  // State for navigation
  const [currentView, setCurrentView] = useState<"scanner" | "ai-analysis">(
    "scanner",
  );
  const [imageForAnalysis, setImageForAnalysis] = useState<string>("");

  const handleCapture = useCallback(async () => {
    setIsCapturing(true);
    const photo = await capturePhoto();
    if (photo) {
      stopCamera(); // Stop camera to save resources
      showImagePreview(photo);
    }
    setIsCapturing(false);
  }, [capturePhoto, showImagePreview, stopCamera]);

  const handleRetake = useCallback(() => {
    hideImagePreview();
    startCamera(); // Restart camera when retaking
  }, [hideImagePreview, startCamera]);

  const handleNavigateToAnalysis = useCallback((imagePath: string) => {
    setImageForAnalysis(imagePath);
    setCurrentView("ai-analysis");
  }, []);

  const handleBackFromAnalysis = useCallback(() => {
    setCurrentView("scanner");
    setImageForAnalysis("");
  }, []);

  // Show AI Analysis screen
  if (currentView === "ai-analysis") {
    return (
      <AIAnalysisScreen
        imagePath={imageForAnalysis}
        onBack={handleBackFromAnalysis}
      />
    );
  }

  // Show error if no camera device
  if (device == null) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900">
        <CameraError message="No se pudo acceder a la cámara" />
      </SafeAreaView>
    );
  }

  // Show image preview instead of camera
  if (showPreview && capturedPhoto) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900">
        <ImagePreviewFullscreen
          imagePath={capturedPhoto.path}
          onRetake={handleRetake}
          onConfirm={() => confirmPhoto(handleNavigateToAnalysis)}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      {/* Header */}
      <ScannerHeader onBack={handleBack} />

      {/* Camera Preview Area */}
      <View className="mb-4 px-6">
        <View className="overflow-hidden rounded-2xl border border-gray-700 bg-gray-800">
          <View
            className="items-center justify-center bg-gray-900"
            style={{ height: cameraHeight }}
          >
            {!hasPermission ? (
              <PermissionRequest onRequestPermission={requestCameraAccess} />
            ) : (
              <CameraPreview
                device={device}
                camera={camera}
                flashEnabled={flashEnabled}
                activeMode={activeMode}
                isActive={isCameraActive}
                currentZoom={currentZoom}
                onZoomIn={zoomIn}
                onZoomOut={zoomOut}
                onResetZoom={resetZoom}
                gesture={zoomGesture}
              />
            )}
          </View>
        </View>
      </View>

      {/* Bottom Controls */}
      <ScannerControls
        onCapture={handleCapture}
        onGalleryPick={handleGalleryPick}
        isCapturing={isCapturing}
        flashEnabled={flashEnabled}
        onToggleFlash={toggleFlash}
      />
    </SafeAreaView>
  );
}
