import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@/modules/core/components/ui/text";
import { cn } from "@/lib/utils";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  color?: "primary" | "secondary" | "accent" | "success";
  onPress: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
  columns?: 2 | 3 | 4;
}

export const QuickActions = ({ actions, columns = 4 }: QuickActionsProps) => {
  const colorClasses = {
    primary: "bg-primary-50",
    secondary: "bg-secondary-50",
    accent: "bg-accent-50",
    success: "bg-success-50",
  };

  return (
    <View className="flex-row flex-wrap -mx-2">
      {actions.map((action) => (
        <View
          key={action.id}
          className={cn(
            "px-2 mb-4",
            columns === 2 && "w-1/2",
            columns === 3 && "w-1/3",
            columns === 4 && "w-1/4"
          )}
        >
          <TouchableOpacity
            onPress={action.onPress}
            activeOpacity={0.7}
            className="items-center"
          >
            <View
              className={cn(
                "w-16 h-16 rounded-2xl items-center justify-center mb-2",
                colorClasses[action.color || "primary"]
              )}
            >
              {action.icon}
            </View>
            <Text variant="caption" align="center" numberOfLines={2}>
              {action.label}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};
