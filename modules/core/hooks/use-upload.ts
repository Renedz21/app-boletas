import { useCallback, useState } from "react";
import { supabase } from "@/lib/supabase";
import * as FileSystem from "expo-file-system";

interface UploadState {
  isUploading: boolean;
  uploadProgress: number;
}

interface ImageInfo {
  size: number;
  width?: number;
  height?: number;
  type: string;
}

interface UploadResult {
  imageUrl: string | null;
  success: boolean;
  fileName: string;
}

export const useImageUpload = () => {
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    uploadProgress: 0,
  });

  const validateImage = async (imageUri: string): Promise<ImageInfo> => {
    try {
      // Handle native file paths from React Native Vision Camera
      let fileInfo;

      if (imageUri.startsWith("/data/") || imageUri.startsWith("/storage/")) {
        // Native Android path - convert to file:// URI
        const fileUri = `file://${imageUri}`;
        fileInfo = await FileSystem.getInfoAsync(fileUri);
      } else {
        // Regular URI (file://, content://, etc.)
        fileInfo = await FileSystem.getInfoAsync(imageUri);
      }

      if (!fileInfo.exists) {
        throw new Error("Archivo no encontrado");
      }

      const maxSize = 10 * 1024 * 1024; // 10MB limit
      if (fileInfo.size && fileInfo.size > maxSize) {
        throw new Error("La imagen es demasiado grande (máximo 10MB)");
      }

      return {
        size: fileInfo.size || 0,
        type: "image/jpeg",
      };
    } catch (error) {
      console.error("Error al validar imagen:", error);
      throw error;
    }
  };

  // Generate unique filename with better format
  const generateFileName = (): string => {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 10);
    return `boletas/${timestamp}_${randomId}.jpeg`;
  };

  const uploadAsBlob = async (imageUri: string): Promise<UploadResult> => {
    try {
      // Handle native file paths from React Native Vision Camera
      let actualImageUri = imageUri;
      if (imageUri.startsWith("/data/") || imageUri.startsWith("/storage/")) {
        actualImageUri = `file://${imageUri}`;
      }

      const fileName = generateFileName();

      // Read file as base64 first
      const base64Data = await FileSystem.readAsStringAsync(actualImageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Convert base64 to Uint8Array for Supabase
      // Use Buffer if available, otherwise fallback to manual conversion
      let array: Uint8Array;

      if (typeof Buffer !== "undefined") {
        // Node.js environment
        array = Buffer.from(base64Data, "base64");
      } else {
        // React Native environment - manual conversion
        const bytes = atob(base64Data);
        array = new Uint8Array(bytes.length);
        for (let i = 0; i < bytes.length; i++) {
          array[i] = bytes.charCodeAt(i);
        }
      }

      // Upload the binary data to Supabase
      const { data, error: uploadError } = await supabase.storage
        .from("boletas-images")
        .upload(fileName, array, {
          contentType: "image/jpeg",
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("boletas-images").getPublicUrl(fileName);

      return {
        imageUrl: publicUrl,
        success: true,
        fileName: fileName,
      };
    } catch (error) {
      console.error("Error al subir imagen:", error);
      throw error;
    }
  };

  const uploadToSupabase = useCallback(
    async (imageUri: string, maxRetries: number = 3): Promise<UploadResult> => {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          setState({ isUploading: true, uploadProgress: 0 });

          // Validate image
          const imageInfo = await validateImage(imageUri);
          const imageSizeKB = Math.round(imageInfo.size / 1024);


          setState((prev) => ({ ...prev, uploadProgress: 20 }));

          // Try blob method first (more reliable)
          const result = await uploadAsBlob(imageUri);

          setState((prev) => ({ ...prev, uploadProgress: 100 }));

          console.log("✅ Image uploaded successfully");

          return result;
        } catch (error) {
          console.error(`❌ Upload attempt ${attempt} failed:`, error);

          if (attempt === maxRetries) {
            break;
          }

          // Wait before retry (exponential backoff)
          const waitTime = Math.pow(2, attempt) * 1000;
          await new Promise((resolve) => setTimeout(resolve, waitTime));
        }
      }

      setState((prev) => ({
        ...prev,
        isUploading: false,
        uploadProgress: 0,
      }));

      return {
        imageUrl: null,
        success: false,
        fileName: "",
      };
    },
    [],
  );

  return {
    ...state,
    uploadToSupabase,
  };
};
