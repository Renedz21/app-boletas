import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Text } from "@/modules/core/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthActions } from "@/modules/auth/login/hooks/use-auth-actions";
import { Button } from "@/modules/core/components/ui/button";
import { ArrowLeft, Eye, EyeOff } from "lucide-react-native";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/core/components/ui/form";
import { Input } from "@/modules/core/components/ui/input";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const { loginForm, handleLogin } = useAuthActions();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleSignIn = async () => {
    const formData = loginForm.getValues();
    try {
      await handleLogin({
        email: formData.email,
        password: formData.password,
      });
    } catch (error) {
      setError(
        "Ocurrió un error al iniciar sesión. Revisa tus credenciales.  ",
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 flex-col gap-4"
        keyboardVerticalOffset={100}
      >
        {/* Back Button */}
        <TouchableOpacity className="mb-6 mt-2" onPress={() => router.back()}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>

        {/* Header */}
        <View className="mb-8 flex-col gap-4">
          <Text className="text-4xl font-bold text-gray-900">Hola 👋</Text>
          <Text color="secondary" size="xl">
            Ingresa tu email y contraseña para iniciar sesión.
          </Text>
        </View>

        {/* Form */}
        <View className="flex-1">
          <Form {...loginForm}>
            <View className="flex-col gap-10">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        keyboardType="email-address"
                        inputMode="email"
                        placeholder="Ingresa tu email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect={false}
                        autoFocus={true}
                        readOnly={loginForm.formState.isSubmitting}
                        {...field}
                        value={field.value}
                        onChangeText={field.onChange}
                      />
                    </FormControl>
                    <FormMessage>
                      {loginForm.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <View className="relative">
                        <Input
                          inputMode="text"
                          secureTextEntry={!showPassword}
                          placeholder="Ingresa tu contraseña"
                          readOnly={loginForm.formState.isSubmitting}
                          autoCapitalize="none"
                          autoComplete="password"
                          autoCorrect={false}
                          autoFocus={false}
                          {...field}
                          value={field.value}
                          onChangeText={field.onChange}
                        />
                        <TouchableOpacity
                          className="absolute right-0 top-3"
                          onPress={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <EyeOff size={24} color="#6B7280" />
                          ) : (
                            <Eye size={24} color="#6B7280" />
                          )}
                        </TouchableOpacity>
                      </View>
                    </FormControl>
                    <FormMessage>
                      {loginForm.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </View>
          </Form>

          {error && (
            <View className="my-8 rounded-lg bg-error-50 p-4">
              <Text size="xl" className="text-error-500">
                {error}
              </Text>
            </View>
          )}
        </View>

        {/* Sign In Button */}
        <View className="mb-6">
          <Button
            title="Iniciar sesión"
            onPress={handleSignIn}
            disabled={loginForm.formState.isSubmitting}
            loading={loginForm.formState.isSubmitting}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
