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

const TabBar = ({ state, descriptors, navigation }: TabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="border-primary-border bg-neutral-default border-t"
      style={{ paddingBottom: insets.bottom }}
    >
      <View className="flex-row px-4 py-2">
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const Icon = options.tabBarIcon;

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
                  <Icon
                    color={isFocused ? "#3B82F6" : "#94A3B8"}
                    focused={isFocused}
                  />
                )}
                <Text
                  size="default"
                  className={cn(
                    "mt-1",
                    isFocused
                      ? "text-primary-default"
                      : "text-neutral-placeholder",
                  )}
                >
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export { TabBar };
