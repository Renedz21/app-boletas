import { cn } from "@/lib/utils";
import { View, type ViewProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

interface ProgressBarProps extends ViewProps {
  progress: number; // 0-100
}

const ProgressBar = ({ progress, className, ...props }: ProgressBarProps) => {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  const animatedWidth = useSharedValue(0);

  useEffect(() => {
    animatedWidth.value = withTiming(normalizedProgress, {
      duration: 300,
    });
  }, [normalizedProgress, animatedWidth]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${animatedWidth.value}%`,
  }));

  return (
    <View
      className={cn(
        "bg-neutral-secondary h-4 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <Animated.View
        className="bg-primary-default h-full rounded-full"
        style={progressStyle}
      />
    </View>
  );
};

export { ProgressBar };
