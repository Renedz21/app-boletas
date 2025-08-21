import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  type TextInputProps,
  type ViewProps,
} from "react-native";
import { SearchIcon, XIcon } from "lucide-react-native";
import { cn } from "@/lib/utils";

interface SearchBarProps extends TextInputProps {
  containerClassName?: string;
  containerProps?: ViewProps;
  onClear?: () => void;
  showClearButton?: boolean;
}

const SearchBar = React.forwardRef<TextInput, SearchBarProps>(
  (
    {
      className,
      containerClassName,
      containerProps,
      value,
      onClear,
      showClearButton = true,
      placeholder = "Buscar...",
      ...props
    },
    ref
  ) => {
    const handleClear = () => {
      if (onClear) {
        onClear();
      }
    };

    return (
      <View
        className={cn(
          "flex-row items-center bg-input rounded-xl px-4 py-3 border border-input-border",
          containerClassName
        )}
        {...containerProps}
      >
        <SearchIcon
          size={20}
          color="#94A3B8"
          className="mr-3"
        />
        <TextInput
          ref={ref}
          className={cn(
            "flex-1 text-base text-text-primary placeholder:text-text-tertiary",
            className
          )}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          {...props}
        />
        {showClearButton && value && value.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            className="ml-2"
            activeOpacity={0.7}
          >
            <XIcon
              size={18}
              color="#94A3B8"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

SearchBar.displayName = "SearchBar";

export { SearchBar };
