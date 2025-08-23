import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Text } from "@/modules/core/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormProvider } from "react-hook-form";
import StepContent from "@/modules/auth/login/steps/step-content";
import { useAuthActions } from "@/modules/auth/login/hooks/use-auth-actions";
import { Button } from "@/modules/core/components/ui/button";
import { ProgressBar } from "@/modules/core/components/shared/progress-bar";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();
  const {
    form,
    currentStep,
    handleNextStep,
    progressPercentage,
    isLastStep,
    handleCreateAccount,
    handleLogin,
  } = useAuthActions();

  const handleCreateAccountClick = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      const formData = form.getValues();
      console.log("Form data:", formData);
      await handleCreateAccount(formData);
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        {/* Progress Bar */}
        <View className="mb-8 mt-4 flex-row items-center justify-between gap-4">
          <TouchableOpacity className="px-2 py-4" onPress={() => router.back()}>
            <ArrowLeft size={24} color={"#4c68ff"} />
          </TouchableOpacity>
          <ProgressBar progress={progressPercentage} className="w-1/2" />
          <View className="w-auto" />
        </View>

        {/* Header */}
        <View className="flex-col gap-6">
          <Text className="text-4xl font-bold text-gray-900">
            {currentStep === "personalInformation"
              ? "Completa tu perfil"
              : "Crea tu cuenta"}
          </Text>
          <Text className="text-lg text-gray-500">
            {currentStep === "account"
              ? "Ingresa tu email y contraseña. Si olvidaste tu contraseña, puedes recuperarla más adelante."
              : "No te preocupes. Solo tú puedes ver tus información personal. Nadie más podrá verla."}
          </Text>
        </View>

        {/* Form */}
        <View className="mt-10 flex-1 flex-col">
          <FormProvider {...form}>
            <View className="flex-1 flex-col gap-10">
              <StepContent stepKey={currentStep} />
            </View>
            <Button
              title={isLastStep ? "Crear cuenta" : "Siguiente"}
              onPress={isLastStep ? handleCreateAccountClick : handleNextStep}
              className="my-6"
              variant="primary"
            />
          </FormProvider>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
