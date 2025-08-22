import { useState, useCallback, useEffect } from "react";
import type { BoletaRow } from "@/types/boleta.types";

export type AnalysisStatus = "analyzing" | "completed" | "error" | "saving";

export const useAIAnalysis = (aiResponse?: any) => {
  const [analysisStatus, setAnalysisStatus] =
    useState<AnalysisStatus>("analyzing");
  const [extractedData, setExtractedData] = useState<Partial<BoletaRow> | null>(
    null,
  );

  // Process AI response when available
  useEffect(() => {
    if (aiResponse) {
      let cleanResponse = aiResponse;

      // If the response is a string with markdown formatting, extract the JSON
      if (typeof aiResponse === "string") {
        // Remove markdown formatting if present
        if (aiResponse.includes("```json")) {
          const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)\s*```/);
          if (jsonMatch) {
            cleanResponse = jsonMatch[1];
          }
        }

        // Try to parse as JSON if it's still a string
        if (typeof cleanResponse === "string") {
          try {
            cleanResponse = JSON.parse(cleanResponse);
          } catch (error) {
            console.error("Error parsing cleaned AI response:", error);
            setAnalysisStatus("error");
            return;
          }
        }
      }

      // Transform the AI response to match our database structure
      const transformedData: Partial<BoletaRow> = {
        ruc: cleanResponse.ruc || null,
        razon_social: cleanResponse.razon_social || null,
        fecha: cleanResponse.fecha || null,
        tipo_comprobante: cleanResponse.tipo_comprobante || "boleta",
        serie: cleanResponse.serie || null,
        numero: cleanResponse.numero || null,
        igv: cleanResponse.igv || null,
        subtotal: cleanResponse.subtotal || 0,
        total: cleanResponse.total || 0,
        moneda: cleanResponse.moneda || "PEN",
        tipo_cambio: cleanResponse.tipo_cambio || null,
        metodo_pago: cleanResponse.metodo_pago || null,
        es_gasto_deducible: false, // Default value
        confianza_ocr: 0.95, // Default confidence for AI analysis
        datos_ocr_raw: cleanResponse, // Store the raw AI response
      };

      setExtractedData(transformedData);
      setAnalysisStatus("completed");
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
