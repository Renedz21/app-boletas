import { supabase } from "@/lib/supabase";
import { useCallback, useState } from "react";
import * as FileSystem from "expo-file-system";

interface UploadState {
  isUploading: boolean;
  uploadProgress: number;
}

interface UploadResult {
  imageUrl: string | null;
  success: boolean;
}

export const useImageUpload = () => {
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    uploadProgress: 0,
  });

  const uploadToSupabase = useCallback(
    async (localImagePath: string): Promise<UploadResult> => {
      try {
        setState({ isUploading: true, uploadProgress: 0 });

        // Generate unique filename
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 15);
        const fileName = `boleta_${timestamp}_${randomId}.jpeg`;

        console.log(`Subiendo imagen: ${fileName}`);

        setState((prev) => ({ ...prev, uploadProgress: 20 }));

        // Read the local file as base64
        const base64Data = await FileSystem.readAsStringAsync(localImagePath, {
          encoding: FileSystem.EncodingType.Base64,
        });

        setState((prev) => ({ ...prev, uploadProgress: 50 }));

        // Convert base64 to Uint8Array for Supabase
        const binaryData = decodeBase64(base64Data);

        setState((prev) => ({ ...prev, uploadProgress: 70 }));

        // Upload using binary data
        const { error: uploadError } = await supabase.storage
          .from("boletas-images")
          .upload(fileName, binaryData, {
            contentType: "image/jpeg",
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        setState((prev) => ({ ...prev, uploadProgress: 90 }));

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from("boletas-images")
          .getPublicUrl(fileName);

        const imageUrl = publicUrlData.publicUrl;

        setState((prev) => ({ ...prev, uploadProgress: 100 }));

        console.log("Image uploaded successfully:", imageUrl);
        return { imageUrl, success: true };
      } catch (error) {
        console.error("Error al subir imagen:", error);
        return { imageUrl: null, success: false };
      } finally {
        setState({ isUploading: false, uploadProgress: 0 });
      }
    },
    [],
  );

  // Helper function to decode base64 to Uint8Array
  const decodeBase64 = (base64: string): Uint8Array => {
    try {
      // For React Native, we need to handle base64 differently
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    } catch (error) {
      console.error("Error decoding base64:", error);
      // Fallback: return empty array
      return new Uint8Array();
    }
  };

  return {
    ...state,
    uploadToSupabase,
  };
};
