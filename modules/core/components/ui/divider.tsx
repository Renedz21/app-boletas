import React from "react";
import { View, type ViewProps } from "react-native";
import { cn } from "@/lib/utils";

interface DividerProps extends ViewProps {
  orientation?: "horizontal" | "vertical";
  thickness?: "thin" | "medium" | "thick";
}

const Divider = React.forwardRef<View, DividerProps>(
  (
    { className, orientation = "horizontal", thickness = "thin", ...props },
    ref,
  ) => {
    const thicknessStyles = {
      thin: orientation === "horizontal" ? "h-[1px]" : "w-[1px]",
      medium: orientation === "horizontal" ? "h-[2px]" : "w-[2px]",
      thick: orientation === "horizontal" ? "h-[3px]" : "w-[3px]",
    };

    return (
      <View
        ref={ref}
        className={cn(
          "bg-border",
          orientation === "horizontal" ? "my-2 w-full" : "mx-2 h-full",
          thicknessStyles[thickness],
          className,
        )}
        {...props}
      />
    );
  },
);

Divider.displayName = "Divider";

export { Divider };
