import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" options={{ title: "Iniciar sesión" }} />
      <Stack.Screen name="register" options={{ title: "Regístrate" }} />
      <Stack.Screen name="success" options={{ title: "Éxito" }} />
      <Stack.Screen name="payment" options={{ title: "Pago" }} />
    </Stack>
  );
}
