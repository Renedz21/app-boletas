import { useCallback } from "react";
import * as FileSystem from "expo-file-system";

interface ImageStorageResult {
  success: boolean;
  localPath: string | null;
  error?: string;
}

export const useImageStorage = () => {
  const saveImageLocally = useCallback(
    async (imageUri: string): Promise<ImageStorageResult> => {
      try {
        // Generate unique filename
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 15);
        const fileName = `boleta_${timestamp}_${randomId}.jpeg`;

        // Ensure documents directory exists
        const documentsDir = FileSystem.documentDirectory;
        if (!documentsDir) {
          return {
            success: false,
            localPath: null,
            error: "Documents directory not accessible",
          };
        }

        // Save to documents directory
        const localFilePath = `${documentsDir}${fileName}`;

        // Copy the image to local storage
        await FileSystem.copyAsync({
          from: imageUri,
          to: localFilePath,
        });

        // Verify file was created
        const fileInfo = await FileSystem.getInfoAsync(localFilePath);
        if (!fileInfo.exists) {
          return {
            success: false,
            localPath: null,
            error: "File was not created successfully",
          };
        }

        console.log(
          "Image saved locally:",
          localFilePath,
          "Size:",
          fileInfo.size,
        );

        return {
          success: true,
          localPath: localFilePath,
        };
      } catch (error) {
        console.error("Error saving image locally:", error);
        return {
          success: false,
          localPath: null,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    },
    [],
  );

  const deleteLocalImage = useCallback(
    async (localPath: string): Promise<boolean> => {
      try {
        await FileSystem.deleteAsync(localPath);
        return true;
      } catch (error) {
        console.error("Error deleting local image:", error);
        return false;
      }
    },
    [],
  );

  const getImageInfo = useCallback(async (localPath: string) => {
    try {
      return await FileSystem.getInfoAsync(localPath);
    } catch (error) {
      console.error("Error getting image info:", error);
      return null;
    }
  }, []);

  return {
    saveImageLocally,
    deleteLocalImage,
    getImageInfo,
  };
};
