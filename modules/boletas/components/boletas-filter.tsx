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
  categories: Omit<Category, "createdAt">[];
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
        <Text size="lg" className="text-lg font-bold text-neutral-strong">
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
                size="default"
                className="ml-2 text-sm font-medium text-error-500"
              >
                Limpiar ({activeFiltersCount})
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categorías scrollables */}
      <View className="border-t border-gray-100 py-4">
        <Text
          size="default"
          color="secondary"
          className="mb-3 px-4 text-sm font-semibold uppercase tracking-wide text-neutral-placeholder"
        >
          Categorías ({selectedCategories.length} seleccionadas)
        </Text>
        <FlatList
          data={categories as Category[]}
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
                  onCategoryToggle(category.id);
                }}
                activeOpacity={0.7}
                style={{ minWidth: 100 }}
              >
                <View
                  className={cn(
                    "flex-row items-center justify-center rounded-lg border-2 px-4 py-3",
                    isSelected
                      ? "border-primary-default bg-primary-soft"
                      : "border-gray-200 bg-white",
                  )}
                >
                  <Text
                    className={cn(
                      "text-sm font-semibold",
                      isSelected ? "text-primary-default" : "text-neutral-700",
                    )}
                  >
                    {category.nombre}
                  </Text>
                  {isSelected && (
                    <View className="ml-2 rounded-full bg-primary-default p-1">
                      <CheckIcon size={10} color="white" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <Button
          onPress={onApplyFilters}
          title="Aplicar Filtros"
          variant="primary"
          className="mx-4 my-6"
        />
      </View>
    </View>
  );
};
