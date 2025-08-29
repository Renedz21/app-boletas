import React from "react";
import { View } from "react-native";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoGridItemProps {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large" | "wide" | "tall";
}

export const BentoGrid = ({ children, className }: BentoGridProps) => {
  return (
    <View className={cn("flex-1 gap-4", className)}>
      {children}
    </View>
  );
};

export const BentoGridItem = ({ 
  children, 
  className, 
  size = "medium" 
}: BentoGridItemProps) => {
  const sizeClasses = {
    small: "h-32",
    medium: "h-40", 
    large: "h-52",
    wide: "h-36",
    tall: "h-60"
  };

  return (
    <View className={cn(
      "rounded-2xl overflow-hidden",
      sizeClasses[size],
      className
    )}>
      {children}
    </View>
  );
};
