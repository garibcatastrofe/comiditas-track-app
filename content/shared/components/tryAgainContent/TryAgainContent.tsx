/* COMPONENTS */
import { Pressable, View } from "react-native";
import { TextApp } from "../../ui/text/TextApp";

/* ICONS */
import { RefreshCw } from "lucide-react-native";

/* THEME */
import { useTheme } from "@/theme/ThemeContext";

export function TryAgainContent({
  action,
  label,
}: {
  action: () => void;
  label: string;
}) {
  const { theme } = useTheme();

  return (
    <View className="gap-4">
      <TextApp>{label}</TextApp>
      <Pressable
        onPress={action}
        className="flex-row items-center justify-center gap-4 p-4 rounded-xl"
        style={{ backgroundColor: theme.primary }}
      >
        <RefreshCw size={20} color={theme.primary_txt} />
        <TextApp
          className="text-lg"
          style={{ fontFamily: "DMSans_700Bold", color: theme.primary_txt }}
        >
          Intentar nuevamente
        </TextApp>
      </Pressable>
    </View>
  );
}
