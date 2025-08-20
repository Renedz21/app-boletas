import { Tabs } from "expo-router";
import {
  HomeIcon,
  FileTextIcon,
  CameraIcon,
  SettingsIcon,
} from "lucide-react-native";
import { TabBar } from "@/modules/core/components/navigation/tab-bar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <HomeIcon width={22} height={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: "Escanear",
          tabBarIcon: ({ color }) => (
            <CameraIcon width={22} height={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          title: "Boletas",
          tabBarIcon: ({ color }) => (
            <FileTextIcon width={22} height={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Ajustes",
          tabBarIcon: ({ color }) => (
            <SettingsIcon width={22} height={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
