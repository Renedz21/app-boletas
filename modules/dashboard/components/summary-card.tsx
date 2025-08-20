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
    primary: "bg-primary-50 border-primary-100",
    secondary: "bg-secondary-50 border-secondary-100",
    accent: "bg-accent-50 border-accent-100",
    success: "bg-success-50 border-success-100",
    warning: "bg-warning-50 border-warning-100",
  };

  const iconColorClasses = {
    primary: "bg-primary-100",
    secondary: "bg-secondary-100",
    accent: "bg-accent-100",
    success: "bg-success-100",
    warning: "bg-warning-100",
  };

  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper onPress={onPress} activeOpacity={0.9}>
      <Card className={cn("p-4", colorClasses[color])}>
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text variant="caption" color="secondary" className="mb-1">
              {title}
            </Text>
            <Text variant="h2" className="mb-1">
              {value}
            </Text>
            {subtitle && (
              <Text variant="small" color="tertiary">
                {subtitle}
              </Text>
            )}
            {trend && (
              <View className="flex-row items-center mt-2">
                {trend.isPositive ? (
                  <ArrowUpIcon size={14} color="#22C55E" />
                ) : (
                  <ArrowDownIcon size={14} color="#EF4444" />
                )}
                <Text
                  variant="small"
                  className={cn(
                    "ml-1",
                    trend.isPositive ? "text-success-600" : "text-error-600"
                  )}
                >
                  {trend.value}%
                </Text>
              </View>
            )}
          </View>
          {icon && (
            <View className={cn("p-3 rounded-xl", iconColorClasses[color])}>
              {icon}
            </View>
          )}
        </View>
      </Card>
    </CardWrapper>
  );
};
