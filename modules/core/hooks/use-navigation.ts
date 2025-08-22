import { useCallback } from "react";
import { useRouter } from "expo-router";

export const useNavigation = () => {
  const router = useRouter();
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    handleBack,
  };
};
