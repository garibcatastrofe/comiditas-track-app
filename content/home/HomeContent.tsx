/* COMPONENTS */
import { Report } from "@/content/shared/components/report/Report";
import { TextApp } from "@/content/shared/components/textApp/TextApp";
import { Title } from "@/content/shared/components/title/Title";
import { TryAgainContent } from "@/content/shared/components/tryAgainContent/TryAgainContent";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* HOOKS */
import { useReport } from "./hooks/useReport";

/* NAVIGATION */
import { useRouter } from "expo-router";

/* THEME */
import { useTheme } from "@/theme/ThemeContext";

export function HomeContent() {
  const router = useRouter();

  const { theme } = useTheme();
  const { report, error, loading, retry } = useReport();

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
            <View className="mx-6">
              <TextApp>Cargando...</TextApp>
            </View>
          ) : error ? (
            <TryAgainContent
              action={retry}
              label="Ocurrió un error al obtener el reporte"
            />
          ) : !report ? (
            <TryAgainContent
              action={retry}
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
