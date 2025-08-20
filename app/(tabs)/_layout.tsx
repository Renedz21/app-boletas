import { Tabs } from "expo-router";
import {
  HomeIcon,
  FileTextIcon,
  CameraIcon,
  SettingsIcon,
} from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <HomeIcon width={24} height={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: "Scanner",
          tabBarIcon: ({ color }) => (
            <CameraIcon width={24} height={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          title: "Boletas",
          tabBarIcon: ({ color }) => (
            <FileTextIcon width={24} height={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Configuración",
          tabBarIcon: ({ color }) => (
            <SettingsIcon width={24} height={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
