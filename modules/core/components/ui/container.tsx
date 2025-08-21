import React from "react";
import {
  View,
  ScrollView,
  type ViewProps,
  type ScrollViewProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "@/lib/utils";

interface ContainerProps extends ViewProps {
  safe?: boolean;
  scrollable?: boolean;
  scrollViewProps?: ScrollViewProps;
  ref?: React.RefObject<any>;
}

const Container = ({
  className,
  children,
  safe = true,
  scrollable = false,
  scrollViewProps,
  ref,
  ...props
}: ContainerProps) => {
  const containerContent = (
    <View
      ref={!scrollable ? ref : undefined}
      className={cn("flex-1 bg-background px-4 py-6", className)}
      {...props}
    >
      {children}
    </View>
  );

  if (scrollable) {
    const scrollContent = (
      <ScrollView
        ref={ref as any}
        className="flex-1 bg-background"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        {...scrollViewProps}
      >
        <View className={cn("px-4 py-6", className)} {...props}>
          {children}
        </View>
      </ScrollView>
    );

    if (safe) {
      return (
        <SafeAreaView className="flex-1 bg-background">
          {scrollContent}
        </SafeAreaView>
      );
    }
    return scrollContent;
  }

  if (safe) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        {containerContent}
      </SafeAreaView>
    );
  }

  return containerContent;
};

Container.displayName = "Container";

export { Container };
