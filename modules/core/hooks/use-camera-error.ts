import { useState, useCallback } from "react";

export const useCameraError = () => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const setError = useCallback((message: string) => {
    setErrorMessage(message);
    setHasError(true);
  }, []);

  const clearError = useCallback(() => {
    setHasError(false);
    setErrorMessage("");
  }, []);

  return {
    hasError,
    errorMessage,
    setError,
    clearError,
  };
};
