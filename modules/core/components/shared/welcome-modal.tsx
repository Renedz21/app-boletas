import React, { useEffect } from "react";
import { View, Modal, Dimensions } from "react-native";
import { Text } from "@/modules/core/components/ui/text";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Check } from "lucide-react-native";
import { Button } from "../ui/button";

const { height: screenHeight } = Dimensions.get("window");

interface WelcomeModalProps {
  visible: boolean;
  onClose: () => void;
  onGoHome: () => void;
}

export function WelcomeModal({
  visible,
  onClose,
  onGoHome,
}: WelcomeModalProps) {
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    if (visible) {
      // Animate in
      translateY.value = withSpring(0, { damping: 15, stiffness: 100 });
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSpring(1, { damping: 15, stiffness: 100 });
    } else {
      // Animate out
      translateY.value = withTiming(screenHeight, { duration: 300 });
      opacity.value = withTiming(0, { duration: 200 });
      scale.value = withTiming(0.8, { duration: 200 });
    }
  }, [visible]);

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleGoHome = () => {
    onGoHome();
    onClose();
  };

  // Debug log

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center">
        {/* Background Overlay */}
        <Animated.View
          style={[backgroundStyle]}
          className="absolute inset-0 bg-black/50"
        />

        {/* Modal Content */}
        <Animated.View
          style={[modalStyle]}
          className="mx-6 rounded-3xl bg-white p-8 shadow-2xl"
        >
          {/* Success Icon */}
          <View className="flex-col items-center">
            <View className="relative">
              {/* Main Circle */}
              <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-primary-default">
                <Check size={40} color="#FFFFFF" strokeWidth={2} />
              </View>
            </View>
          </View>

          {/* Success Message */}
          <View className="flex-col gap-6">
            <Text
              size="big"
              color={"primary"}
              className="text-center font-semibold"
            >
              Registro completado
            </Text>
            <Text size="lg" color={"secondary"} className="text-center">
              Tu cuenta ha sido creada con éxito.
            </Text>
            {/* Action Button */}
            <Button
              onPress={handleGoHome}
              activeOpacity={0.8}
              title="Continuar"
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
