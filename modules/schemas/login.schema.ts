import { z } from "zod";

export type FormValues = {
  personalInformation: {
    avatar_url: string;
    full_name: string;
    phone_number: string;
  };
  account: {
    email: string;
    password: string;
    confirm_password: string;
  };
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export const personalSchema = z.object({
  avatar_url: z.string().optional(),
  full_name: z.string().min(1, {
    message: "El nombre es requerido",
  }),
  phone_number: z.string().min(1, {
    message: "El teléfono es requerido",
  }),
});

export const accountSchema = z
  .object({
    email: z.email({
      error: "El email no es válido",
    }),
    password: z
      .string({
        error: "La contraseña es requerida",
      })
      .min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
      }),
    confirm_password: z
      .string({
        error: "La contraseña es requerida",
      })
      .min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
      }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Las contraseñas deben coincidir.",
    path: ["confirm_password"],
  });

export const loginSchema = z.object({
  email: z.email({
    error: "El email no es válido",
  }),
  password: z.string().min(6, {
    error: "La contraseña debe tener al menos 6 caracteres",
  }),
});

export const fullSchema = z.object({
  personalInformation: personalSchema,
  account: accountSchema,
});

export type StepKeys = keyof FormValues;
