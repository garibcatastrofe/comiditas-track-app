import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./colors";

type ThemeMode = "light" | "dark";

type ThemeContextType = {
  theme: typeof lightTheme;
  mode: ThemeMode;
  toggleTheme: () => void;
};

const ThemeContext = createContext({} as ThemeContextType);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useColorScheme();

  const [mode, setMode] = useState<ThemeMode>(
    systemTheme === "dark" ? "dark" : "light",
  );

  useEffect(() => {
    loadTheme();
  }, []);

  async function loadTheme() {
    const savedTheme = await AsyncStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      setMode(savedTheme);
    }
  }

  async function toggleTheme() {
    const newTheme = mode === "dark" ? "light" : "dark";

    setMode(newTheme);

    await AsyncStorage.setItem("theme", newTheme);
  }

  return (
    <ThemeContext.Provider
      value={{
        mode,
        theme: mode === "dark" ? darkTheme : lightTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
