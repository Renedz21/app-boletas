import openai from "@/lib/openai";

type ScanBoletaRequest = {
  imageInputUrl: string;
  detailLevel: "low" | "auto" | "high";
};

const prompt = `
Analiza esta imagen de una boleta electrónica peruana y extrae la siguiente información en formato JSON:
{
  "ruc": "RUC de la empresa emisora",
  "razon_social": "Nombre de la empresa",
  "fecha": "Fecha de emisión (YYYY-MM-DD)",
  "serie": "serie del comprobante (opcional)",
  "numero": "número del comprobante (opcional)",
  "subtotal": número sin IGV,
  "igv": monto del IGV (opcional),
  "total": monto total,
  "moneda": "moneda del comprobante (PEN, USD, EUR)",
  "tipo_cambio": tipo de cambio si aplica (opcional),
  "metodo_pago": "método de pago utilizado (efectivo, tarjeta_debito, tarjeta_credito, transferencia, yape, plin, otro) (opcional)
}

IMPORTANTE:
- Solo responde con el JSON válido, sin texto adicional
- Si no encuentras algún campo opcional, usa null
- Asegúrate de que los números sean números, no strings
- La fecha debe estar en formato YYYY-MM-DD
- Los campos deben coincidir exactamente con los nombres especificados`;

export const scanBoleta = async (
  request: ScanBoletaRequest,
): Promise<string> => {
  try {
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: prompt },
            {
              type: "input_image",
              image_url: request.imageInputUrl,
              detail: request.detailLevel,
            },
          ],
        },
      ],
    });
    return response.output_text;
  } catch (error) {
    return "";
  }
};
