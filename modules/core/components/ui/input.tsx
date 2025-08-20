import { TextInput, TextInputProps } from "react-native";

import { cn } from "@/lib/utils";

type InputProps = TextInputProps & {
  ref?: any;
};

const Input = ({ className, keyboardType, ref, ...props }: InputProps) => {
  return (
    <TextInput
      ref={ref}
      keyboardType={keyboardType}
      className={cn(
        "flex h-14 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background placeholder:text-mutedForeground disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};

export { Input };
