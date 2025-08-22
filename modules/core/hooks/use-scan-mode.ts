import { useState } from "react";

export type ScanMode = "qr" | "boleta" | "factura" | "nota_credito";

export const useScanMode = () => {
  const [activeMode, setActiveMode] = useState<ScanMode>("qr");

  const setMode = (mode: ScanMode) => {
    setActiveMode(mode);
  };

  return {
    activeMode,
    setMode,
  };
};
