import { View } from "react-native";
import { Text } from "@/modules/core/components/ui/text";
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
    formState: { errors },
  } = useFormContext<FormValues>();
  return (
    <View className="flex-col gap-8">
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
                {...field}
                value={field.value}
                onChangeText={field.onChange}
              />
            </FormControl>
            <FormMessage>{errors.root?.message}</FormMessage>
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
                keyboardType="default"
                inputMode="text"
                placeholder="Ingrese su contraseña"
                secureTextEntry={true}
                {...field}
                value={field.value}
                onChangeText={field.onChange}
              />
            </FormControl>
            <FormMessage>{errors.root?.message}</FormMessage>
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
                keyboardType="default"
                inputMode="text"
                placeholder="Confirme su contraseña"
                secureTextEntry={true}
                {...field}
                value={field.value}
                onChangeText={field.onChange}
              />
            </FormControl>
            <FormMessage>{errors.root?.message}</FormMessage>
          </FormItem>
        )}
      />
    </View>
  );
}
