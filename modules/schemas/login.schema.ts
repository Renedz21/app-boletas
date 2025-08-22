import { z } from "zod";

export type FormValues = {
  personalInformation: {
    avatar_url: string;
    full_name: string;
    phone_number: string;
    gender: string;
    birth_date: string;
  };
  account: {
    email: string;
    password: string;
    confirm_password: string;
  };
};

export const personalSchema = z.object({
  avatar_url: z.string().optional(),
  full_name: z.string().min(1),
  phone_number: z.string().optional(),
  birth_date: z.string().optional(),
  gender: z.enum(["Masculino", "Femenino", "No Binario", "Prefiero no decir"]),
});

export const accountSchema = z
  .object({
    email: z.email(),
    password: z.string().min(6),
    confirm_password: z.string().min(6),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Las contraseñas no coinciden",
    path: ["confirm_password"],
  });

export const fullSchema = z.object({
  personalInformation: personalSchema,
  account: accountSchema,
});

export type StepKeys = keyof FormValues;
