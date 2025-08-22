import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "../ui/text";
import { cn } from "@/lib/utils";

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

interface TabItemProps {
  route: any;
  index: number;
  isFocused: boolean;
  options: any;
  onPress: () => void;
  onLongPress: () => void;
}

const useTabBarLogic = (navigation: any, state: any) => {
  const handleTabPress = (route: any, isFocused: boolean) => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  const handleTabLongPress = (route: any) => {
    navigation.emit({
      type: "tabLongPress",
      target: route.key,
    });
  };

  const getTabLabel = (options: any, route: any) => {
    return options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
        ? options.title
        : route.name;
  };

  const isTabFocused = (index: number) => state.index === index;

  return {
    handleTabPress,
    handleTabLongPress,
    getTabLabel,
    isTabFocused,
  };
};

const TabItem = ({
  route,
  index,
  isFocused,
  options,
  onPress,
  onLongPress,
}: TabItemProps) => {
  const Icon = options.tabBarIcon;
  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
        ? options.title
        : route.name;

  return (
    <TouchableOpacity
      key={route.key}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex-1 items-center justify-center py-3"
      activeOpacity={0.7}
    >
      <View
        className={cn(
          "items-center justify-center rounded-xl px-3 py-2",
          isFocused && "bg-primary-50",
        )}
      >
        {Icon && (
          <Icon color={isFocused ? "#3B82F6" : "#94A3B8"} focused={isFocused} />
        )}
        <Text
          size="default"
          className={cn(
            "mt-1",
            isFocused ? "text-primary-default" : "text-neutral-placeholder",
          )}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const TabBar = ({ state, descriptors, navigation }: TabBarProps) => {
  const insets = useSafeAreaInsets();
  const { handleTabPress, handleTabLongPress, isTabFocused } = useTabBarLogic(
    navigation,
    state,
  );

  return (
    <View
      className="bg-neutral-default"
      style={{ paddingBottom: insets.bottom }}
    >
      <View className="flex-row px-4 py-2">
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = isTabFocused(index);

          return (
            <TabItem
              key={route.key}
              route={route}
              index={index}
              isFocused={isFocused}
              options={options}
              onPress={() => handleTabPress(route, isFocused)}
              onLongPress={() => handleTabLongPress(route)}
            />
          );
        })}
      </View>
    </View>
  );
};

export { TabBar };
