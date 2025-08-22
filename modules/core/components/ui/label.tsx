import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Text, type TextProps } from "react-native";

interface LabelProps extends TextProps {
  children: React.ReactNode;
}

const labelVariants = cva(
  "text-base font-medium leading-none peer-disabled:opacity-70"
);

const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <Text className={cn(labelVariants({ className }))} {...props}>
      {children}
    </Text>
  );
};

Label.displayName = "Label";

export { Label };
