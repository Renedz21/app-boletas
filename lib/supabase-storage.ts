import { SupportedStorage } from "@supabase/supabase-js";
import { MMKV } from "react-native-mmkv";

const supabaseStorage = new MMKV({
  id: "supabase-storage",
});

const supabaseCustomStorage: SupportedStorage = {
  getItem: (key) => {
    const value = supabaseStorage.getString(key);
    return value ?? null;
  },
  setItem: (key, value) => {
    supabaseStorage.set(key, value);
  },
  removeItem: (key) => {
    supabaseStorage.delete(key);
  },
};

export default supabaseCustomStorage;
