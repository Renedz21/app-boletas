import { Database } from "./database.types";

export type UserRow = Database["public"]["Tables"]["user_profiles"]["Row"];
export type UserInsert =
  Database["public"]["Tables"]["user_profiles"]["Insert"];
export type UserUpdate =
  Database["public"]["Tables"]["user_profiles"]["Update"];

export type PlanType = "free" | "premium";

export interface UserProfile
  extends Omit<UserRow, "created_at" | "updated_at" | "subscription_ends_at"> {
  createdAt: Date | null;
  updatedAt: Date | null;
  subscriptionEndsAt: Date | null;
}

export interface UserProfileForm {
  fullName?: string;
  planType?: PlanType;
  phoneNumber?: string;
}
