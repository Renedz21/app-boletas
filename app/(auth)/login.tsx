import React, { useState } from "react";
import { View, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReceiptIcon } from "lucide-react-native";
import { Text } from "@/modules/core/components/ui/text";
import { Button } from "@/modules/core/components/ui/button";
import { Input } from "@/modules/core/components/ui/input";
import { Checkbox } from "@/modules/core/components/ui/checkbox";
import { Card } from "@/modules/core/components/ui/card";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Simular llamada a API
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)");
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 justify-center">
            {/* Logo y título */}
            <View className="items-center mb-8">
              <View className="bg-primary-100 p-4 rounded-3xl mb-4">
                <ReceiptIcon size={48} color="#3B82F6" />
              </View>
              <Text variant="h1" align="center" className="mb-2">
                Gestor de Boletas
              </Text>
              <Text variant="body-secondary" align="center">
                Organiza y administra tus boletas fácilmente
              </Text>
            </View>

            {/* Formulario de login */}
            <Card className="p-6">
              <View className="space-y-4">
                <View>
                  <Text variant="label" className="mb-2">
                    Correo electrónico
                  </Text>
                  <Input
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="bg-input"
                  />
                </View>

                <View className="mt-4">
                  <Text variant="label" className="mb-2">
                    Contraseña
                  </Text>
                  <Input
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    className="bg-input"
                  />
                </View>

                <View className="flex-row items-center justify-between mt-4">
                  <TouchableOpacity
                    className="flex-row items-center"
                    activeOpacity={0.7}
                    onPress={() => setRememberMe(!rememberMe)}
                  >
                    <Checkbox
                      checked={rememberMe}
                      onCheckedChange={setRememberMe}
                    />
                    <Text variant="body" className="ml-2">
                      Recordarme
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.7}>
                    <Text variant="body" color="accent">
                      ¿Olvidaste tu contraseña?
                    </Text>
                  </TouchableOpacity>
                </View>

                <Button
                  onPress={handleLogin}
                  loading={loading}
                  className="mt-6"
                  size="lg"
                >
                  Iniciar Sesión
                </Button>
              </View>
            </Card>

            {/* Enlaces adicionales */}
            <View className="flex-row items-center justify-center mt-8">
              <Text variant="body" color="secondary">
                ¿No tienes una cuenta? 
              </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text variant="body" color="accent">
                  Regístrate
                </Text>
              </TouchableOpacity>
            </View>

            {/* Decoración */}
            <View className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 opacity-50" />
            <View className="absolute bottom-0 left-0 w-24 h-24 bg-secondary-50 rounded-full -ml-12 -mb-12 opacity-50" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
