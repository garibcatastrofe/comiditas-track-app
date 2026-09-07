import { useTheme } from "@/theme/ThemeContext";
import { Switch, View } from "react-native";
import { TextApp } from "../shared/components/textApp/TextApp";
import { Title } from "../shared/components/title/Title";

export function AboutContent() {
  const { toggleTheme, mode } = useTheme();

  return (
    <View className="gap-4 py-6">
      <Title text1="Comiditas" text2="Track App" />
      <TextApp
        className="mx-6 mb-4 text-xl"
        style={{ fontFamily: "DMSans_500Medium" }}
      >
        Comiditas Track App es una pequeña app que te ayuda a llevar un control
        de la calidad de tu alimentación
      </TextApp>
      <View className="flex-row items-center justify-between gap-4 mx-6">
        <TextApp className="text-lg">Modo Oscuro</TextApp>
        <Switch value={mode === "dark"} onValueChange={toggleTheme} />
      </View>
    </View>
  );
}
