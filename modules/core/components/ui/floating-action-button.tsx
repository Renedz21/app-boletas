import React from "react";
import { TouchableOpacity, View, type ViewStyle } from "react-native";
import { PlusIcon } from "lucide-react-native";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: React.ReactNode;
  size?: "md" | "lg";
  position?: "bottom-right" | "bottom-left" | "bottom-center";
  className?: string;
  style?: ViewStyle;
}

export const FloatingActionButton = ({
  onPress,
  icon,
  size = "lg",
  position = "bottom-right",
  className,
  style,
}: FloatingActionButtonProps) => {
  const sizeClasses = {
    md: "w-14 h-14",
    lg: "w-16 h-16",
  };

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
  };

  const iconSize = size === "lg" ? 28 : 24;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={cn(
        "absolute z-50",
        positionClasses[position],
        className
      )}
      style={[
        {
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
        },
        style,
      ]}
    >
      <View
        className={cn(
          sizeClasses[size],
          "bg-primary-500 rounded-full items-center justify-center"
        )}
      >
        {icon || <PlusIcon size={iconSize} color="#FFFFFF" strokeWidth={2.5} />}
      </View>
    </TouchableOpacity>
  );
};
