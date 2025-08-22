import React from "react";
import {
  FlatList,
  RefreshControl,
  View,
  ActivityIndicator,
} from "react-native";
import { BoletaCard } from "./boleta-card";
import { BoletasEmptyState } from "./boletas-empty-state";
import { Text } from "@/modules/core/components/ui/text";
import { Boleta } from "@/types/boleta.types";

interface BoletasListProps {
  boletas: Boleta[];
  onBoletaPress: (boleta: Boleta) => void;
  onBoletaMenuPress?: (boleta: Boleta) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  loading?: boolean;
  emptyStateProps?: {
    onAddPress?: () => void;
  };
  ListHeaderComponent?: React.ReactElement;
  contentContainerClassName?: string;
}

export const BoletasList = ({
  boletas,
  onBoletaPress,
  onBoletaMenuPress,
  onRefresh,
  refreshing = false,
  loading = false,
  emptyStateProps,
  ListHeaderComponent,
  contentContainerClassName,
}: BoletasListProps) => {
  // Renderizar item de la lista
  const renderItem = ({ item }: { item: Boleta }) => (
    <BoletaCard
      boleta={item}
      onPress={() => onBoletaPress(item)}
      onMenuPress={
        onBoletaMenuPress ? () => onBoletaMenuPress(item) : undefined
      }
    />
  );

  // Renderizar separador entre items
  const ItemSeparator = () => <View className="h-0" />;

  // Renderizar estado vacío
  const renderEmptyState = () => {
    if (loading) {
      return (
        <View className="flex-1 items-center justify-center py-12">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text size={"default"} color="secondary" className="mt-3">
            Cargando boletas...
          </Text>
        </View>
      );
    }

    return <BoletasEmptyState {...emptyStateProps} />;
  };

  // Renderizar footer con espacio adicional
  const ListFooter = () => <View className="h-20" />;

  return (
    <FlatList
      data={boletas}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={renderEmptyState}
      ListFooterComponent={boletas.length > 0 ? ListFooter : undefined}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: 4,
      }}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#3B82F6"]}
            tintColor="#3B82F6"
            titleColor="#3B82F6"
            title="Actualizando..."
            progressBackgroundColor="#F3F4F6"
          />
        ) : undefined
      }
      showsVerticalScrollIndicator={false}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
      removeClippedSubviews={true}
      updateCellsBatchingPeriod={50}
      getItemLayout={(data, index) => ({
        length: 180, // Altura estimada de cada card
        offset: 180 * index,
        index,
      })}
    />
  );
};
