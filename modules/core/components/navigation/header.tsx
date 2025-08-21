import React from "react";
import { View, TouchableOpacity, type ViewProps } from "react-native";
import { ChevronLeftIcon } from "lucide-react-native";
import { useRouter } from "expo-router";
import { cn } from "@/lib/utils";
import { Text } from "../ui/text";

interface HeaderProps extends ViewProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  leftComponent?: React.ReactNode;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

const Header = ({
  className,
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  leftComponent,
  rightAction,
  transparent = false,
  ...props
}: HeaderProps) => {
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View className={cn("h-16", className)} {...props}>
      <View className="flex-row items-center justify-between">
        {leftComponent && <View className="mr-3">{leftComponent}</View>}
        {rightAction && <View className="ml-3">{rightAction}</View>}
      </View>
    </View>
  );
};

Header.displayName = "Header";

export { Header };
