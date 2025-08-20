import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MoreVerticalIcon } from "lucide-react-native";
import { Card, CardContent } from "@/modules/core/components/ui/card";
import { Text } from "@/modules/core/components/ui/text";
import { Badge } from "@/modules/core/components/ui/badge";
import { IconButton } from "@/modules/core/components/ui/icon-button";
import { Boleta } from "@/types/boleta.types";
import {
  CATEGORIES_CONFIG,
  formatCurrency,
  formatDate,
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
  const categoryConfig = CATEGORIES_CONFIG.find(
    (cat) => cat.id === boleta.categoria_id,
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card className="overflow-hidden border-gray-200 bg-white shadow-sm">
        <CardContent className="p-0">
          {/* Header con título y menú */}
          <View className="p-4 pb-3">
            <View className="flex-row items-start justify-between">
              <View className="mr-3 flex-1">
                <Text variant="h4" className="mb-1">
                  {boleta.razon_social}
                </Text>
                <Text variant="caption" color="secondary">
                  RUC: {boleta.ruc}
                </Text>
              </View>

              {onMenuPress && (
                <IconButton
                  variant="ghost"
                  size="sm"
                  onPress={(e) => {
                    e.stopPropagation();
                    onMenuPress();
                  }}
                  className="ml-2"
                >
                  <MoreVerticalIcon size={18} color="#64748B" />
                </IconButton>
              )}
            </View>
          </View>

          {/* Monto y fecha */}
          <View className="px-4 pb-4">
            <View className="flex-row items-center justify-between">
              <Text
                variant="h3"
                className="text-2xl font-bold text-primary-600"
              >
                {formatCurrency(boleta.total)}
              </Text>
              <Text
                variant="small"
                color="tertiary"
                className="font-medium text-gray-500"
              >
                {formatDate(boleta.fecha)}
              </Text>
            </View>
          </View>

          {/* Badges de categoría y estado */}
          <View className="px-4 pb-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                {categoryConfig && (
                  <Badge
                    variant="outline"
                    size="sm"
                    className={cn(
                      "border-2 px-3 py-1.5",
                      categoryConfig.esDeducible
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-blue-200 bg-blue-50",
                    )}
                    textClassName={cn(
                      "font-semibold text-sm",
                      categoryConfig.esDeducible
                        ? "text-emerald-700"
                        : "text-blue-700",
                    )}
                  >
                    <View className="flex-row items-center">
                      <Text variant="small" className="mr-1.5 text-base">
                        {categoryConfig.esDeducible ? "💰" : "📋"}
                      </Text>
                      <Text variant="small" className="font-semibold">
                        {categoryConfig.nombre}
                      </Text>
                    </View>
                  </Badge>
                )}
                {boleta.subcategoria && (
                  <Badge
                    variant="outline"
                    size="sm"
                    className="border-2 border-purple-200 bg-purple-50 px-3 py-1.5"
                    textClassName="text-purple-700 font-semibold text-sm"
                  >
                    <Text variant="small" className="font-semibold">
                      {boleta.subcategoria}
                    </Text>
                  </Badge>
                )}
              </View>

              <Badge
                variant="outline"
                size="sm"
                className={cn(
                  "border-2 px-3 py-1.5",
                  boleta.revisado_manualmente
                    ? "border-green-200 bg-green-50"
                    : "border-amber-200 bg-amber-50",
                )}
                textClassName={cn(
                  "font-semibold text-sm",
                  boleta.revisado_manualmente
                    ? "text-green-700"
                    : "text-amber-700",
                )}
              >
                <View className="flex-row items-center">
                  <Text variant="small" className="mr-1.5 text-base">
                    {boleta.revisado_manualmente ? "✅" : "⏳"}
                  </Text>
                  <Text variant="small" className="font-semibold">
                    {boleta.revisado_manualmente ? "Revisado" : "Pendiente"}
                  </Text>
                </View>
              </Badge>
            </View>
          </View>

          {/* Información adicional */}
          {(boleta.notas || boleta.tags?.length) && (
            <View className="border-t border-gray-100 bg-gray-50 px-4 py-3">
              {/* Notas opcionales */}
              {boleta.notas && (
                <View className="mb-3">
                  <Text
                    variant="caption"
                    color="secondary"
                    className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-600"
                  >
                    Notas
                  </Text>
                  <Text
                    variant="body"
                    color="secondary"
                    numberOfLines={2}
                    className="text-sm leading-5 text-gray-700"
                  >
                    {boleta.notas}
                  </Text>
                </View>
              )}

              {/* Tags opcionales */}
              {boleta.tags && boleta.tags.length > 0 && (
                <View>
                  <Text
                    variant="caption"
                    color="secondary"
                    className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-600"
                  >
                    Etiquetas
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {boleta.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        size="sm"
                        className="border-indigo-200 bg-indigo-50 px-2 py-1"
                        textClassName="text-indigo-700 text-xs font-medium"
                      >
                        <Text variant="small" className="text-xs font-medium">
                          #{tag}
                        </Text>
                      </Badge>
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};
