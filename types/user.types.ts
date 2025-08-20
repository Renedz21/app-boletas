import { Database } from "./database.types";

export type UserRow = Database["public"]["Tables"]["user_profiles"]["Row"];
export type UserInsert =
  Database["public"]["Tables"]["user_profiles"]["Insert"];
export type UserUpdate =
  Database["public"]["Tables"]["user_profiles"]["Update"];

export interface User extends Omit<UserRow, "created_at" | "updated_at"> {
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface UserProfile {
  id: string;
  fullName: string | null;
  planType: string;
  scansUsed: number | null;
  scansLimit: number | null;
  subscriptionEndsAt: Date | null;
}
