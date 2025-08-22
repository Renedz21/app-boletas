import { useState, useCallback, useEffect } from "react";
import type { BoletaRow } from "@/types/boleta.types";

export type AnalysisStatus = "analyzing" | "completed" | "error" | "saving";

export const useAIAnalysis = (aiResponse?: string) => {
  const [analysisStatus, setAnalysisStatus] =
    useState<AnalysisStatus>("analyzing");
  const [extractedData, setExtractedData] = useState<Partial<BoletaRow> | null>(
    null,
  );

  // Process AI response when available
  useEffect(() => {
    if (aiResponse) {
      try {
        // Parse the AI response JSON
        const parsedData = JSON.parse(aiResponse);

        // Transform the AI response to match our database structure
        const transformedData: Partial<BoletaRow> = {
          ruc: parsedData.ruc || null,
          razon_social: parsedData.razon_social || null,
          fecha: parsedData.fecha || null,
          tipo_comprobante: parsedData.tipo_comprobante || "boleta",
          serie: parsedData.serie || null,
          numero: parsedData.numero || null,
          igv: parsedData.igv || null,
          subtotal: parsedData.subtotal || 0,
          total: parsedData.total || 0,
          moneda: parsedData.moneda || "PEN",
          tipo_cambio: parsedData.tipo_cambio || null,
          metodo_pago: parsedData.metodo_pago || null,
          es_gasto_deducible: false, // Default value
          confianza_ocr: 0.95, // Default confidence for AI analysis
          datos_ocr_raw: parsedData, // Store the raw AI response
        };

        setExtractedData(transformedData);
        setAnalysisStatus("completed");
      } catch (error) {
        console.error("Error parsing AI response:", error);
        setAnalysisStatus("error");
        // Set some default data even on error to show something to the user
        setExtractedData({
          ruc: "Error en análisis",
          razon_social: "No se pudo extraer",
          fecha: new Date().toISOString().split("T")[0],
          total: 0,
          tipo_comprobante: "boleta",
          subtotal: 0,
          moneda: "PEN",
          es_gasto_deducible: false,
          confianza_ocr: 0,
          datos_ocr_raw: { error: "Error parsing AI response" },
        });
      }
    } else {
      // Fallback to mock data if no AI response
      const timer = setTimeout(() => {
        setAnalysisStatus("completed");
        setExtractedData({
          ruc: "20123456789",
          razon_social: "Supermercado Central S.A.C.",
          fecha: "2024-12-15",
          total: 157.5,
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
            bounding_boxes: [],
          },
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [aiResponse]);

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
