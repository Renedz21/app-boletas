import React from "react";
import { View, Text, type ViewProps, type TextProps } from "react-native";
import { cn } from "@/lib/utils";

interface CardProps extends ViewProps {}

const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <View
      className={cn(
        "rounded-2xl border border-primary-border bg-white p-4 shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </View>
  );
};

Card.displayName = "Card";

interface CardHeaderProps extends ViewProps {}

const CardHeader = ({ className, children, ...props }: CardHeaderProps) => {
  return (
    <View
      className={cn("border-b border-primary-border pb-3", className)}
      {...props}
    >
      {children}
    </View>
  );
};

CardHeader.displayName = "CardHeader";

interface CardTitleProps extends TextProps {
  ref?: React.RefObject<Text>;
}

const CardTitle = ({ className, children, ...props }: CardTitleProps) => {
  return (
    <Text
      className={cn("text-text-primary text-xl font-semibold", className)}
      {...props}
    >
      {children}
    </Text>
  );
};

CardTitle.displayName = "CardTitle";

interface CardDescriptionProps extends TextProps {
  ref?: React.RefObject<Text>;
}

const CardDescription = ({
  className,
  children,
  ...props
}: CardDescriptionProps) => {
  return (
    <Text
      className={cn("text-text-secondary mt-1 text-sm", className)}
      {...props}
    >
      {children}
    </Text>
  );
};

CardDescription.displayName = "CardDescription";

interface CardContentProps extends ViewProps {
  ref?: React.RefObject<View>;
}

const CardContent = ({ className, children, ...props }: CardContentProps) => {
  return (
    <View className={cn("w-full", className)} {...props}>
      {children}
    </View>
  );
};

CardContent.displayName = "CardContent";

interface CardFooterProps extends ViewProps {
  ref?: React.RefObject<View>;
}

const CardFooter = ({
  className,
  children,
  ref,
  ...props
}: CardFooterProps) => {
  return (
    <View
      ref={ref}
      className={cn(
        "mt-4 flex-row items-center border-t border-primary-border pt-4",
        className,
      )}
      {...props}
    >
      {children}
    </View>
  );
};

CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
