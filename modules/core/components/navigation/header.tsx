import React from "react";
import { View, TouchableOpacity, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "lucide-react-native";
import { useRouter } from "expo-router";
import { cn } from "@/lib/utils";
import { Text } from "../ui/text";

interface HeaderProps extends ViewProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

const Header = React.forwardRef<View, HeaderProps>(
  (
    {
      className,
      title,
      subtitle,
      showBackButton = false,
      onBackPress,
      leftAction,
      rightAction,
      transparent = false,
      ...props
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const handleBackPress = () => {
      if (onBackPress) {
        onBackPress();
      } else if (router.canGoBack()) {
        router.back();
      }
    };

    return (
      <View
        ref={ref}
        className={cn(
          "px-4 pb-3",
          !transparent && "bg-surface border-b border-border",
          className
        )}
        style={{ paddingTop: insets.top + 8 }}
        {...props}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            {showBackButton && !leftAction && (
              <TouchableOpacity
                onPress={handleBackPress}
                className="mr-3 p-2 -ml-2"
                activeOpacity={0.7}
              >
                <ChevronLeftIcon size={24} color="#1E293B" />
              </TouchableOpacity>
            )}
            {leftAction && <View className="mr-3">{leftAction}</View>}
            <View className="flex-1">
              {title && (
                <Text variant="h3" numberOfLines={1}>
                  {title}
                </Text>
              )}
              {subtitle && (
                <Text variant="caption" color="secondary" numberOfLines={1}>
                  {subtitle}
                </Text>
              )}
            </View>
          </View>
          {rightAction && <View className="ml-3">{rightAction}</View>}
        </View>
      </View>
    );
  }
);

Header.displayName = "Header";

export { Header };
