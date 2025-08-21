import React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import {
  ChevronRightIcon,
  FileTextIcon,
  CheckCircleIcon,
  ClockIcon,
} from "lucide-react-native";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/modules/core/components/ui/card";
import { Text } from "@/modules/core/components/ui/text";
import { Badge } from "@/modules/core/components/ui/badge";
import { cn } from "@/lib/utils";

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

export const RecentActivity = ({
  activities,
  onActivityPress,
  onViewAllPress,
}: RecentActivityProps) => {
  const getStatusIcon = (status: Activity["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon size={16} color="#22C55E" />;
      case "processing":
        return <ClockIcon size={16} color="#F59E0B" />;
      default:
        return <FileTextIcon size={16} color="#64748B" />;
    }
  };

  const getStatusColor = (status: Activity["status"]) => {
    switch (status) {
      case "completed":
        return "success";
      case "processing":
        return "warning";
      default:
        return "default";
    }
  };

  const renderActivity = ({ item }: { item: Activity }) => (
    <TouchableOpacity
      onPress={() => onActivityPress?.(item)}
      activeOpacity={0.7}
      className="border-b border-border py-3 last:border-b-0"
    >
      <View className="flex-row items-start">
        <View className="mr-3 mt-1">{getStatusIcon(item.status)}</View>
        <View className="flex-1">
          <View className="mb-1 flex-row items-center justify-between">
            <Text className="mr-2 flex-1">{item.title}</Text>
            <Badge variant={getStatusColor(item.status) as any} size="sm">
              {item.type}
            </Badge>
          </View>
          <Text color="secondary" numberOfLines={1}>
            {item.description}
          </Text>
          <Text color="neutral" className="mt-1">
            {item.timestamp}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-3">
        <CardTitle>Actividad Reciente</CardTitle>
        {onViewAllPress && (
          <TouchableOpacity
            onPress={onViewAllPress}
            className="flex-row items-center"
            activeOpacity={0.7}
          >
            <Text color="secondary">Ver todo</Text>
            <ChevronRightIcon size={16} color="#14B8A6" />
          </TouchableOpacity>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {activities.length > 0 ? (
          <FlatList
            data={activities}
            renderItem={renderActivity}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        ) : (
          <View className="items-center py-8">
            <FileTextIcon size={48} color="#E2E8F0" />
            <Text color="secondary" className="mt-2">
              No hay actividad reciente
            </Text>
          </View>
        )}
      </CardContent>
    </Card>
  );
};
