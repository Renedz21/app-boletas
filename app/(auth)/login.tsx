import { View, KeyboardAvoidingView, Platform } from "react-native";
import { Text } from "@/modules/core/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormProvider } from "react-hook-form";
import StepContent from "@/modules/auth/login/steps/step-content";
import { useLogin } from "@/modules/auth/login/hooks/use-login";
import { Button } from "@/modules/core/components/ui/button";
import { ProgressBar } from "@/modules/core/components/shared/progress-bar";
import { ArrowLeft } from "lucide-react-native";

export default function LoginScreen() {
  const {
    form,
    currentStep,
    handleNextStep,
    progressPercentage,
    isLastStep,
    handleCreateAccount,
    handleLogin,
  } = useLogin();

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
      >
        {/* Progress Bar */}
        <View className="my-8 flex-row items-center justify-between gap-4">
          <ArrowLeft size={24} color={"#4c68ff"} />
          <ProgressBar progress={progressPercentage} className="w-1/2" />
          <View className="w-auto" />
        </View>

        {/* Header */}
        <View className="flex-col gap-4">
          <Text size="big" color={"secondary"} className="font-bold">
            {currentStep === "personalInformation"
              ? "Completa tu perfil"
              : "Crea tu cuenta"}
          </Text>
          <Text color={"secondary"} size="lg">
            {currentStep === "account"
              ? "Ingresa tu email y contraseña. Si olvidaste tu contraseña, puedes recuperarla más adelante."
              : "No te preocupes. Solo tú puedes ver tus información personal. Nadie más podrá verla."}
          </Text>
        </View>

        {/* Form */}
        <View className="mt-8 flex-1 flex-col gap-4">
          <FormProvider {...form}>
            <StepContent stepKey={currentStep} />
            <View className="mt-4 w-full">
              <Button
                title={isLastStep ? "Crear cuenta" : "Siguiente"}
                onPress={isLastStep ? handleCreateAccountClick : handleNextStep}
                variant="primary"
              />
            </View>
          </FormProvider>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
