import { TextInput, TextInputProps } from "react-native";

import { cn } from "@/lib/utils";

type InputProps = TextInputProps & {};

const Input = ({ className, keyboardType, ...props }: InputProps) => {
  return (
    <TextInput
      keyboardType={keyboardType}
      className={cn(
        "h-14 w-full flex-row border-b border-primary-border bg-neutral-default py-3 text-xl font-medium placeholder:text-neutral-placeholder disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};

export { Input };
