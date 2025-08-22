import React from "react";
import { View } from "react-native";
import { Text } from "@/modules/core/components/ui/text";

interface UploadProgressProps {
  isUploading: boolean;
  progress: number;
}

export const UploadProgress = ({
  isUploading,
  progress,
}: UploadProgressProps) => {
  if (!isUploading) return null;

  return (
    <View className="absolute inset-0 z-30 items-center justify-center bg-black/50">
      <View className="rounded-2xl bg-gray-800 p-6">
        <Text className="mb-4 text-center text-lg font-bold text-white">
          Subiendo imagen...
        </Text>

        <View className="h-2 w-48 overflow-hidden rounded-full bg-gray-700">
          <View
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </View>

        <Text className="mt-2 text-center text-sm text-gray-400">
          {progress}%
        </Text>
      </View>
    </View>
  );
};
