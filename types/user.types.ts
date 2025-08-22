import { Database } from "./database.types";

export type UserRow = Database["public"]["Tables"]["user_profiles"]["Row"];
export type UserInsert =
  Database["public"]["Tables"]["user_profiles"]["Insert"];
export type UserUpdate =
  Database["public"]["Tables"]["user_profiles"]["Update"];

export type PlanType = "free" | "premium";
export type Gender =
  | "Masculino"
  | "Femenino"
  | "No Binario"
  | "Prefiero no decir";

export interface UserProfile
  extends Omit<
    UserRow,
    "created_at" | "updated_at" | "subscription_ends_at" | "birth_date"
  > {
  createdAt: Date | null;
  updatedAt: Date | null;
  subscriptionEndsAt: Date | null;
  birthDate: Date | null;
}

export interface UserProfileForm {
  fullName?: string;
  planType?: PlanType;
  birthDate?: Date;
  gender?: Gender;
  phoneNumber?: string;
}
