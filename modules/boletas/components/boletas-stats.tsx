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
const colorClasses = {
  primary: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  secondary: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-600",
    iconBg: "bg-purple-100",
  },
  accent: {
    bg: "bg-teal-50",
    border: "border-teal-200",
    text: "text-teal-600",
    iconBg: "bg-teal-100",
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-600",
    iconBg: "bg-amber-100",
  },
};

// Tarjeta compacta de estadísticas
const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  color,
  trend,
}: StatCardProps) => {
  const config = colorClasses[color];

  return (
    <Card className={cn("bg-neutral-default border", config.border)}>
      <CardContent className="p-3">
        <View className="mb-2 flex-row items-center justify-between">
          <View className={cn("rounded-lg p-1.5", config.iconBg)}>{icon}</View>
          {trend && (
            <Text
              size="default"
              className={cn(
                "text-xs font-semibold",
                trend.isPositive ? "text-green-600" : "text-red-600",
              )}
            >
              {trend.isPositive ? "+" : "-"}
              {Math.abs(trend.value)}%
            </Text>
          )}
        </View>

        <Text size="lg" className={cn("mb-1 text-xl font-bold", config.text)}>
          {value}
        </Text>

        <Text
          size="default"
          color="secondary"
          className="text-neutral-placeholder text-xs"
        >
          {title}
        </Text>

        {subtitle && (
          <Text
            size="default"
            color="neutral"
            className="text-neutral-placeholder mt-0.5 text-xs"
          >
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
    <View className="px-4 py-3">
      <View className="flex-row gap-3">
        <View className="w-36">
          <StatCard
            title="Total Gastado"
            value={formatCurrency(stats.totalAmount)}
            subtitle="Este mes"
            icon={<DollarSignIcon size={16} color="#2563EB" />}
            color="primary"
            trend={stats.trends?.amount}
          />
        </View>

        <View className="w-36">
          <StatCard
            title="Total Boletas"
            value={stats.totalCount}
            subtitle="Registradas"
            icon={<FileTextIcon size={16} color="#9333EA" />}
            color="secondary"
            trend={stats.trends?.count}
          />
        </View>

        <View className="w-36">
          <StatCard
            title="Promedio"
            value={formatCurrency(stats.averageAmount)}
            subtitle="Por boleta"
            icon={<TrendingUpIcon size={16} color="#0D9488" />}
            color="accent"
          />
        </View>
      </View>
    </View>
  );
};
