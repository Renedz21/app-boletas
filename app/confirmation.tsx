import React, { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text } from "@/modules/core/components/ui/text";
import { Check } from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function ConfirmationScreen() {
  const router = useRouter();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Animate the success icon in
    scale.value = withSpring(1, { damping: 15, stiffness: 100 });
    opacity.value = withTiming(1, { duration: 500 });

    // Auto-redirect after 1.5 seconds
    const redirectTimer = setTimeout(() => {
      router.replace("/payment");
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        {/* Success Icon with Animation */}
        <Animated.View style={[iconStyle]} className="mb-8">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-primary-default">
            <Check size={48} color="#FFFFFF" strokeWidth={2} />
          </View>
        </Animated.View>

        {/* Success Message */}
        <Animated.View
          style={[contentStyle]}
          className="flex-col items-center gap-6"
        >
          <Text
            size="big"
            color="primary"
            className="text-center font-semibold"
          >
            ¡Registro completado!
          </Text>
          <Text size="lg" color="secondary" className="text-center">
            Tu cuenta ha sido creada con éxito. Serás redirigido
            automáticamente.
          </Text>
        </Animated.View>

        {/* Loading indicator (optional) */}
        <Animated.View style={[contentStyle]} className="mt-8">
          <View className="h-1 w-32 overflow-hidden rounded-full bg-gray-200">
            <View className="h-full w-full animate-pulse bg-primary-default" />
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
