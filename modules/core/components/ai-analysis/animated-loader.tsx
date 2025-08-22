import { View } from "react-native";
import { Loader2 } from "lucide-react-native";
import Animated from "react-native-reanimated";
import { useLoaderAnimation } from "@/modules/core/hooks/use-loader-animation";

interface AnimatedLoaderProps {
  size?: number;
  color?: string;
  className?: string;
}

export const AnimatedLoader = ({
  size = 48,
  color = "#3B82F6",
  className = "mb-6 h-24 w-24",
}: AnimatedLoaderProps) => {
  const { animatedStyle } = useLoaderAnimation();

  return (
    <View
      className={`${className} items-center justify-center rounded-full bg-blue-500/20`}
    >
      <Animated.View style={animatedStyle}>
        <Loader2 size={size} color={color} />
      </Animated.View>
    </View>
  );
};
