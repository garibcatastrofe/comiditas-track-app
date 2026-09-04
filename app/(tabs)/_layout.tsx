import { useTheme } from "@/theme/ThemeContext";
import { Tabs } from "expo-router";
import { ChartLine, House } from "lucide-react-native";

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.faint,
        headerShown: false,
        tabBarShowLabel: false,
        animation: "none",
        tabBarStyle: {
          backgroundColor: theme.primary_bg,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          shadowColor: "transparent",
          borderTopColor: "transparent",
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        sceneStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <House size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <ChartLine size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
