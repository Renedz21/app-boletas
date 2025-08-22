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
    primary: "bg-primary-soft",
    secondary: "bg-secondary-soft",
    accent: "bg-accent-50",
    success: "bg-success-50",
  };

  return (
    <View className="-mx-3 flex-row flex-wrap">
      {actions.map((action) => (
        <View
          key={action.id}
          className={cn(
            "mb-6 px-3",
            columns === 2 && "w-1/2",
            columns === 3 && "w-1/3",
            columns === 4 && "w-1/4",
          )}
        >
          <TouchableOpacity
            onPress={action.onPress}
            activeOpacity={0.7}
            className="items-center"
          >
            <View
              className={cn(
                "mb-3 h-20 w-20 items-center justify-center rounded-2xl shadow-sm",
                colorClasses[action.color || "primary"],
              )}
            >
              {action.icon}
            </View>
            <Text 
              color="secondary" 
              numberOfLines={2} 
              className="text-center text-sm font-medium"
            >
              {action.label}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};
