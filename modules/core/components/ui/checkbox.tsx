import React from "react";
import {
  TouchableOpacity,
  View,
  type TouchableOpacityProps,
} from "react-native";
import { CheckIcon } from "lucide-react-native";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<TouchableOpacityProps, "onPress"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const Checkbox = ({
  className,
  checked = false,
  onCheckedChange,
  disabled = false,
  ...props
}: CheckboxProps) => {
  const handlePress = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      className={cn(
        "h-5 w-5 items-center justify-center rounded-md border-2",
        checked
          ? "border-primary-500 bg-primary-500"
          : "border-neutral-300 bg-surface",
        disabled && "opacity-50",
        className,
      )}
      activeOpacity={0.7}
      {...props}
    >
      {checked && <CheckIcon size={14} color="#FFFFFF" strokeWidth={3} />}
    </TouchableOpacity>
  );
};

Checkbox.displayName = "Checkbox";

export { Checkbox };
