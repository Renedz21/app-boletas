import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("leading-normal", {
  variants: {
    color: {
      primary: "text-primary-default",
      secondary: "text-neutral-strong",
      neutral: "text-neutral-default",
    },
    size: {
      sm: "text-sm",
      default: "text-base",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      xxl: "text-2xl",
      big: "text-3xl",
    },
  },
  defaultVariants: {
    color: "neutral",
    size: "default",
  },
});

export interface TextProps
  extends RNTextProps,
    VariantProps<typeof textVariants> {}

const Text = ({ className, color, size, children, ...props }: TextProps) => {
  return (
    <RNText className={cn(textVariants({ color, size }), className)} {...props}>
      {children}
    </RNText>
  );
};

Text.displayName = "Text";

export { Text, textVariants };
