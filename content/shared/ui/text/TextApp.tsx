/* COMPONENTS */
import { Text, TextProps } from "react-native";

/* THEME */
import { useTheme } from "@/theme/ThemeContext";

export function TextApp({ style, ...props }: TextProps) {
  const { theme } = useTheme();

  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: "DMSans_400Regular",
          color: theme.body,
        },
        style,
      ]}
    />
  );
}
