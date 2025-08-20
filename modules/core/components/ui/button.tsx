import React from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  type TouchableOpacityProps,
  type TextProps,
} from "react-native";
import { Text } from "./text";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-xl active:opacity-80 transition-opacity",
  {
    variants: {
      variant: {
        primary: "bg-primary-500 shadow-md active:bg-primary-600",
        secondary:
          "bg-secondary-100 border border-secondary-200 active:bg-secondary-200",
        ghost: "bg-transparent active:bg-neutral-100",
        outline:
          "bg-transparent border-2 border-primary-200 active:bg-primary-50",
        danger: "bg-error-500 shadow-md active:bg-error-600",
        success: "bg-success-500 shadow-md active:bg-success-600",
      },
      size: {
        sm: "h-9 px-3 py-2",
        md: "h-11 px-4 py-2.5",
        lg: "h-14 px-6 py-3.5",
        icon: "h-11 w-11 p-2.5",
      },
      disabled: {
        true: "opacity-50",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const buttonTextVariants = cva("font-medium text-center", {
  variants: {
    variant: {
      primary: "text-white",
      secondary: "text-secondary-700",
      ghost: "text-text-primary",
      outline: "text-primary-600",
      danger: "text-white",
      success: "text-white",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      icon: "text-base",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export interface ButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  textClassName?: string;
  textProps?: TextProps;
}

const Button = ({
  className,
  variant,
  size,
  children,
  loading = false,
  disabled = false,
  textClassName,
  textProps,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      className={cn(
        buttonVariants({ variant, size, disabled: isDisabled }),
        className,
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "primary" ||
            variant === "danger" ||
            variant === "success"
              ? "#FFFFFF"
              : "#3B82F6"
          }
        />
      ) : typeof children === "string" ? (
        <Text
          variant="body"
          className={cn(buttonTextVariants({ variant, size }), textClassName)}
          {...textProps}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};
Button.displayName = "Button";

export { Button, buttonVariants, buttonTextVariants };
