/* COMPONENTS */
import { TextTitle } from "../../ui/text/TextTitle";

/* THEME */
import { useTheme } from "@/theme/ThemeContext";

export function Title({ text1, text2 }: { text1: string; text2: string }) {
  const { theme } = useTheme();
  return (
    <TextTitle className="mx-6 mb-2 text-4xl">
      {text1} <TextTitle style={{ color: theme.primary }}>{text2}</TextTitle>
    </TextTitle>
  );
}
