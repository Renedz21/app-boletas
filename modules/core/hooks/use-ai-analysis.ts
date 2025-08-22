import { useState, useCallback, useEffect } from "react";
import type { BoletaRow } from "@/types/boleta.types";

export type AnalysisStatus = "analyzing" | "completed" | "error" | "saving";

export const useAIAnalysis = () => {
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>("analyzing");
  const [extractedData, setExtractedData] = useState<Partial<BoletaRow> | null>(null);

  // Simulate AI analysis with real database structure
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setAnalysisStatus("completed");
      setExtractedData({
        ruc: "20123456789",
        razon_social: "Supermercado Central S.A.C.",
        fecha: "2024-12-15",
        total: 157.50,
        tipo_comprobante: "boleta",
        serie: "B001",
        numero: "00012345",
        igv: 28.35,
        subtotal: 129.15,
        moneda: "PEN",
        tipo_cambio: 1.0,
        es_gasto_deducible: false,
        metodo_pago: "efectivo",
        ubicacion: "Lima, Perú",
        confianza_ocr: 0.95,
        datos_ocr_raw: {
          raw_text: "Texto extraído del OCR...",
          confidence: 0.95,
          bounding_boxes: []
        }
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const setStatus = useCallback((status: AnalysisStatus) => {
    setAnalysisStatus(status);
  }, []);

  const resetAnalysis = useCallback(() => {
    setAnalysisStatus("analyzing");
    setExtractedData(null);
  }, []);

  return {
    analysisStatus,
    extractedData,
    setStatus,
    resetAnalysis,
  };
};
