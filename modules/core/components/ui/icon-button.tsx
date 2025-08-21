import React from "react";
import {
  TouchableOpacity,
  View,
  type TouchableOpacityProps,
} from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "items-center justify-center rounded-full active:opacity-80",
  {
    variants: {
      variant: {
        primary: "bg-primary-500 shadow-md",
        secondary: "bg-secondary-100 border border-secondary-200",
        ghost: "bg-transparent",
        outline: "bg-transparent border-2 border-primary-200",
        accent: "bg-accent-500 shadow-md",
      },
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface IconButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof iconButtonVariants> {}

const IconButton = ({
  children,
  disabled,
  className,
  variant,
  size,
  ...props
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      className={cn(
        iconButtonVariants({ variant, size }),
        disabled && "opacity-50",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
