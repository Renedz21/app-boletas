import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, FlatList } from "react-native";
import {
  FilterIcon,
  CalendarIcon,
  XIcon,
  CheckIcon,
} from "lucide-react-native";
import { Text } from "@/modules/core/components/ui/text";
import { Badge } from "@/modules/core/components/ui/badge";
import { Button } from "@/modules/core/components/ui/button";
import { Category } from "@/types/category.types";
import { cn } from "@/lib/utils";

interface BoletasFilterProps {
  categories: Category[];
  selectedCategories: string[];
  selectedStatus: boolean[];
  onCategoryToggle: (category: string) => void;
  onStatusToggle: (status: boolean) => void;
  onClearFilters: () => void;
  onApplyFilters?: () => void;
  showAdvancedFilters?: boolean;
  onToggleAdvancedFilters?: () => void;
  activeFiltersCount?: number;
}

export const BoletasFilter = ({
  categories,
  selectedCategories,
  selectedStatus,
  onCategoryToggle,
  onStatusToggle,
  onClearFilters,
  onApplyFilters,
  showAdvancedFilters,
  onToggleAdvancedFilters,
  activeFiltersCount = 0,
}: BoletasFilterProps) => {
  const statusOptions = [true, false]; // true = revisado manualmente, false = no revisado

  return (
    <View className="bg-white">
      {/* Header con botón de filtros avanzados */}
      <View className="flex-row items-center justify-between border-b border-gray-100 px-4 py-4">
        <Text variant="h4" className="text-lg font-bold text-gray-900">
          Filtros
        </Text>
        <View className="flex-row items-center gap-3">
          {activeFiltersCount > 0 && (
            <TouchableOpacity
              onPress={onClearFilters}
              className="flex-row items-center rounded-lg border border-red-200 bg-red-50 px-3 py-2"
              activeOpacity={0.7}
            >
              <XIcon size={16} color="#DC2626" />
              <Text
                variant="caption"
                className="ml-2 text-sm font-medium text-red-700"
              >
                Limpiar ({activeFiltersCount})
              </Text>
            </TouchableOpacity>
          )}
          {onToggleAdvancedFilters && (
            <TouchableOpacity
              onPress={onToggleAdvancedFilters}
              activeOpacity={0.7}
              className={cn(
                "flex-row items-center rounded-lg border-2 px-4 py-2 transition-all",
                showAdvancedFilters
                  ? "border-primary-600 bg-primary-600"
                  : "border-primary-200 bg-white hover:bg-primary-50",
              )}
            >
              <FilterIcon
                size={16}
                color={showAdvancedFilters ? "#FFFFFF" : "#3B82F6"}
              />
              <Text
                variant="body"
                className={cn(
                  "ml-2 text-sm font-semibold",
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
      <View className="border-b border-gray-100 py-4">
        <Text
          variant="caption"
          color="secondary"
          className="mb-3 px-4 text-sm font-semibold uppercase tracking-wide text-gray-600"
        >
          Categorías ({selectedCategories.length} seleccionadas)
        </Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: Category) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 2,
          }}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          renderItem={({ item: category }: { item: Category }) => {
            const isSelected = selectedCategories.includes(category.id);
            return (
              <TouchableOpacity
                onPress={() => {
                  console.log(`Toggling category: ${category.id}`);
                  onCategoryToggle(category.id);
                }}
                activeOpacity={0.7}
                style={{ minWidth: 100 }}
              >
                <View
                  className={cn(
                    "flex-row items-center justify-center rounded-lg border-2 px-4 py-3",
                    isSelected
                      ? "border-primary-500 bg-primary-100"
                      : "border-gray-200 bg-white",
                  )}
                >
                  <Text
                    className={cn(
                      "text-sm font-semibold",
                      isSelected ? "text-primary-800" : "text-gray-700",
                    )}
                  >
                    {category.nombre}
                  </Text>
                  {isSelected && (
                    <View className="ml-2 rounded-full bg-primary-500 p-1">
                      <CheckIcon size={10} color="white" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Estado de Revisión */}
      <View className="border-b border-gray-100 px-4 py-4">
        <Text
          variant="caption"
          color="secondary"
          className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600"
        >
          Estado de Revisión ({selectedStatus.length} seleccionados)
        </Text>
        <View className="flex-row gap-3">
          {statusOptions.map((status) => {
            const isSelected = selectedStatus.includes(status);
            const label = status ? "Revisado" : "No Revisado";
            const icon = status ? "✅" : "⏳";
            console.log(
              `Status: ${label} (${status}) - isSelected: ${isSelected}`,
            );
            return (
              <TouchableOpacity
                key={status.toString()}
                onPress={() => {
                  console.log(`Toggling status: ${status}`);
                  onStatusToggle(status);
                }}
                activeOpacity={0.7}
              >
                <View
                  className={cn(
                    "flex-row items-center rounded-lg border-2 px-4 py-3",
                    isSelected
                      ? "border-primary-500 bg-primary-100"
                      : "border-gray-200 bg-white",
                  )}
                >
                  <Text className="mr-2 text-base">{icon}</Text>
                  <Text
                    className={cn(
                      "text-sm font-semibold",
                      isSelected ? "text-primary-800" : "text-gray-700",
                    )}
                  >
                    {label}
                  </Text>
                  {isSelected && (
                    <View className="ml-2 rounded-full bg-primary-500 p-1">
                      <CheckIcon size={10} color="white" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Filtros avanzados (expandible) */}
      {showAdvancedFilters && (
        <View className="border-t border-gray-100 bg-gray-50 px-4 py-4">
          <Text
            variant="caption"
            color="secondary"
            className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600"
          >
            Filtros Avanzados
          </Text>
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text
                variant="caption"
                color="secondary"
                className="mb-2 text-sm font-medium text-gray-600"
              >
                Fecha desde
              </Text>
              <TouchableOpacity className="flex-row items-center rounded-lg border-2 border-gray-200 bg-white px-4 py-3 transition-all hover:border-gray-300">
                <CalendarIcon size={18} color="#6B7280" />
                <Text
                  variant="body"
                  className="ml-3 text-sm font-medium text-gray-700"
                >
                  Seleccionar
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <Text
                variant="caption"
                color="secondary"
                className="mb-2 text-sm font-medium text-gray-600"
              >
                Fecha hasta
              </Text>
              <TouchableOpacity className="flex-row items-center rounded-lg border-2 border-gray-200 bg-white px-4 py-3 transition-all hover:border-gray-300">
                <CalendarIcon size={18} color="#6B7280" />
                <Text
                  variant="body"
                  className="ml-3 text-sm font-medium text-gray-700"
                >
                  Seleccionar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Botón Aplicar */}
      <View className="border-t border-gray-100 bg-gray-50 px-4 py-4">
        <Button
          onPress={onApplyFilters}
          className="w-full bg-primary-600 py-3"
          textClassName="text-white font-semibold text-base"
        >
          Aplicar Filtros
        </Button>
      </View>
    </View>
  );
};
