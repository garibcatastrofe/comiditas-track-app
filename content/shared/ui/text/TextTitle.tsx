/* COMPONENTS */
import { Text, TextProps } from "react-native";

/* THEME */
import { useTheme } from "@/theme/ThemeContext";

export function TextTitle({ style, ...props }: TextProps) {
  const { theme } = useTheme();

  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: "BebasNeue_400Regular",
          color: theme.body,
        },
        style,
      ]}
    />
  );
}
