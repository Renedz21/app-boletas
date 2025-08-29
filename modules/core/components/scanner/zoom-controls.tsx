import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@/modules/core/components/ui/text";
import { cn } from "@/lib/utils";

interface ZoomControlsProps {
  minZoom: number;
  maxZoom: number;
  currentZoom: number;
  onSetZoom: (zoom: number) => void;
}

export const ZoomControls = ({
  minZoom,
  maxZoom,
  currentZoom,
  onSetZoom,
}: ZoomControlsProps) => {
  // Helper function to determine if a zoom level is active
  const isZoomActive = (targetZoom: number) => {
    return Math.abs(currentZoom - targetZoom) < 0.1; // Tolerance for floating point comparison
  };
  return (
    <View className="absolute inset-x-8 bottom-[15%]">
      <View className="flex-row items-center justify-center gap-3 rounded-full bg-black/50 p-2">
        <TouchableOpacity
          className="h-10 w-10 items-center justify-center rounded-full border border-gray-400"
          onPress={() => onSetZoom(1)}
        >
          <Text
            className={cn(
              "text-sm font-bold",
              isZoomActive(1) ? "text-yellow-400" : "text-white",
            )}
          >
            1x
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="h-10 w-10 items-center justify-center rounded-full border border-gray-400"
          onPress={() => onSetZoom(2)}
          disabled={2 > maxZoom}
        >
          <Text
            className={cn(
              "text-sm font-bold",
              isZoomActive(2) ? "text-yellow-400" : "text-white",
            )}
          >
            2x
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="h-10 w-10 items-center justify-center rounded-full border border-gray-400"
          onPress={() => onSetZoom(3)}
          disabled={3 > maxZoom}
        >
          <Text
            className={cn(
              "text-sm font-bold",
              isZoomActive(3) ? "text-yellow-400" : "text-white",
            )}
          >
            3x
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
