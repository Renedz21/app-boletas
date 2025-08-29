import React from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  type TouchableOpacityProps,
} from "react-native";
import { Text } from "./text";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-full active:opacity-80 disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-default shadow-md shadow-primary-default active:bg-primary-strong",
        secondary:
          "bg-secondary-default border border-transparent active:bg-secondary-strong",
        outline:
          "bg-neutral-default border-2 border-neutral-secondary active:bg-neutral-secondary",
        ghost: "bg-transparent border-transparent active:bg-transparent",
      },
      size: {
        default: "px-6 py-4",
        sm: "px-4 py-2",
        lg: "px-8 py-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants> {
  title?: string;
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = ({
  className,
  variant = "primary",
  size = "default",
  children,
  loading,
  disabled,
  title,
  icon,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      {...props}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          className="mr-2"
          color={variant === "primary" ? "#FFFFFF" : "#3B82F6"}
        />
      )}
      {icon && icon}
      {children ? (
        typeof children === "string" ? (
          <Text
            color={
              variant === "primary"
                ? "neutral"
                : variant === "secondary"
                  ? "primary"
                  : "secondary"
            }
            className="text-xl font-bold"
          >
            {children}
          </Text>
        ) : (
          children
        )
      ) : title ? (
        <Text
          color={
            variant === "primary"
              ? "neutral"
              : variant === "secondary"
                ? "primary"
                : "secondary"
          }
          className="text-xl font-bold"
        >
          {title}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};
Button.displayName = "Button";

export { Button, buttonVariants };
