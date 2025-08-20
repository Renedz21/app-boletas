import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MoreVerticalIcon } from "lucide-react-native";
import { Card, CardContent } from "@/modules/core/components/ui/card";
import { Text } from "@/modules/core/components/ui/text";
import { Badge } from "@/modules/core/components/ui/badge";
import { IconButton } from "@/modules/core/components/ui/icon-button";
import { Boleta } from "../types/boleta.types";
import {
  CATEGORIES_CONFIG,
  formatCurrency,
  formatDate,
  getStatusConfig,
} from "../constants/mock-data";
import { cn } from "@/lib/utils";

interface BoletaCardProps {
  boleta: Boleta;
  onPress?: () => void;
  onMenuPress?: () => void;
}

export const BoletaCard = ({
  boleta,
  onPress,
  onMenuPress,
}: BoletaCardProps) => {
  const categoryConfig = CATEGORIES_CONFIG[boleta.category];
  const statusConfig = getStatusConfig(boleta.status);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card className="mb-3 border-gray-100 shadow-sm">
        <CardContent className="p-4">
          {/* Header con título y menú */}
          <View className="mb-3 flex-row items-start justify-between">
            <View className="mr-2 flex-1">
              <View className="mb-1 flex-row items-center">
                <Text variant="h1" className="mr-2">
                  {categoryConfig.icon}
                </Text>
                <View className="flex-1">
                  <Text variant="h4" className="mb-0.5">
                    {boleta.title}
                  </Text>
                  <Text variant="caption" color="secondary">
                    {boleta.merchant}
                  </Text>
                </View>
              </View>
            </View>

            {onMenuPress && (
              <IconButton
                variant="ghost"
                size="sm"
                onPress={(e) => {
                  e.stopPropagation();
                  onMenuPress();
                }}
              >
                <MoreVerticalIcon size={20} color="#64748B" />
              </IconButton>
            )}
          </View>

          {/* Monto y fecha */}
          <View className="mb-3 flex-row items-center justify-between">
            <Text variant="h3" className="text-primary-600">
              {formatCurrency(boleta.amount)}
            </Text>
            <Text variant="small" color="tertiary">
              {formatDate(boleta.date)}
            </Text>
          </View>

          {/* Badges de categoría y estado */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Badge
                variant="outline"
                size="sm"
                className={cn(
                  categoryConfig.bgColor,
                  categoryConfig.borderColor,
                )}
                textClassName={`text-[${categoryConfig.color}]`}
              >
                {categoryConfig.label}
              </Badge>
            </View>

            <Badge
              variant="outline"
              size="sm"
              className={cn(statusConfig.bgColor, statusConfig.borderColor)}
              textClassName={`text-[${statusConfig.color}]`}
            >
              <View className="flex-row items-center">
                <Text variant="small" className="mr-1">
                  {statusConfig.icon}
                </Text>
                <Text
                  variant="small"
                  className="font-medium"
                  style={{ color: statusConfig.color }}
                >
                  {statusConfig.label}
                </Text>
              </View>
            </Badge>
          </View>

          {/* Descripción opcional */}
          {boleta.description && (
            <View className="mt-3 border-t border-gray-100 pt-3">
              <Text variant="caption" color="secondary" numberOfLines={2}>
                {boleta.description}
              </Text>
            </View>
          )}

          {/* Tags opcionales */}
          {boleta.tags && boleta.tags.length > 0 && (
            <View className="mt-2 flex-row flex-wrap gap-1">
              {boleta.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  size="sm"
                  className="border-gray-200 bg-gray-50"
                  textClassName="text-gray-600"
                >
                  <Text variant="small" color="secondary">
                    #{tag}
                  </Text>
                </Badge>
              ))}
            </View>
          )}
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};
