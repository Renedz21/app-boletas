import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react-native";
import { Card } from "@/modules/core/components/ui/card";
import { Text } from "@/modules/core/components/ui/text";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "secondary" | "accent" | "success" | "warning";
  onPress?: () => void;
}

export const SummaryCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = "primary",
  onPress,
}: SummaryCardProps) => {
  const colorClasses = {
    primary: "bg-[#EFF6FF] border-[#DBEAFE]",
    secondary: "bg-[#FAF5FF] border-[#F3E8FF]",
    accent: "bg-accent-50 border-accent-100",
    success: "bg-success-50 border-success-100",
    warning: "bg-warning-50 border-warning-100",
  };

  const iconColorClasses = {
    primary: "bg-[#DBEAFE]",
    secondary: "bg-[#F3E8FF]",
    accent: "bg-accent-100",
    success: "bg-success-100",
    warning: "bg-warning-100",
  };

  const textColorClasses = {
    primary: "text-primary-strong",
    secondary: "text-[#A855F7]",
    accent: "text-accent-500",
    success: "text-success-500",
    warning: "text-warning-500",
  };

  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper onPress={onPress} activeOpacity={0.9}>
      <Card className={cn("h-44 p-6", colorClasses[color])}>
        {/* Header with icon and title */}
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-1 pr-3">
            <Text
              color="secondary"
              className={cn("mb-2 text-sm font-medium", textColorClasses[color])}
            >
              {title}
            </Text>
            {subtitle && (
              <Text
                className="text-xs text-gray-500"
                color="secondary"
              >
                {subtitle}
              </Text>
            )}
          </View>
          {icon && (
            <View className={cn("rounded-full p-3", iconColorClasses[color])}>
              {icon}
            </View>
          )}
        </View>

        {/* Value and trend */}
        <View className="flex-row items-end justify-between">
          <Text
            size="big"
            className={cn("font-bold", textColorClasses[color])}
          >
            {value}
          </Text>
          {trend && (
            <View className="flex-row items-center bg-white/50 rounded-full px-3 py-2">
              {trend.isPositive ? (
                <ArrowUpIcon size={14} color="#22C55E" />
              ) : (
                <ArrowDownIcon size={14} color="#EF4444" />
              )}
              <Text
                className={cn(
                  "ml-1 text-sm font-medium",
                  trend.isPositive ? "text-success-500" : "text-error-500",
                )}
              >
                {trend.value}%
              </Text>
            </View>
          )}
        </View>
      </Card>
    </CardWrapper>
  );
};
