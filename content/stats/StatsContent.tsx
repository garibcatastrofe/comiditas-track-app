/* COMPONENTS */
import { Title } from "@/content/shared/components/title/Title";
import { TextApp } from "@/content/shared/ui/text/TextApp";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* THEME */
import { useTheme } from "@/theme/ThemeContext";

export function StatsContent() {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      className="flex-col justify-center flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <ScrollView
        className="flex-1 py-6"
        contentContainerClassName="flex-col gap-4"
      >
        <Title text1="Mis" text2="estadísticas" />
        <TextApp>texto normal :d</TextApp>
      </ScrollView>
    </SafeAreaView>
  );
}
