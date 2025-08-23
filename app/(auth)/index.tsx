import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";

import { Text } from "@/modules/core/components/ui/text";
import { Button } from "@/modules/core/components/ui/button";

export default function AuthScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="flex-1 flex-col items-center justify-center gap-6">
        {/* Circular Illustration Container */}
        <View className="mb-4 items-center justify-center rounded-full">
          <Image
            source={require("@/assets/images/welcome.png")}
            className="h-96 w-96 rounded-full border border-gray-50"
            resizeMode="cover"
          />
        </View>

        {/* Main Title */}
        <Text size="big" className="mb-6 text-center font-bold text-gray-900">
          Bienvenido a Report AI
        </Text>

        {/* Password Login Button */}
        <Button
          title="Iniciar sesión"
          onPress={() => router.push("/(auth)/login")}
          className="w-full"
        />

        {/* Sign Up Link */}
        <View className="mt-4 flex-row items-center justify-center gap-1">
          <Text color="secondary">¿No tienes una cuenta?</Text>
          <Link href="/register">
            <Text color="primary" className="font-semibold">
              Regístrate
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
