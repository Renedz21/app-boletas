import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@/modules/core/components/ui/text";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react-native";

interface ZoomControlsProps {
  currentZoom: number;
  minZoom: number;
  maxZoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export const ZoomControls = ({
  currentZoom,
  minZoom,
  maxZoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}: ZoomControlsProps) => {
  const zoomPercentage = Math.round(
    ((currentZoom - minZoom) / (maxZoom - minZoom)) * 100,
  );

  return (
    <View className="absolute inset-x-10 bottom-[15%] z-20">
      <View className="flex-row items-center justify-between gap-4 rounded-2xl bg-black/60 p-3">
        <TouchableOpacity
          className="h-12 w-12 items-center justify-center rounded-full bg-white/20 active:bg-white/30"
          onPress={onZoomIn}
          disabled={currentZoom >= maxZoom}
        >
          <ZoomIn size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-black/40">
          <Text className="text-sm font-bold text-white">
            {zoomPercentage}%
          </Text>
        </View>

        <TouchableOpacity
          className="h-12 w-12 items-center justify-center rounded-full bg-white/20 active:bg-white/30"
          onPress={onZoomOut}
          disabled={currentZoom <= minZoom}
        >
          <ZoomOut size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          className="h-12 w-12 items-center justify-center rounded-full bg-blue-600 active:bg-blue-700"
          onPress={onResetZoom}
        >
          <RotateCcw size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
