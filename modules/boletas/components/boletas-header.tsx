import React from "react";
import { View, TouchableOpacity } from "react-native";
import { FilterIcon, SlidersIcon } from "lucide-react-native";
import { SearchBar } from "@/modules/core/components/ui/search-bar";
import { Text } from "@/modules/core/components/ui/text";
import { IconButton } from "@/modules/core/components/ui/icon-button";
import { Badge } from "@/modules/core/components/ui/badge";
import { cn } from "@/lib/utils";

interface BoletasHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterPress: () => void;
  totalCount: number;
  filteredCount: number;
  activeFiltersCount?: number;
  showFiltersButton?: boolean;
}

export const BoletasHeader = ({
  searchQuery,
  onSearchChange,
  onFilterPress,
  totalCount,
  filteredCount,
  activeFiltersCount = 0,
  showFiltersButton = true,
}: BoletasHeaderProps) => {
  const isFiltered = filteredCount !== totalCount || searchQuery.length > 0;

  return (
    <View className="border-b border-gray-100 bg-white px-4 py-3">
      {/* Barra de búsqueda con botón de filtros */}
      <View className="mb-3 flex-row items-center gap-3">
        <View className="flex-1">
          <SearchBar
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder="Buscar boletas..."
            containerClassName="bg-gray-50 border-gray-200"
            onClear={() => onSearchChange("")}
          />
        </View>

        {showFiltersButton && (
          <TouchableOpacity
            onPress={onFilterPress}
            className="relative"
            activeOpacity={0.7}
          >
            <View
              className={cn(
                "h-12 w-12 items-center justify-center rounded-xl",
                activeFiltersCount > 0
                  ? "border-2 border-primary-200 bg-primary-100"
                  : "border border-gray-200 bg-gray-50",
              )}
            >
              <SlidersIcon
                size={20}
                color={activeFiltersCount > 0 ? "#3B82F6" : "#6B7280"}
              />
            </View>

            {/* Indicador de filtros activos */}
            {activeFiltersCount > 0 && (
              <View className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full bg-primary-500">
                <Text variant="small" className="font-bold text-white">
                  {activeFiltersCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Contador de resultados */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Text variant="body" color="secondary">
            Mostrando{" "}
          </Text>
          <Text variant="body" className="font-semibold text-primary-600">
            {filteredCount}
          </Text>
          <Text variant="body" color="secondary">
            {" "}
            de {totalCount} boletas
          </Text>
        </View>

        {/* Indicador de búsqueda activa */}
        {isFiltered && (
          <Badge
            variant="outline"
            size="sm"
            className="border-blue-200 bg-blue-50"
          >
            <View className="flex-row items-center">
              <FilterIcon size={12} color="#3B82F6" />
              <Text variant="small" className="ml-1 font-medium text-blue-600">
                Filtrado
              </Text>
            </View>
          </Badge>
        )}
      </View>
    </View>
  );
};
