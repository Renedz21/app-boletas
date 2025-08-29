import React from "react";
import { View } from "react-native";
import { 
  FileTextIcon, 
  FolderIcon, 
  TrendingUpIcon, 
  CalendarIcon,
  PieChartIcon,
  ClockIcon
} from "lucide-react-native";
import { BentoCard } from "./bento-card";

interface BentoLayoutAdvancedProps {
  boletasCount: number;
  categoriesCount: number;
  totalAmount: number;
  averageDaily: number;
  pendingReviews: number;
  thisMonthGrowth: number;
}

export const BentoLayoutAdvanced = ({
  boletasCount,
  categoriesCount, 
  totalAmount,
  averageDaily,
  pendingReviews,
  thisMonthGrowth,
}: BentoLayoutAdvancedProps) => {
  return (
    <View className="gap-4">
      {/* Primera fila - Dos cards medianas */}
      <View className="flex-row gap-4">
        <View className="flex-1">
          <BentoCard
            title="Total Boletas"
            value={boletasCount.toString()}
            subtitle="Este mes"
            icon={<FileTextIcon size={20} color="#3B82F6" />}
            variant="primary"
            size="medium"
          />
        </View>
        <View className="flex-1">
          <BentoCard
            title="Categorías Activas"
            value={categoriesCount.toString()}
            subtitle="Disponibles"
            icon={<FolderIcon size={20} color="#14B8A6" />}
            variant="accent"
            size="medium"
          />
        </View>
      </View>

      {/* Segunda fila - Una card ancha y una pequeña */}
      <View className="flex-row gap-4">
        <View className="flex-2">
          <BentoCard
            title="Gasto Total del Mes"
            value={`S/ ${totalAmount.toFixed(2)}`}
            subtitle={`Promedio diario: S/ ${averageDaily.toFixed(2)}`}
            icon={<TrendingUpIcon size={22} color="#A855F7" />}
            variant="secondary"
            size="wide"
          />
        </View>
        <View className="flex-1">
          <BentoCard
            title="Pendientes"
            value={pendingReviews.toString()}
            subtitle="Por revisar"
            icon={<ClockIcon size={18} color="#F59E0B" />}
            variant="warning"
            size="small"
          />
        </View>
      </View>

      {/* Tercera fila - Dos cards: una mediana y una que muestra crecimiento */}
      <View className="flex-row gap-4">
        <View className="flex-1">
          <BentoCard
            title="Mes Actual"
            value={new Date().toLocaleDateString('es-ES', { month: 'long' })}
            subtitle={`${new Date().getFullYear()}`}
            icon={<CalendarIcon size={20} color="#10B981" />}
            variant="success"
            size="medium"
          />
        </View>
        <View className="flex-1">
          <BentoCard
            title="Crecimiento"
            value={`+${thisMonthGrowth.toFixed(1)}%`}
            subtitle="vs mes anterior"
            icon={<PieChartIcon size={20} color="#EF4444" />}
            variant="success"
            size="medium"
          />
        </View>
      </View>
    </View>
  );
};
