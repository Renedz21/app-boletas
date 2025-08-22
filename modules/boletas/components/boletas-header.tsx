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
import colors from "@/modules/core/constants/colors";

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
    <View className="bg-neutral-default">
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
              className="border-primary-border bg-neutral-default"
            />
          </View>

          {showFiltersButton && (
            <TouchableOpacity
              onPress={onFilterPress}
              activeOpacity={0.7}
              className={cn(
                "flex-row items-center justify-center rounded-lg border px-4 py-3 transition-all",
                activeFiltersCount > 0
                  ? "border-primary-default bg-primary-soft"
                  : "border-primary-border bg-neutral-default hover:border-primary-border",
              )}
            >
              <SlidersHorizontalIcon
                size={18}
                color={
                  activeFiltersCount > 0
                    ? colors.primary.default
                    : colors.neutral.placeholder
                }
              />
              <Text
                size="default"
                className={cn(
                  "ml-2 text-sm font-semibold",
                  activeFiltersCount > 0
                    ? "text-primary-default"
                    : "text-neutral-placeholder",
                )}
              >
                Filtros
              </Text>
              {activeFiltersCount > 0 && (
                <Badge
                  variant="default"
                  size="sm"
                  className="ml-2 bg-primary-default"
                  textClassName="text-neutral-default text-xs font-bold"
                >
                  <Text
                    size="default"
                    className="text-xs font-bold text-neutral-default"
                  >
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
            <Text
              size="default"
              className="text-sm font-medium text-neutral-placeholder"
            >
              Mostrando {filteredCount} de {totalCount} boletas
            </Text>
          </View>

          {/* Quick stats */}
          {filteredCount > 0 && (
            <View className="flex-row items-center gap-2">
              <View className="flex-row items-center gap-1 rounded-full bg-green-50 px-2 py-1">
                <SparklesIcon size={12} color="#059669" />
                <Text
                  size="default"
                  className="text-xs font-medium text-success-500"
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
