import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { Text } from "@/modules/core/components/ui/text";
import { Button } from "@/modules/core/components/ui/button";

export default function AuthScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="flex-1 flex-col justify-center gap-4">
        <Text size="big" color={"secondary"}>
          Bienvenido a la aplicación
        </Text>
        <Button title="Continuar con Google" variant={"outline"} />
        <Button title="Continuar con Apple" variant={"outline"} />

        <Button
          title="Iniciar sesión con correo"
          onPress={() => router.push("/(auth)/login")}
        />

        <View className="flex-row items-center justify-center gap-2">
          <Text color={"secondary"}>No tienes una cuenta?</Text>
          <Text color={"primary"}>Regístrate</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
