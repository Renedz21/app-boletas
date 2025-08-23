import { useFormContext } from "react-hook-form";
import { FormValues } from "@/modules/schemas/login.schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/core/components/ui/form";
import { Input } from "@/modules/core/components/ui/input";

export default function CompleteProfileStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <>
      <FormField
        control={control}
        name="personalInformation.full_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre completo</FormLabel>
            <FormControl>
              <Input
                keyboardType="default"
                inputMode="text"
                placeholder="Ingrese su nombre completo"
                {...field}
                value={field.value}
                onChangeText={field.onChange}
              />
            </FormControl>
            <FormMessage className="text-error-500">
              {errors.root?.message}
            </FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="personalInformation.phone_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Teléfono</FormLabel>
            <FormControl>
              <Input
                keyboardType="phone-pad"
                inputMode="numeric"
                placeholder="Ingrese su teléfono"
                {...field}
                value={field.value}
                onChangeText={field.onChange}
                underlineColorAndroid="transparent"
              />
            </FormControl>
            <FormMessage className="text-error-500">
              {errors.root?.message}
            </FormMessage>
          </FormItem>
        )}
      />
    </>
  );
}
