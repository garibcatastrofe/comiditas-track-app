/* COMPONENTS */
import { Title } from "@/content/shared/components/title/Title";
import { TextApp } from "@/content/shared/ui/text/TextApp";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* HOOKS */
import { useReport } from "./hooks/useReport";

/* NAVIGATION */
import { useLocalSearchParams, useRouter } from "expo-router";

/* ICONS */
import { ArrowLeft, Calendar } from "lucide-react-native";

/* THEME */
import { useTheme } from "@/theme/ThemeContext";

/* UTILS */
import { formatDate } from "@/content/shared/utils/formatDate";

export function ReportContent() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { theme } = useTheme();
  const { report } = useReport(id);

  return (
    <SafeAreaView
      className="flex-col justify-center flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <ScrollView
        className="flex-1 py-6"
        contentContainerClassName="flex-col gap-4"
      >
        <View className="flex-row items-center mx-6">
          <Pressable onPress={() => router.back()}>
            <ArrowLeft size={24} color={theme.body} />
          </Pressable>
          <Title text1="Reporte" text2="" />
        </View>

        <TextApp
          className="mx-6 mb-4 text-xl"
          style={{ fontFamily: "DMSans_500Medium" }}
        >
          ¿Cómo fueron tus comidas este día?
        </TextApp>

        {!report ? (
          <View>
            <TextApp>Cargando...</TextApp>
          </View>
        ) : (
          <View className="gap-4">
            <TextApp>Fecha</TextApp>
            <View className="flex-row gap-4">
              <Calendar size={20} color={theme.ink} />
              <TextApp>{formatDate(report.date)}</TextApp>
            </View>

            <TextApp>Desayuno</TextApp>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
