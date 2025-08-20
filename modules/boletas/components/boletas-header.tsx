import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  SlidersHorizontalIcon,
  SearchIcon,
  XIcon,
  SparklesIcon,
} from "lucide-react-native";
import { SearchBar } from "@/modules/core/components/ui/search-bar";
import { Text } from "@/modules/core/components/ui/text";
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
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const isFiltered = filteredCount !== totalCount || searchQuery.length > 0;

  return (
    <View className="bg-white">
      <View className="px-4 py-4">
        {/* Search and filter section */}
        <View className="mb-4 flex-row items-center gap-3">
          <View className="flex-1">
            <SearchBar
              value={searchQuery}
              onChangeText={onSearchChange}
              placeholder="Buscar boletas..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="border-gray-200 bg-gray-50"
            />
          </View>

          {showFiltersButton && (
            <TouchableOpacity
              onPress={onFilterPress}
              activeOpacity={0.7}
              className={cn(
                "flex-row items-center justify-center rounded-lg border-2 px-4 py-3 transition-all",
                activeFiltersCount > 0
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-200 bg-white hover:border-gray-300",
              )}
            >
              <SlidersHorizontalIcon
                size={18}
                color={activeFiltersCount > 0 ? "#3B82F6" : "#6B7280"}
              />
              <Text
                variant="body"
                className={cn(
                  "ml-2 text-sm font-semibold",
                  activeFiltersCount > 0 ? "text-primary-600" : "text-gray-600",
                )}
              >
                Filtros
              </Text>
              {activeFiltersCount > 0 && (
                <Badge
                  variant="default"
                  size="sm"
                  className="ml-2 bg-primary-500"
                  textClassName="text-white text-xs font-bold"
                >
                  <Text variant="small" className="text-white text-xs font-bold">
                    {activeFiltersCount}
                  </Text>
                </Badge>
              )}
            </TouchableOpacity>
          )}
        </View>

        {/* Results summary */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Text variant="body" className="text-sm font-medium text-gray-600">
              Mostrando {filteredCount} de {totalCount} boletas
            </Text>

            {isFiltered && (
              <TouchableOpacity
                onPress={() => {
                  onSearchChange("");
                  // Reset other filters if needed
                }}
                activeOpacity={0.7}
                className="flex-row items-center gap-1"
              >
                <XIcon size={14} color="#6B7280" />
                <Text variant="caption" className="text-xs text-gray-500">
                  Limpiar búsqueda
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Quick stats */}
          {filteredCount > 0 && (
            <View className="flex-row items-center gap-2">
              <View className="flex-row items-center gap-1 rounded-full bg-green-50 px-2 py-1">
                <SparklesIcon size={12} color="#059669" />
                <Text
                  variant="caption"
                  className="text-xs font-medium text-green-700"
                >
                  {Math.round((filteredCount / totalCount) * 100)}% encontrado
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
