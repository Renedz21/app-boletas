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
      <Card className={cn("h-36 p-4", colorClasses[color])}>
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text
              color="secondary"
              className={cn("mb-1 font-medium", textColorClasses[color])}
            >
              {title}
            </Text>
            <View className="flex-row items-end justify-between">
              <Text
                size="big"
                className={cn("font-semibold", textColorClasses[color])}
              >
                {value}
              </Text>
              {trend && (
                <View className="flex-row items-center">
                  {trend.isPositive ? (
                    <ArrowUpIcon size={12} color="#22C55E" />
                  ) : (
                    <ArrowDownIcon size={12} color="#EF4444" />
                  )}
                  <Text
                    className={cn(
                      "ml-1 text-sm",
                      trend.isPositive ? "text-success-500" : "text-error-500",
                    )}
                  >
                    {trend.value}%
                  </Text>
                </View>
              )}
            </View>
          </View>
          {icon && (
            <View className={cn("rounded-full p-3", iconColorClasses[color])}>
              {icon}
            </View>
          )}
        </View>
      </Card>
    </CardWrapper>
  );
};
