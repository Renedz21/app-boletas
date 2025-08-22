import { View, Image } from "react-native";

interface ImagePreviewProps {
  imagePath: string;
}

export const ImagePreview = ({ imagePath }: ImagePreviewProps) => {
  return (
    <View className="mb-6 px-6">
      <View className="h-96 w-full overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 p-2">
        <Image
          source={{ uri: `file://${imagePath}` }}
          className="h-full w-full"
          resizeMode="contain"
        />
      </View>
    </View>
  );
};
