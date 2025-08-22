import { useForm } from "react-hook-form";
import {
  fullSchema,
  StepKeys,
  FormValues,
  accountSchema,
  personalSchema,
} from "@/modules/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

export type LoginStep = "personalInformation" | "account";
const STEPS: StepKeys[] = ["personalInformation", "account"];

export const useLogin = () => {
  const form = useForm<z.infer<typeof fullSchema>>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      personalInformation: {
        avatar_url: "",
        full_name: "",
        phone_number: "",
        gender: "Masculino",
        birth_date: "",
      },
      account: {
        email: "",
        password: "",
        confirm_password: "",
      },
    },
  });
  const [currentStep, setCurrentStep] = useState<LoginStep>(
    "personalInformation",
  );
  const isLastStep = currentStep === "account";
  const progressPercentage =
    ((STEPS.indexOf(currentStep) + 1) / STEPS.length) * 100;

  const handleNextStep = () => {
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

  const handleCreateAccount = (data: z.infer<typeof fullSchema>) => {
    console.log(data);
  };

  return {
    form,
    steps: STEPS,
    currentStep,
    setCurrentStep,
    handleNextStep,
    handlePreviousStep,
    progressPercentage,
    isLastStep,
    handleCreateAccount,
  };
};
