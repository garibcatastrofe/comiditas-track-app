import { useTheme } from "@/theme/ThemeContext";
import { Tabs } from "expo-router";
import { ChartLine, House, Info } from "lucide-react-native";

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
          backgroundColor: theme.surface,
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
          shadowColor: "transparent",
          borderTopColor: theme.line,
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
          title: "Estadísticas",
          tabBarIcon: ({ color }) => <ChartLine size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "Acerca de",
          tabBarIcon: ({ color }) => <Info size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
