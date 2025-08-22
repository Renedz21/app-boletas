import React from "react";
import { View } from "react-native";
import { cn } from "@/lib/utils";

interface StatsGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
}

export const StatsGrid = ({
  children,
  columns = 2,
  className,
}: StatsGridProps) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <View className={cn("-mx-3 flex-row flex-wrap", className)}>
      {childrenArray.map((child, index) => (
        <View
          key={index}
          className={cn(
            "mb-6 px-3",
            columns === 1 && "w-full",
            columns === 2 && "w-1/2",
            columns === 3 && "w-1/3",
          )}
        >
          {child}
        </View>
      ))}
    </View>
  );
};
