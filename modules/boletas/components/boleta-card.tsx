import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MoreVertical } from "lucide-react-native";
import { Card, CardContent } from "@/modules/core/components/ui/card";
import { Text } from "@/modules/core/components/ui/text";
import { Badge } from "@/modules/core/components/ui/badge";
import { Boleta } from "@/types/boleta.types";
import { formatCurrency, formatDate } from "../constants/mock-data";

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
  const handleMenuPress = (e: any) => {
    e.stopPropagation();
    onMenuPress?.();
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card className="overflow-hidden border-gray-200 bg-neutral-default shadow-sm">
        <CardContent className="p-0">
          {/* Header con título y menú */}
          <View className="p-4 pb-3">
            <View className="flex-row items-start justify-between">
              <View className="w-full">
                <View className="flex-row items-center justify-between">
                  <Text
                    size="lg"
                    className="mb-1 font-medium text-neutral-strong"
                  >
                    {boleta.razon_social}
                  </Text>
                  <TouchableOpacity onPress={handleMenuPress} className="p-2">
                    <MoreVertical size={18} color="#6B7280" />
                  </TouchableOpacity>
                </View>
                <View className="w-full flex-col items-start gap-2">
                  <Text color="secondary">RUC: {boleta.ruc}</Text>
                  {boleta.subcategoria && (
                    <Badge
                      variant="outline"
                      size="sm"
                      className="border border-primary-default px-3 py-1.5"
                      textClassName="text-primary-default font-medium text-xs"
                    >
                      {boleta.subcategoria}
                    </Badge>
                  )}
                </View>
              </View>
            </View>
          </View>

          {/* Monto y fecha */}
          <View className="px-4 pb-4">
            <View className="flex-row items-center justify-between">
              <Text
                size="lg"
                className="text-2xl font-bold text-neutral-strong"
              >
                {formatCurrency(boleta.total)}
              </Text>
              <Text
                size="default"
                color="neutral"
                className="font-medium text-neutral-placeholder"
              >
                {formatDate(boleta.fecha)}
              </Text>
            </View>
          </View>

          {/* Información adicional */}
          {(boleta.notas || boleta.tags?.length) && (
            <View className="border-t border-gray-100 bg-gray-50 px-4 py-3">
              {/* Notas opcionales */}
              {boleta.notas && (
                <View className="mb-3">
                  <Text
                    size="default"
                    color="secondary"
                    className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-placeholder"
                  >
                    Notas
                  </Text>
                  <Text
                    size="default"
                    color="secondary"
                    numberOfLines={2}
                    className="text-sm leading-5 text-neutral-placeholder"
                  >
                    {boleta.notas}
                  </Text>
                </View>
              )}

              {/* Tags opcionales */}
              {boleta.tags && boleta.tags.length > 0 && (
                <View>
                  <Text
                    size="default"
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
                        <Text
                          size="default"
                          color="secondary"
                          className="text-xs font-medium"
                        >
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
