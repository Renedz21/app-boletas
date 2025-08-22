import { useCallback } from "react";
import { Alert } from "react-native";
import type { BoletaRow } from "@/types/boleta.types";
import { useSupabaseBoleta } from "./use-supabase-boleta";

export const useBoletaSave = (imagePath: string, onBack: () => void) => {
  const { loading, error: supabaseError, insertBoleta } = useSupabaseBoleta();

  const handleSaveToSupabase = useCallback(async (extractedData: Partial<BoletaRow> | null) => {
    if (!extractedData) return;

    try {
      // Prepare data for insertion (exclude fields that will be auto-generated)
      const dataToInsert = {
        ruc: extractedData.ruc!,
        razon_social: extractedData.razon_social!,
        fecha: extractedData.fecha!,
        total: extractedData.total!,
        tipo_comprobante: extractedData.tipo_comprobante!,
        serie: extractedData.serie,
        numero: extractedData.numero,
        igv: extractedData.igv,
        subtotal: extractedData.subtotal!,
        moneda: extractedData.moneda!,
        tipo_cambio: extractedData.tipo_cambio,
        es_gasto_deducible: extractedData.es_gasto_deducible!,
        metodo_pago: extractedData.metodo_pago,
        ubicacion: extractedData.ubicacion,
        confianza_ocr: extractedData.confianza_ocr,
        datos_ocr_raw: extractedData.datos_ocr_raw,
        imagen_url: imagePath, // Store the image path
        revisado_manualmente: false,
      };

      const result = await insertBoleta(dataToInsert);

      if (result) {
        Alert.alert(
          "Éxito",
          "Boleta guardada exitosamente en la base de datos",
          [
            {
              text: "OK",
              onPress: onBack, // Return to scanner
            },
          ]
        );
        return true;
      } else {
        return false;
      }
    } catch (err) {
      Alert.alert("Error", "No se pudo guardar la boleta");
      return false;
    }
  }, [insertBoleta, imagePath, onBack]);

  return {
    loading,
    supabaseError,
    handleSaveToSupabase,
  };
};
