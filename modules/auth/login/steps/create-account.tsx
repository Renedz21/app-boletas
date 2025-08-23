import { View } from "react-native";
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

export default function CreateAccountStep() {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<FormValues>();
  return (
    <>
      <FormField
        control={control}
        name="account.email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Correo electrónico</FormLabel>
            <FormControl>
              <Input
                keyboardType="default"
                inputMode="text"
                placeholder="Ingrese su correo electrónico"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                autoFocus={false}
                readOnly={isSubmitting}
                {...field}
                value={field.value}
                onChangeText={field.onChange}
              />
            </FormControl>
            <FormMessage>{errors.account?.email?.message}</FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="account.password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contraseña</FormLabel>
            <FormControl>
              <Input
                keyboardType="visible-password"
                inputMode="text"
                placeholder="Ingrese su contraseña"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect={false}
                autoFocus={false}
                readOnly={isSubmitting}
                secureTextEntry={true}
                {...field}
                value={field.value}
                onChangeText={field.onChange}
              />
            </FormControl>
            <FormMessage>
              {errors.account?.confirm_password?.message}
            </FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="account.confirm_password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirmar contraseña</FormLabel>
            <FormControl>
              <Input
                keyboardType="visible-password"
                inputMode="text"
                placeholder="Confirme su contraseña"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect={false}
                autoFocus={false}
                readOnly={isSubmitting}
                {...field}
                value={field.value}
                onChangeText={field.onChange}
              />
            </FormControl>
            <FormMessage>{errors.account?.password?.message}</FormMessage>
          </FormItem>
        )}
      />
    </>
  );
}
