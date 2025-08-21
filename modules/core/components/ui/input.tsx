import { TextInput, TextInputProps } from "react-native";

import { cn } from "@/lib/utils";

type InputProps = TextInputProps & {};

const Input = ({ className, keyboardType, ...props }: InputProps) => {
  return (
    <TextInput
      keyboardType={keyboardType}
      className={cn(
        "border-primary-border bg-neutral-default placeholder:text-neutral-placeholder h-14 w-full flex-row border-b py-3 text-xl font-medium disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};

export { Input };
