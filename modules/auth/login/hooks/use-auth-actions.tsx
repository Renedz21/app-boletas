import { useForm } from "react-hook-form";
import {
  fullSchema,
  StepKeys,
  loginSchema,
} from "@/modules/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useAuth } from "@/modules/core/context/auth-context";
import { useRouter } from "expo-router";

export type LoginStep = "personalInformation" | "account";
const STEPS: StepKeys[] = ["personalInformation", "account"];

export const useAuthActions = () => {
  const { signUp, signIn } = useAuth();
  const router = useRouter();
  const form = useForm<z.infer<typeof fullSchema>>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      personalInformation: {
        avatar_url: "",
        full_name: "",
        phone_number: "",
      },
      account: {
        email: "",
        password: "",
        confirm_password: "",
      },
    },
  });
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [currentStep, setCurrentStep] = useState<LoginStep>(
    "personalInformation",
  );
  const isLastStep = currentStep === "account";
  const progressPercentage =
    ((STEPS.indexOf(currentStep) + 1) / STEPS.length) * 100;
  const handleNextStep = async () => {
    if (currentStep === "personalInformation") {
      const isValid = await form.trigger("personalInformation");
      if (!isValid) {
        return;
      }
    }

    setCurrentStep((prev) => {
      const nextStep =
        prev === "personalInformation" ? "account" : "personalInformation";
      return nextStep;
    });
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => {
      const previousStep =
        prev === "personalInformation" ? "account" : "personalInformation";
      return previousStep;
    });
  };

  const handleCreateAccount = async (data: z.infer<typeof fullSchema>) => {
    try {
      await signUp({
        email: data.account.email,
        password: data.account.password,
        userData: {
          full_name: data.personalInformation.full_name,
          phone_number: data.personalInformation.phone_number,
        },
      });

      router.replace("/confirmation");
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    const isValid = await loginForm.trigger();
    if (!isValid) {
      return;
    }

    try {
      await signIn({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return {
    form,
    loginForm,
    steps: STEPS,
    currentStep,
    setCurrentStep,
    handleNextStep,
    handlePreviousStep,
    progressPercentage,
    isLastStep,
    handleCreateAccount,
    handleLogin,
  };
};
