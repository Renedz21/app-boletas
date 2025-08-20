import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { FilterIcon, CalendarIcon, XIcon } from "lucide-react-native";
import { Text } from "@/modules/core/components/ui/text";
import { Badge } from "@/modules/core/components/ui/badge";
import { BoletaCategory, BoletaStatus } from "../types/boleta.types";
import { CATEGORIES_CONFIG, getStatusConfig } from "../constants/mock-data";
import { cn } from "@/lib/utils";

interface BoletasFilterProps {
  selectedCategories: BoletaCategory[];
  selectedStatus: BoletaStatus[];
  onCategoryToggle: (category: BoletaCategory) => void;
  onStatusToggle: (status: BoletaStatus) => void;
  onClearFilters: () => void;
  showAdvancedFilters?: boolean;
  onToggleAdvancedFilters?: () => void;
  activeFiltersCount?: number;
}

export const BoletasFilter = ({
  selectedCategories,
  selectedStatus,
  onCategoryToggle,
  onStatusToggle,
  onClearFilters,
  showAdvancedFilters,
  onToggleAdvancedFilters,
  activeFiltersCount = 0,
}: BoletasFilterProps) => {
  const categories = Object.values(CATEGORIES_CONFIG);
  const statusOptions: BoletaStatus[] = ["processed", "pending", "rejected"];

  return (
    <View className="bg-white">
      {/* Header con botón de filtros avanzados */}
      <View className="flex-row items-center justify-between px-4 py-2">
        <Text variant="h4">Filtros</Text>
        <View className="flex-row items-center gap-2">
          {activeFiltersCount > 0 && (
            <TouchableOpacity
              onPress={onClearFilters}
              className="flex-row items-center rounded-lg bg-gray-100 px-3 py-1.5"
            >
              <XIcon size={16} color="#6B7280" />
              <Text variant="caption" className="ml-1 text-gray-600">
                Limpiar ({activeFiltersCount})
              </Text>
            </TouchableOpacity>
          )}
          {onToggleAdvancedFilters && (
            <TouchableOpacity
              onPress={onToggleAdvancedFilters}
              activeOpacity={0.7}
              className={cn(
                "flex-row items-center rounded-lg px-3 py-2",
                showAdvancedFilters
                  ? "bg-primary-500"
                  : "border border-primary-200 bg-white",
              )}
            >
              <FilterIcon
                size={16}
                color={showAdvancedFilters ? "#FFFFFF" : "#3B82F6"}
              />
              <Text
                variant="body"
                className={cn(
                  "ml-1 font-medium",
                  showAdvancedFilters ? "text-white" : "text-primary-600",
                )}
              >
                Avanzado
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categorías scrollables */}
      <View className="px-4 pb-2">
        <Text variant="caption" color="secondary" className="mb-2">
          Categorías
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="-mx-4 px-4"
        >
          <View className="flex-row gap-2">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.id);
              return (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => onCategoryToggle(category.id)}
                  activeOpacity={0.7}
                >
                  <Badge
                    variant={isSelected ? "default" : "outline"}
                    size="md"
                    className={cn(
                      "px-3 py-2",
                      isSelected
                        ? `${category.bgColor} ${category.borderColor} border-2`
                        : "border-gray-200 bg-white",
                    )}
                  >
                    <View className="flex-row items-center">
                      <Text variant="body" className="mr-1.5">
                        {category.icon}
                      </Text>
                      <Text
                        variant="body"
                        className={cn(
                          "font-medium",
                          isSelected
                            ? `text-[${category.color}]`
                            : "text-gray-600",
                        )}
                        style={{
                          color: isSelected ? category.color : "#6B7280",
                        }}
                      >
                        {category.label}
                      </Text>
                    </View>
                  </Badge>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Estados */}
      <View className="border-b border-gray-100 px-4 pb-3">
        <Text variant="caption" color="secondary" className="mb-2">
          Estado
        </Text>
        <View className="flex-row gap-2">
          {statusOptions.map((status) => {
            const isSelected = selectedStatus.includes(status);
            const config = getStatusConfig(status);
            return (
              <TouchableOpacity
                key={status}
                onPress={() => onStatusToggle(status)}
                activeOpacity={0.7}
              >
                <Badge
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "px-3 py-1.5",
                    isSelected
                      ? `${config.bgColor} ${config.borderColor} border-2`
                      : "border-gray-200 bg-white",
                  )}
                >
                  <View className="flex-row items-center">
                    <Text variant="body" className="mr-1">
                      {config.icon}
                    </Text>
                    <Text
                      variant="small"
                      className="font-medium"
                      style={{
                        color: isSelected ? config.color : "#6B7280",
                      }}
                    >
                      {config.label}
                    </Text>
                  </View>
                </Badge>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Filtros avanzados (expandible) */}
      {showAdvancedFilters && (
        <View className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <View className="mb-3 flex-row items-center justify-between">
            <View className="mr-2 flex-1">
              <Text variant="caption" color="secondary" className="mb-1">
                Fecha desde
              </Text>
              <TouchableOpacity className="flex-row items-center rounded-lg border border-gray-200 bg-white px-3 py-2">
                <CalendarIcon size={16} color="#6B7280" />
                <Text variant="body" className="ml-2">
                  Seleccionar
                </Text>
              </TouchableOpacity>
            </View>
            <View className="ml-2 flex-1">
              <Text variant="caption" color="secondary" className="mb-1">
                Fecha hasta
              </Text>
              <TouchableOpacity className="flex-row items-center rounded-lg border border-gray-200 bg-white px-3 py-2">
                <CalendarIcon size={16} color="#6B7280" />
                <Text variant="body" className="ml-2">
                  Seleccionar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
