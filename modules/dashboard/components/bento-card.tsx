import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@/modules/core/components/ui/text";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "success" | "warning";
  size?: "small" | "medium" | "large" | "wide" | "tall";
  onPress?: () => void;
  className?: string;
}

export const BentoCard = ({
  title,
  value,
  subtitle,
  icon,
  variant = "primary",
  size = "medium",
  onPress,
  className,
}: BentoCardProps) => {
  const variantConfig = {
    primary: {
      background: "bg-gradient-to-br from-blue-50 to-blue-100",
      border: "border-blue-200",
      text: "text-blue-700",
      iconBg: "bg-blue-200/50",
      shadow: "shadow-blue-100",
    },
    secondary: {
      background: "bg-gradient-to-br from-purple-50 to-purple-100",
      border: "border-purple-200", 
      text: "text-purple-700",
      iconBg: "bg-purple-200/50",
      shadow: "shadow-purple-100",
    },
    accent: {
      background: "bg-gradient-to-br from-teal-50 to-teal-100",
      border: "border-teal-200",
      text: "text-teal-700", 
      iconBg: "bg-teal-200/50",
      shadow: "shadow-teal-100",
    },
    success: {
      background: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      border: "border-emerald-200",
      text: "text-emerald-700",
      iconBg: "bg-emerald-200/50",
      shadow: "shadow-emerald-100",
    },
    warning: {
      background: "bg-gradient-to-br from-amber-50 to-amber-100",
      border: "border-amber-200",
      text: "text-amber-700",
      iconBg: "bg-amber-200/50",
      shadow: "shadow-amber-100",
    },
  };

  const sizeConfig = {
    small: { 
      height: "h-32", 
      padding: "p-4", 
      iconSize: "w-8 h-8",
      textSize: "text-2xl"
    },
    medium: { 
      height: "h-40", 
      padding: "p-5", 
      iconSize: "w-10 h-10",
      textSize: "text-3xl"
    },
    large: { 
      height: "h-52", 
      padding: "p-6", 
      iconSize: "w-12 h-12",
      textSize: "text-4xl"
    },
    wide: { 
      height: "h-36", 
      padding: "p-5", 
      iconSize: "w-10 h-10",
      textSize: "text-3xl"
    },
    tall: { 
      height: "h-60", 
      padding: "p-6", 
      iconSize: "w-12 h-12",
      textSize: "text-4xl"
    },
  };

  const config = variantConfig[variant];
  const sizeStyle = sizeConfig[size];
  
  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper onPress={onPress} activeOpacity={0.95}>
      <View className={cn(
        "flex-1 rounded-2xl border-2 shadow-lg",
        config.background,
        config.border,
        config.shadow,
        sizeStyle.height,
        sizeStyle.padding,
        "transform transition-all duration-200",
        className
      )}>
        {/* Header with icon */}
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1">
            <Text className={cn("text-sm font-semibold mb-1", config.text)}>
              {title}
            </Text>
            {subtitle && (
              <Text className="text-xs text-gray-600 leading-4 opacity-80">
                {subtitle}
              </Text>
            )}
          </View>
          {icon && (
            <View className={cn(
              "rounded-xl items-center justify-center ml-3 backdrop-blur-sm",
              config.iconBg,
              sizeStyle.iconSize
            )}>
              {icon}
            </View>
          )}
        </View>

        {/* Value */}
        <View className="flex-1 justify-end">
          <Text className={cn(
            "font-bold tracking-tight",
            config.text,
            sizeStyle.textSize
          )}>
            {value}
          </Text>
        </View>
      </View>
    </CardWrapper>
  );
};
