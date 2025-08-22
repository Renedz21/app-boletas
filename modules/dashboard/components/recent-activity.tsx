import React from "react";
import { View, TouchableOpacity, Image, FlatList } from "react-native";
import { FileText, Receipt, CreditCard } from "lucide-react-native";
import { Text } from "@/modules/core/components/ui/text";

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "completed" | "pending" | "processing";
  type: string;
}

interface RecentActivityProps {
  activities: Activity[];
  onActivityPress?: (activity: Activity) => void;
  onViewAllPress?: () => void;
}

// Helper function to get document icon based on tipo_comprobante
const getDocumentIcon = (tipoComprobante: string) => {
  switch (tipoComprobante.toLowerCase()) {
    case "boleta":
      return <Receipt size={24} color="#6B7280" />;
    case "factura":
      return <CreditCard size={24} color="#6B7280" />;
    case "nota_credito":
      return <FileText size={24} color="#6B7280" />;
    case "recibo":
      return <FileText size={24} color="#6B7280" />;
    default:
      return <FileText size={24} color="#6B7280" />;
  }
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60),
  );

  if (diffInHours < 1) return "Hace menos de 1 hora";
  if (diffInHours < 24) return `Hace ${diffInHours} horas`;
  if (diffInHours < 48) return "Ayer";
  return `Hace ${Math.floor(diffInHours / 24)} días`;
};

export const RecentActivity = ({
  activities,
  onActivityPress,
  onViewAllPress,
}: RecentActivityProps) => {
  const renderActivity = ({ item }: { item: Activity }) => (
    <View className="mb-4">
      <TouchableOpacity
        onPress={() => onActivityPress?.(item)}
        activeOpacity={0.7}
        className="flex-row items-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
      >
        {/* Left: Document Icon/Thumbnail */}
        <View className="mr-4">
          <View className="h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
            {getDocumentIcon(item.type)}
          </View>
        </View>

        {/* Center: Title and Date */}
        <View className="mr-4 flex-1">
          <Text className="mb-1 font-semibold text-gray-900" numberOfLines={1}>
            {item.title}
          </Text>
          <Text className="text-sm text-gray-500">
            {formatDate(item.timestamp)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <View className="mb-6 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-gray-900">
          Actividad Reciente
        </Text>
        {onViewAllPress && (
          <TouchableOpacity
            onPress={onViewAllPress}
            className="flex-row items-center"
            activeOpacity={0.7}
          >
            <Text className="text-sm font-medium text-blue-600">Ver todo</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Activity List */}
      {activities.length > 0 ? (
        <FlatList
          data={activities}
          renderItem={renderActivity}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="items-center py-8">
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-gray-50">
            <FileText size={32} color="#D1D5DB" />
          </View>
          <Text className="text-center text-gray-500">
            No hay actividad reciente
          </Text>
          <Text className="mt-1 text-center text-sm text-gray-400">
            Las boletas escaneadas aparecerán aquí
          </Text>
        </View>
      )}
    </View>
  );
};
