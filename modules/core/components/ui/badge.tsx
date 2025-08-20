import React from "react";
import { View, Text, type ViewProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-2.5 py-1",
  {
    variants: {
      variant: {
        default: "bg-primary-100 border border-primary-200",
        secondary: "bg-secondary-100 border border-secondary-200",
        success: "bg-success-100 border border-success-200",
        warning: "bg-warning-100 border border-warning-200",
        error: "bg-error-100 border border-error-200",
        accent: "bg-accent-100 border border-accent-200",
        outline: "bg-transparent border border-border",
      },
      size: {
        sm: "px-2 py-0.5",
        md: "px-2.5 py-1",
        lg: "px-3 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const badgeTextVariants = cva("font-medium text-center", {
  variants: {
    variant: {
      default: "text-primary-700",
      secondary: "text-secondary-700",
      success: "text-success-700",
      warning: "text-warning-700",
      error: "text-error-700",
      accent: "text-accent-700",
      outline: "text-text-secondary",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface BadgeProps
  extends ViewProps,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  textClassName?: string;
}

const Badge = ({
  className,
  variant,
  size,
  children,
  textClassName,
  ...props
}: BadgeProps) => {
  return (
    <View
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {typeof children === "string" ? (
        <Text
          className={cn(badgeTextVariants({ variant, size }), textClassName)}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
};

Badge.displayName = "Badge";

export { Badge, badgeVariants, badgeTextVariants };
