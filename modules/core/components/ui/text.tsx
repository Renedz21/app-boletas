import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("text-text-primary", {
  variants: {
    variant: {
      h1: "text-3xl font-bold text-text-primary",
      h2: "text-2xl font-semibold text-text-primary",
      h3: "text-xl font-semibold text-text-primary",
      h4: "text-lg font-medium text-text-primary",
      body: "text-base text-text-primary",
      "body-secondary": "text-base text-text-secondary",
      caption: "text-sm text-text-secondary",
      "caption-strong": "text-sm font-medium text-text-secondary",
      small: "text-xs text-text-tertiary",
      label: "text-sm font-medium text-text-primary",
    },
    color: {
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      tertiary: "text-text-tertiary",
      accent: "text-accent-600",
      success: "text-success-600",
      warning: "text-warning-600",
      error: "text-error-600",
      white: "text-white",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "primary",
    align: "left",
  },
});

export interface TextProps
  extends RNTextProps,
    VariantProps<typeof textVariants> {}

const Text = ({
  className,
  variant,
  color,
  align,
  children,
  ...props
}: TextProps) => {
  return (
    <RNText
      className={cn(textVariants({ variant, color, align }), className)}
      {...props}
    >
      {children}
    </RNText>
  );
};

Text.displayName = "Text";

export { Text, textVariants };
