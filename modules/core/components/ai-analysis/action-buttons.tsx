import { View } from "react-native";
import { Button } from "@/modules/core/components/ui/button";

interface ActionButtonsProps {
  onSave: () => void;
  loading?: boolean;
}

export const ActionButtons = ({ onSave, loading }: ActionButtonsProps) => {
  return (
    <View className="flex-row justify-center">
      <Button
        variant="primary"
        size="default"
        className="flex-1"
        onPress={onSave}
        disabled={loading}
      >
        Guardar
      </Button>
    </View>
  );
};
