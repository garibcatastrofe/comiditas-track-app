import { useTheme } from "@/theme/ThemeContext";
import { ScrollView } from "react-native";

export function ScrollViewContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <ScrollView
      className="flex-1 py-6"
      contentContainerClassName="gap-4"
      style={{ backgroundColor: theme.background }}
    >
      {children}
    </ScrollView>
  );
}
