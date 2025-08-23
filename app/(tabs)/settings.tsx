import React from "react";
import { View, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/modules/core/components/ui/text";
import { Button } from "@/modules/core/components/ui/button";
import { useAuth } from "@/modules/core/context/auth-context";
import { 
  User, 
  Mail, 
  Phone, 
  Bell, 
  Shield, 
  CreditCard, 
  FileText,
  HelpCircle,
  LogOut,
  ChevronRight
} from "lucide-react-native";

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  onPress: () => void;
  showArrow?: boolean;
  dangerous?: boolean;
}

export default function SettingsScreen() {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              Alert.alert("Error", "No se pudo cerrar la sesión. Inténtalo de nuevo.");
            }
          },
        },
      ]
    );
  };

  const settingsItems: SettingItem[] = [
    {
      id: "notifications",
      title: "Notificaciones",
      subtitle: "Configurar alertas y recordatorios",
      icon: <Bell size={22} color="#6B7280" />,
      onPress: () => {
        // TODO: Implement notifications settings
        Alert.alert("Próximamente", "Esta función estará disponible en una futura actualización");
      },
      showArrow: true,
    },
    {
      id: "security",
      title: "Seguridad y privacidad",
      subtitle: "Gestionar tu cuenta y datos",
      icon: <Shield size={22} color="#6B7280" />,
      onPress: () => {
        // TODO: Implement security settings
        Alert.alert("Próximamente", "Esta función estará disponible en una futura actualización");
      },
      showArrow: true,
    },
    {
      id: "subscription",
      title: "Mi suscripción",
      subtitle: "Ver plan actual y facturación",
      icon: <CreditCard size={22} color="#6B7280" />,
      onPress: () => {
        // TODO: Implement subscription management
        Alert.alert("Próximamente", "Esta función estará disponible en una futura actualización");
      },
      showArrow: true,
    },
    {
      id: "export",
      title: "Exportar datos",
      subtitle: "Descargar tus boletas y reportes",
      icon: <FileText size={22} color="#6B7280" />,
      onPress: () => {
        // TODO: Implement data export
        Alert.alert("Próximamente", "Esta función estará disponible en una futura actualización");
      },
      showArrow: true,
    },
    {
      id: "help",
      title: "Ayuda y soporte",
      subtitle: "Centro de ayuda y contacto",
      icon: <HelpCircle size={22} color="#6B7280" />,
      onPress: () => {
        // TODO: Implement help center
        Alert.alert("Próximamente", "Esta función estará disponible en una futura actualización");
      },
      showArrow: true,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 py-8">
          <Text size="big" color="secondary" className="font-bold">
            Configuración
          </Text>
          <Text size="lg" color="secondary" className="opacity-70 mt-2">
            Gestiona tu cuenta y preferencias
          </Text>
        </View>

        {/* User Profile Card */}
        <View className="mx-6 mb-8 p-6 bg-gray-50 rounded-3xl">
          <View className="flex-row items-center">
            <View className="bg-primary-default rounded-full p-4 mr-4">
              <User size={24} color="#FFFFFF" />
            </View>
            
            <View className="flex-1">
              <Text size="lg" color="secondary" className="font-bold">
                {user?.user_metadata?.full_name || "Usuario"}
              </Text>
              
              <View className="flex-row items-center mt-1 mb-2">
                <Mail size={14} color="#6B7280" />
                <Text size="sm" color="secondary" className="ml-2 opacity-70">
                  {user?.email || "No disponible"}
                </Text>
              </View>
              
              {user?.user_metadata?.phone_number && (
                <View className="flex-row items-center">
                  <Phone size={14} color="#6B7280" />
                  <Text size="sm" color="secondary" className="ml-2 opacity-70">
                    {user.user_metadata.phone_number}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Settings Items */}
        <View className="mx-6 mb-8">
          {settingsItems.map((item, index) => (
            <Pressable
              key={item.id}
              onPress={item.onPress}
              className={`
                flex-row items-center p-4 bg-white border border-gray-100 
                ${index === 0 ? 'rounded-t-2xl' : ''}
                ${index === settingsItems.length - 1 ? 'rounded-b-2xl' : ''}
                ${index !== settingsItems.length - 1 ? 'border-b-0' : ''}
                active:bg-gray-50
              `}
            >
              <View className="mr-4">
                {item.icon}
              </View>
              
              <View className="flex-1">
                <Text size="md" color="secondary" className="font-medium">
                  {item.title}
                </Text>
                {item.subtitle && (
                  <Text size="sm" color="secondary" className="opacity-60 mt-1">
                    {item.subtitle}
                  </Text>
                )}
              </View>
              
              {item.showArrow && (
                <ChevronRight size={20} color="#6B7280" />
              )}
            </Pressable>
          ))}
        </View>

        {/* App Info */}
        <View className="mx-6 mb-8 p-4 bg-gray-50 rounded-2xl">
          <Text size="sm" color="secondary" className="text-center opacity-60">
            App Boletas v1.0.0
          </Text>
          <Text size="sm" color="secondary" className="text-center opacity-60 mt-1">
            © 2024 - Todos los derechos reservados
          </Text>
        </View>
      </ScrollView>

      {/* Logout Button */}
      <View className="px-6 py-4 bg-white border-t border-gray-100">
        <Button
          title="Cerrar sesión"
          onPress={handleLogout}
          variant="outline"
          size="lg"
          className="w-full border-red-200 bg-red-50 active:bg-red-100"
          icon={<LogOut size={20} color="#DC2626" />}
        />
      </View>
    </SafeAreaView>
  );
}
