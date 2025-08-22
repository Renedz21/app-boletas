import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token?: string;
  isLoading: boolean;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  email: string;
  password: string;
};

type AuthContextType = {
  signIn: (
    props: SignInProps,
  ) => Promise<{ success: boolean; isNewUser: boolean }>;
  signUp: (
    props: SignUpProps,
  ) => Promise<{ success: boolean; isNewUser: boolean }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
} & AuthState;

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  token: undefined,
  isLoading: true,
  signIn: () => Promise.resolve({ success: false, isNewUser: false }),
  signUp: () => Promise.resolve({ success: false, isNewUser: false }),
  signInWithGoogle: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});

export function useAuth() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
  }
  return value;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Inicializar sesión y escuchar cambios usando tu approach
  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setToken(session?.access_token);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Escuchar cambios de autenticación con tu implementación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_OUT":
          setToken(undefined);
          setUser(null);
          break;
        case "INITIAL_SESSION":
        case "SIGNED_IN":
        case "TOKEN_REFRESHED":
          setToken(session?.access_token);
          setUser(session?.user ?? null);
          break;
        default:
        // no-op
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInProps) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return { success: true, isNewUser: false };
      // El estado se actualiza automáticamente por onAuthStateChange
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, []);

  const signUp = useCallback(async ({ email, password }: SignUpProps) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      return { success: true, isNewUser: true };
      // El estado se actualiza automáticamente por onAuthStateChange
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "exp://127.0.0.1:19000", // Para desarrollo con Expo
          // En producción: "tu-app-scheme://auth/callback"
        },
      });
      if (error) throw error;
      // El estado se actualiza automáticamente por onAuthStateChange
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // El estado se actualiza automáticamente por onAuthStateChange
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        user,
        token,
        isLoading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
