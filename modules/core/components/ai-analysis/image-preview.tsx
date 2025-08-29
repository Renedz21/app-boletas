import { View, Image, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const imageWidth = screenWidth * 0.9;
const imageHeight = imageWidth * 1.4;

interface ImagePreviewProps {
  imagePath: string;
}

export const ImagePreview = ({ imagePath }: ImagePreviewProps) => {
  return (
    <View className="mb-6 px-6">
      <View className="overflow-hidden rounded-2xl">
        <Image
          source={{ uri: `file://${imagePath}` }}
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};
