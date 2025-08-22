import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { BoletaInsert, BoletaRow } from "@/types/boleta.types";

interface UseSupabaseBoletaReturn {
  loading: boolean;
  error: string | null;
  insertBoleta: (
    data: Omit<BoletaInsert, "user_id">,
  ) => Promise<BoletaRow | null>;
  updateBoleta: (id: string, data: Partial<BoletaRow>) => Promise<boolean>;
  deleteBoleta: (id: string) => Promise<boolean>;
}

export const useSupabaseBoleta = (): UseSupabaseBoletaReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const insertBoleta = useCallback(
    async (data: Omit<BoletaInsert, "user_id">) => {
      setLoading(true);
      setError(null);

      try {
        // Get current user
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          throw new Error("Usuario no autenticado");
        }

        // Prepare data with user_id
        const boletaData: BoletaInsert = {
          ...data,
          user_id: user.id,
        };

        // Insert into database
        const { data: insertedBoleta, error: insertError } = await supabase
          .from("boletas")
          .insert(boletaData)
          .select()
          .single();

        if (insertError) {
          throw new Error(`Error al insertar: ${insertError.message}`);
        }

        return insertedBoleta;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error desconocido";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateBoleta = useCallback(
    async (id: string, data: Partial<BoletaRow>) => {
      setLoading(true);
      setError(null);

      try {
        const { error: updateError } = await supabase
          .from("boletas")
          .update(data)
          .eq("id", id);

        if (updateError) {
          throw new Error(`Error al actualizar: ${updateError.message}`);
        }

        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error desconocido";
        setError(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const deleteBoleta = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from("boletas")
        .delete()
        .eq("id", id);

      if (deleteError) {
        throw new Error(`Error al eliminar: ${deleteError.message}`);
      }

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    insertBoleta,
    updateBoleta,
    deleteBoleta,
  };
};
