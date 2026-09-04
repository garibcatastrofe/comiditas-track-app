import Announcement from "@/content/shared/components/announcement/Announcement";
import { Modal } from "@/content/shared/components/modal/Modal";
import { db } from "@/src/db/drizzleSQLiteService";
import { ThemeProvider, useTheme } from "@/theme/ThemeContext";
import { PortalProvider } from "@gorhom/portal";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import migrations from "../drizzle/migrations";
import "../global.css";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    DMSans_400Regular: require("../assets/fonts/DMSans-Regular.ttf"),
    DMSans_500Medium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMSans_700Bold: require("../assets/fonts/DMSans-Bold.ttf"),
    BebasNeue_400Regular: require("../assets/fonts/BebasNeue-Regular.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootNavigator() {
  const { mode, theme } = useTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const migrateDb = async () => {
        await migrate(db, migrations).then(() => setReady(true));
      };

      migrateDb();
    } catch (e) {
      console.log("Error: " + e);
    }
  }, []);

  useEffect(() => {
    // Fondo nativo que se ve detrás de React
    SystemUI.setBackgroundColorAsync(theme.danger);
  }, [theme.danger]);

  if (!ready) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <SystemBars style={mode === "dark" ? "light" : "dark"} />

      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.background }}
        edges={["top", "left", "right"]}
      >
        <Announcement />
        <Modal />
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: theme.background,
            },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="reports/[date]/report"
            options={{ headerShown: false, presentation: "modal" }}
          />
        </Stack>
      </SafeAreaView>
    </View>
  );
}

function RootLayoutNav() {
  return (
    <ThemeProvider>
      <PortalProvider>
        <RootNavigator />
      </PortalProvider>
    </ThemeProvider>
  );
}
