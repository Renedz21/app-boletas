import { useCallback } from "react";

export const useNavigation = () => {
  const handleBack = useCallback(() => {
    console.log("Back navigation");
    // Aquí se implementará la lógica de navegación
    // usando react-navigation o similar
  }, []);

  return {
    handleBack,
  };
};
