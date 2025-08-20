import React from "react";
import { View, ScrollView } from "react-native";
import {
  TrendingUpIcon,
  FileTextIcon,
  DollarSignIcon,
  CalendarDaysIcon,
} from "lucide-react-native";
import { Card, CardContent } from "@/modules/core/components/ui/card";
import { Text } from "@/modules/core/components/ui/text";
import { formatCurrency } from "../constants/mock-data";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: "primary" | "secondary" | "accent" | "warning";
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  color,
  trend,
}: StatCardProps) => {
  const colorClasses = {
    primary: {
      bg: "bg-blue-50",
      border: "border-blue-100",
      text: "text-blue-600",
    },
    secondary: {
      bg: "bg-purple-50",
      border: "border-purple-100",
      text: "text-purple-600",
    },
    accent: {
      bg: "bg-teal-50",
      border: "border-teal-100",
      text: "text-teal-600",
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-100",
      text: "text-amber-600",
    },
  };

  const config = colorClasses[color];

  return (
    <Card className={cn("shadow-sm", config.border)}>
      <CardContent className="p-4">
        <View className="mb-2 flex-row items-start justify-between">
          <View className={cn("rounded-lg p-2", config.bg)}>{icon}</View>
          {trend && (
            <View className="flex-row items-center">
              <Text
                variant="small"
                className={cn(
                  "font-semibold",
                  trend.isPositive ? "text-green-600" : "text-red-600",
                )}
              >
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </Text>
            </View>
          )}
        </View>

        <Text variant="h3" className={cn("mb-0.5", config.text)}>
          {value}
        </Text>

        <Text variant="caption" color="secondary">
          {title}
        </Text>

        {subtitle && (
          <Text variant="small" color="tertiary" className="mt-1">
            {subtitle}
          </Text>
        )}
      </CardContent>
    </Card>
  );
};

interface BoletasStatsProps {
  stats: {
    totalAmount: number;
    totalCount: number;
    averageAmount: number;
    monthlyCount: number;
    trends?: {
      amount?: { value: number; isPositive: boolean };
      count?: { value: number; isPositive: boolean };
    };
  };
}

export const BoletasStats = ({ stats }: BoletasStatsProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="px-4 pb-2"
    >
      <View className="flex-row gap-3">
        <View className="w-40">
          <StatCard
            title="Total Gastado"
            value={formatCurrency(stats.totalAmount)}
            subtitle="Este mes"
            icon={<DollarSignIcon size={20} color="#3B82F6" />}
            color="primary"
            trend={stats.trends?.amount}
          />
        </View>

        <View className="w-40">
          <StatCard
            title="Total Boletas"
            value={stats.totalCount}
            subtitle="Registradas"
            icon={<FileTextIcon size={20} color="#A855F7" />}
            color="secondary"
            trend={stats.trends?.count}
          />
        </View>

        <View className="w-40">
          <StatCard
            title="Promedio"
            value={formatCurrency(stats.averageAmount)}
            subtitle="Por boleta"
            icon={<TrendingUpIcon size={20} color="#14B8A6" />}
            color="accent"
          />
        </View>

        <View className="w-40">
          <StatCard
            title="Este Mes"
            value={stats.monthlyCount}
            subtitle="Nuevas boletas"
            icon={<CalendarDaysIcon size={20} color="#F59E0B" />}
            color="warning"
          />
        </View>
      </View>
    </ScrollView>
  );
};
