/* COMPONENTS */
import { Report } from "@/content/shared/components/report/Report";
import { Title } from "@/content/shared/components/title/Title";
import { TextApp } from "@/content/shared/ui/text/TextApp";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* HOOKS */
import { useReport } from "./hooks/useReport";

/* ICONS */
import { RefreshCw } from "lucide-react-native";

/* NAVIGATION */
import { useRouter } from "expo-router";

/* THEME */
import { useTheme } from "@/theme/ThemeContext";

export function HomeContent() {
  const router = useRouter();

  const { theme } = useTheme();
  const { report, error, loading, setLoading } = useReport();

  return (
    <SafeAreaView
      className="justify-center flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <ScrollView className="flex-1 py-6" contentContainerClassName="gap-4">
        <Title text1="Hola" text2="Garib" />
        <TextApp
          className="mx-6 mb-4 text-xl"
          style={{ fontFamily: "DMSans_500Medium" }}
        >
          ¿Cómo van tus comidas hoy?
        </TextApp>
        <View className="mx-6">
          {loading ? (
            <TextApp>Cargando...</TextApp>
          ) : error ? (
            <TryAgainContent
              action={() => setLoading(true)}
              label="Ocurrió un error al obtener el reporte"
            />
          ) : !report ? (
            <TryAgainContent
              action={() => setLoading(true)}
              label="El reporte llegó sin información"
            />
          ) : (
            <Report
              id={report.id}
              date={report.date}
              breakfastStatus={report.breakfastStatus}
              lunchStatus={report.lunchStatus}
              dinnerStatus={report.dinnerStatus}
              goAction={() =>
                router.push({
                  pathname: "/reports/[date]/report",
                  params: { date: report.date },
                })
              }
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TryAgainContent({
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
